import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getRecipe, getRecipes } from './recipesApi';

globalThis.fetch = vi.fn();
const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockFetch.mockReset();
});

describe('getRecipes', () => {
	test('fetches all recipes with correct headers', async () => {
		const mockData = [
			{
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
		];

		mockFetch.mockResolvedValueOnce(
			new Response(JSON.stringify(mockData), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const res = await getRecipes();
		const data = await res.json();

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			'https://gourmet.cours.quimerch.com/recipes',
			expect.objectContaining({
				headers: expect.objectContaining({
					Accept: 'application/json, application/xml'
				})
			})
		);

		expect(res.status).toBe(200);
		expect(data).toEqual(mockData);
	});
});

describe('getRecipe', () => {
	test('fetches recipe by slug with correct headers', async () => {
		const slug = 'tiramisu';
		const mockRecipe = {
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
		};

		mockFetch.mockResolvedValueOnce(
			new Response(JSON.stringify(mockRecipe), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			})
		);

		const res = await getRecipe(slug);
		const data = await res.json();

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(mockFetch).toHaveBeenCalledWith(
			`https://gourmet.cours.quimerch.com/recipes/${slug}`,
			expect.objectContaining({
				headers: expect.objectContaining({
					Accept: 'application/json, application/xml'
				})
			})
		);

		expect(res.status).toBe(200);
		expect(data).toEqual(mockRecipe);
	});
});
