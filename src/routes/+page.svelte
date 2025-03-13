<script lang="ts">
	import type { Recipe } from '$lib/types/Recipe';
	import { writable } from 'svelte/store';
	import { searchValue } from '$lib/stores/search';

	let { data } = $props();
	let recipes: Recipe[] = data.recipes;

	let transform = writable<Record<string, string>>({});
	let transform_title = $state('scale(1)');

	function removeAccents(str: string): string {
		return str
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}

	let filteredRecipes: Recipe[] = $state([]);

	$effect(() => {
		filteredRecipes = recipes.filter((recipe) =>
			removeAccents(recipe.name.toLowerCase()).includes(removeAccents($searchValue.toLowerCase()))
		);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="p-5 text-center bg-body-tertiary rounded-2 my-4 shadow-lg"
	style="background: url('/home.png') center/cover no-repeat; color: white;transition: all 0.5s"
	onmouseenter={() => (transform_title = 'scale(1.01)')}
	style:transform={transform_title}
	onmouseleave={() => (transform_title = 'scale(1)')}
>
	<h1 class="text-body-emphasis">Marmitron</h1>
	<h2 class="fw-normal">Explore Our Recipes</h2>
</div>

<div class="row">
	{#each filteredRecipes as recipe (recipe.id)}
		{#if recipe.published}
			<div class="col-md-4">
				<a href={`/recipes/${recipe.id}`} class="text-decoration-none">
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="card text-white bg-dark mb-4 rounded-2 shadow-lg"
						onmouseenter={() => transform.update((t) => ({ ...t, [recipe.id]: 'scale(1.07)' }))}
						onmouseleave={() => transform.update((t) => ({ ...t, [recipe.id]: 'scale(1)' }))}
						style="transition: all 0.5s"
						style:transform={$transform[recipe.id] || 'scale(1)'}
					>
						<img
							src={recipe.image_url}
							class="card-img-top"
							alt={recipe.name}
							style="object-fit: cover; height: 200px"
						/>
						<div class="card-body text-start">
							<div class="d-flex justify-content-between align-items-start">
								<h2 class="card-title mb-0">
									{recipe.name.slice(0, 20)}{recipe.name.length > 20 ? '...' : ''}
								</h2>
								<span class="badge rounded-pill text-bg-light text-capitalize"
									>{recipe.when_to_eat}</span
								>
							</div>
							<p class="lead mb-2">
								{recipe.description.slice(0, 30)}{recipe.description.length > 30 ? '...' : ''}
							</p>
							<div class="d-flex justify-content-between align-items-center mb-2">
								<div>
									<i class="bi bi-clock"></i>
									<span> Preparation :</span><span class="fw-bold">
										&nbsp{recipe.prep_time} min</span
									>
								</div>
								<div>
									<i class="bi bi-clock-history"></i>
									<span> Cuisson : </span><span class="fw-bold"> &nbsp{recipe.cook_time} min</span>
								</div>
							</div>
							<div class="text-center mt-3">
								<button type="button" class="btn btn-outline-light">Voir la recette</button>
							</div>
						</div>
					</div>
				</a>
			</div>
		{/if}
	{/each}
</div>
