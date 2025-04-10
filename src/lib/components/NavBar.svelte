<script lang="ts">
	// Imports SvelteKit
	import { applyAction, deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	// Imports stores
	import searchValue from '$lib/stores/search';
	import darkMode from '$lib/stores/darkMode';
	// Imports functions
	import { parseJwt } from '$lib/utils/parseJwt';

	// Imports icons
	import { sunStringIcon } from '$lib/icons/sun';
	import { moonStringIcon } from '$lib/icons/moon';

	// Props, dynamic variables and states
	let { data } = $props();
	let userPseudo: string = $state(parseJwt(data?.token)?.iss);
	let isModalOpen: boolean = $state(false);

	// Constants (functions)
	const changeModalStatus = () => (isModalOpen = isModalOpen ? false : true);
	const changeDarkMode = () => {
		if ($darkMode === 'true') {
			darkMode.set('false');
		} else {
			darkMode.set('true');
		}
	};

	// Forms handling
	async function handleLoginSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());
		if (result.type === 'success') {
			changeModalStatus();
			if (result.data && typeof result.data.token === 'string') {
				userPseudo = parseJwt(result.data.token)?.iss;
				window.location.reload();
			}
		} else {
			await applyAction(result);
		}
	}

	// Forms handling
	async function handleLogoutSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());
		if (result.type === 'success') {
			userPseudo = '';
			if (page.url.pathname !== '/') await goto('/');
			window.location.reload();
		}
	}
</script>

<div class="container py-md-3 py-sm-0 px-0 mx-auto text-center">
	<nav class="navbar navbar-expand-sm">
		<!-- Contenu de la navbar -->
		<div class="navbar-collapse mx-0" id="navbarNav">
			<ul class="navbar-nav me-auto mb-0">
				<li class="nav-item me-3">
					<a href="/" class="nav-link text-white p-0 fix-white-color">Accueil</a>
				</li>
				{#if userPseudo}
					<li class="nav-item">
						<a href="/favorites" class="nav-link text-white p-0 fix-white-color">Favoris ⭐</a>
					</li>
				{/if}
			</ul>

			<form class="d-flex me-3 mb-0" role="search">
				<input
					type="search"
					id="search"
					class="form-control form-control-dark text-bg-dark"
					placeholder="Rechercher..."
					aria-label="Rechercher"
					bind:value={$searchValue}
				/>
			</form>

			<div class="d-flex align-items-center">
				{#if !userPseudo}
					<button type="button" class="btn btn-outline-light me-3" onclick={changeModalStatus}>
						Se connecter
					</button>
				{:else}
					<span class="text-white me-3 fix-white-color">Bonjour, {userPseudo}</span>
					<form method="POST" action="/?/logout" id="logout" onsubmit={handleLogoutSubmit}>
						<button type="submit" class="btn btn-outline-light me-3">Logout</button>
					</form>
				{/if}
				{#if $darkMode === 'true'}
					<button
						type="button"
						class="btn btn-outline-light me-0"
						onclick={changeDarkMode}
						aria-label="Changer de thème"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-brightness-high"
							viewBox="0 0 16 16"
						>
							<path d={sunStringIcon} />
						</svg>
					</button>
				{:else}
					<button
						type="button"
						class="btn btn-outline-light me-0"
						onclick={changeDarkMode}
						aria-label="Changer de thème"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-moon"
							viewBox="0 0 16 16"
						>
							<path d={moonStringIcon} />
						</svg>
					</button>
				{/if}
			</div>
		</div>
	</nav>
</div>

{#if isModalOpen}
	<div class="modal fade show d-block" tabindex="-1" style="display: block;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Se connecter</h5>
					<button type="button" class="btn-close" onclick={changeModalStatus} aria-label="Close"
					></button>
				</div>
				<div class="modal-body text-center">
					<form method="POST" onsubmit={handleLoginSubmit} action="/?/login">
						<div class="mb-3">
							<label for="username" class="form-label">Nom d'utilisateur</label>
							<input
								type="text"
								class="form-control"
								id="username"
								name="username"
								placeholder="Nom d'utilisateur"
								autocomplete="username"
								required
							/>
						</div>
						<div class="mb-3">
							<label for="password" class="form-label">Mot de passe</label>
							<input
								type="password"
								class="form-control"
								id="password"
								name="password"
								placeholder="Mot de passe"
								autocomplete="current-password"
								required
							/>
						</div>
						<button type="submit" class="btn btn-outline-light">Se connecter</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<button
		type="button"
		class="modal-backdrop fade show"
		onclick={changeModalStatus}
		aria-label="Close modal"
	></button>
{/if}
