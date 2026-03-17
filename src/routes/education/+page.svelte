<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            posts: Post[];
            upcomingWebinars: Post[];
            pastWebinars: Post[];
        };
    }

    let { data }: Props = $props();

    const categories = [
        { id: "news", name: "News", icon: "📰" },
        { id: "education", name: "Education", icon: "📚" },
        { id: "research", name: "Research", icon: "🔍" },
        { id: "activity", name: "Activity", icon: "🎯" }
    ];

    let searchQuery = $state("");
    
    function handleSearch(e: Event) {
        if ((e as KeyboardEvent).key === "Enter") {
            const url = new URL(window.location.href);
            if (searchQuery) url.searchParams.set("q", searchQuery);
            else url.searchParams.delete("q");
            window.location.href = url.toString();
        }
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
    <!-- Featured Webinar -->
    {#if data.upcomingWebinars.length > 0}
        {@const featured = data.upcomingWebinars[0]}
        <section class="featured-webinar">
            <img
                src={getPostCoverUrl(featured.coverImage?.id)}
                alt={featured.title}
            />
            <div class="content">
                <span class="badge">Upcoming Webinar</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                {#if featured.externalLink}
                    <a
                        href={featured.externalLink}
                        class="btn primary"
                        target="_blank"
                        rel="noopener">▶ Watch Now</a
                    >
                {/if}
            </div>
        </section>
    {/if}

    <!-- Categories -->
    <section class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
            <h3 style="margin: 0;">Kategori Konten</h3>
            <div class="search-box">
                <input
                    type="text"
                    placeholder="Cari edukasi..."
                    bind:value={searchQuery}
                    onkeydown={handleSearch}
                    style="padding: 0.5rem 1rem; border-radius: 20px; border: 1px solid var(--border-color); background: var(--elev); color: var(--text);"
                />
            </div>
        </div>
        <div class="category-grid">
            {#each categories as cat}
                <a href="/education?category={cat.id}" class="category-card">
                    <span class="icon">{cat.icon}</span>
                    <span class="name">{cat.name}</span>
                </a>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Upcoming Webinars -->
    <section class="section">
        <h3>Upcoming Webinars</h3>
        <div class="grid">
            {#each data.upcomingWebinars as webinar}
                <article class="card">
                    <img
                        src={getPostCoverUrl(webinar.coverImage?.id)}
                        alt={webinar.title}
                        loading="lazy"
                    />
                    <div class="body">
                        <span class="kicker">Webinar</span>
                        <h4>{webinar.title}</h4>
                        {#if webinar.eventDate}
                            <p class="meta">
                                {new Date(webinar.eventDate).toLocaleDateString(
                                    "id-ID",
                                    {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )}
                            </p>
                        {/if}
                    </div>
                </article>
            {:else}
                <p class="muted">Tidak ada webinar mendatang.</p>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Past Webinars -->
    <section class="section">
        <h3>Past Webinars (Replay Available)</h3>
        <div class="grid">
            {#each data.pastWebinars as webinar}
                <article class="card">
                    <img
                        src={getPostCoverUrl(webinar.coverImage?.id)}
                        alt={webinar.title}
                        loading="lazy"
                    />
                    <div class="body">
                        <span class="kicker">Replay</span>
                        <h4>{webinar.title}</h4>
                        {#if webinar.externalLink}
                            <a
                                href={webinar.externalLink}
                                class="link"
                                target="_blank"
                                rel="noopener">▶ Tonton Ulang</a
                            >
                        {/if}
                    </div>
                </article>
            {:else}
                <p class="muted">Belum ada replay tersedia.</p>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Education Articles -->
    <section class="section">
        <h3>Artikel Edukasi</h3>
        <div class="grid">
            {#each data.posts as post}
                <a href="/article/{post.slug}" style="display: block; text-decoration: none; color: inherit; grid-column: span 12;" class="post-link">
                    <article class="card">
                        <img
                            src={post.coverImage?.url ?? getPostCoverUrl(post.coverImage?.id)}
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
    .featured-webinar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background: var(--elev);
        border-radius: var(--radius);
        overflow: hidden;
        margin-bottom: 2rem;
    }
    .featured-webinar img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    .featured-webinar .content {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .featured-webinar .badge {
        background: var(--accent);
        color: var(--bg);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        width: fit-content;
        margin-bottom: 1rem;
    }
    .featured-webinar h2 {
        margin: 0 0 1rem;
    }
    .btn.primary {
        background: var(--brand);
        color: var(--bg);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        width: fit-content;
        margin-top: 1rem;
    }
    .category-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }
    .category-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
        text-align: center;
        text-decoration: none;
        color: var(--text);
        transition:
            transform 0.2s,
            border-color 0.2s;
    }
    .category-card:hover {
        transform: translateY(-2px);
        border-color: var(--brand);
    }
    .category-card .icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    .category-card .name {
        font-weight: 600;
    }
    @media (max-width: 768px) {
        .featured-webinar {
            grid-template-columns: 1fr;
        }
        .category-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
