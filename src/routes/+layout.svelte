<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
	import Footbar from '../lib/components/FootBar.svelte';
	import type { PageData } from './$types';
	import NavBar from '$lib/components/NavBar.svelte';

	let { data, children }: { data: PageData; children: any } = $props();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<script src={scriptSrc}></script>
</svelte:head>

<NavBar {data} />
<main>
	<div class="container py-3 px-0 mx-auto text-center">
		{@render children()}
	</div>
</main>
<Footbar />
