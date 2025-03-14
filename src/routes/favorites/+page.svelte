<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import TitleBanner from '$lib/components/TitleBanner.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let { data } = $props();
	
	let recipes: Recipe[] = data?.recipes ?? [];
	const titleData = { title: 'Favoris', subtitle: 'Vos plats favoris !' };
</script>

<TitleBanner {titleData} />

<div class="row">
	{#if recipes && recipes.length > 0}
		{#each recipes as recipe (recipe.id)}
			{#if recipe.published}
				<RecipeCard {recipe} />
			{/if}
		{/each}
	{:else}
		<div class="col-12">
			<p class="text-center fs-4">Vous n'avez pas de favoris enregistrés.</p>
		</div>
	{/if}
</div>
