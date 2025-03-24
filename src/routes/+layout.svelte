<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
	import Footbar from '$lib/components/FootBar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import darkMode from '$lib/stores/darkMode';
	import homeImg from '$lib/images/home.png';

	let { data, children } = $props();

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
	<script src={scriptSrc}></script>
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
