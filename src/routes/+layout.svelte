<script lang="ts">
	import Seo from "$lib/components/Seo.svelte";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import BottomNav from "$lib/components/BottomNav.svelte";

	let { children } = $props();
</script>

<ProgressBar />
<Seo />
<Header />

{@render children()}

<Footer />
<BottomNav />
