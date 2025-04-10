import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import TitleBanner from '$lib/components/TitleBanner.svelte';
import homeImg from '$lib/images/home.webp';

describe('TitleBanner Component', () => {
	test('affiche correctement le titre et le sous-titre', () => {
		const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };

		render(TitleBanner, { props: { titleData } });

		expect(screen.getByText(titleData.title)).toBeInTheDocument();
		expect(screen.getByText(titleData.subtitle)).toBeInTheDocument();
	});

	test('Mouvement quand hover', async () => {
		const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };
		const { container } = render(TitleBanner, { props: { titleData } });

		const div = container.querySelector('div');

		expect(div).not.toBeNull();
		expect(div).toHaveStyle('transform: scale(1)');
		if (div) {
			await fireEvent.mouseEnter(div);
			expect(div).toHaveStyle('transform: scale(1.01)');

			await fireEvent.mouseLeave(div);
			expect(div).toHaveStyle('transform: scale(1)');
		}
	});

	test('Affichage du fond', () => {
		const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };
		const { container } = render(TitleBanner, { props: { titleData } });

		const div = container.querySelector('div');
		expect(div).toHaveStyle(`background: url('${homeImg}') center/cover no-repeat`);
	});

	test('Les titres ont la classe fix-white-color', () => {
		const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };
		const { container } = render(TitleBanner, { props: { titleData } });

		const h1 = container.querySelector('h1');
		const h2 = container.querySelector('h2');

		expect(h1).toHaveClass('fix-white-color');
		expect(h2).toHaveClass('fix-white-color');
	});
});
