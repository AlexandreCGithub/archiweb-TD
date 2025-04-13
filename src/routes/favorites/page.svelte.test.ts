import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MainPage from '$lib/components/MainPage.svelte';

describe('MainPage - Texte Favoris', () => {
	test('display title and subtitle correctly', () => {
		const title = 'Favoris';
		const subtitle = 'Vos plats favoris !';
		const pageTitle = 'Favoris';
		// Render the component with the appropriate props
		render(MainPage, {
			props: { pageTitle, title, subtitle, dataRecipes: [], isPageFavorite: true }
		});

		// Verify that the title is present
		expect(screen.getByText(title)).toBeInTheDocument();

		// Verify that the subtitle is present
		expect(screen.getByText(subtitle)).toBeInTheDocument();
	});
});
