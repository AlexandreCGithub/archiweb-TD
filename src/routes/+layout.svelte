<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
	import Footbar from '../lib/components/FootBar.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	let { data, children } = $props();
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
	style="background: url('/home.png') center/cover no-repeat; filter: blur(10px);"
></div>

<main class="container py-1 px-0 mx-auto text-center">
	{@render children()}
</main>

<Footbar />
