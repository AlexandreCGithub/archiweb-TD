<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import type { Recipe } from '$lib/types/Recipe';
	import { source } from 'sveltekit-sse';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();
	let recipe: Recipe = data.recipe;
	let favoritecount = $state('');

	onMount(() => {
		const hr = source(`https://gourmet.cours.quimerch.com/recipes/${recipe.id}/stars`, {
			options: {
				method: 'GET'
			}
		}).select('count');
		hr.subscribe((message) => {
			favoritecount = message;
		});
	});

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

	let zoomOnHover = $state('scale(1)');

	let isModalOpen = $state(false);

	const changeModalStatus = () => {
		isModalOpen = isModalOpen ? false : true;
	};
</script>

<svelte:head>
	<title>{recipe.name}</title>
</svelte:head>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="bg-dark p-3 rounded-3"
	style="transition: all 0.5s"
	onmouseenter={() => (zoomOnHover = 'scale(1.02)')}
	style:transform={zoomOnHover}
	onmouseleave={() => (zoomOnHover = 'scale(1)')}
>
	<div class="row text-start mb-4">
		<div class="col-md-4">
			<button
				type="button"
				onclick={changeModalStatus}
				class="p-0 border-0 bg-transparent"
				aria-label="Open image modal"
			>
				<enhanced:img src={recipe.image_url} class="img-fluid rounded-2 shadow" alt={recipe.name} />
			</button>
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
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								if (result.status === 200) {
									changeFavorite();
								}
							}
						};
					}}
				>
					<input type="hidden" name="recipeID" value={recipe.id} />
					<div class="align-items-bottom">
						<button
							type="submit"
							class="btn btn-outline-light"
							aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
							formaction={isFavorite ? '?/deleteFavorite' : '?/addFavorite'}
						>
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<i
								id="star"
								class={isFavorite ? 'bi bi-star-fill text-danger' : 'bi bi-star'}
								onmouseenter={(event) => {
									if (!isFavorite) {
										event.currentTarget.classList.remove('bi-star');
										event.currentTarget.classList.add('bi-star-fill', 'text-danger');
									} else {
										event.currentTarget.classList.remove('bi-star-fill', 'text-danger');
										event.currentTarget.classList.add('bi-star');
									}
								}}
								onmouseout={(event) => {
									if (!isFavorite) {
										event.currentTarget.classList.remove('bi-star-fill', 'text-danger');
										event.currentTarget.classList.add('bi-star');
									} else {
										event.currentTarget.classList.remove('bi-star');
										event.currentTarget.classList.add('bi-star-fill', 'text-danger');
									}
								}}
								onblur={(event) => {
									if (!isFavorite) {
										event.currentTarget.classList.remove('bi-star-fill', 'text-danger');
										event.currentTarget.classList.add('bi-star');
									} else {
										event.currentTarget.classList.remove('bi-star');
										event.currentTarget.classList.add('bi-star-fill', 'text-danger');
									}
								}}
							></i>
						</button>
						<span>{favoritecount}</span>
					</div>
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
{#if isModalOpen}
	<div
		class="modal fade show d-block"
		id="imagemodal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="myModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-fullscreen">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{recipe.name}</h5>
					<button type="button" class="btn-close" onclick={changeModalStatus} aria-label="Close"
					></button>
				</div>
				<div class="modal-body d-flex justify-content-center align-items-center">
					<enhanced:img
						src={recipe.image_url}
						alt={recipe.name + 'preview'}
						class="imagepreview"
						style="max-width: 100%; max-height: 100vh; object-fit: contain;"
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
