import type { PageServerLoad } from './$types';
import type { Recipe } from '$lib/types/Recipe';

export const load: PageServerLoad = async ({cookies}) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
		headers: {
			Accept: 'application/json, application/xml',
			Authorization: `Bearer ${cookies.get("token")}`
		}
	});
	const data = await response.json();
	return {
		recipes: data.map((item: { recipe: Recipe }) => item.recipe)
	};
};
