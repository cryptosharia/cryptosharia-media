<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            posts: Post[];
        };
    }

    let { data }: Props = $props();

    const featuredPost = $derived(data.posts[0]);
    const gridPosts = $derived(data.posts.slice(1));

    function timeAgo(dateStr: string): string {
        const now = new Date();
        const d = new Date(dateStr);
        const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
        if (diff < 3600) return `${Math.floor(diff / 60)}mnt lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}jam lalu`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}hr lalu`;
        return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    }
</script>

<svelte:head>
    <title>Research · CryptoSharia News</title>
    <meta
        name="description"
        content="Riset mendalam tentang cryptocurrency dari perspektif syariah, teknologi, dan studi kasus pasar."
    />
</svelte:head>

<main class="research-page">
    <!-- Page Header -->
    <div class="container">
        <section class="page-header">
            <div class="header-glow"></div>
            <span class="header-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                RISET & ANALISIS
            </span>
            <h1>Research <span class="text-brand">Mendalam</span></h1>
            <p>Studi dan analisis cryptocurrency dari perspektif syariah, teknologi, dan fundamental pasar</p>
        </section>
    </div>

    <!-- Featured Research -->
    {#if featuredPost}
        <div class="container">
            <section class="featured-section">
                <a href="/article/{featuredPost.slug}" class="featured-card">
                    <div class="featured-img-wrap">
                        <img
                            src={featuredPost.coverImage?.url ?? getPostCoverUrl(featuredPost.coverImage?.id)}
                            alt={featuredPost.title}
                            loading="lazy"
                        />
                        <span class="featured-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            RISET TERBARU
                        </span>
                    </div>
                    <div class="featured-body">
                        <span class="featured-section-tag">{featuredPost.section}</span>
                        <h2>{featuredPost.title}</h2>
                        {#if featuredPost.excerpt}
                            <p class="featured-excerpt">{featuredPost.excerpt}</p>
                        {/if}
                        <div class="featured-footer">
                            <span class="featured-date">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                                </svg>
                                {#if featuredPost.publishedAt}
                                    {timeAgo(featuredPost.publishedAt)}
                                {/if}
                            </span>
                            <span class="featured-read">
                                Baca Riset
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </a>
            </section>
        </div>
    {/if}

    <!-- Research Grid -->
    <div class="container">
        <section class="content-section">
            {#if gridPosts.length > 0}
                <div class="section-header">
                    <h3>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8m2-8H8"/>
                        </svg>
                        Semua Riset
                    </h3>
                    <span class="results-count">{data.posts.length} artikel</span>
                </div>
            {/if}
            <div class="research-grid">
                {#each gridPosts as post}
                    <a href="/article/{post.slug}" class="research-card">
                        <div class="rc-img-wrap">
                            <img
                                src={post.coverImage?.url ?? getPostCoverUrl(post.coverImage?.id)}
                                alt={post.title}
                                loading="lazy"
                            />
                            <span class="rc-section">{post.section}</span>
                        </div>
                        <div class="rc-body">
                            <h4>{post.title}</h4>
                            {#if post.excerpt}
                                <p class="rc-excerpt">{post.excerpt}</p>
                            {/if}
                            <div class="rc-footer">
                                <span class="rc-date">
                                    {#if post.publishedAt}
                                        {timeAgo(post.publishedAt)}
                                    {/if}
                                </span>
                                <span class="rc-read">
                                    Baca
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </a>
                {:else}
                    {#if !featuredPost}
                        <div class="empty-state">
                            <div class="empty-icon">🔬</div>
                            <h4>Belum ada riset</h4>
                            <p>Riset dan analisis mendalam akan segera hadir</p>
                        </div>
                    {/if}
                {/each}
            </div>
        </section>
    </div>
</main>

<style>
    /* ===== Page ===== */
    .research-page {
        padding-bottom: 100px;
    }

    .container {
        width: min(1200px, 100%);
        margin-inline: auto;
        padding-inline: 4vw;
    }

    /* ===== Page Header ===== */
    .page-header {
        position: relative;
        text-align: center;
        padding: 3rem 2rem 2rem;
        margin-bottom: 2rem;
        border-radius: 24px;
        background: linear-gradient(135deg, rgba(252, 192, 0, 0.05) 0%, rgba(245, 102, 10, 0.05) 100%);
        border: 1px solid var(--border-color);
        overflow: hidden;
    }

    .header-glow {
        position: absolute;
        top: -50%;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(252, 192, 0, 0.1) 0%, transparent 70%);
        pointer-events: none;
    }

    .header-label {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 1.5px;
        color: var(--brand);
        margin-bottom: 0.75rem;
        position: relative;
    }

    .page-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin: 0 0 0.5rem;
        letter-spacing: -0.5px;
        position: relative;
    }

    .text-brand {
        background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .page-header p {
        color: var(--muted);
        font-size: 1.05rem;
        margin: 0;
        position: relative;
    }

    /* ===== Featured Card ===== */
    .featured-section {
        margin-bottom: 2.5rem;
    }

    .featured-card {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .featured-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }

    .featured-img-wrap {
        position: relative;
        overflow: hidden;
    }

    .featured-img-wrap img {
        width: 100%;
        height: 100%;
        min-height: 320px;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .featured-card:hover .featured-img-wrap img {
        transform: scale(1.03);
    }

    .featured-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: linear-gradient(135deg, var(--brand), var(--accent));
        color: #000;
        padding: 0.35rem 0.9rem;
        border-radius: 8px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .featured-body {
        padding: 2.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .featured-section-tag {
        display: inline-block;
        background: rgba(252, 192, 0, 0.1);
        color: var(--brand);
        border: 1px solid rgba(252, 192, 0, 0.2);
        padding: 0.25rem 0.7rem;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: fit-content;
        margin-bottom: 1rem;
    }

    .featured-body h2 {
        font-size: 1.65rem;
        font-weight: 800;
        margin: 0 0 0.75rem;
        line-height: 1.3;
    }

    .featured-excerpt {
        color: var(--muted);
        font-size: 0.92rem;
        line-height: 1.6;
        margin: 0 0 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .featured-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }

    .featured-date {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.82rem;
        color: var(--muted);
    }

    .featured-read {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--brand);
        transition: gap 0.2s;
    }

    .featured-card:hover .featured-read {
        gap: 0.55rem;
    }

    /* ===== Content Section ===== */
    .content-section {
        margin-bottom: 2rem;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
    }

    .section-header h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0;
    }

    .section-header h3 svg {
        color: var(--brand);
    }

    .results-count {
        font-size: 0.82rem;
        color: var(--muted);
        font-weight: 500;
    }

    /* ===== Research Grid ===== */
    .research-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
    }

    .research-card {
        display: flex;
        flex-direction: column;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }

    .research-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        border-color: rgba(252, 192, 0, 0.2);
    }

    .rc-img-wrap {
        position: relative;
        overflow: hidden;
    }

    .rc-img-wrap img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .research-card:hover .rc-img-wrap img {
        transform: scale(1.03);
    }

    .rc-section {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        color: white;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-size: 0.68rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .rc-body {
        flex: 1;
        padding: 1.15rem 1.25rem;
        display: flex;
        flex-direction: column;
    }

    .rc-body h4 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .rc-excerpt {
        font-size: 0.85rem;
        color: var(--muted);
        line-height: 1.5;
        margin: 0 0 0.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
    }

    .rc-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-color);
    }

    .rc-date {
        font-size: 0.75rem;
        color: var(--muted);
    }

    .rc-read {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--brand);
        transition: gap 0.2s;
    }

    .research-card:hover .rc-read {
        gap: 0.5rem;
    }

    /* ===== Empty State ===== */
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .empty-state h4 {
        margin: 0 0 0.5rem;
        font-size: 1.15rem;
    }

    .empty-state p {
        color: var(--muted);
        margin: 0;
    }

    /* ===== Responsive ===== */
    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }

        .featured-card {
            grid-template-columns: 1fr;
        }

        .featured-img-wrap img {
            min-height: 220px;
        }

        .featured-body {
            padding: 1.5rem;
        }

        .featured-body h2 {
            font-size: 1.3rem;
        }

        .research-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .page-header {
            padding: 2rem 1.25rem 1.5rem;
        }

        .page-header h1 {
            font-size: 1.6rem;
        }
    }
</style>
