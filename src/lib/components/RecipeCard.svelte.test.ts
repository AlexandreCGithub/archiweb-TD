import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import RecipeCard from '$lib/components/RecipeCard.svelte';

describe('RecipeCard Component', () => {
	const recipe = {
		id: 1,
		name: 'Spaghetti Bolognese',
		description: 'A classic Italian dish with rich flavors and hearty meat sauce.',
		image_url: 'https://example.com/spaghetti.jpg',
		when_to_eat: 'Dinner',
		prep_time: 30,
		cook_time: 45
	};

	test('affiche correctement les informations de la recette', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByText(recipe.name)).toBeInTheDocument();

		expect(screen.getByAltText(recipe.name)).toHaveAttribute('src', recipe.image_url);
	});
});
