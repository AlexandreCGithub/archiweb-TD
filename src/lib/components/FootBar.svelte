<script lang="ts">
	// Imports private variables
	import { env } from '$env/dynamic/public';
	// Imports Icons
	import { dockerStringIcon1, dockerStringIcon2 } from '$lib/icons/docker';
	import { githubStringIcon } from '$lib/icons/github';

	const commitNumber: string = env?.PUBLIC_VITE_COMMIT_NUMBER || 'dev';
</script>

<footer class="text-light py-3">
	<div class="container text-center">
		<div class="mb-3">
			<p class="lead mb-2 fix-white-color">Site de l'équipe Chi.</p>
		</div>
		<div class="mb-3">
			<a
				href="https://github.com/AlexandreCGithub/archiweb-TD"
				target="_blank"
				class="text-light"
				aria-label="GitHub de l'équipe Chi"
				style="padding: 5px 5px;"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					class="bi bi-github"
					viewBox="0 0 16 16"
				>
					<path d={githubStringIcon} />
				</svg>
			</a>
			<a
				href="https://hub.docker.com/r/magnoir/archiweb-td"
				target="_blank"
				class="text-light"
				aria-label="Docker"
			>
				<svg
					fill="currentColor"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"><path d={dockerStringIcon1} /><path d={dockerStringIcon2} /></svg
				>
			</a>
		</div>
		<p>Version: {commitNumber}</p>
	</div>
</footer>
