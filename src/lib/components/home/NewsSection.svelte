<script lang="ts">
    import EditorialMedia from '$lib/components/EditorialMedia.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';
    import { reveal } from '$lib/actions/reveal';

    let { posts, unavailable }: { posts: Post[]; unavailable?: string | null } = $props();

    const featured = $derived(posts[0]);
    const secondary = $derived(posts.slice(1, 4));
    const articleLabel = (post: Post) => post.tags?.[0]?.name || 'Berita';
</script>

<section class="news-section" aria-labelledby="berita-terbaru">
    <div class="container">
        <div class="news-layout" class:news-layout--with-sidebar={Boolean(featured)}>
            <div class="news-main">
                <header class="section-header" use:reveal>
                    <p class="section-label">Sorotan Redaksi</p>
                    <h2 id="berita-terbaru">Berita Pilihan</h2>
                    <p>Perkembangan ekonomi, pasar, dan aset digital yang relevan bagi investor kripto.</p>
                    <a class="section-link section-link-mobile" href="/berita">Semua Berita <span aria-hidden="true">→</span></a>
                </header>

                {#if featured}
                    <a class="featured-story" use:reveal={{ delay: 70 }} href={`/artikel/${featured.slug}`} aria-label={`Baca ${featured.title}`}>
                        <EditorialMedia
                            imageUrl={featured.coverImage?.url}
                            imageFilename={featured.coverImage?.filename}
                            imageAlt={`Sampul artikel ${featured.title}`}
                            label={articleLabel(featured)}
                            width={featured.coverImage?.width}
                            height={featured.coverImage?.height}
                            eager
                        />
                        <div class="featured-copy">
                            <div class="story-meta">
                                <span>{articleLabel(featured)}</span>
                                <time datetime={featured.publishedAt ?? featured.createdAt}>
                                    {formatDate(featured.publishedAt ?? featured.createdAt)}
                                </time>
                            </div>
                            <h3>{featured.title}</h3>
                            <p>{featured.excerpt}</p>
                            <span class="read-link">Baca analisis <span aria-hidden="true">→</span></span>
                        </div>
                    </a>
                {:else}
                    <StateMessage
                        title="Berita belum tersedia"
                        message={unavailable || 'Konten berita akan segera ditambahkan.'}
                        actionHref="/berita"
                    />
                {/if}
            </div>

            {#if featured}
                <aside class="news-sidebar" aria-label="Berita pilihan lainnya">
                    <div class="news-sidebar-sticky">
                        <a class="section-link" href="/berita">Semua Berita <span aria-hidden="true">→</span></a>
                        <div class="secondary-stories" aria-label="Berita pilihan lainnya">
                            {#each secondary as post (post.id)}
                                <a class="story-row" use:reveal={{ delay: 100 + secondary.indexOf(post) * 70, distance: 16 }} href={`/artikel/${post.slug}`} aria-label={`Baca ${post.title}`}>
                                    <div class="row-media">
                                        <EditorialMedia
                                            imageUrl={post.coverImage?.url}
                                            imageFilename={post.coverImage?.filename}
                                            imageAlt={`Sampul artikel ${post.title}`}
                                            label={articleLabel(post)}
                                            width={post.coverImage?.width}
                                            height={post.coverImage?.height}
                                            compact
                                        />
                                    </div>
                                    <div class="row-copy">
                                        <div class="story-meta">
                                            <span>{articleLabel(post)}</span>
                                            <time datetime={post.publishedAt ?? post.createdAt}>
                                                {formatDate(post.publishedAt ?? post.createdAt)}
                                            </time>
                                        </div>
                                        <h3>{post.title}</h3>
                                    </div>
                                    <span class="row-arrow" aria-hidden="true">→</span>
                                </a>
                            {/each}
                        </div>
                    </div>
                </aside>
            {/if}
        </div>
    </div>
</section>

<style>
    .news-section {
        padding-block: 84px 88px;
        border-top: 1px solid var(--border);
        background: var(--surface);
    }

    .section-header {
        margin-bottom: 40px;
    }

    .section-label {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    h2 {
        margin: 0;
        font-size: clamp(2rem, 3.5vw, 2.75rem);
        line-height: 1.08;
        letter-spacing: -0.045em;
    }

    .section-header > p:last-of-type {
        max-width: 520px;
        margin: 12px 0 0;
        color: var(--muted);
    }

    .section-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding-block: 4px;
        border-bottom: 1px solid var(--border-control);
        font-size: 0.88rem;
        font-weight: 700;
    }

    .section-link-mobile {
        display: none;
        margin-top: 24px;
    }

    .section-link span,
    .read-link span {
        transition: transform var(--motion-micro) var(--ease-standard);
    }

    .section-link:hover span,
    .section-link:focus-visible span,
    .featured-story:hover .read-link span,
    .featured-story:focus-visible .read-link span {
        transform: translateX(3px);
    }

    .news-layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
    }

    .news-layout--with-sidebar {
        grid-template-columns: minmax(0, 1.7fr) minmax(330px, 1fr);
        gap: clamp(32px, 4vw, 56px);
    }

    .featured-story {
        min-width: 0;
    }

    .news-sidebar {
        min-width: 0;
        padding-top: 30px;
    }

    .news-sidebar-sticky {
        position: sticky;
        top: calc(var(--header-height) + 24px);
    }

    .featured-story :global(.editorial-media) { overflow: hidden; }
    .featured-story :global(.editorial-media img) {
        transform: scale(1);
        transition: transform var(--motion-ui) var(--ease-out);
    }
    .featured-story:hover :global(.editorial-media img),
    .featured-story:focus-visible :global(.editorial-media img) { transform: scale(1.03); }

    .featured-copy {
        padding-top: 24px;
    }

    .story-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 14px;
        color: var(--muted);
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .story-meta span {
        color: var(--accent-text);
        font-weight: 700;
    }

    .featured-story h3 {
        max-width: 720px;
        margin: 12px 0 0;
        font-size: clamp(1.75rem, 3vw, 2.5rem);
        line-height: 1.13;
        letter-spacing: -0.045em;
        text-wrap: balance;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .featured-story:hover h3,
    .featured-story:focus-visible h3,
    .story-row:hover h3,
    .story-row:focus-visible h3 {
        color: var(--accent-text);
    }

    .featured-copy > p {
        display: -webkit-box;
        max-width: 650px;
        margin: 16px 0 0;
        overflow: hidden;
        color: var(--muted);
        line-height: 1.65;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    .read-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 24px;
        font-size: 0.84rem;
        font-weight: 700;
    }

    .secondary-stories {
        margin-top: 18px;
        border-top: 1px solid var(--border);
    }

    .story-row {
        display: grid;
        grid-template-columns: 136px minmax(0, 1fr) 18px;
        align-items: center;
        gap: 18px;
        min-height: 152px;
        padding-block: 20px;
        border-bottom: 1px solid var(--border);
        transition: background var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard);
    }

    .story-row:hover, .story-row:focus-visible { background: color-mix(in srgb, var(--surface-muted) 52%, transparent); border-bottom-color: var(--border-control); }
    .row-media { overflow: hidden; }
    .row-media :global(img) { transition: transform var(--motion-ui) var(--ease-out); }
    .story-row:hover .row-media :global(img), .story-row:focus-visible .row-media :global(img) { transform: scale(1.035); }

    .row-copy {
        min-width: 0;
    }

    .row-copy .story-meta {
        display: grid;
        gap: 4px;
    }

    .row-copy h3 {
        display: -webkit-box;
        margin: 10px 0 0;
        overflow: hidden;
        font-size: clamp(1rem, 1.5vw, 1.15rem);
        line-height: 1.3;
        letter-spacing: -0.025em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .row-arrow {
        color: var(--muted);
        transition: color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .story-row:hover .row-arrow,
    .story-row:focus-visible .row-arrow {
        color: var(--text);
        transform: translateX(3px);
    }

    @media (prefers-reduced-motion: reduce) {
        .section-link:hover span,
        .section-link:focus-visible span,
        .featured-story:hover .read-link span,
        .featured-story:focus-visible .read-link span,
        .story-row:hover .row-arrow,
        .story-row:focus-visible .row-arrow,
        .featured-story:hover :global(.editorial-media img),
        .featured-story:focus-visible :global(.editorial-media img),
        .story-row:hover .row-media :global(img),
        .story-row:focus-visible .row-media :global(img) {
            transform: none;
        }
    }

    @media (min-width: 900px) and (max-width: 1100px) {
        .news-layout--with-sidebar {
            grid-template-columns: minmax(0, 1.35fr) minmax(300px, 1fr);
            gap: 32px;
        }

        .story-row {
            grid-template-columns: 112px minmax(0, 1fr) 16px;
            min-height: 132px;
            gap: 14px;
        }
    }

    @media (max-width: 899px) {
        .news-section {
            padding-block: 72px 64px;
        }

        .section-header { margin-bottom: 32px; }

        .section-link-mobile { display: inline-flex; }

        .news-layout--with-sidebar {
            grid-template-columns: 1fr;
            gap: 40px;
        }

        .news-sidebar {
            padding-top: 0;
        }

        .news-sidebar-sticky {
            position: static;
        }

        .news-sidebar .section-link {
            display: none;
        }

        .featured-copy {
            padding-top: 20px;
        }

        .featured-story h3 {
            font-size: clamp(1.65rem, 7vw, 2.1rem);
        }

        .secondary-stories {
            margin-top: 0;
            border-top-color: var(--border-control);
        }

        .story-row {
            grid-template-columns: 112px minmax(0, 1fr) 16px;
            min-height: 126px;
            padding-block: 16px;
        }

        .row-copy .story-meta time {
            display: none;
        }
    }

    @media (max-width: 420px) {
        .story-row {
            grid-template-columns: 92px minmax(0, 1fr) 14px;
            min-height: 110px;
            gap: 12px;
        }

        .row-copy h3 {
            font-size: 0.98rem;
            -webkit-line-clamp: 3;
            line-clamp: 3;
        }

        .row-arrow {
            font-size: 0.86rem;
        }
    }
</style>
