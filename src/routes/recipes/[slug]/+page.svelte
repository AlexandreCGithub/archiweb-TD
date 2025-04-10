<script lang="ts">
	// Imports SvelteKit
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import type { Recipe } from '$lib/types/Recipe';
	import { source } from 'sveltekit-sse';
	import { onMount } from 'svelte';
	import { parseJwt } from '$lib/utils/parseJwt';

	// Import functions
	import { parseJwt } from '$lib/functions/parseJWT';

	// Imports Components
	import ProxyImg from '$lib/components/ProxyImg.svelte';

	// Imports Icons
	import { starFilledStringIcon } from '$lib/icons/starFilled';
	import { starEmptyStringIcon } from '$lib/icons/starEmpty';
	import { fireStringIcon } from '$lib/icons/fire';
	import { clockStringIcon1, clockStringIcon2 } from '$lib/icons/clock';
	import {
		halfClockStringIcon1,
		halfClockStringIcon2,
		halfClockStringIcon3
	} from '$lib/icons/half-clock';

	// Props, dynamic variables and states
	let { data }: PageProps = $props();
	let favoritecount = $state('');
	let msg = $state('');
	let isFavorite = $state(data.isAlreadyFavorite);
	let isModalOpen = $state(false);
	let userPseudo = $state(parseJwt(data?.token ?? undefined)?.iss);
	let zoomOnHover = $state('scale(1)');

	// Constants
	const recipe: Recipe = data.recipe;
	const imageData = {
		source: recipe.image_url,
		class: 'img-fluid rounded-2 shadow',
		loading: 'lazy',
		alt: recipe.name,
		style: 'object-fit: cover; height: 200px',
		imgwidth: 500,
		imgheight: 400
	};

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

	// Constants (functions)
	const changeFavorite = (): boolean => (isFavorite = !isFavorite);
	const changeModalStatus = () => (isModalOpen = isModalOpen ? false : true);

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
				<ProxyImg {imageData} />
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
						<path d={clockStringIcon1} />
						<path d={clockStringIcon2} />
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
						<path d={halfClockStringIcon1} />
						<path d={halfClockStringIcon2} />
						<path d={halfClockStringIcon3} />
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
						<path d={fireStringIcon} />
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
					<input type="hidden" id="recipeID" name="recipeID" value={recipe.id} />
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
								<path d={isFavorite ? starEmptyStringIcon : starFilledStringIcon} />
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
						src={'/media?src=' + encodeURIComponent(recipe.image_url)}
						class="imagepreview"
						alt={recipe.name}
						loading="lazy"
						style="max-width: 100%; max-height: 100vh; object-fit: contain;"
						onerror={(e) => {
							const target = e.target as HTMLImageElement;
							if (target) target.src = recipe.image_url;
						}}
					/>
				</div>
			</div>
		</div>
	</div>
{/if}
