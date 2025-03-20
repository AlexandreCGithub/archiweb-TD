import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { error } from '@sveltejs/kit';
import { getMyFavorites } from '$lib/api';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	const response = await getMyFavorites(token as string);
	if (response.status == 401) {
		error(401, 'Vous devez être connecté pour voir vos favoris.');
	}

	if (!response.ok) {
		error(response.status, 'Une erreur est survenue lors de la récupération des favoris.');
	}

	const jsonResponse = await response.json();
	if (jsonResponse == null) {
		return {
			recipes: [] as Recipe[]
		};
	}
	return {
		recipes: jsonResponse.map((item: { recipe: Recipe }) => item.recipe) as Recipe[]
	};
};
