<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import "bootstrap-icons/font/bootstrap-icons.css";
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';

    import NavBar from '../lib/components/NavBar.svelte';
</script>

<svelte:head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src={scriptSrc}></script>
</svelte:head>

<NavBar />

<main>
    <div class="container py-3 px-0 mx-auto text-center">
        <slot />
    </div>
</main>
