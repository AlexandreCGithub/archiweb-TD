import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TitleBanner from '$lib/components/TitleBanner.svelte';

describe('TitleBanner Component', () => {
	// Test de l'affichage du titre et du sous-titre
	test('affiche correctement le titre et le sous-titre', () => {
		const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };

		render(TitleBanner, { props: { titleData } });

		expect(screen.getByText(titleData.title)).toBeInTheDocument();

		expect(screen.getByText(titleData.subtitle)).toBeInTheDocument();
	});
});
