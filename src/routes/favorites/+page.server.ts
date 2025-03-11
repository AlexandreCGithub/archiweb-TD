import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
		headers: {
			Accept: 'application/json, application/xml',
			Authorization: `Bearer ${cookies.get('token')}`
		}
	});

	if (response.status == 401) {
		error(401, 'Vous devez être connecté pour voir vos favoris.');
	}

	if (!response.ok) {
		error(response.status, 'Une erreur est survenue lors de la récupération des favoris.');
	}

	const data = await response.json();
	return data ? {
		recipes: data.map((item: { recipe: Recipe }) => item.recipe)
	} : null;
};
