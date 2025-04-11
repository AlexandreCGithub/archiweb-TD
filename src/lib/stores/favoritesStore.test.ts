import { get } from 'svelte/store';
import { describe, test, expect, beforeEach } from 'vitest';
import {
	favoritesTab,
	addFavoriteToStore,
	removeFavoriteFromStore,
	resetFavorites
} from './favoritesStore';

describe('favoritesTab store', () => {
	beforeEach(() => {
		resetFavorites();
	});

	test('initially null', () => {
		expect(get(favoritesTab)).toBeNull();
	});

	test('adds a favorite when store is null', () => {
		addFavoriteToStore('recipe-1');
		expect(get(favoritesTab)).toEqual(['recipe-1']);
	});

	test('adds multiple favorites', () => {
		addFavoriteToStore('recipe-1');
		addFavoriteToStore('recipe-2');
		expect(get(favoritesTab)).toEqual(['recipe-1', 'recipe-2']);
	});

	test('removes an existing favorite', () => {
		addFavoriteToStore('recipe-1');
		addFavoriteToStore('recipe-2');
		removeFavoriteFromStore('recipe-1');
		expect(get(favoritesTab)).toEqual(['recipe-2']);
	});

	test('removing a non-existent favorite does nothing', () => {
		addFavoriteToStore('recipe-1');
		removeFavoriteFromStore('non-existent-recipe');
		expect(get(favoritesTab)).toEqual(['recipe-1']);
	});

	test('resetFavorites sets store to null', () => {
		addFavoriteToStore('recipe-1');
		resetFavorites();
		expect(get(favoritesTab)).toBeNull();
	});
});
