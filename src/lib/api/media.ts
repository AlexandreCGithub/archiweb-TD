import sharp from 'sharp';
import { Buffer } from 'buffer';
import { error } from '@sveltejs/kit';

export const allowedMimeTypes = [
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

// function when we need to apply some transformation to the image
export async function transformImage(params: {
	fullUrl: string;
	imageUrl: string;
	width: number;
	height: number;
}) {
	const { fullUrl, imageUrl, width, height } = params;
	const urlObj = new URL(fullUrl);
	const allowedDomains = ['localhost', 'chi.cours.quimerch.com'];

	if (!allowedDomains.includes(urlObj.hostname)) {
		throw error(403, 'Forbidden: Domain not allowed');
	}
	if (!['http:', 'https:'].includes(urlObj.protocol)) {
		throw error(400, 'Invalid URL scheme');
	}

	const response = await fetch(imageUrl);
	if (!response.ok || !response.body) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'must-revalidate, public, max-age=86400'
			}
		});
	}

	const contentType = response.headers.get('content-type') || '';
	if (!allowedMimeTypes.some((type) => contentType.includes(type))) {
		throw error(415, 'Unsupported media type');
	}

	try {
		const abuffer = await response.arrayBuffer();
		const buffer = Buffer.from(new Uint8Array(abuffer));
		let webpBuffer;
		if (width === 0 || height === 0) {
			webpBuffer = await sharp(buffer.buffer).webp({ quality: 80 }).toBuffer();
		} else {
			webpBuffer = await sharp(buffer.buffer)
				.resize(width, height)
				.webp({ quality: 80 })
				.toBuffer();
		}
		const blob = new Blob([webpBuffer]);
		const stream = blob.stream();

		return new Response(stream, {
			headers: {
				'Content-Type': 'image/webp',
				'Cache-Control': 'must-revalidate, public, max-age=86400'
			}
		});
	} catch (e) {
		throw error(500, (e as Error).message);
	}
}
