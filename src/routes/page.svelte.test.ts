import { describe, test, expect } from 'vitest';
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
		image_url: '',
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
		image_url: '',
		disclaimer: 'Hidden disclaimer.',
		when_to_eat: 'lunch'
	}
];

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
