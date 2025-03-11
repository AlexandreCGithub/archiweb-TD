import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NavBar from './NavBar.svelte';

describe('NavBar Component', () => {
	test('affiche le lien Home', () => {
		render(NavBar, { data: { token: null, data: undefined, status: undefined } });

		// Vérifie que le lien "Home" est bien affiché
		const homeLink = screen.getByText('Home');
		expect(homeLink).toBeInTheDocument();
	});

	test('affiche le bouton Login', () => {
		render(NavBar);

		// Vérifie que le bouton "Login" est bien affiché
		const loginButton = screen.getByText('Login');
		expect(loginButton).toBeInTheDocument();
	});
});
