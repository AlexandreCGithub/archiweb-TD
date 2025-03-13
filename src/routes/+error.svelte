<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Erreur : {page.status}</h1>
<h2>{page.error?.message}</h2>
