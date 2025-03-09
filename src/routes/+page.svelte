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
	let recipes: Recipes[] = data.recipes;
</script>

<div
	class="p-5 text-center bg-body-tertiary rounded-2 my-4 shadow"
	style="background: url('/home.png') center/cover no-repeat; color: white;"
>
	<h1 class="text-body-emphasis">Title</h1>
	<p class="lead">Recipes</p>
</div>

<div class="row">
	{#each recipes as recipe}
		{#if recipe.published}
			<div class="col-md-4">
				<a href={`/recipes/${recipe.id}`}>
					<div
						class="text-center bg-body-tertiary mb-4 rounded-2 shadow"
						style="position: relative;"
					>
						<div
							class="image-container rounded-2 shadow"
							style="background: url('{recipe.image_url}') center/cover no-repeat; filter: blur(3px); height: 200px;"
						></div>

						<div
							style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; filter: blur(0px);"
						>
							<div>
								<h1 class="text-body-emphasis">{recipe.name}</h1>
								<p class="lead text-white">{recipe.description}</p>
								<span class="badge bg-dark">Preparation Time : {recipe.prep_time} min ⏳</span>
								<span class="badge bg-secondary">Cooking Time : {recipe.cook_time} min 🔥</span>
								<h3 class="text-body-emphasis mt-3 text-capitalize">{recipe.when_to_eat}</h3>
							</div>
						</div>
					</div>
				</a>
			</div>
		{/if}
	{/each}
</div>
