<script lang="ts">
	import Seo from "$lib/components/Seo.svelte";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";

	let { children } = $props();
</script>

<NavigationLoader />
<Seo />
<Header />

{@render children()}

<Footer />
<BottomNav />
