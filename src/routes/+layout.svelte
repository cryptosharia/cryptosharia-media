<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";

	let { children } = $props();
</script>

<NavigationLoader />
<a class="skip-link" href="#main-content">Lewati ke konten utama</a>
<Header />

{@render children()}

<Footer />
