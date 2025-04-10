import { transformImage } from '$lib/api/media';
import { error } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
	try {
		const fullUrl = url.toString();
		const imageUrl = decodeURIComponent(fullUrl).split('/media?src=')[1].split('&formaTwidth=')[0];
		const width = parseInt(
			decodeURIComponent(fullUrl).split('&formaTwidth=')[1].split('&formaTheight=')[0],
			10
		);
		const height = parseInt(decodeURIComponent(fullUrl).split('&formaTheight=')[1]);

		if (isNaN(width) || isNaN(height) || width < 0 || height < 0 || width > 2000 || height > 2000) {
			throw error(400, 'Invalid width/height');
		}

		return await transformImage({ fullUrl, imageUrl, width, height });
	} catch (e) {
		return error(500, (e as Error).message);
	}
}
