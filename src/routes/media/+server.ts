import sharp from 'sharp';
import { Buffer } from 'buffer';

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

	const abuffer = await response.arrayBuffer();
	const buffer = Buffer.from(new Uint8Array(abuffer));
	const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

	const blob = new Blob([webpBuffer]);
	const stream = blob.stream();
	console.log(stream);
	return new Response(stream, {
		headers: {
			'content-type': 'image/webp',
			'cache-control': 'max-age=86400'
		}
	});
}
