import { describe, test, expect, beforeEach, vi } from 'vitest';
import { postLogin } from './loginApi';

globalThis.fetch = vi.fn();
const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockFetch.mockReset();
});

describe('postLogin', () => {
	const username = 'john';
	const password = 'secret123';

	test('sends POST request with correct body and headers', async () => {
		const mockToken = { token: 'jwt-token' };

		mockFetch.mockResolvedValueOnce(
			new Response(JSON.stringify(mockToken), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const res = await postLogin(username, password);
		const data = await res.json();

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			'https://gourmet.cours.quimerch.com/login',
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({
					Accept: 'application/json, application/xml',
					'Content-Type': '*/*'
				}),
				body: JSON.stringify({ username, password })
			})
		);

		expect(res.status).toBe(200);
		expect(data).toEqual(mockToken);
	});

	test('handles login failure (401)', async () => {
		mockFetch.mockResolvedValueOnce(
			new Response(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const res = await postLogin(username, 'wrongpassword');
		const data = await res.json();

		expect(res.status).toBe(401);
		expect(data.message).toBe('Unauthorized');
	});
});
