import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import FootBar from './FootBar.svelte';

describe('FootBar Component', () => {
	test('Affiche le bon texte sur la FootBar', () => {
		render(FootBar);
		expect(screen.getByText("Site de l'équipe Chi.")).toBeInTheDocument();
	});
});
