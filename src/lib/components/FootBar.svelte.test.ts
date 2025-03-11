import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import FootBar from './FootBar.svelte';

describe('FootBar Component', () => {
	test('displays the correct text content', () => {
		render(FootBar);
		expect(screen.getByText('Site by Chi Team.')).toBeInTheDocument();
		expect(screen.getByText('Contact')).toBeInTheDocument();
		expect(screen.getByText('Legal mentions')).toBeInTheDocument();
	});
});
