import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://gourmet.cours.quimerch.com/recipes', {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	const data = await response.json();
	return {
		recipes: data
	};
};
