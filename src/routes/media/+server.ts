import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	const imageUrl = decodeURIComponent(url.toString()).split('/media?src=')[1];

	try {
		const response = await fetch(imageUrl);
		if (!response.ok) throw error(500, "Erreur lors du fetch de l'image");

		return new Response(response.body, {
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	} catch (err) {
		throw error(500, "Impossible de récupérer l'image, erreur : " + err);
	}
}
