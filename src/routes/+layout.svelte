<script lang="ts">
	// Imports Bootstrap CSS
	import 'bootstrap/dist/css/bootstrap.min.css';

	// Imports Components
	import Footbar from '$lib/components/FootBar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	// Imports stores
	import darkMode from '$lib/stores/darkMode';

	// Imports images
	import homeImg from '$lib/images/home.webp';
	import iconImg from '$lib/images/favicon.webp';

	// Props
	let { data, children } = $props();

	// Dark mode/Light mode
	$effect(() => {
		if ($darkMode === 'true') {
			document.documentElement.style.setProperty('--dark-mode', '#212529');
			document.documentElement.style.setProperty('--light-mode', '#f8f9fa');
			document.documentElement.style.setProperty('--dark-mode-rgb', '33, 37, 41');
			document.documentElement.style.setProperty('--light-mode-rgb', '248, 249, 250');
			document.documentElement.style.setProperty('--invert-close-icon', 'invert(1)');
			document.documentElement.style.setProperty('--grayscale-close-icon', 'grayscale(100%)');
			document.documentElement.style.setProperty('--opacity-close-icon', '0.5');
		} else {
			document.documentElement.style.setProperty('--dark-mode', '#f8f9fa');
			document.documentElement.style.setProperty('--light-mode', '#212529');
			document.documentElement.style.setProperty('--dark-mode-rgb', '248, 249, 250');
			document.documentElement.style.setProperty('--light-mode-rgb', '33, 37, 41');
			document.documentElement.style.setProperty('--invert-close-icon', 'invert(0)');
			document.documentElement.style.setProperty('--grayscale-close-icon', 'grayscale(0%)');
			document.documentElement.style.setProperty('--opacity-close-icon', '1');
		}
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" type="image/webp" sizes="192x192" href={iconImg} />
	<meta name="description" content="Navigation bar of the website" />
</svelte:head>

<NavBar {data} />

<!-- Image de fond avec flou -->
<div
	class="position-fixed top-0 start-0 w-100 h-100 z-n1"
	style="background: url('{homeImg}') center/cover no-repeat; filter: blur(10px);"
></div>
<main class="container py-1 px-0 mx-auto text-center">
	{@render children()}
</main>

<Footbar />

<style lang="scss">
	@import './style.css';
</style>
