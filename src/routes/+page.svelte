<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import MainPage from '$lib/components/MainPage.svelte';

	let { data } = $props();
	let dataRecipes: Recipe[] = data.recipes;
	let title = 'Marmitron';
	let subtitle = 'Découvrez nos recettes';
	let isPageFavorite = false;
</script>

<MainPage {title} {subtitle} {dataRecipes} {isPageFavorite} />
