<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.js?url';
</script>
<svelte:head>
    <script src={scriptSrc}></script>
</svelte:head>
<div class="container py-4 px-3 mx-auto">
    <h1>Hello, Bootstrap and Vite!</h1>
    <button class="btn btn-primary">Primary button</button>
</div>