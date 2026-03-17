<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            posts: Post[];
            heroVideo?: Post | null;
            upcomingWebinars: Post[];
            pastWebinars: Post[];
        };
    }

    let { data }: Props = $props();

    function getYoutubeEmbedUrl(url: string | null | undefined): string {
        if (!url) return '';
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }
</script>

<svelte:head>
    <title>Education · CryptoSharia News</title>
    <meta
        name="description"
        content="Pelajari cryptocurrency dan blockchain dari perspektif syariah Islam."
    />
</svelte:head>

<main class="container">
    {#if data.heroVideo}
        <section class="section video-hero">
            <div class="video-card">
                <!-- Fallback to a placeholder cover image if externalLink is not provided -->
                {#if data.heroVideo.externalLink}
                    <iframe 
                        src={getYoutubeEmbedUrl(data.heroVideo.externalLink)} 
                        title={data.heroVideo.title} 
                        allowfullscreen 
                        loading="lazy"
                    ></iframe>
                {:else}
                    <img src={data.heroVideo.coverImage?.url ?? getPostCoverUrl(data.heroVideo.coverImage?.id)} alt={data.heroVideo.title} style="width: 100%; height: 100%; object-fit: cover;" />
                {/if}
                <div class="video-info">
                    <h2>{data.heroVideo.title}</h2>
                    <p>
                        Uploaded on 
                        {#if data.heroVideo.publishedAt}
                            {new Date(data.heroVideo.publishedAt).toLocaleDateString("id-ID", {
                                weekday: "short",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        {/if}
                    </p>
                    <div class="video-buttons">
                        {#if data.heroVideo.externalLink}
                            <a href={data.heroVideo.externalLink} target="_blank" rel="noopener noreferrer" class="btn-watch">▶ Watch Now</a>
                        {/if}
                        <a href="/article/{data.heroVideo.slug}" class="btn-detail" style="text-decoration: none; text-align: center; display: flex; align-items: center; justify-content: center;">Details</a>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="divider"></div>
    {/if}

    <!-- Education Articles -->
    <section class="section">
        <h3>Artikel Edukasi</h3>
        <div class="grid">
            {#each data.posts as post}
                <a
                    href="/article/{post.slug}"
                    style="display: block; text-decoration: none; color: inherit; grid-column: span 12;"
                    class="post-link"
                >
                    <article class="card">
                        <img
                            src={post.coverImage?.url ??
                                getPostCoverUrl(post.coverImage?.id)}
                            alt={post.title}
                            loading="lazy"
                        />
                        <div class="body">
                            <span class="kicker">{post.section}</span>
                            <h4>{post.title}</h4>
                            {#if post.excerpt}
                                <p>{post.excerpt}</p>
                            {/if}
                        </div>
                    </article>
                </a>
            {:else}
                <p class="muted">Belum ada artikel edukasi.</p>
            {/each}
        </div>
    </section>
</main>

<style>
    /* Video Hero Styles */
    .video-hero {
        margin-top: 1rem;
    }
    .video-card {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 0;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .video-card iframe {
        width: 100%;
        height: 100%;
        min-height: 380px;
        border: none;
        background: #000;
    }
    .video-info {
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .video-info h2 {
        font-size: 1.8rem;
        margin: 0 0 1rem 0;
        line-height: 1.3;
    }
    .video-info p {
        color: var(--muted);
        margin-bottom: 2rem;
        font-size: 0.95rem;
    }
    .video-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
    .btn-watch {
        background: #e11d48;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.2s;
    }
    .btn-watch:hover {
        background: #be123c;
    }
    .btn-detail {
        background: rgba(255,255,255,0.05);
        color: var(--text);
        border: 1px solid var(--border-color);
        padding: 0.75rem 1.75rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    .btn-detail:hover {
        background: rgba(255,255,255,0.1);
    }

    @media (max-width: 992px) {
        .video-card {
            grid-template-columns: 1fr;
        }
        .video-card iframe {
            min-height: 250px;
        }
        .video-info {
            padding: 2rem;
        }
    }
</style>


