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
<div class="row">
    {#each recipes as recipe}
        {#if recipe.published}
            <div class="col-md-6">
                <div class="text-center bg-body-tertiary mb-4 rounded-2 shadow" style="position: relative;">
                    <div class="image-container rounded-2 shadow" style="background: url('{recipe.image_url}') center/cover no-repeat; filter: blur(3px); height: 200px;">
                </div>
                    
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; filter: blur(0px);">
                    <div>
                            <h1 class="text-body-emphasis">{recipe.name}</h1>
                            <p class="lead">{recipe.description}</p>
                            <span class="badge bg-dark">Preparation Time : {recipe.prep_time} min ⏳</span>
                            <span class="badge bg-secondary">Cooking Time : {recipe.cook_time} min 🔥</span>
                            <h3 class="text-body-emphasis mt-3">{recipe.when_to_eat.toUpperCase()[0] + recipe.when_to_eat.slice(1)}</h3>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>
