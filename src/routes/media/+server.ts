export async function GET({ url }) {
	const imageUrl = url.search.substring(url.search.indexOf('src=') + 4);
	const response = await fetch(imageUrl);
	const body = await response.arrayBuffer();

	if (!response.ok) {
		return new Response(imageUrl, {
			status: 200,
			headers: {
				'Cache-Control': 'max-age=86400'
			}
		});
	}

	return new Response(body, {
		headers: {
			'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
			'Cache-Control': 'max-age=86400'
		}
	});
}
