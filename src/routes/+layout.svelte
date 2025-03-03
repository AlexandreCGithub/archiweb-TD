<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
</script>

<svelte:head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src={scriptSrc}></script>
</svelte:head>
<div class="container p-3 mx-auto text-center">
    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" class="nav-link px-2 text-white">Home</a></li>
            <li><a href="/recipes" class="nav-link px-2 text-white">Recipes</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2">Login</button>
            <button type="button" class="btn btn-light">Sign-up</button>
        </div>
    </div>

    <div class="p-5 text-center bg-body-tertiary rounded-2 mt-4 shadow" 
        style="background: url('/home.png') center/cover no-repeat; color: white;">
        <h1 class="text-body-emphasis">Title</h1>
        <p class="lead">
            Recipes
        </p>
    </div>

    <main>
        <div class="container py-3 px-0 mx-auto text-center">
            <slot />
        </div>
    </main>
</div>