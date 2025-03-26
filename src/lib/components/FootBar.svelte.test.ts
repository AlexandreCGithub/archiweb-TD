import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import FootBar from './FootBar.svelte';

vi.mock('$env/dynamic/public', () => ({
	env: {
		PUBLIC_VITE_COMMIT_NUMBER: '1.0.0',
		PUBLIC_COMMIT_NUMBER: '123456'
	}
}));

describe('FootBar Component', () => {
	test('Affiche le bon texte sur la FootBar', () => {
		render(FootBar);
		expect(screen.getByText("Site de l'équipe Chi.")).toBeInTheDocument();
		expect(screen.getByText('Version: 1.0.0')).toBeInTheDocument();
		expect(screen.getByText('Version: 123456')).toBeInTheDocument();
	});
});
