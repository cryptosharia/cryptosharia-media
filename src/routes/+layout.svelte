<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import NavigationLoader from "$lib/components/NavigationLoader.svelte";
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '$lib/config';

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
	let scrollFrame = 0;
	const siteStructuredData = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				url: SITE_URL,
				logo: `${SITE_URL}/logo.png`,
				sameAs: SOCIAL_LINKS.map((link) => link.href)
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: SITE_NAME,
				description: SITE_DESCRIPTION,
				inLanguage: 'id-ID',
				publisher: { '@id': `${SITE_URL}/#organization` }
			}
		]
	}).replace(/</g, '\\u003c');

	function updateScrollProgress() {
		if (scrollFrame) return;
		scrollFrame = requestAnimationFrame(() => {
			const height = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = height > 0 ? window.scrollY / height : 0;
			scrollFrame = 0;
		});
	}
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${siteStructuredData}</script>`}
</svelte:head>

<svelte:window onscroll={updateScrollProgress} onresize={updateScrollProgress} />
<NavigationLoader />
<div class="scroll-progress" style:--scroll-progress={scrollProgress} aria-hidden="true"></div>
<a class="skip-link" href="#main-content">Lewati ke konten utama</a>
<Header newsCategories={newsCategories} educationCategories={educationCategories} />

{@render children()}

<Footer />
