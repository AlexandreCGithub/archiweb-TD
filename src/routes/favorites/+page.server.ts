import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
		headers: {
			Accept: 'application/json, application/xml',
			Authorization: `Bearer ${cookies.get('token')}`
		}
	});

	if (response.status == 401) {
		return fail(401, { success: false, message: 'You are not connected' });
	}

	const data = await response.json();
	return {
		recipes: data.map((item: { recipe: Recipe }) => item.recipe)
	};
};
