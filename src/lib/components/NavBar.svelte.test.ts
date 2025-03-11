import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NavBar from './NavBar.svelte';

describe('NavBar Component', () => {
	test('affiche le lien Accueil', () => {
		render(NavBar, { data: { token: null, data: undefined, status: undefined } });

		// Vérifie que le lien "Accueil" est bien affiché
		const homeLink = screen.getByText('Accueil');
		expect(homeLink).toBeInTheDocument();
	});

	test('affiche le bouton Se connecter', () => {
		render(NavBar);

		// Vérifie que le bouton "Se connecter" est bien affiché
		const loginButton = screen.getByText('Se connecter');
		expect(loginButton).toBeInTheDocument();
	});
});
