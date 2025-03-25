export async function GET({ url }) {
	const imageUrl = url.search.substring(url.search.indexOf('src=') + 4);
	const response = await fetch(imageUrl);

	return new Response(response.body, {
		headers: {
			'Content-Type': 'image/webp',
			'Cache-Control': 'max-age=86400'
		}
	});
}
