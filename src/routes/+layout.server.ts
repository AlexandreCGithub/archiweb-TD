import type { PageServerLoad } from './$types';
import type { Cookies } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }: { cookies: Cookies }) => {
	const token = cookies.get('token'); // getting the token

	if (!token) {
		return {
			token: null
		};
	} else {
		return {
			token: token
		};
	}
};
