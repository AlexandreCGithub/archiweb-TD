<script lang="ts">
	import type { PageProps } from './$types';
	import type { Recipe } from '$lib/types/Recipe';

	let { data, form }: PageProps = $props();

	let recipe: Recipe = data.recipe;
</script>

<svelte:head>
	<title>{recipe.name}</title>
</svelte:head>
<div class="bg-dark p-3 rounded-3">
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
			<form method="POST" action="?/login">
				<input type="hidden" name="recipeID" value={recipe.id} />
				<button formaction="?/addFavorite">Add to Favorites ⭐</button>
				<button formaction="?/deleteFavorite">Remove Favorite ❌</button>
				<br /><br />
				{#if form?.status !== undefined}
					{#if form?.status == 200}
						<div class="alert alert-success" role="alert">
							{#if form?.action == 'addFavorite'}
								<p><strong>Favorite Added! 🎉</strong></p>
							{:else}
								<p><strong>Favorite Removed</strong></p>
							{/if}
						</div>
					{:else if form?.status == 401}
						<div class="alert alert-danger" role="alert">
							<p><strong>Unauthorized! Please log in. 🔒</strong></p>
						</div>
					{:else if form?.status == 403}
						<div class="alert alert-warning" role="alert">
							<p><strong>Forbidden! You don't have permission. 🚫</strong></p>
						</div>
					{:else if form?.status == 409}
						<div class="alert alert-info" role="alert">
							<p><strong>Conflict! This favorite already exists. 🔄</strong></p>
						</div>
					{:else}
						<div class="alert alert-secondary" role="alert">
							<p><strong>An unexpected error occurred. Please try again later. ⚠️</strong></p>
						</div>
					{/if}
				{/if}
			</form>
		</div>
	</div>

	<div class="row text-start col-md-4">
		<span class="display-4">Instructions</span>
		<ul class="list-group list-group-flush mx-3">
			{#each recipe.instructions.split('-') as ingredient (ingredient)}
				{#if ingredient.trim() !== ''}
					<li class="list-group-item">{ingredient}</li>
				{/if}
			{/each}
		</ul>
	</div>
</div>
