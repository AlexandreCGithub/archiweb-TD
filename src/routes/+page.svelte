<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import MainPage from '$lib/components/MainPage.svelte';

	let { data } = $props();
	let dataRecipes: Recipe[] = data.recipes; // all the recipes
	let title = 'Marmitron';
	let subtitle = 'Découvrez nos recettes';
	let isPageFavorite = false;
	let pageTitle = 'Accueil';
</script>

<MainPage {pageTitle} {title} {subtitle} {dataRecipes} {isPageFavorite} />
