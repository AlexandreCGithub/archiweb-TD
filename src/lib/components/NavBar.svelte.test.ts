import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NavBar from './NavBar.svelte';

describe('NavBar Component', () => {
	test('Display link to home', () => {
		render(NavBar, { data: { token: null, data: undefined, status: undefined } });

		// Vérifie que le lien "Accueil" est bien affiché
		const homeLink = screen.getByText('Accueil');
		expect(homeLink).toBeInTheDocument();
	});

	test('Display button to connect', () => {
		render(NavBar);

		// Vérifie que le bouton "Se connecter" est bien affiché
		const loginButton = screen.getByText('Se connecter');
		expect(loginButton).toBeInTheDocument();
	});
});
