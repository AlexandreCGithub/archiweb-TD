<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Error {page.status}</h1>
<h2>{page.error?.message}</h2>
