<script lang="ts">
	import { page } from '$app/stores';

	let {
		title = 'CryptoSharia - Edukasi & Screener Kripto Syariah',
		description = 'Platform edukasi dan screener token crypto berbasis syariat Islam.',
		image = '/logo.png',
		type = 'website'
	} = $props<{
		title?: string;
		description?: string;
		image?: string;
		type?: string;
	}>();

	// url dinamis mengikuti halaman saat ini
	let url = $derived('https://cryptosharia.com' + $page.url.pathname);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#FF8A00" /> <!-- Sesuaikan dengan warna brand Anda misal Oren/Hitam -->
	<link rel="canonical" href={url} />

	<!-- Open Graph / Facebook / WhatsApp (Sangat Penting Jika Link di Share) -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
