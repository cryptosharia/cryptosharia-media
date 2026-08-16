<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";
	import { EDUCATION_CATEGORIES, NEWS_CATEGORIES } from '$lib/config';

	let { children, data } = $props();
	const newsCategories = $derived(data.contentCategories.filter((category) => category.contentSection === 'news').map((category) => ({ label: category.name, slug: category.slug })));
	const educationCategories = $derived(data.contentCategories.filter((category) => category.contentSection === 'education').map((category) => ({ label: category.name, slug: category.slug })));
	const resolvedNewsCategories = $derived(newsCategories.length ? newsCategories : NEWS_CATEGORIES);
	const resolvedEducationCategories = $derived(educationCategories.length ? educationCategories : EDUCATION_CATEGORIES);
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
<Header newsCategories={resolvedNewsCategories} educationCategories={resolvedEducationCategories} />

{@render children()}

<Footer />
