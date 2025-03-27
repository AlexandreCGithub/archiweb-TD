import { error } from '@sveltejs/kit';
import sharp from 'sharp';
import { Buffer } from 'buffer';

export async function GET({ url }) {
	const imageUrl = decodeURIComponent(url.toString())
		.split('/media?src=')[1]
		.split('&formaTwidth=')[0];
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
	const response = await fetch(imageUrl);
	if (!response.ok) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'must-revalidate, public, max-age=3600'
			}
		});
	}
	if (!response.body) {
		return new Response(imageUrl, {
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'must-revalidate, public, max-age=3600'
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
