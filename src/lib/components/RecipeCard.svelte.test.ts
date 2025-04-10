import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RecipeCard from '$lib/components/RecipeCard.svelte';

beforeEach(() => {
	vi.stubGlobal(
		'fetch',
		vi.fn(async () => ({
			ok: true,
			headers: new Headers({ 'Content-Type': 'image/jpeg' }),
			blob: async () => new Blob(['fake image data'], { type: 'image/jpeg' }),
			text: async () => 'https://example.com/fallback.jpg'
		}))
	);

	vi.stubGlobal('URL', {
		...globalThis.URL,
		createObjectURL: vi.fn().mockImplementation(() => 'mocked-object-url')
	});
});

describe('RecipeCard Component', () => {
	const recipe = {
		id: "1",
		name: 'Spaghetti Bolognese',
		description: 'A classic Italian dish with rich flavors and hearty meat sauce.',
		image_url:
			'https://www.croquonslavie.fr/sites/default/files/srh_recipes/786c9164177d449db9ac600b253d7956.jpeg',
		when_to_eat: 'Dinner',
		prep_time: 30,
		cook_time: 45,
		createdAt: '2023-10-01T12:00:00Z',
		instructions: 'Cook pasta, prepare sauce, mix together, and serve.',
		category: 'Main Course',
		published: true,
		created_by: 'Chef John',
		updatedAt: '2023-10-02T12:00:00Z',
		ingredients: ['pasta', 'ground beef', 'tomato sauce', 'onions', 'garlic'],
		tags: ['Italian', 'Dinner', 'Pasta'],
		calories: 600,
		cost: 15.99,
		servings: 4,
		disclaimer: 'Nutritional values are approximate.'
	};

	test('affiche correctement le nom de la recette', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByText(recipe.name)).toBeInTheDocument();
	});

	test("affiche correctement l'image de la recette", () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByAltText(recipe.name)).toHaveAttribute('alt', recipe.name);
	});

	test('affiche correctement la description de la recette', () => {
		render(RecipeCard, { props: { recipe } });

		const description = screen.getByText(recipe.description.slice(0, 30) + '...');
		expect(description).toBeInTheDocument();
	});

	test('affiche correctement le badge when_to_eat', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByText(recipe.when_to_eat)).toBeInTheDocument();
	});

	test('affiche le bouton Voir la recette', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByText('Voir la recette')).toBeInTheDocument();
	});
});
