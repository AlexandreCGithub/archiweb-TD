<script context="module" lang="ts">
    export function load({ status }: { status: number }) {
      if (status === 404) {
        return {
          status: 404,
          error: new Error('Page not found'),
        };
      }
    }
</script>
  
  <svelte:head>
    <title>Page not found - 404</title>
  </svelte:head>
  
  <main class="text-center">
    <h1>Oops!</h1>
    <p>Sorry, the page you're looking for does not exist.</p>
    <p>
      <a href="/" class="btn btn-primary">Go back to the homepage</a>
    </p>
  </main>
  
  <style>
    main {
      padding: 2rem;
    }
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.2rem;
    }
    .btn {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #0056b3;
    }
  </style>
  