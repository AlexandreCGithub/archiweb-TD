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

	const starFilled =
		'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z';
	const starEmpty =
		'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z';
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
				aria-label="View larger image of the recipe"
			>
				<img src={recipe.image_url} class="img-fluid rounded-2 shadow" alt={recipe.name} />
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-clock"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
						/>
						<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
					</svg>
					<span> Préparation </span><span class="fw-bold">: {recipe.prep_time} min</span>
				</div>
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-clock-history"
						viewBox="0 0 16 16"
					>
						<path
							d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"
						/>
						<path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
						<path
							d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"
						/>
					</svg>
					<span> Cuisson </span><span class="fw-bold">: {recipe.cook_time} min</span>
				</div>
			</div>
			<div class="d-flex justify-content-between align-items-center mb-2">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-fire"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
						/>
					</svg>
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
			{#if favoritecount != ''}
				{#if favoritecount == '0'}
					<p>Nobody ⭐ this recipe yet</p>
				{:else}
					<p>{favoritecount} ⭐ for this recipe !</p>
				{/if}
			{/if}
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
					<div>
						<button
							type="submit"
							class="btn btn-outline-light"
							aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
							formaction={isFavorite ? '?/deleteFavorite' : '?/addFavorite'}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="bi"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d={isFavorite ? starEmpty : starFilled} />
							</svg>
						</button>
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
					<img
						src={recipe.image_url}
						class="imagepreview"
						style="max-width: 100%; max-height: 100vh; object-fit: contain;"
						alt={recipe.name}
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
