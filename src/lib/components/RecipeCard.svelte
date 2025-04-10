<script lang="ts">
	// Imports Components
	import ProxyImg from '$lib/components/ProxyImg.svelte';
	// Imports Icons
	import { clockStringIcon1, clockStringIcon2 } from '$lib/icons/clock';
	import {
		halfClockStringIcon1,
		halfClockStringIcon2,
		halfClockStringIcon3
	} from '$lib/icons/half-clock';

	// Imports types
	import type { Recipe } from '$lib/types/Recipe';

	// Props, dynamic variables and states
	let { recipe }: { recipe: Recipe } = $props();
	let transform: string = $state('scale(1)');

	// Constants
	const imageData = {
		source: recipe.image_url,
		class: 'card-img-top w-100 mw-75 d-block mx-auto',
		loading: 'eager',
		alt: recipe.name,
		style: 'object-fit: cover; height: 200px',
		imgwidth: 500,
		imgheight: 200
	};
</script>

<div class="col-md-4">
	<a href={`/recipes/${recipe.id}`} class="text-decoration-none">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="card text-white bg-dark mb-4 rounded-2 shadow-lg"
			onmouseenter={() => (transform = 'scale(1.07)')}
			onmouseleave={() => (transform = 'scale(1)')}
			style="transition: all 0.5s"
			style:transform
		>
			<ProxyImg {imageData} />
			<div class="card-body text-start">
				<div class="d-flex justify-content-between align-items-start">
					<h2 class="card-title mb-0">
						{recipe.name.slice(0, 20)}{recipe.name.length > 20 ? '...' : ''}
					</h2>
					<span class="badge rounded-pill text-bg-light text-capitalize">{recipe.when_to_eat}</span>
				</div>
				<p class="lead mb-2">
					{recipe.description.slice(0, 30)}{recipe.description.length > 30 ? '...' : ''}
				</p>
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
						<span> Préparation :</span><span class="fw-bold"> &nbsp{recipe.prep_time} min</span>
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
