export async function GET({ url }) {
	let imageUrl = '';
	if (url.toString().length > 0) {
		imageUrl = url.search.substring(url.search.indexOf('?src=') + 5);
	}
	const response = await fetch(imageUrl);

	if (!response.ok) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
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