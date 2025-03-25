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
			<enhanced:img
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
					<span class="badge rounded-pill text-bg-light text-capitalize">{recipe.when_to_eat}</span>
				</div>
				<p class="lead mb-2">
					{recipe.description.slice(0, 30)}{recipe.description.length > 30 ? '...' : ''}
				</p>
				<div class="d-flex justify-content-between align-items-center mb-2">
					<div>
						<i class="bi bi-clock"></i>
						<span> Preparation :</span><span class="fw-bold"> &nbsp{recipe.prep_time} min</span>
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
