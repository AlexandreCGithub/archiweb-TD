<script lang="ts">
	// Imports types
	import type { Recipe } from '$lib/types/Recipe';
	// Imports Components
	import MainPage from '$lib/components/MainPage.svelte';

	// Props
	let { data } = $props();
	let dataRecipes: Recipe[] = data.recipes;
	let title: string = 'Marmitron';
	let subtitle: string = 'Découvrez nos recettes';
	let isPageFavorite: boolean = false;
	let pageTitle: string = 'Accueil';
</script>

<MainPage {pageTitle} {title} {subtitle} {dataRecipes} {isPageFavorite} />
