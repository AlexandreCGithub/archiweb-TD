<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
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
			if (page.url.pathname == '/favorites') {
			goto('/');
			}
		}
	}
</script>

<nav class="container py-3 px-0 mx-auto text-center">
	<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
		<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
			<li><a href="/" class="nav-link px-2 text-white">Accueil</a></li>
			{#if userPseudo}
				<li><a href="/favorites" class="nav-link px-2 text-white">Favoris ⭐</a></li>
			{/if}
		</ul>

		<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
			<input
				type="search"
				class="form-control form-control-dark text-bg-dark"
				placeholder="Search..."
				aria-label="Search"
			/>
		</form>

		<div class="text-end d-flex align-items-center">
			{#if !userPseudo}
				<button type="button" class="btn btn-outline-light me-2" onclick={changeModalStatus}
					>Se connecter</button
				>
			{:else}
				<span class="text-white me-3">Bonjour, {userPseudo}</span>
				<form method="POST" action="/?/logout" onsubmit={handleLogoutSubmit}>
					<button type="submit" class="btn btn-outline-light">Logout</button>
				</form>
			{/if}
		</div>
	</div>
</nav>

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
								placeholder="Username"
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
								placeholder="Password"
								autocomplete="current-password"
								required
							/>
						</div>
						<button type="submit" class="btn btn-primary">Se connecter</button>
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

<style>
	.form-control:focus {
		border-color: #000000;
		box-shadow:
			inset 0 1px 1px rgba(0, 0, 0, 0.075),
			0 0 8px rgba(255, 255, 255, 0.6);
	}
</style>
