<script lang="ts">
	// Imports types
	import type { Recipe } from '$lib/types/Recipe';
	// Imports stores
	import searchValue from '$lib/stores/search';
	// Imports components
	import TitleBanner from '$lib/components/TitleBanner.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	// Imports functions
	import { removeAccents } from '$lib/utils/removeAccents';

	// Props, dynamic variables and states
	let {
		pageTitle,
		title,
		subtitle,
		dataRecipes,
		isPageFavorite
	}: {
		pageTitle: string;
		title: string;
		subtitle: string;
		dataRecipes: Recipe[];
		isPageFavorite: boolean;
	} = $props();
	let filteredRecipes: Recipe[] = $state([]);

	// Constants
	const recipes: Recipe[] = dataRecipes;
	const titleData: { title: string; subtitle: string } = { title: title, subtitle: subtitle };

	// Reactive variables
	$effect(() => {
		filteredRecipes = recipes.filter((recipe) =>
			removeAccents(recipe.name.toLowerCase()).includes(removeAccents($searchValue.toLowerCase()))
		);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<TitleBanner {titleData} />

<div class="row">
	{#if recipes && recipes.length > 0}
		{#if filteredRecipes && filteredRecipes.length > 0}
			{#each filteredRecipes as recipe (recipe.id)}
				{#if recipe.published}
					<RecipeCard {recipe} />
				{/if}
			{/each}
		{:else}
			<div class="col-12">
				<p class="text-center">Aucune recette ne correspond à votre recherche.</p>
			</div>
		{/if}
	{:else if isPageFavorite}
		<div class="col-12">
			<p class="text-center">Vous n'avez pas de favoris enregistrés.</p>
		</div>
	{:else}
		<div class="col-12">
			<p class="text-center">Aucune recette n'est présente sur le site.</p>
		</div>
	{/if}
</div>
