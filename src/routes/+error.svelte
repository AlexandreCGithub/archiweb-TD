<script lang="ts">
	export function load({ status }: { status: number }) {
		if (status === 404) {
			return {
				status: 404,
				error: new Error('Page not found')
			};
		}
	}
</script>

<svelte:head>
	<title>Page not found - 404</title>
</svelte:head>

<main class="text-center">
	<h1>404</h1>
	<p>Sorry, the page you're looking for does not exist.</p>
	<p>
		<a href="/" class="btn btn-outline-light me-2">Go back to the homepage</a>
	</p>
</main>
