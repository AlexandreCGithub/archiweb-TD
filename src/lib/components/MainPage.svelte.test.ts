import { render, screen, fireEvent } from '@testing-library/svelte';
import MainPage from './MainPage.svelte';
import { describe, expect, test, vi } from 'vitest';

// Mock des props
const mockProps = {
	pageTitle: 'Test Page Title',
	title: 'Test Title',
	subtitle: 'Test Subtitle',
	dataRecipes: [], // Aucune recette
	isPageFavorite: false
};

describe('MainPage', () => {
	test('it should display a message when no recipes are present', async () => {
		render(MainPage, {
			props: mockProps
		});

		const noRecipesMessage = screen.getByText("Aucune recette n'est présente sur le site.");
		expect(noRecipesMessage).toBeInTheDocument();
	});

	test('it should display a message when no favorites are saved', async () => {
		const noFavoritesMessage = "Vous n'avez pas de favoris enregistrés.";
		render(MainPage, {
			props: {
				...mockProps,
				isPageFavorite: true
			}
		});

		const favoritesMessage = screen.getByText(noFavoritesMessage);
		expect(favoritesMessage).toBeInTheDocument();
	});
});
