<script lang="ts">
	import { page } from '$app/state';
</script>

<!-- This is the error page that will be displayed when an error occurs in the app -->
<h1>Erreur : {page.status}</h1>
<h2>{page.error?.message}</h2>
