<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { formatDate, safeExternalUrl } from '$lib/format';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const labels = { news: 'Berita', education: 'Edukasi', research: 'Riset', activity: 'Aktivitas' } as const;
    const externalLink = $derived(safeExternalUrl(data.post.externalLink));
</script>

<Seo
    title={`${data.post.title} — CryptoSharia`}
    description={data.post.excerpt}
    image={data.post.coverImage?.url || '/logo.png'}
    imageWidth={data.post.coverImage?.url ? data.post.coverImage.width : 500}
    imageHeight={data.post.coverImage?.url ? data.post.coverImage.height : 500}
    imageAlt={data.post.coverImage?.url ? `Gambar sampul ${data.post.title}` : 'Logo CryptoSharia'}
    type="article"
    publishedTime={data.post.publishedAt ?? data.post.createdAt}
    modifiedTime={data.post.updatedAt ?? data.post.publishedAt ?? data.post.createdAt}
    canonicalPath={`/artikel/${data.post.slug}`}
/>

<main id="main-content" class="site-main">
    <article>
        <header class="container page-hero article-header">
            <span class="badge">{labels[data.post.section]}</span>
            <h1>{data.post.title}</h1>
            <p>{data.post.excerpt}</p>
            <div class="card-meta" style="justify-content:flex-start">
                <time datetime={data.post.publishedAt ?? data.post.createdAt}>{formatDate(data.post.publishedAt ?? data.post.createdAt)}</time>
                {#if data.post.tags?.length}
                    <span aria-hidden="true">•</span>
                    <span>{data.post.tags.map((tag) => tag.name).join(', ')}</span>
                {/if}
            </div>
            {#if externalLink}
                <div class="button-row"><a class="button button-secondary" href={externalLink} target="_blank" rel="noopener noreferrer">Buka sumber terkait ↗</a></div>
            {/if}
        </header>

        {#if data.post.coverImage?.url}
            <img class="article-cover" src={data.post.coverImage.url} alt="" width={data.post.coverImage.width ?? 1200} height={data.post.coverImage.height ?? 675} />
        {/if}

        <div class="container section-sm">
            <div class="prose">{@html data.html}</div>
        </div>
    </article>

    {#if data.related.length}
        <section class="section-sm section-muted" aria-labelledby="bacaan-terkait">
            <div class="container">
                <div class="section-heading"><div><p class="eyebrow">Lanjut membaca</p><h2 id="bacaan-terkait">Artikel terkait</h2></div></div>
                <div class="card-grid">
                    {#each data.related as post (post.id)}<ArticleCard {post} />{/each}
                </div>
            </div>
        </section>
    {/if}
</main>
