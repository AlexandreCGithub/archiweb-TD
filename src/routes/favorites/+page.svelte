<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import MainPage from '$lib/components/MainPage.svelte';

	let { data } = $props();
	let dataRecipes: Recipe[] = data?.recipes; // list of all favorites of logged in user
	let title = 'Favoris';
	let subtitle = 'Vos plats favoris !';
	let isPageFavorite = true;
	let pageTitle = 'Favoris';
</script>

<MainPage {pageTitle} {title} {subtitle} {dataRecipes} {isPageFavorite} />
