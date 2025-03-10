import type { PageServerLoad } from './$types';

interface Recipe {
	id: string;
	createdAt: string;
	name: string;
	description: string;
	instructions: string;
	category: string;
	published: boolean;
	created_by: string;
	calories: number;
	cost: number;
	prep_time: number;
	cook_time: number;
	servings: number;
	image_url: string;
	disclaimer: string;
	when_to_eat: string;
}

// I'm obliged to define the interface here too as I need a map, because the data given by the api has a different structure

export const load: PageServerLoad = async ({ params }) => {
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