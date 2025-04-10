<script lang="ts">
	// Imports types
	import type { Recipe } from '$lib/types/Recipe';

	// Imports Components
	import MainPage from '$lib/components/MainPage.svelte';

	// Props
	let { data } = $props();

	// Constants
	const dataRecipes: Recipe[] = data?.recipes;
	const title: string = 'Favoris';
	const subtitle: string = 'Vos plats favoris !';
	const isPageFavorite: boolean = true;
	const pageTitle: string = 'Favoris';
</script>

<MainPage {pageTitle} {title} {subtitle} {dataRecipes} {isPageFavorite} />
