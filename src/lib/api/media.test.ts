import { describe, test, expect, vi, beforeEach } from 'vitest';
import { transformImage } from './media';
import { ReadableStream } from 'web-streams-polyfill/ponyfill/es6';

globalThis.fetch = vi.fn();
globalThis.Blob = vi.fn().mockImplementation((content) => ({
	stream: () => new ReadableStream()
}));

beforeEach(() => {
	vi.clearAllMocks();
});

const sampleBuffer = new Uint8Array([1, 2, 3, 4]);

describe('transformImage', () => {
	test('returns placeholder response when fetch fails', async () => {
		(fetch as any).mockResolvedValueOnce({
			ok: false,
			body: null
		});

		const res = await transformImage({
			fullUrl: 'https://localhost/image.jpg',
			imageUrl: 'https://localhost/image.jpg',
			width: 100,
			height: 100
		});

		expect(res.headers.get('Cache-Control')).toBe('must-revalidate, public, max-age=86400');
		expect(await res.text()).toBe('https://localhost/image.jpg');
	});
});
