<script lang="ts">
    import "../../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post, PostDetail } from "$types/api";

    interface Props {
        data: {
            post: PostDetail | null;
            relatedPosts: Post[];
        };
    }

    let { data }: Props = $props();

    let parsedContent = $state("");

    $effect(() => {
        if (data.post?.content) {
            Promise.all([
                import("marked").then((m) => m.marked),
                import("dompurify").then((m) => m.default),
            ]).then(([marked, DOMPurify]) => {
                const rawHtml = marked.parse(data.post!.content);
                parsedContent = DOMPurify.sanitize(rawHtml as string);
            });
        }
    });
</script>

<svelte:head>
    {#if data.post}
        <title>{data.post.title} · CryptoSharia</title>
        <meta name="description" content={data.post.excerpt ?? ""} />
    {:else}
        <title>Artikel Tidak Ditemukan · CryptoSharia</title>
    {/if}
</svelte:head>



<main class="container article-page">
    {#if data.post}
        <a href="/" class="back-link">← Kembali ke Beranda</a>

        <article class="article">
            <header class="article-header">
                <span class="kicker">{data.post.section}</span>
                <h1>{data.post.title}</h1>
                {#if data.post.publishedAt}
                    <time datetime={data.post.publishedAt}>
                        {new Date(data.post.publishedAt).toLocaleDateString(
                            "id-ID",
                            {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            },
                        )}
                    </time>
                {/if}
            </header>

            <img
                class="cover"
                src={data.post.coverImage?.url ?? getPostCoverUrl(data.post.coverImage?.id)}
                alt={data.post.title}
            />

            <div class="article-content markdown-body">
                {#if data.post.content}
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html parsedContent}
                {:else}
                    <p class="excerpt">{data.post.excerpt}</p>
                    <p class="muted">
                        Konten lengkap artikel ini belum tersedia.
                    </p>
                {/if}
            </div>
        </article>

        {#if data.relatedPosts.length > 0}
            <section class="related-section">
                <h3>Artikel Terkait</h3>
                <div class="related-grid">
                    {#each data.relatedPosts as post}
                        <a href="/article/{post.slug}" class="related-card">
                            <img
                                src={post.coverImage?.url ?? getPostCoverUrl(post.coverImage?.id)}
                                alt={post.title}
                            />
                            <div class="info">
                                <span class="kicker">{post.section}</span>
                                <h4>{post.title}</h4>
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {/if}
    {:else}
        <div class="not-found">
            <h1>Artikel Tidak Ditemukan</h1>
            <p>Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
            <a href="/" class="btn">Kembali ke Beranda</a>
        </div>
    {/if}
</main>

<style>
    .article-page {
        max-width: 800px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .back-link {
        display: inline-block;
        color: var(--brand);
        text-decoration: none;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
    }
    .article-header {
        margin-bottom: 2rem;
    }
    .article-header .kicker {
        color: var(--accent);
        text-transform: uppercase;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }
    .article-header h1 {
        margin: 0.5rem 0;
        font-size: 2rem;
        line-height: 1.3;
    }
    .article-header time {
        color: var(--text-muted);
        font-size: 0.875rem;
    }
    .cover {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: var(--radius);
        margin-bottom: 2rem;
    }
    .article-content {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--text);
    }
    .article-content .excerpt {
        font-size: 1.25rem;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 1.5rem;
    }
    .related-section {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
    }
    .related-section h3 {
        margin-bottom: 1.5rem;
    }
    .related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }
    .related-card {
        background: var(--elev);
        border-radius: var(--radius);
        overflow: hidden;
        text-decoration: none;
        color: var(--text);
        transition: transform 0.2s;
    }
    .related-card:hover {
        transform: translateY(-4px);
    }
    .related-card img {
        width: 100%;
        height: 120px;
        object-fit: cover;
    }
    .related-card .info {
        padding: 1rem;
    }
    .related-card .kicker {
        color: var(--accent);
        text-transform: uppercase;
        font-size: 0.65rem;
        font-weight: 600;
    }
    .related-card h4 {
        margin: 0.25rem 0 0;
        font-size: 0.875rem;
        line-height: 1.4;
    }
    .not-found {
        text-align: center;
        padding: 4rem 2rem;
    }
    .not-found h1 {
        margin-bottom: 1rem;
    }
    .not-found .btn {
        display: inline-block;
        margin-top: 1.5rem;
        background: var(--brand);
        color: var(--bg);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
    }
    @media (max-width: 768px) {
        .related-grid {
            grid-template-columns: 1fr;
        }
        .cover {
            height: 250px;
        }
    }
</style>
