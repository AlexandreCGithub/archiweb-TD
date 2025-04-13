import { transformImage } from '$lib/api/media';
import { error } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
	try {
		// Extract the full URL and decode the image source URL
		const fullUrl = url.toString();
		const imageUrl = decodeURIComponent(fullUrl).split('/media?src=')[1].split('&formaTwidth=')[0];

		// Parse width and height from the query parameters
		const width = parseInt(
			decodeURIComponent(fullUrl).split('&formaTwidth=')[1].split('&formaTheight=')[0],
			10
		);
		const height = parseInt(decodeURIComponent(fullUrl).split('&formaTheight=')[1]);

		// Validate width and height to ensure they are within acceptable bounds
		if (isNaN(width) || isNaN(height) || width < 0 || height < 0 || width > 2000 || height > 2000) {
			throw error(400, 'Invalid width/height');
		}

		// Transform the image with the given parameters
		return await transformImage({ fullUrl, imageUrl, width, height });
	} catch (e) {
		// Handle errors and return a 500 status with the error message
		return error(500, (e as Error).message);
	}
}
