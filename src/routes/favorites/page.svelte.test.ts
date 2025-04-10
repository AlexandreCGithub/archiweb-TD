import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MainPage from '$lib/components/MainPage.svelte';

describe('MainPage - Texte Favoris', () => {
	test('display title and subtitle correctly', () => {
		const title = 'Favoris';
		const subtitle = 'Vos plats favoris !';
		const pageTitle = 'Favoris';
		// Rendu du composant avec les props appropriées
		render(MainPage, {
			props: { pageTitle, title, subtitle, dataRecipes: [], isPageFavorite: true }
		});

		// Vérifier que le titre est présent
		expect(screen.getByText(title)).toBeInTheDocument();

		// Vérifier que le sous-titre est présent
		expect(screen.getByText(subtitle)).toBeInTheDocument();
	});
});
