<script lang="ts">
	const commitNumber = import.meta.env.VITE_COMMIT_NUMBER || 'dev';
</script>

<footer class="text-light py-3">
	<div class="container text-center">
		<p class="lead mb-2 fix-white-color">Site de l'équipe Chi.</p>
		<a
			href="https://github.com/AlexandreCGithub/archiweb-TD"
			target="_blank"
			class="text-light"
			aria-label="GitHub de l'équipe Chi"
		>
			<i class="bi bi-github fix-white-color" style="font-size: 1.5rem;"></i>
		</a>
		<p>Version: {commitNumber}</p>
	</div>
</footer>
