import { writable } from 'svelte/store';
// store for storing which recipes as favorites
// so that we already know when going to a recipe page if it is favorite or not
export const favoritesTab = writable<string[] | null>(null); //if not loaded: null , if no favorite : empty array

// add a favorite to the store
export function addFavoriteToStore(str: string) {
	favoritesTab.update((favorites) => {
		if (favorites === null) {
			return [str];
		}
		return [...favorites, str];
	});
}

// remove a favorite from the store
export function removeFavoriteFromStore(str: string) {
	favoritesTab.update((favorites) => {
		if (favorites === null) {
			return null;
		}
		return favorites.filter((favorite) => favorite !== str);
	});
}

// reset the store to null (useful when logging out)
export function resetFavorites() {
	favoritesTab.set(null);
}
