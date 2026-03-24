<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            streamed: {
                posts: Promise<Post[]>;
                heroVideo: Promise<Post | null>;
                webinars: Promise<{
                    upcoming: Post[];
                    past: Post[];
                }>;
            };
        };
    }

    let { data }: Props = $props();

    function getYoutubeEmbedUrl(url: string | null | undefined): string {
        if (!url) return '';
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }

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
    <title>Education · CryptoSharia News</title>
    <meta
        name="description"
        content="Pelajari cryptocurrency dan blockchain dari perspektif syariah Islam."
    />
</svelte:head>

<main class="edu-page">
    <!-- Page Header -->
    <div class="container">
        <section class="page-header">
            <div class="header-glow"></div>
            <span class="header-label">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
                PUSAT EDUKASI
            </span>
            <h1>Belajar <span class="text-brand">Crypto Syariah</span></h1>
            <p>Pelajari cryptocurrency dan blockchain dari perspektif syariah Islam</p>
        </section>
    </div>

    <!-- Hero Video -->
    {#await data.streamed.heroVideo}
        <div class="container">
            <section class="video-hero">
                <div class="video-card">
                    <div class="video-frame skeleton"></div>
                    <div class="video-info skeleton" style="opacity: 0.5;"></div>
                </div>
            </section>
        </div>
    {:then heroVideo}
        {#if heroVideo}
            <div class="container">
                <section class="video-hero">
                    <div class="video-card">
                        <div class="video-frame">
                            {#if heroVideo.externalLink}
                                <iframe 
                                    src={getYoutubeEmbedUrl(heroVideo.externalLink)} 
                                    title={heroVideo.title} 
                                    allowfullscreen 
                                    loading="lazy"
                                ></iframe>
                            {:else}
                                <img src={heroVideo.coverImage?.url ?? getPostCoverUrl(heroVideo.coverImage?.id)} alt={heroVideo.title} />
                            {/if}
                        </div>
                        <div class="video-info">
                            <span class="video-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5,3 19,12 5,21"/>
                                </svg>
                                Video Terbaru
                            </span>
                            <h2>{heroVideo.title}</h2>
                            <p class="video-date">
                                {#if heroVideo.publishedAt}
                                    {new Date(heroVideo.publishedAt).toLocaleDateString("id-ID", {
                                        weekday: "short",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                {/if}
                            </p>
                            {#if heroVideo.excerpt}
                                <p class="video-excerpt">{heroVideo.excerpt}</p>
                            {/if}
                            <div class="video-actions">
                                {#if heroVideo.externalLink}
                                    <a href={heroVideo.externalLink} target="_blank" rel="noopener noreferrer" class="btn-watch">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5,3 19,12 5,21"/>
                                        </svg>
                                        Tonton Sekarang
                                    </a>
                                {/if}
                                <a href="/article/{heroVideo.slug}" class="btn-detail">
                                    Lihat Detail
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        {/if}
    {/await}

    <!-- Education Articles -->
    <div class="container">
        <section class="content-section">
            <div class="section-header">
                <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    Artikel Edukasi
                </h3>
            </div>
            {#await data.streamed.posts}
                <div class="articles-grid">
                    {#each Array(6) as _}
                        <div class="article-card skeleton" style="height: 320px;"></div>
                    {/each}
                </div>
            {:then posts}
                <div class="articles-grid">
                    {#each posts as post}
                        <a href="/article/{post.slug}" class="article-card">
                            <div class="article-img-wrap">
                                <img
                                    src={post.coverImage?.url ?? getPostCoverUrl(post.coverImage?.id)}
                                    alt={post.title}
                                    loading="lazy"
                                />
                                <span class="article-section">{post.section}</span>
                            </div>
                            <div class="article-body">
                                <h4>{post.title}</h4>
                                {#if post.excerpt}
                                    <p class="article-excerpt">{post.excerpt}</p>
                                {/if}
                                <div class="article-footer">
                                    <span class="article-date">
                                        {#if post.publishedAt}
                                            {timeAgo(post.publishedAt)}
                                        {/if}
                                    </span>
                                    <span class="read-link">
                                        Baca
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                            <path d="M5 12h14m-7-7 7 7-7 7"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </a>
                    {:else}
                        <div class="empty-state">
                            <div class="empty-icon">📚</div>
                            <h4>Belum ada artikel edukasi</h4>
                            <p>Artikel akan segera hadir, nantikan!</p>
                        </div>
                    {/each}
                </div>
            {/await}
        </section>
    </div>    <!-- Webinars -->
    {#await data.streamed.webinars}
        <div class="container">
            <section class="content-section">
                <div class="section-header skeleton" style="width: 250px; height: 32px; margin-bottom: 1.25rem;"></div>
                <div class="webinar-grid">
                    {#each Array(3) as _}
                        <div class="webinar-card skeleton" style="height: 360px;"></div>
                    {/each}
                </div>
            </section>
        </div>
    {:then webinars}
        <!-- Upcoming Webinars -->
        {#if webinars.upcoming.length > 0}
            <div class="container">
                <section class="content-section">
                    <div class="section-header">
                        <h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                            </svg>
                            Webinar Akan Datang
                        </h3>
                    </div>
                    <div class="webinar-grid">
                        {#each webinars.upcoming as webinar}
                            <a href="/article/{webinar.slug}" class="webinar-card upcoming">
                                <div class="webinar-img-wrap">
                                    <img
                                        src={webinar.coverImage?.url ?? getPostCoverUrl(webinar.coverImage?.id)}
                                        alt={webinar.title}
                                        loading="lazy"
                                    />
                                    <span class="webinar-live-badge">
                                        <span class="live-dot"></span>
                                        UPCOMING
                                    </span>
                                </div>
                                <div class="webinar-body">
                                    <h4>{webinar.title}</h4>
                                    {#if webinar.eventDate}
                                        <div class="webinar-date">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                                            </svg>
                                            {new Date(webinar.eventDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <div class="webinar-time">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                                            </svg>
                                            {new Date(webinar.eventDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                        </div>
                                    {/if}
                                    {#if webinar.excerpt}
                                        <p class="webinar-excerpt">{webinar.excerpt}</p>
                                    {/if}
                                </div>
                            </a>
                        {/each}
                    </div>
                </section>
            </div>
        {/if}

        <!-- Past Webinars -->
        {#if webinars.past.length > 0}
            <div class="container">
                <section class="content-section">
                    <div class="section-header">
                        <h3>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Rekaman Webinar
                        </h3>
                    </div>
                    <div class="webinar-grid">
                        {#each webinars.past as webinar}
                            <a href="/article/{webinar.slug}" class="webinar-card past">
                                <div class="webinar-img-wrap">
                                    <img
                                        src={webinar.coverImage?.url ?? getPostCoverUrl(webinar.coverImage?.id)}
                                        alt={webinar.title}
                                        loading="lazy"
                                    />
                                    <span class="webinar-replay-badge">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5,3 19,12 5,21"/>
                                        </svg>
                                        REPLAY
                                    </span>
                                </div>
                                <div class="webinar-body">
                                    <h4>{webinar.title}</h4>
                                    {#if webinar.eventDate}
                                        <div class="webinar-date past-date">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                                            </svg>
                                            {new Date(webinar.eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    {/if}
                                    {#if webinar.excerpt}
                                        <p class="webinar-excerpt">{webinar.excerpt}</p>
                                    {/if}
                                </div>
                            </a>
                        {/each}
                    </div>
                </section>
            </div>
        {/if}
    {/await}/if}
</main>

<style>
    /* ===== Page ===== */
    .edu-page {
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

    /* ===== Video Hero ===== */
    .video-hero {
        margin-bottom: 2.5rem;
    }

    .video-card {
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        overflow: hidden;
        transition: box-shadow 0.3s;
    }

    .video-card:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .video-frame {
        position: relative;
        background: #000;
    }

    .video-frame iframe {
        width: 100%;
        height: 100%;
        min-height: 360px;
        border: none;
    }

    .video-frame img {
        width: 100%;
        height: 100%;
        min-height: 360px;
        object-fit: cover;
    }

    .video-info {
        padding: 2.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .video-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(225, 29, 72, 0.12);
        color: #e11d48;
        border: 1px solid rgba(225, 29, 72, 0.25);
        padding: 0.3rem 0.75rem;
        border-radius: 8px;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: fit-content;
        margin-bottom: 1rem;
    }

    .video-info h2 {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 0 0 0.75rem;
        line-height: 1.3;
    }

    .video-date {
        color: var(--muted);
        font-size: 0.85rem;
        margin: 0 0 0.5rem;
    }

    .video-excerpt {
        color: var(--muted);
        font-size: 0.9rem;
        line-height: 1.55;
        margin: 0 0 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .video-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .btn-watch {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        background: linear-gradient(135deg, #e11d48, #be123c);
        color: white;
        padding: 0.65rem 1.35rem;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.88rem;
        transition: all 0.2s;
    }

    .btn-watch:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(225, 29, 72, 0.35);
    }

    .btn-detail {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(255, 255, 255, 0.05);
        color: var(--text);
        border: 1px solid var(--border-color);
        padding: 0.65rem 1.35rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.88rem;
        text-decoration: none;
        transition: all 0.2s;
    }

    .btn-detail:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }

    /* ===== Content Section ===== */
    .content-section {
        margin-bottom: 2.5rem;
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

    /* ===== Articles Grid ===== */
    .articles-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
    }

    .article-card {
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

    .article-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        border-color: rgba(252, 192, 0, 0.2);
    }

    .article-img-wrap {
        position: relative;
        overflow: hidden;
    }

    .article-img-wrap img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .article-card:hover .article-img-wrap img {
        transform: scale(1.03);
    }

    .article-section {
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

    .article-body {
        flex: 1;
        padding: 1.15rem 1.25rem;
        display: flex;
        flex-direction: column;
    }

    .article-body h4 {
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

    .article-excerpt {
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

    .article-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 0.75rem;
        border-top: 1px solid var(--border-color);
    }

    .article-date {
        font-size: 0.75rem;
        color: var(--muted);
    }

    .read-link {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--brand);
        transition: gap 0.2s;
    }

    .article-card:hover .read-link {
        gap: 0.5rem;
    }

    /* ===== Webinar Grid ===== */
    .webinar-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 1.25rem;
    }

    .webinar-card {
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

    .webinar-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        border-color: rgba(252, 192, 0, 0.2);
    }

    .webinar-img-wrap {
        position: relative;
        overflow: hidden;
    }

    .webinar-img-wrap img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .webinar-card:hover .webinar-img-wrap img {
        transform: scale(1.03);
    }

    .webinar-live-badge {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(225, 29, 72, 0.9);
        backdrop-filter: blur(8px);
        color: white;
        padding: 0.3rem 0.7rem;
        border-radius: 8px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: white;
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }

    .webinar-replay-badge {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(8px);
        color: white;
        padding: 0.3rem 0.7rem;
        border-radius: 8px;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .webinar-body {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .webinar-body h4 {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .webinar-date {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--brand);
    }

    .webinar-date.past-date {
        color: var(--muted);
    }

    .webinar-time {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.82rem;
        color: var(--muted);
    }

    .webinar-excerpt {
        font-size: 0.85rem;
        color: var(--muted);
        line-height: 1.5;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
    @media (max-width: 992px) {
        .video-card {
            grid-template-columns: 1fr;
        }

        .video-frame iframe,
        .video-frame img {
            min-height: 250px;
        }

        .video-info {
            padding: 1.75rem;
        }
    }

    @media (max-width: 768px) {
        .page-header h1 {
            font-size: 2rem;
        }

        .articles-grid {
            grid-template-columns: 1fr;
        }

        .webinar-grid {
            grid-template-columns: 1fr;
        }

        .video-info h2 {
            font-size: 1.25rem;
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
