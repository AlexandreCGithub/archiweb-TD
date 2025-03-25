<script lang="ts">
	import homeImg from '$lib/images/home.webp';
	import type { TitleData } from '$lib/types/TitleData';

	let { titleData }: { titleData: TitleData } = $props();
	let transform_title = $state('scale(1)');
	let title = $state(titleData.title);
	let subtitle = $state(titleData.subtitle);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="p-5 text-center bg-body-tertiary rounded-2 my-4 shadow-lg"
	style="background: url('{homeImg}') center no-repeat; color: white;transition: all 0.5s"
	onmouseenter={() => (transform_title = 'scale(1.01)')}
	style:transform={transform_title}
	onmouseleave={() => (transform_title = 'scale(1)')}
>
	<h1 class="fix-white-color">{title}</h1>
	<h2 class="fw-normal fix-white-color">{subtitle}</h2>
</div>
