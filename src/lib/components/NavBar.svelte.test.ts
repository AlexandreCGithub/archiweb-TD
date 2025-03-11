import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import NavBar from './NavBar.svelte';

describe('NavBar Component', () => {
	test('affiche le lien Home', () => {
		render(NavBar);

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

	test('affiche le bouton Sign-up', () => {
		render(NavBar);

		// Vérifie que le bouton "Sign-up" est bien affiché
		const signupButton = screen.getByText('Sign-up');
		expect(signupButton).toBeInTheDocument();
	});
});
