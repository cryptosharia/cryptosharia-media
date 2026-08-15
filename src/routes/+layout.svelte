<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";

	let { children } = $props();
	let scrollProgress = $state(0);

	function updateScrollProgress() {
		const height = document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = height > 0 ? window.scrollY / height : 0;
	}
</script>

<svelte:window onscroll={updateScrollProgress} onresize={updateScrollProgress} />
<NavigationLoader />
<div class="scroll-progress" style:--scroll-progress={scrollProgress} aria-hidden="true"></div>
<a class="skip-link" href="#main-content">Lewati ke konten utama</a>
<Header />

{@render children()}

<Footer />
