import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes/${slug}`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	const data = await response.json();
	return {
		recipe: data
	};
};
