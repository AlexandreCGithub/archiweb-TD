import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith('https://chi.cours.quimerch.com/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('https://chi.cours.quimerch.com/', 'http://localhost:80/'),
			request
		);
	}

	return fetch(request);
};
