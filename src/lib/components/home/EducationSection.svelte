<script lang="ts">
    import EditorialMedia from '$lib/components/EditorialMedia.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { reveal } from '$lib/actions/reveal';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';

    let { posts, unavailable }: { posts: Post[]; unavailable?: string | null } = $props();

    const moduleLabel = (post: Post) => post.tags?.[0]?.name || 'Edukasi';
</script>

<section class="education-section" aria-labelledby="edukasi-pilihan">
    <div class="container">
        <header class="education-header" use:reveal>
            <p class="section-label">Learning library</p>
            <div class="heading-row">
                <h2 id="edukasi-pilihan">Edukasi pilihan</h2>
                <a class="section-link" href="/edukasi">Semua Edukasi <span aria-hidden="true">→</span></a>
            </div>
            <p>Bangun pemahaman tentang aset digital dan prinsip syariah, dari dasar hingga pembahasan lanjutan.</p>
        </header>

        {#if posts.length}
            <div class="education-grid">
                {#each posts.slice(0, 3) as post, index (post.id)}
                    <article class="education-card" use:reveal={{ delay: index * 80, distance: 16 }}>
                        <a href={`/artikel/${post.slug}`} aria-label={`Pelajari ${post.title}`}>
                            <div class="card-media">
                                <EditorialMedia
                                    imageUrl={post.coverImage?.url}
                                    imageFilename={post.coverImage?.filename}
                                    imageAlt={`Sampul materi: ${post.title}`}
                                    label={moduleLabel(post)}
                                    width={post.coverImage?.width}
                                    height={post.coverImage?.height}
                                    eager={index === 0}
                                />
                            </div>
                            <div class="card-content">
                                <div class="card-meta">
                                    <span>{moduleLabel(post)}</span>
                                    <time datetime={post.publishedAt ?? post.createdAt}>
                                        {formatDate(post.publishedAt ?? post.createdAt)}
                                    </time>
                                </div>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                            </div>
                        </a>
                    </article>
                {/each}
            </div>
        {:else}
            <StateMessage
                title="Materi edukasi belum tersedia"
                message={unavailable || 'Materi baru sedang disiapkan.'}
                actionHref="/edukasi"
            />
        {/if}
    </div>
</section>

<style>
    .education-section {
        padding-block: 88px 104px;
        border-top: 1px solid var(--border);
        background: var(--surface);
    }

    .education-header {
        padding-bottom: 32px;
        border-bottom: 1px solid var(--border-control);
    }

    .section-label {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .heading-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 24px;
    }

    h2 {
        margin: 0;
        font-size: clamp(2rem, 3.5vw, 2.75rem);
        line-height: 1.08;
        letter-spacing: -0.045em;
    }

    .education-header > p:last-child {
        max-width: 620px;
        margin: 16px 0 0;
        color: var(--muted);
        line-height: 1.6;
    }

    .section-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--text);
        font-size: 0.88rem;
        font-weight: 700;
    }

    .section-link {
        flex: none;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--border-control);
    }

    .section-link span {
        transition: transform var(--motion-micro) var(--ease-standard);
    }

    .section-link:hover,
    .section-link:focus-visible {
        color: var(--accent-text);
    }

    .section-link:hover span,
    .section-link:focus-visible span {
        transform: translateX(3px);
    }

    .education-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 28px;
        margin-top: 32px;
        padding-bottom: 48px;
        border-bottom: 1px solid var(--border-control);
    }

    .education-card {
        min-width: 0;
    }

    .education-card > a {
        display: flex;
        height: 100%;
        flex-direction: column;
        padding: 4px;
        margin: -4px;
        border-radius: 16px;
        transition: background var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .education-card > a:hover,
    .education-card > a:focus-visible {
        background: color-mix(in srgb, var(--surface-selected) 38%, transparent);
        transform: translateY(-2px);
    }

    .card-media {
        overflow: hidden;
        border-radius: 14px;
        background: var(--surface-muted);
    }

    .card-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 16px 4px 4px;
    }

    .card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        color: var(--muted);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .card-meta span {
        color: var(--accent-text);
    }

    .card-meta time {
        letter-spacing: 0.04em;
    }

    h3 {
        display: -webkit-box;
        margin: 10px 0 0;
        overflow: hidden;
        color: var(--text);
        font-size: clamp(1.2rem, 1.8vw, 1.45rem);
        line-height: 1.18;
        letter-spacing: -0.035em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .education-card > a:hover h3,
    .education-card > a:focus-visible h3 {
        color: var(--accent-text);
    }

    .card-content > p {
        display: -webkit-box;
        margin: 12px 0 0;
        overflow: hidden;
        color: var(--muted);
        font-size: 0.92rem;
        line-height: 1.6;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }

    @media (prefers-reduced-motion: reduce) {
        .section-link:hover span,
        .section-link:focus-visible span,
        .education-card > a:hover,
        .education-card > a:focus-visible {
            transform: none;
        }
    }

    @media (max-width: 1023px) {
        .education-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 760px) {
        .education-section {
            padding-block: 64px 80px;
        }

        .education-header {
            padding-bottom: 28px;
        }

        .heading-row {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
        }

        .education-header > p:last-child {
            margin-top: 14px;
        }

        .education-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-top: 28px;
            padding-bottom: 40px;
        }

        h3 {
            font-size: 1.35rem;
        }
    }
</style>
