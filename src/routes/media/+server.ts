import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	const imageUrl = url.searchParams.get('src');
	if (!imageUrl) throw error(400, 'Missing image URL');

	const response = await fetch(imageUrl);
	if (!response.ok) throw error(500, 'Error fetching image');

	return new Response(response.body, {
		headers: {
			'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
			'Cache-Control': 'max-age=86400'
		}
	});
}
