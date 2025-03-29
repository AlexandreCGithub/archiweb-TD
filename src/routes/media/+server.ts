import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { Buffer } from 'buffer';

export async function GET({ url }) {
	// Extract image URL from query parameters
	const imageUrl = decodeURIComponent(url.toString())
		.split('/media?src=')[1]
		.split('&formaTwidth=')[0];

	// Define allowed domains for security reasons
	const allowedDomains = ['localhost', 'chi.cours.quimerch.com'];
	const urlObj = new URL(url);
	if (!allowedDomains.includes(urlObj.hostname)) {
		return error(403, 'Forbidden: Domain not allowed');
	}
	if (!['http:', 'https:'].includes(urlObj.protocol)) {
		return error(400, 'Invalid URL scheme');
	}

	// Extract width and height from URL, ensuring they are valid numbers
	let width;
	let height;
	try {
		width = parseInt(
			decodeURIComponent(url.toString()).split('&formaTwidth=')[1].split('&formaTheight=')[0],
			10
		);
		height = parseInt(decodeURIComponent(url.toString()).split('&formaTheight=')[1]);
	} catch {
		width = 0;
		height = 0;
	}
	if (isNaN(width) || isNaN(height) || width < 0 || height < 0 || width > 2000 || height > 2000) {
		return error(400, 'Invalid width/height');
	}

	// Fetch the original image
	const response = await fetch(imageUrl);
	if (!response.ok) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'must-revalidate, public, max-age=86400'
			}
		});
	}

	// Check if the image format is allowed
	const allowedMimeTypes = [
		'image/jpeg',
		'image/png',
		'image/webp',
		'image/bmp',
		'image/gif',
		'image/apng',
		'image/avif',
		'image/svg+xml',
		'image/tiff',
		'image/ico'
	];

	const contentType = response.headers.get('content-type') || '';
	if (!allowedMimeTypes.some((type) => contentType.includes(type))) {
		return error(415, 'Unsupported media type');
	}
	if (!response.body) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'must-revalidate, public, max-age=86400'
			}
		});
	}
	try {
		const abuffer = await response.arrayBuffer();
		const buffer = await Buffer.from(new Uint8Array(abuffer));
		let webpBuffer;
		if (width === 0 || height === 0) {
			webpBuffer = await sharp(buffer.buffer).webp({ quality: 80 }).toBuffer();
		} else {
			webpBuffer = await sharp(buffer.buffer)
				.resize(width, height)
				.webp({ quality: 80 })
				.toBuffer();
		}

		// Return the processed image as a stream
		const blob = new Blob([webpBuffer]);
		const stream = blob.stream();

		return new Response(stream, {
			headers: {
				'Content-Type': 'image/webp',
				'Cache-Control': 'must-revalidate, public, max-age=86400'
			}
		});
	} catch (e) {
		return error(500, (e as Error).message);
	}
}
