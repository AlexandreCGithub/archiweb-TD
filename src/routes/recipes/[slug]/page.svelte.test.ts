import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../../recipes/[slug]/+page.svelte';

const mockRecipe = {
	id: '1',
	createdAt: '2024-01-01',
	name: 'Test Recipe',
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
};

describe('/+page.svelte', () => {
	test('renders the recipe name in the title', () => {
		render(Page, {
			data: { token: null, recipe: mockRecipe },
			form: null
		});
		expect(document.title).toBe(mockRecipe.name);
	});

	test('displays the recipe details correctly', () => {
		render(Page, {
			data: { token: null, recipe: mockRecipe },
			form: null
		});

		expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
		expect(screen.getByText(/by Chef Tester/i)).toBeInTheDocument();
		expect(screen.getByText(/Preparation/i)).toBeInTheDocument();
		expect(screen.getByText(/Cuisson/i)).toBeInTheDocument();
		expect(screen.getByText(/Calories/i)).toBeInTheDocument();

		expect(
			screen.getByText((content) => content.includes(`${mockRecipe.calories} kcal`))
		).toBeInTheDocument();
	});

	test('displays the recipe instructions as a list', () => {
		render(Page, {
			data: { token: null, recipe: mockRecipe },
			form: null
		});
		const instructions = screen.getAllByRole('listitem');
		expect(instructions).toHaveLength(3);
		expect(instructions[0]).toHaveTextContent('Step 1');
		expect(instructions[1]).toHaveTextContent('Step 2');
		expect(instructions[2]).toHaveTextContent('Step 3');
	});
});
