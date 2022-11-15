<script lang="ts">
    import WebsiteContainer from "./frontend/WebsiteContainer.svelte";
</script>

<main>
    <WebsiteContainer/>
</main>

<style>
	@font-face {
		font-family: 'Stormfaze';
		src: URL('/static/site_assets/stormfaze.ttf') format('truetype');
	}

	@font-face {
		font-family: 'Retro Gaming';
		src: URL('/static/site_assets/Retro_Gaming.ttf') format('truetype');
	}
	main {
		text-align: center;
		background: #00384D 0% 0% no-repeat padding-box;
        opacity: 1;
		height: 100vh;
        width: 100vw;
        text-align: center;
		font-family: 'Retro Gaming', Fallback, sans-serif;
		font-size: 3vh;
	}

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
