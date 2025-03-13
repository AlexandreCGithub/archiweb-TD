import type { PageServerLoad, Actions } from './$types';
import { error } from '@sveltejs/kit';

const parseJwt = (token: string | undefined) => {
	if (token == undefined) return undefined;
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return e;
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes/${slug}`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});

	if (response.status == 404) {
		error(404, `Recette ${slug} introuvable.`);
	}

	if (!response.ok) {
		error(response.status, 'Une erreur est survenue lors de la récupération des favoris.');
	}

	const data = await response.json();
	return {
		recipe: data
	};
};

export const actions = {
	// add a favorite
	addFavorite: async ({ request, cookies }) => {
		const formData = await request.formData();
		const recipeID = formData.get('recipeID');
		console.log('Adding ' + recipeID + ' to favorites ...');
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await fetch(
			`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json, application/xml',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('token')}`
				}
			}
		);
		if (response.ok) {
			console.log('Adding ' + recipeID + ' to favorites succeded');
			return { status: response.status, action: 'addFavorite' };
		} else {
			console.log('Adding ' + recipeID + ' to favorites failed : ' + response.status);
			return { status: response.status, action: 'addFavorite' };
		}
	},

	// remove a favorite
	deleteFavorite: async ({ request, cookies }) => {
		const formData = await request.formData();
		const recipeID = formData.get('recipeID');
		console.log('Removing ' + recipeID + ' from favorites ...');
		const userPseudo = parseJwt(cookies.get('token'))?.iss;
		const response = await fetch(
			`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
			{
				method: 'DELETE',
				headers: {
					Accept: 'application/json, application/xml',
					Authorization: `Bearer ${cookies.get('token')}`
				}
			}
		);

		if (response.ok) {
			console.log('Removing ' + recipeID + ' from favorites succeeded');
			return { status: response.status, action: 'deleteFavorite' };
		} else {
			console.log('Removing ' + recipeID + ' from favorites failed : ' + response.status);
			return { status: response.status, action: 'deleteFavorite' };
		}
	}
} satisfies Actions;
