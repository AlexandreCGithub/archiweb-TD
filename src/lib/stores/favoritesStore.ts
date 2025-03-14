import { get, writable } from 'svelte/store';

export const favoritesTab = writable<string[] | null>(null); //si non chargé : null, à distinguer de tableau vide (chargé mais aucun favori)

export function addFavorite(str: string) {
    favoritesTab.update(favorites => {
      if (favorites === null) {
        return [str];
      }
      return [...favorites, str];
    });
  }

  export function removeFavorite(str: string) {
    favoritesTab.update(favorites => {
      if (favorites === null) {
        return null;
      }
      return favorites.filter(favorite => favorite !== str);
    });
  }

  export function resetFavorites()
  {
    favoritesTab.set(null);
  }