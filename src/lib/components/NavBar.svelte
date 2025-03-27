<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import searchValue from '$lib/stores/search';
	import darkMode from '$lib/stores/darkMode';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data } = $props();

	const parseJwt = (token: string | null) => {
		if (!token) return null;
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			return e;
		}
	};

	let userPseudo = $state(parseJwt(data?.token)?.iss);

	let isModalOpen = $state(false);
	const changeModalStatus = () => {
		isModalOpen = isModalOpen ? false : true;
	};

	const changeDarkMode = () => {
		if ($darkMode === 'true') {
			darkMode.set('false');
		} else {
			darkMode.set('true');
		}
	};

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
		<!-- Bouton de menu rétractable -->
		<button
			class="navbar-toggler ms-3"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<!-- Contenu de la navbar -->
		<div class="collapse navbar-collapse mx-0" id="navbarNav">
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
					<form method="POST" action="/?/logout" onsubmit={handleLogoutSubmit}>
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
							<path
								d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
							/>
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
							<path
								d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"
							/>
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
