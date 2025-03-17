import type { PageServerLoad } from './$types';
import { type Actions, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://gourmet.cours.quimerch.com/recipes', {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});

	if (!response.ok) {
		return fail(500, { success: false, message: 'Something has gone wrong!' });
	}

	const data = await response.json();

	return {
		recipes: data
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

		const response = await fetch('https://gourmet.cours.quimerch.com/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json, application/xml',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		});
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
			apiToken = responseData.token;
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
		await cookies.delete('token', { path: '/' });
		return { success: true };
	}
} satisfies Actions;
