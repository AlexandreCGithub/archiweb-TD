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

const parseJwt = (token: string | undefined) => {
	if (token == undefined) return undefined;
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return e;
	}
};

// To determine if the specific recipe on this page is already a favorite, we use a store
// It is populated if the current store is null

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userPseudo = parseJwt(cookies.get('token'))?.iss;
	if (!userPseudo) {
		resetFavorites(); // if no pseudo : empty the store
	}

	if (get(favoritesTab) == null && userPseudo) {
		// if empty store and pseudo : fill the store with its curent favorites (storing only he ids)
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

	const favorites = get(favoritesTab); // getting the favorites id from the store
	const isAlreadyFavorite = favorites ? favorites.includes(slug) : false; // determine if the recipe is already a favorite using the store

	const response = await getRecipe(slug); // get the specific recipe of this page

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
