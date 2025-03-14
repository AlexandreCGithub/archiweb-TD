<script lang="ts">
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import type { Recipe } from '$lib/types/Recipe';

	let { data }: PageProps = $props();
	let recipe: Recipe = data.recipe;
	let isFavorite = $state(false);
	isFavorite = data.isAlreadyFavorite;
	let msg = $state('');

	const parseJwt = (token: string | null) => {
		if (!token) return null;
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return e;
		}
	};

	let userPseudo = $state(parseJwt(data?.token)?.iss);

	function changeFavorite() {
		isFavorite = !isFavorite;
	}

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
					<span> Preparation </span><span class="fw-bold">: {recipe.prep_time} min</span>
				</div>
				<div>
					<i class="bi bi-clock-history"></i>
					<span> Cuisson </span><span class="fw-bold">: {recipe.cook_time} min</span>
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
			{#if userPseudo}
			<form method="POST" use:enhance={({}) => {
						return async ({ result }) => {
						if (result.type === 'success') {
							if (result.status === 200) {
								changeFavorite();
								if (result.data && result.data.action === 'addFavorite') {
									msg = 'Favorite Added! 🎉';
								} else {
									msg = 'Favorite Removed';
								}
							} 
						} else {
							if (result.status === 401) {
								msg = 'Unauthorized! Please log in. 🔒';
							} else if (result.status === 403) {
								msg = 'Forbidden! You don\'t have permission. 🚫';
							} else if (result.status === 409) {
								msg = 'Conflict! This favorite already exists. 🔄';
						}
					}
				}}}>
				<input type="hidden" name="recipeID" value={recipe.id} />
				<button 
					type="submit" 
					class="btn btn-light" 
					aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
					formaction={isFavorite ? "?/deleteFavorite" : "?/addFavorite"}
				>
					<i class={isFavorite ? "fas fa-star" : "far fa-star"}></i>
				</button>
				<br /><br />
				<p><strong>{msg}</strong></p>
			</form>
			{/if}
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
