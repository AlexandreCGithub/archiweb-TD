import type { PageServerLoad, Actions } from './$types';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import {
	favoritesTab,
	addFavorite,
	removeFavorite,
	resetFavorites
} from '$lib/stores/favoritesStore';
import type { Recipe } from '$lib/types';

const parseJwt = (token: string | undefined) => {
	if (token == undefined) return undefined;
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return e;
	}
};

// Pour savoir si la recette particulière de cette page est déjà favorite, on utilise un store
// Il est rempli si le store actuel est null

export const load: PageServerLoad = async ({ params, cookies }) => {
	// load favorites in store if favorites tab is empty
	// ********************************
	console.log('Etat du store');
	console.log(get(favoritesTab));

	const userPseudo = parseJwt(cookies.get('token'))?.iss;
	if (!userPseudo) {
		console.log('Vidage du store car déconnecté');
		resetFavorites();
	}

	if (get(favoritesTab) == null && userPseudo) {
		// si store null et un pseudo connecté
		console.log('Remplissage du store...');
		const favResponse = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
			headers: {
				Accept: 'application/json, application/xml',
				Authorization: `Bearer ${cookies.get('token')}`
			}
		});
		if (favResponse.ok) {
			const favJsonResponse = await favResponse.json();
			if (favJsonResponse != null) {
				favoritesTab.set([]);
				favJsonResponse.forEach((item: { recipe: Recipe }) => addFavorite(item.recipe.id));
				console.log('Le store a désormais ' + favJsonResponse.length + ' recettes favorites');
				console.log(get(favoritesTab));
			}
		} else {
			console.log(
				"Les favoris n'ont pas pu être chargés dans le store, erreur " + favResponse.status
			);
		}
	}
	// ********************************

	// getting information about the recipe
	const { slug } = params;

	const favorites = get(favoritesTab);
	const isAlreadyFavorite = favorites ? favorites.includes(slug) : false;

	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes/${slug}`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});

	if (response.status == 404) {
		error(404, `Recette ${slug} introuvable.`);
	}

	if (!response.ok) {
		error(response.status, 'Une erreur est survenue lors de la récupération des favoris.');
	}

	const data = await response.json();

	return {
		recipe: data,
		isAlreadyFavorite: isAlreadyFavorite
	};

};

export const actions = {
	// add a favorite
	addFavorite: async ({ request, cookies }) => {
		const formData = await request.formData();
		const recipeID = formData.get('recipeID');
		console.log('Adding ' + recipeID + ' to favorites ...');
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await fetch(
			`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json, application/xml',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('token')}`
				}
			}
		);
		if (response.ok) {
			console.log('Adding ' + recipeID + ' to favorites succeded');
			addFavorite(String(recipeID));
			return { success: true, action: 'addFavorite', isFavorite: true };
		} else {
			console.log('Adding ' + recipeID + ' to favorites failed : ' + response.status);
			return { success: false, action: 'addFavorite', isFavorite: false };
		}
	},

	// remove a favorite
	deleteFavorite: async ({ request, cookies }) => {
		const formData = await request.formData();
		const recipeID = formData.get('recipeID');
		console.log('Removing ' + recipeID + ' from favorites ...');
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await fetch(
			`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
			{
				method: 'DELETE',
				headers: {
					Accept: 'application/json, application/xml',
					Authorization: `Bearer ${cookies.get('token')}`
				}
			}
		);

		if (response.ok) {
			console.log('Removing ' + recipeID + ' from favorites succeeded');
			removeFavorite(String(recipeID));
			return { success: true, action: 'deleteFavorite', isFavorite: false };
		} else {
			console.log('Removing ' + recipeID + ' from favorites failed : ' + response.status);
			return { success: false, action: 'deleteFavorite', isFavorite: true };
		}
	}
} satisfies Actions;
