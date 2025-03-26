import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

const mockRecipes = [
	{
		id: '1',
		createdAt: '2024-01-01',
		name: 'Test Recipe 1',
		description: 'A delicious test recipe.',
		instructions: 'Step 1 - Step 2 - Step 3',
		category: 'Dessert',
		published: true,
		created_by: 'Chef Tester',
		calories: 250,
		cost: 10,
		prep_time: 15,
		cook_time: 30,
		servings: 4,
		image_url:
			'https://www.croquonslavie.fr/sites/default/files/srh_recipes/786c9164177d449db9ac600b253d7956.jpeg',
		disclaimer: 'Test disclaimer.',
		when_to_eat: 'breakfast'
	},
	{
		id: '2',
		createdAt: '2024-01-02',
		name: 'Test Recipe 2',
		description: 'Another great recipe.',
		instructions: 'Step A - Step B - Step C',
		category: 'Lunch',
		published: false,
		created_by: 'Chef Hidden',
		calories: 300,
		cost: 15,
		prep_time: 20,
		cook_time: 40,
		servings: 2,
		image_url:
			'https://www.croquonslavie.fr/sites/default/files/srh_recipes/786c9164177d449db9ac600b253d7956.jpeg',
		disclaimer: 'Hidden disclaimer.',
		when_to_eat: 'lunch'
	}
];
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
describe('/+page.svelte', () => {
	test('renders the page header correctly', () => {
		render(Page, {
			data: { token: null, data: undefined, status: undefined, recipes: mockRecipes }
		});
		expect(screen.getByText('Marmitron')).toBeInTheDocument();
		expect(screen.getByText('Découvrez nos recettes')).toBeInTheDocument();
	});

	test('renders only published recipes', () => {
		render(Page, {
			data: { token: null, data: undefined, status: undefined, recipes: mockRecipes }
		});
		expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
		expect(screen.queryByText('Test Recipe 2')).not.toBeInTheDocument();
	});

	test('displays correct recipe details', () => {
		render(Page, {
			data: { token: null, data: undefined, status: undefined, recipes: mockRecipes }
		});
		expect(screen.getByText('Test Recipe 1')).toBeInTheDocument();
		expect(screen.getByText('A delicious test recipe.')).toBeInTheDocument();
		expect(screen.getByText(/Preparation/i)).toBeInTheDocument();
		expect(screen.getByText(/15 min/i)).toBeInTheDocument();
		expect(screen.getByText(/Cuisson/i)).toBeInTheDocument();
		expect(screen.getByText(/30 min/i)).toBeInTheDocument();
	});
});
