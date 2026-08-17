<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import { formatDate } from '$lib/format';
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<Seo
    title={`${data.post.title} — Aktivitas CryptoSharia`}
    description={data.post.excerpt}
    image={data.post.coverImage?.url || '/logo.png'}
    imageWidth={data.post.coverImage?.url ? data.post.coverImage.width : 500}
    imageHeight={data.post.coverImage?.url ? data.post.coverImage.height : 500}
    imageAlt={data.post.coverImage?.url ? `Dokumentasi ${data.post.title}` : 'Logo CryptoSharia'}
    type="article"
    publishedTime={data.post.publishedAt ?? data.post.createdAt}
    modifiedTime={data.post.updatedAt ?? data.post.publishedAt ?? data.post.createdAt}
    canonicalPath={`/aktivitas/${data.post.slug}`}
/>

<main id="main-content" class="site-main">
    <article>
        <header class="container page-hero article-header">
            <a class="button button-link" href="/tentang-kami#aktivitas">← Aktivitas Kami</a>
            <p class="eyebrow" style="margin-top:24px">Aktivitas</p>
            <h1>{data.post.title}</h1>
            <p>{data.post.excerpt}</p>
            <time class="meta" datetime={data.post.publishedAt ?? data.post.createdAt}>{formatDate(data.post.publishedAt ?? data.post.createdAt)}</time>
        </header>
        {#if data.post.coverImage?.url}<img class="article-cover" src={data.post.coverImage.url} alt="" width={data.post.coverImage.width ?? 1200} height={data.post.coverImage.height ?? 675} />{/if}
        <div class="container section-sm"><div class="prose">{@html data.html}</div></div>
    </article>
</main>
