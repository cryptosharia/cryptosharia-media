<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import AdSlot from '$lib/components/AdSlot.svelte';
    import { AD_PLACEMENTS } from '$lib/config/ads';
    import Seo from '$lib/components/Seo.svelte';
    import { formatDate, safeExternalUrl } from '$lib/format';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const labels = { news: 'Berita', education: 'Edukasi', research: 'Riset', activity: 'Aktivitas' } as const;
    const externalLink = $derived(safeExternalUrl(data.post.externalLink));
    const publishedAt = $derived(data.post.publishedAt ?? data.post.createdAt);
    const supportsInlineAd = $derived(
        AD_PLACEMENTS['article-inline'].sections.includes(data.post.section as 'news' | 'education')
    );
</script>

<Seo
    title={`${data.post.title} — CryptoSharia`}
    description={data.post.excerpt}
    image={data.post.coverImage?.url || '/logo.png'}
    imageWidth={data.post.coverImage?.url ? data.post.coverImage.width : 500}
    imageHeight={data.post.coverImage?.url ? data.post.coverImage.height : 500}
    imageAlt={data.post.coverImage?.url ? `Gambar sampul ${data.post.title}` : 'Logo CryptoSharia'}
    type="article"
    publishedTime={publishedAt}
    modifiedTime={data.post.updatedAt ?? publishedAt}
    canonicalPath={`/artikel/${data.post.slug}`}
/>

<main id="main-content" class="site-main article-page">
    <div class="container article-layout">
        <article class="article-detail">
            <header class="article-header">
                <p class="article-category">{labels[data.post.section]}</p>
                <h1>{data.post.title}</h1>
                <time class="article-date" datetime={publishedAt}>{formatDate(publishedAt)}</time>
                {#if data.post.createdBy?.name}
                    <p class="article-author">Oleh {data.post.createdBy.name}</p>
                {/if}
            </header>

            {#if data.post.coverImage?.url}
                <figure class="article-figure article-cover-figure">
                    <img
                        src={data.post.coverImage.url}
                        alt={`Gambar sampul ${data.post.title}`}
                        width={data.post.coverImage.width ?? 1200}
                        height={data.post.coverImage.height ?? 675}
                        fetchpriority="high"
                    />
                </figure>
            {/if}

            <div class="article-prose prose">
                {@html data.articleBefore}
                {#if data.articleAfter && supportsInlineAd}
                    <AdSlot placement="article-inline" />
                {/if}
                {@html data.articleAfter}
            </div>

            <footer class="article-footer">
                {#if data.post.tags?.length}
                    <section class="article-tags" aria-labelledby="topik-artikel">
                        <p id="topik-artikel">Topik</p>
                        <div>
                            {#each data.post.tags as tag (tag.id)}
                                <span>{tag.name}</span>
                            {/each}
                        </div>
                    </section>
                {/if}
                {#if externalLink}
                    <a class="source-link" href={externalLink} target="_blank" rel="noopener noreferrer">Buka sumber terkait <span aria-hidden="true">↗</span></a>
                {/if}
            </footer>
        </article>

        <aside class="article-sidebar" aria-label="Komunitas CryptoSharia">
            <div class="community-promo">
                <p class="promo-label">Komunitas CryptoSharia</p>
                <h2>Belajar dan berdiskusi bersama.</h2>
                <p>Terhubung dengan ruang diskusi, publikasi, dan kegiatan CryptoSharia.</p>
                <ul>
                    <li>Diskusi aset digital</li>
                    <li>Edukasi dan insight</li>
                    <li>Informasi kegiatan</li>
                </ul>
                <a class="promo-primary" href="/komunitas#gabung">Gabung Komunitas</a>
                <a class="promo-secondary" href="/komunitas#premium">Pelajari komunitas</a>
            </div>
            <AdSlot placement="article-sidebar" />
        </aside>
    </div>

    {#if data.related.length}
        <section class="related-section section-muted" aria-labelledby="bacaan-terkait">
            <div class="container">
                <div class="section-heading"><div><p class="eyebrow">Lanjut membaca</p><h2 id="bacaan-terkait">Artikel terkait</h2></div></div>
                <div class="card-grid">
                    {#each data.related as post (post.id)}<ArticleCard {post} />{/each}
                </div>
            </div>
        </section>
    {/if}
</main>

<style>
    .article-page { padding-top: clamp(56px, 8vw, 96px); }
    .article-layout { display: grid; grid-template-columns: minmax(0, 760px) minmax(280px, 340px); align-items: start; justify-content: space-between; gap: clamp(48px, 6vw, 72px); }
    .article-detail { min-width: 0; }
    .article-header { max-width: 760px; }
    .article-category, .promo-label, .article-tags > p { margin: 0; color: var(--accent-text); font-size: .7rem; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; }
    h1 { max-width: 760px; margin: 16px 0 0; font-size: clamp(2rem, 3.2vw, 2.625rem); line-height: 1.08; letter-spacing: -.045em; text-wrap: balance; }
    .article-date { display: block; margin-top: 28px; color: var(--muted); font-size: .88rem; }
    .article-author { margin: 12px 0 0; color: var(--text); font-size: .92rem; font-weight: 650; }
    .article-figure { margin: 36px 0 0; }
    .article-figure img { display: block; width: 100%; max-height: 560px; object-fit: cover; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-muted); }
    .article-figure :global(figcaption), .article-prose :global(figcaption) { margin-top: 9px; color: var(--muted); font-size: .78rem; line-height: 1.5; }
    .article-prose { max-width: 720px; margin: 36px 0 0; font-size: clamp(1rem, 1.15vw, 1.125rem); line-height: 1.82; }
    .article-prose :global(h2) { margin-top: 2.35em; font-size: clamp(1.5rem, 2.1vw, 1.875rem); line-height: 1.2; }
    .article-prose :global(h3) { margin-top: 2em; font-size: clamp(1.25rem, 1.6vw, 1.375rem); line-height: 1.26; }
    .article-prose :global(p) { margin-block: 0 1.3em; }
    .article-prose :global(figure) { margin: 2.2em 0; }
    .article-prose :global(figure img) { width: 100%; height: auto; border: 1px solid var(--border); border-radius: 12px; }
    .article-prose :global(blockquote) { padding: 14px 20px; color: var(--muted); border-left: 3px solid var(--accent); background: color-mix(in srgb, var(--surface-muted) 62%, transparent); }
    .article-prose :global(li) { margin-block: .45em; }
    .article-prose :global(table) { display: block; width: 100%; overflow-x: auto; border-collapse: collapse; font-size: .9em; }
    .article-prose :global(th), .article-prose :global(td) { padding: 10px 12px; border: 1px solid var(--border); text-align: left; }
    .article-prose :global(th) { background: var(--surface-muted); }
    .article-footer { max-width: 720px; margin-top: 52px; padding-top: 26px; border-top: 1px solid var(--border); }
    .article-tags > div { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .article-tags span { padding: 5px 10px; color: var(--muted); border: 1px solid var(--border); border-radius: 8px; font-size: .82rem; }
    .source-link { display: inline-flex; gap: 7px; margin-top: 24px; color: var(--accent-text); border-bottom: 1px solid currentColor; font-size: .88rem; font-weight: 700; }
    .article-sidebar { min-width: 0; }
    .community-promo { position: sticky; top: calc(var(--header-height) + 32px); padding: 28px; overflow: hidden; border: 1px solid var(--border); border-radius: 16px; background: color-mix(in srgb, var(--surface) 94%, var(--surface-muted)); box-shadow: var(--shadow-sm); }
    .community-promo::before { position: absolute; top: -92px; right: -102px; width: 220px; height: 220px; border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent); border-radius: 50%; content: ''; pointer-events: none; }
    .community-promo > * { position: relative; }
    .community-promo h2 { max-width: 250px; margin: 16px 0 0; font-size: 1.8rem; line-height: 1.12; letter-spacing: -.035em; }
    .community-promo > p:not(.promo-label) { margin: 14px 0 0; color: var(--muted); font-size: .95rem; line-height: 1.6; }
    .community-promo ul { margin: 24px 0 0; padding: 16px 0; border-block: 1px solid var(--border); list-style: none; }
    .community-promo li { display: flex; align-items: baseline; gap: 9px; margin-top: 9px; font-size: .87rem; }
    .community-promo li:first-child { margin-top: 0; }
    .community-promo li::before { color: var(--accent-text); content: '•'; }
    .promo-primary, .promo-secondary { display: flex; align-items: center; justify-content: center; min-height: 44px; border-radius: 8px; font-size: .88rem; font-weight: 750; }
    .promo-primary { margin-top: 24px; color: var(--on-accent); background: var(--accent); }
    .promo-primary:hover, .promo-primary:focus-visible { background: var(--accent-hover); }
    .promo-secondary { justify-content: flex-start; min-height: auto; margin-top: 16px; color: var(--muted); text-decoration: underline; text-underline-offset: 4px; }
    .promo-secondary:hover, .promo-secondary:focus-visible { color: var(--accent-text); }
    .related-section { margin-top: clamp(72px, 10vw, 128px); padding-block: clamp(64px, 8vw, 96px); border-block: 1px solid var(--border); }
    .related-section .section-heading { margin-bottom: 28px; }

    @media (max-width: 1023px) { .article-layout { grid-template-columns: 1fr; gap: 56px; } .article-sidebar { max-width: 560px; } .community-promo { position: static; } .article-sidebar :global([data-ad-placement='article-sidebar']) { display: none; } }
    @media (max-width: 720px) { .article-page { padding-top: 48px; } h1 { font-size: clamp(2.25rem, 10vw, 3rem); } .article-date { margin-top: 22px; } .article-figure { margin-top: 30px; } .article-figure img { max-height: none; } .article-prose { margin-top: 30px; font-size: 1.03rem; line-height: 1.78; } .article-footer { margin-top: 44px; } .community-promo { padding: 24px; } .related-section { margin-top: 72px; } }
</style>
