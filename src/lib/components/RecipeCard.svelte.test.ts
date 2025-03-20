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

	test('affiche correctement le nom de la recette', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByText(recipe.name)).toBeInTheDocument();
	});

	test('affiche correctement l\'image de la recette', () => {
		render(RecipeCard, { props: { recipe } });

		expect(screen.getByAltText(recipe.name)).toHaveAttribute('src', recipe.image_url);
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