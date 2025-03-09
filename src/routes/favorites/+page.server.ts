import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/users/chi/favorites`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	const data = await response.json();
	return {
		recipe: data
	};
};

