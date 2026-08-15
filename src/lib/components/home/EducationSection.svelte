<script lang="ts">
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';
    import { reveal } from '$lib/actions/reveal';

    let { posts, unavailable }: { posts: Post[]; unavailable?: string | null } = $props();

    const moduleLabel = (post: Post) => post.tags?.[0]?.name || 'Edukasi';
    const moduleNumber = (index: number) => String(index + 1).padStart(2, '0');
</script>

<section class="education-section" aria-labelledby="edukasi-pilihan">
    <div class="container education-layout">
        <header class="education-intro" use:reveal>
            <p class="section-label">Learning library</p>
            <h2 id="edukasi-pilihan">Edukasi pilihan</h2>
            <p>Bangun pemahaman tentang aset digital dan prinsip syariah, dari dasar hingga pembahasan lanjutan.</p>
            <a class="section-link" href="/edukasi">Semua Edukasi <span aria-hidden="true">→</span></a>
        </header>

        <div class="education-content">
            {#if posts.length}
                <ol class="module-list">
                    {#each posts.slice(0, 3) as post, index (post.id)}
                        <li>
                            <a class="module-row" use:reveal={{ delay: index * 80, distance: 16 }} href={`/artikel/${post.slug}`} aria-label={`Pelajari ${post.title}`}>
                                <span class="module-number" aria-hidden="true">{moduleNumber(index)}</span>
                                <div class="module-copy">
                                    <span class="module-category">{moduleLabel(post)}</span>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                </div>
                                <time datetime={post.publishedAt ?? post.createdAt}>
                                    {formatDate(post.publishedAt ?? post.createdAt)}
                                </time>
                                <span class="module-arrow" aria-hidden="true">→</span>
                            </a>
                        </li>
                    {/each}
                </ol>
            {:else}
                <StateMessage
                    title="Materi edukasi belum tersedia"
                    message={unavailable || 'Materi baru sedang disiapkan.'}
                    actionHref="/edukasi"
                />
            {/if}
        </div>
    </div>
</section>

<style>
    .education-section {
        padding-block: 88px 112px;
        background: var(--surface);
    }

    .education-layout {
        display: grid;
        grid-template-columns: minmax(240px, 0.72fr) minmax(0, 1.65fr);
        align-items: start;
        gap: clamp(48px, 8vw, 112px);
    }

    .education-intro {
        align-self: start;
    }

    /* The grid's height follows the article column, so sticky naturally stops at this section's end. */
    @media (min-width: 1024px) {
        .education-intro {
            position: sticky;
            top: calc(var(--header-height) + 32px);
        }
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

    .education-intro > p:last-of-type {
        margin: 16px 0 0;
        color: var(--muted);
    }

    .section-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 28px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--border-control);
        font-size: 0.88rem;
        font-weight: 700;
    }

    .section-link span,
    .module-arrow {
        transition: transform 180ms ease;
    }

    .section-link:hover span,
    .module-row:hover .module-arrow {
        transform: translateX(3px);
    }

    .module-list {
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--border-control);
        list-style: none;
    }

    .module-row {
        display: grid;
        grid-template-columns: 56px minmax(0, 1fr) 120px 18px;
        align-items: center;
        gap: 20px;
        min-height: 164px;
        padding-block: 24px;
        border-bottom: 1px solid var(--border);
        transition: background var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard);
    }

    .module-number {
        align-self: start;
        padding-top: 2px;
        color: var(--accent-text);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 0.85rem;
        font-weight: 700;
    }

    .module-copy {
        min-width: 0;
    }

    .module-category {
        color: var(--muted);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .module-copy h3 {
        margin: 8px 0 0;
        font-size: clamp(1.25rem, 2vw, 1.55rem);
        line-height: 1.2;
        letter-spacing: -0.035em;
        transition: color 180ms ease;
    }

    .module-row:hover, .module-row:focus-visible { background: color-mix(in srgb, var(--surface-selected) 40%, transparent); border-bottom-color: var(--border-control); }
    .module-row:hover h3, .module-row:focus-visible h3 {
        color: var(--accent-text);
        transform: translateX(2px);
    }

    .module-copy p {
        display: -webkit-box;
        margin: 10px 0 0;
        overflow: hidden;
        color: var(--muted);
        font-size: 0.9rem;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        transition: opacity var(--motion-micro) var(--ease-standard);
    }

    .module-row:hover .module-number, .module-row:focus-visible .module-number { color: var(--accent); }
    .module-row:hover .module-copy p, .module-row:focus-visible .module-copy p { opacity: 1; }

    .module-row time {
        color: var(--muted);
        font-size: 0.75rem;
        text-align: right;
    }

    .module-arrow {
        color: var(--muted);
    }

    @media (max-width: 880px) {
        .education-layout {
            grid-template-columns: 1fr;
            gap: 40px;
        }

        .education-intro {
            max-width: 560px;
        }
    }

    @media (max-width: 760px) {
        .education-section {
            padding-block: 64px 80px;
        }

        .education-layout {
            gap: 32px;
        }

        .module-row {
            grid-template-columns: 42px minmax(0, 1fr) 16px;
            gap: 12px;
            min-height: 138px;
            padding-block: 20px;
        }

        .module-copy p {
            -webkit-line-clamp: 1;
            line-clamp: 1;
        }

        .module-row time {
            grid-column: 2;
            color: var(--muted);
            font-size: 0.7rem;
            text-align: left;
        }

        .module-arrow {
            grid-column: 3;
            grid-row: 1 / span 2;
        }
    }

    @media (max-width: 420px) {
        .module-row {
            grid-template-columns: 34px minmax(0, 1fr) 14px;
            min-height: 126px;
            gap: 10px;
        }

        .module-copy h3 {
            font-size: 1.13rem;
        }

        .module-copy p {
            display: none;
        }
    }
</style>
