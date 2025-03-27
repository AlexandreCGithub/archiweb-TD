<script lang="ts">
	let { recipe } = $props();
	let transform = $state('scale(1)');
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
			<img
				src={'/media?src=' + encodeURIComponent(recipe.image_url)}
				class="card-img-top"
				alt={recipe.name}
				style="object-fit: cover; height: 200px"
			/>
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
							<path
								d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
							/>
							<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
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
							<path
								d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"
							/>
							<path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
							<path
								d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"
							/>
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
