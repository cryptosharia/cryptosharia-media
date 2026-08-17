<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '$lib/config';

	let {
		title = `${SITE_NAME} — Berita, Edukasi & Screening Coin`,
		description = SITE_DESCRIPTION,
		image = '/logo.png',
		imageWidth,
		imageHeight,
		imageAlt,
		type = 'website',
		publishedTime,
		modifiedTime,
		canonicalPath,
		noindex = false
	} = $props<{
		title?: string;
		description?: string;
		image?: string;
		imageWidth?: number | null;
		imageHeight?: number | null;
		imageAlt?: string;
		type?: string;
		publishedTime?: string | null;
		modifiedTime?: string | null;
		canonicalPath?: string;
		noindex?: boolean;
	}>();

	const baseUrl = (env.PUBLIC_APP_URL || SITE_URL).replace(/\/$/, '');
	let url = $derived(baseUrl + (canonicalPath || $page.url.pathname));
	let imageUrl = $derived(image.startsWith('http') ? image : baseUrl + image);
	let resolvedImageWidth = $derived(
		imageWidth ?? (image === '/logo.png' ? 500 : undefined)
	);
	let resolvedImageHeight = $derived(
		imageHeight ?? (image === '/logo.png' ? 500 : undefined)
	);
	let resolvedImageAlt = $derived(
		imageAlt || (image === '/logo.png' ? `Logo ${SITE_NAME}` : title)
	);
	let twitterCard = $derived(
		resolvedImageWidth && resolvedImageHeight && resolvedImageWidth / resolvedImageHeight >= 1.45
			? 'summary_large_image'
			: 'summary'
	);
	let articleStructuredData = $derived(
		type === 'article'
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: title,
					description,
					image: [imageUrl],
					mainEntityOfPage: url,
					inLanguage: 'id-ID',
					...(publishedTime ? { datePublished: publishedTime } : {}),
					...(modifiedTime ? { dateModified: modifiedTime } : {}),
					publisher: {
						'@type': 'Organization',
						'@id': `${baseUrl}/#organization`,
						name: SITE_NAME,
						logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` }
					}
				}).replace(/</g, '\\u003c')
			: null
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#FF8C00" />
	<link rel="canonical" href={url} />
	{#if noindex}<meta name="robots" content="noindex, follow" />{/if}

	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	{#if imageUrl.startsWith('https://')}<meta property="og:image:secure_url" content={imageUrl} />{/if}
	{#if resolvedImageWidth}<meta property="og:image:width" content={resolvedImageWidth} />{/if}
	{#if resolvedImageHeight}<meta property="og:image:height" content={resolvedImageHeight} />{/if}
	<meta property="og:image:alt" content={resolvedImageAlt} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="id_ID" />
	{#if type === 'article' && publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
	{#if type === 'article' && modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}

	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={resolvedImageAlt} />

	{#if articleStructuredData}
		{@html `<script type="application/ld+json">${articleStructuredData}</script>`}
	{/if}
</svelte:head>
