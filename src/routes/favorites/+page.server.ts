import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';

export const load: PageServerLoad = async () => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/users/chi/favorites`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	const data = await response.json();
	return {
		recipes: data.map((item: { recipe: Recipe }) => item.recipe)
	};
};
