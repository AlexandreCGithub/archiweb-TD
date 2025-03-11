<script lang="ts">
	import type { PageData } from '../../routes/$types';
	import { applyAction, deserialize } from '$app/forms';

	let { data }: { data: PageData } = $props();

	const parseJwt = (token: string | null) => {
		if (!token) return null;
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (error) {
			return null;
		}
	};

	let userPseudo = $state(parseJwt(data.token)?.iss);

	let isModalOpen = $state(false);
	const changeModalStatus = () => {
		isModalOpen = isModalOpen ? false : true;
	};

	async function handleSubmit(
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
</script>

<nav class="container p-3 mx-auto text-center">
	<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
		<ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
			<li><a href="/" class="nav-link px-2 text-white">Home</a></li>
			<li><a href="/favorites" class="nav-link px-2 text-white">Favorites ⭐</a></li>
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
					>Login</button
				>
			{:else}
				<span class="text-white me-3">Hello, {userPseudo}</span>
				<form method="POST" action="?/logout">
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
					<h5 class="modal-title">Login</h5>
					<button type="button" class="btn-close" onclick={changeModalStatus} aria-label="Close"
					></button>
				</div>
				<div class="modal-body text-center">
					<form method="POST" onsubmit={handleSubmit} action="?/login">
						<div class="mb-3">
							<label for="username" class="form-label">Username</label>
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
							<label for="password" class="form-label">Password</label>
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
						<button type="submit" class="btn btn-primary">Login</button>
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
