<script lang="ts">
	import { enhance } from '$app/forms';

	let isModalOpen = $state(false);

	let props = $props();
	let userPseudo = $state(props.userPseudo);

	$effect(() => {
		userPseudo = props.userPseudo;
	});

	const handleLogout = () => {
		userPseudo = '';
	};

	const changeModalStatus = () => {
		isModalOpen = isModalOpen ? false : true;
	};
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
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success') {
								handleLogout();
								console.log('logout', userPseudo);
							}
						};
					}}
					action="?/logout"
				>
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
					<form
						method="POST"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									changeModalStatus();
									console.log('login', userPseudo);
								}
							};
						}}
						action="?/login"
					>
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
