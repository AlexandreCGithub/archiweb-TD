import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MainPage from '$lib/components/MainPage.svelte';

describe('MainPage - Texte Favoris', () => {
	test('affiche le titre et le sous-titre correctement', () => {
		const title = 'Favoris';
		const subtitle = 'Vos plats favoris !';

		// Rendu du composant avec les props appropriées
		render(MainPage, { props: { title, subtitle, dataRecipes: [], isPageFavorite: true } });

		// Vérifier que le titre est présent
		expect(screen.getByText(title)).toBeInTheDocument();

		// Vérifier que le sous-titre est présent
		expect(screen.getByText(subtitle)).toBeInTheDocument();
	});
});
