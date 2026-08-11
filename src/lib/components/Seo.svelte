<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '$lib/config';

	let {
		title = `${SITE_NAME} — Berita, Edukasi & Screening Coin`,
		description = SITE_DESCRIPTION,
		image = '/logo.png',
		type = 'website',
		canonicalPath,
		noindex = false
	} = $props<{
		title?: string;
		description?: string;
		image?: string;
		type?: string;
		canonicalPath?: string;
		noindex?: boolean;
	}>();

	const baseUrl = (env.PUBLIC_APP_URL || SITE_URL).replace(/\/$/, '');
	let url = $derived(baseUrl + (canonicalPath || $page.url.pathname));
	let imageUrl = $derived(image.startsWith('http') ? image : baseUrl + image);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#FF8C00" />
	<link rel="canonical" href={url} />
	{#if noindex}<meta name="robots" content="noindex, nofollow" />{/if}

	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="id_ID" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
