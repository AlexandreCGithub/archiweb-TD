import { describe, test, expect, vi, beforeEach } from 'vitest';
import { transformImage } from './media';

globalThis.fetch = vi.fn();

beforeEach(() => {
	vi.clearAllMocks();
});

describe('transformImage', () => {
	test('returns placeholder response when fetch fails', async () => {
		(globalThis.fetch as vi.Mock).mockResolvedValueOnce({
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
