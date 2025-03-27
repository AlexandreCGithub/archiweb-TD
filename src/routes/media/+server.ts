import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { Buffer } from 'buffer';

export async function GET({ url }) {
	const imageUrl = decodeURIComponent(url.toString()).split('/media?src=')[1];

	const response = await fetch(imageUrl);
	if (!response.ok) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}
	if (!response.body) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}
	try {
		const abuffer = await response.arrayBuffer();
		const buffer = await Buffer.from(new Uint8Array(abuffer));

		const webpBuffer = await sharp(buffer.buffer).resize(500, 200).webp({ quality: 80 }).toBuffer();
		const blob = new Blob([webpBuffer]);
		const stream = blob.stream();

		return new Response(stream, {
			headers: {
				'Content-Type': 'image/webp',
				'Cache-Control': 'must-revalidate, public, max-age=3600'
			}
		});
	} catch (e) {
		return error(500, (e as Error).message);
	}
}
