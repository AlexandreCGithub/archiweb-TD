import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { error } from '@sveltejs/kit';
import { getMyFavorites } from '$lib/api';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	const response = await getMyFavorites(token as string); // getting the favorites to display them
	if (response.status == 401) {
		error(401, 'Vous devez être connecté pour voir vos favoris.');
	}

	if (!response.ok) {
		error(response.status, 'Une erreur est survenue lors de la récupération des favoris.');
	}

	const jsonResponse = await response.json();
	if (jsonResponse == null) {
		return {
			recipes: [] as Recipe[] // if no error but null, means no favorite, we give the page an empty array
		};
	}
	return {
		recipes: jsonResponse.map((item: { recipe: Recipe }) => item.recipe) as Recipe[] // we need a map here as we only want an array of recipes and the api response places them with a "recipes:" key
	};
};
