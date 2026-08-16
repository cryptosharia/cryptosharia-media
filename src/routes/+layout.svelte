<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";

	let { children, data } = $props();
	const newsCategories = $derived(
		data.contentCategories
			.filter((category) => category.showInNavigation && category.contentSection === 'news')
			.map((category) => ({ label: category.name, slug: category.slug }))
	);
	const educationCategories = $derived(
		data.contentCategories
			.filter((category) => category.showInNavigation && category.contentSection === 'education')
			.map((category) => ({ label: category.name, slug: category.slug }))
	);
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
<Header newsCategories={newsCategories} educationCategories={educationCategories} />

{@render children()}

<Footer />
