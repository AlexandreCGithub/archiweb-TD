<script lang="ts">
	import { submitLogin } from './NavBar';
	
	let isModalOpen = false;
	let username = '';
	let password = '';
	let isLoggedIn = false;  // Variable pour savoir si l'utilisateur est connecté
	let userPseudo = '';  // Pour stocker le pseudo de l'utilisateur
  
	const openModal = () => {
	  isModalOpen = true;
	};
	
	const closeModal = () => {
	  isModalOpen = false;
	};
	
	const handleLogin = async () => {
	  const success = await submitLogin(username, password);
	  if (success) {
		isLoggedIn = true;
		userPseudo = username;
		closeModal();
	  }
	};
	
	const handleLogout = () => {
	  isLoggedIn = false;
	  userPseudo = '';
	};
  </script>
  
  <nav class="container p-3 mx-auto text-center">
	<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
	  <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
		<li><a href="/" class="nav-link px-2 text-white">Home</a></li>
	  </ul>
  
	  <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
		<input
		  type="search"
		  class="form-control form-control-dark text-bg-dark"
		  placeholder="Search..."
		  aria-label="Search"
		/>
	  </form>
  
	  <div class="text-end">
		{#if !isLoggedIn}
		  <button type="button" class="btn btn-outline-light me-2" on:click={openModal}>Login</button>
		  <button type="button" class="btn btn-light">Sign-up</button>
		{:else}
		  <span class="text-white me-3">Hello, {userPseudo}</span>
		  <button type="button" class="btn btn-outline-light" on:click={handleLogout}>Logout</button>
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
			<button type="button" class="btn-close" on:click={closeModal}></button>
		  </div>
		  <div class="modal-body">
			<form on:submit|preventDefault={handleLogin}>
			  <div class="mb-3">
				<label for="username" class="form-label">Username</label>
				<input
				  type="text"
				  class="form-control"
				  id="username"
				  bind:value={username}
				  required
				/>
			  </div>
			  <div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input
				  type="password"
				  class="form-control"
				  id="password"
				  bind:value={password}
				  required
				/>
			  </div>
			  <button type="submit" class="btn btn-primary">Login</button>
			</form>
		  </div>
		</div>
	  </div>
	</div>
  {/if}
  
  {#if isModalOpen}
	<div class="modal-backdrop fade show" on:click={closeModal}></div>
  {/if}
  