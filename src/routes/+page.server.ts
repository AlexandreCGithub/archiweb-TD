import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';
import { getRecipes, postLogin } from '$lib/api';

export const load: PageServerLoad = async () => {
	const response = await getRecipes(); // get all the recipes using the API

	if (!response.ok) {
		return fail(500, { success: false, message: 'Something has gone wrong!' });
	}

	const data = await response.json();

	return {
		recipes: data // return them directly
	};
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, {
				username,
				password,
				missing: true,
				success: false,
				message: 'Both fields are required.'
			});
		}

		const response = await postLogin(username as string, password as string); //  try to login using the API
		let apiToken: string;
		if (!response.ok) {
			return fail(401, {
				username,
				password,
				success: false,
				message: 'Something has gone wrong!'
			});
		} else {
			const responseData = await response.json();
			apiToken = responseData.token; // get the token if successful
			await cookies.set('token', apiToken, {
				path: '/',
				maxAge: 60 * 15,
				httpOnly: true,
				sameSite: 'strict'
			});
		}
		return { success: true, token: apiToken };
	},

	logout: async ({ cookies }) => {
		await cookies.delete('token', { path: '/' }); // delete the token
		return { success: true };
	}
} satisfies Actions;
