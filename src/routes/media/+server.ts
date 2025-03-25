export async function GET({ url }) {
	const imageUrl = url.search.substring(url.search.indexOf('src=') + 4);
	if (!imageUrl) {
		return new Response(imageUrl, {
			status: 200,
			headers: {
				'Cache-Control': 'max-age=86400'
			}
		});
	}

	const response = await fetch(imageUrl);
	if (!response.ok) {
		return new Response(imageUrl, {
			status: 200,
			headers: {
				'Cache-Control': 'max-age=86400'
			}
		});
	}

	return new Response(response.body, {
		headers: {
			'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
			'Cache-Control': 'max-age=86400'
		}
	});
}
