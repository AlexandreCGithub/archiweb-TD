<script lang="ts">
	import type { PageProps } from './$types';

	interface Recipes {
		id: string;
		createdAt: string;
		name: string;
		description: string;
		instructions: string;
		category: string;
		published: boolean;
		created_by: string;
		calories: number;
		cost: number;
		prep_time: number;
		cook_time: number;
		servings: number;
		image_url: string;
		disclaimer: string;
		when_to_eat: string;
	}

	let { data }: PageProps = $props();

	let recipe: Recipes = data.recipe;
	console.log(recipe);
</script>

<div class="row text-start mb-4">
	<div class="col-md-4">
		<img src={recipe.image_url} alt={recipe.name} class="img-fluid rounded-2 shadow" />
	</div>
	<div class="col-md-8 d-flex flex-column justify-content-center">
		<div class="d-flex justify-content-between align-items-center">
			<span class="display-4">{recipe.name}</span>
			<span class="display-6 text-body-emphasis"
				>{recipe.when_to_eat.toUpperCase()[0] + recipe.when_to_eat.slice(1)}</span
			>
		</div>
		<p class="fst-italic fs-6 mb-4">by {recipe.created_by}</p>

		<div class="d-flex justify-content-between align-items-center mb-2">
			<div>
				<i class="bi bi-clock"></i>
				<span> Preparation Time </span><span class="fw-bold">: {recipe.prep_time} min</span>
			</div>
			<div>
				<i class="bi bi-clock-history"></i>
				<span> Cooking Time </span><span class="fw-bold">: {recipe.cook_time} min</span>
			</div>
		</div>

		<div class="d-flex justify-content-between align-items-center mb-2">
			<div>
				<i class="bi bi-fire"></i>
				<span> Calories </span><span class="fw-bold"
					>: {#if recipe.calories}
						{recipe.calories}
					{:else}
						?
					{/if} kcal</span
				>
			</div>
		</div>

		<p class="lead mt-4">{recipe.description}</p>
	</div>
</div>

<div class="row text-start col-md-4">
	<span class="display-4">Instructions</span>
	<ul class="list-group list-group-flush mx-3">
		{#each recipe.instructions.split('-') as ingredient}
			{#if ingredient.trim() !== ''}
				<li class="list-group-item">{ingredient}</li>
			{/if}
		{/each}
	</ul>
</div>
