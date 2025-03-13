<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { searchValue } from '$lib/stores/search';
	import TitleBanner from '$lib/components/TitleBanner.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let { data } = $props();
	let recipes: Recipe[] = data.recipes;

	function removeAccents(str: string): string {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	let filteredRecipes: Recipe[] = $state([]);

	$effect(() => {
		filteredRecipes = recipes.filter((recipe) =>
			removeAccents(recipe.name.toLowerCase()).includes(removeAccents($searchValue.toLowerCase()))
		);
	});
	const titleData = { title: 'Marmitron', subtitle: 'Découvrez nos recettes' };
</script>

<TitleBanner {titleData} />

<div class="row">
	{#each filteredRecipes as recipe (recipe.id)}
		{#if recipe.published}
			<RecipeCard {recipe} />
		{/if}
	{/each}
</div>
