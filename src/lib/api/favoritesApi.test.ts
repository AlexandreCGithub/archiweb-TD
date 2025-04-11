import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getMyFavorites, postFavorite, deleteFavorite } from './favoritesApi';

globalThis.fetch = vi.fn();

const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockFetch.mockReset();
});

describe('API utility functions', () => {
	const token = 'test-token';
	const username = 'john';
	const recipeID = 'abc123';

	test('getMyFavorites sends request with correct headers', async () => {
		const mockData = [
			{
				recipe: {
					id: 'abc123',
					name: 'Pizza',
					calories: 400,
					category: 'Main Dish',
					cook_time: 30,
					cost: 12,
					created_at: '2022-04-10T12:00:00Z',
					created_by: 'john',
					description: 'A delicious pizza',
					disclaimer: '',
					image_url: 'http://example.com/pizza.jpg',
					instructions: 'Bake it.',
					prep_time: 10,
					published: true,
					servings: 2,
					when_to_eat: 'Dinner'
				}
			}
		];
		mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(mockData), { status: 200 }));

		const res = await getMyFavorites(token);
		const data = await res.json();

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			'https://gourmet.cours.quimerch.com/favorites',
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: `Bearer ${token}`
				})
			})
		);
		expect(data).toEqual(mockData);
	});

	test('postFavorite sends POST with correct URL and headers', async () => {
		mockFetch.mockResolvedValueOnce(new Response(null, { status: 201 }));

		const res = await postFavorite(username, recipeID, token);

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			`https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipeID}`,
			expect.objectContaining({
				method: 'POST',
				headers: expect.objectContaining({
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				})
			})
		);
		expect(res.status).toBe(201);
	});

	test('deleteFavorite sends DELETE with correct URL and headers', async () => {
		mockFetch.mockResolvedValueOnce(new Response(null, { status: 204 }));

		const res = await deleteFavorite(username, recipeID, token);

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			`https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipeID}`,
			expect.objectContaining({
				method: 'DELETE',
				headers: expect.objectContaining({
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				})
			})
		);
		expect(res.status).toBe(204);
	});
});
