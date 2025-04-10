import type { PageServerLoad, Actions } from './$types';
import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import {
	favoritesTab,
	addFavoriteToStore,
	removeFavoriteFromStore,
	resetFavorites
} from '$lib/stores/favoritesStore';
import type { Recipe } from '$lib/types';
import { getMyFavorites, postFavorite, deleteFavorite, getRecipe } from '$lib/api';
import { parseJwt } from '$lib/functions/parseJWT';

// Pour savoir si la recette particulière de cette page est déjà favorite, on utilise un store
// Il est rempli si le store actuel est null

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userPseudo = parseJwt(cookies.get('token'))?.iss;
	if (!userPseudo) {
		resetFavorites();
	}

	if (get(favoritesTab) == null && userPseudo) {
		const favResponse = await getMyFavorites(cookies.get('token') as string);
		if (favResponse.ok) {
			const favJsonResponse = await favResponse.json();
			if (favJsonResponse != null) {
				favoritesTab.set([]);
				favJsonResponse.forEach((item: { recipe: Recipe }) => addFavoriteToStore(item.recipe.id));
			}
		}
	}

	const { slug } = params;
	const favorites = get(favoritesTab);
	const isAlreadyFavorite = favorites ? favorites.includes(slug) : false;

	const response = await getRecipe(slug);

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
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await postFavorite(
			userPseudo,
			recipeID as string,
			cookies.get('token') as string
		);
		if (response.ok) {
			addFavoriteToStore(String(recipeID));
			return { success: true, action: 'addFavorite', isFavorite: true };
		} else {
			return { success: false, action: 'addFavorite', isFavorite: false };
		}
	},

	// remove a favorite
	deleteFavorite: async ({ request, cookies }) => {
		const formData = await request.formData();
		const recipeID = formData.get('recipeID');
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await deleteFavorite(
			userPseudo,
			recipeID as string,
			cookies.get('token') as string
		);

		if (response.ok) {
			removeFavoriteFromStore(String(recipeID));
			return { success: true, action: 'deleteFavorite', isFavorite: false };
		} else {
			return { success: false, action: 'deleteFavorite', isFavorite: true };
		}
	}
} satisfies Actions;
