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


    <!-- Categories -->
    <section class="section category-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div class="category-header">
                <h3 style="margin: 0; font-size: 1.8rem;">Eksplorasi Edukasi</h3>
                <p class="muted" style="margin: 0.5rem 0 0; font-size: 0.95rem;">Temukan ragam ilmu kripto terpercaya dari sudut pandang syariah.</p>
            </div>
            
            <div class="search-box">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--muted);"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    placeholder="Cari materi..."
                    bind:value={searchQuery}
                    onkeydown={handleSearch}
                    style="padding: 0.75rem 1rem 0.75rem 2.75rem; border-radius: 99px; border: 1px solid var(--border-color); background: var(--elev); color: var(--text); width: min(300px, 100%); transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.05);"
                />
            </div>
        </div>
        <div class="category-grid">
            {#each categories as cat}
                <a href="/education?category={cat.id}" class="category-card {cat.id}">
                    <div class="icon-wrapper">
                        <span class="icon">{cat.icon}</span>
                    </div>
                    <div class="content-wrapper">
                        <span class="name">{cat.name}</span>
                        <span class="desc">Jelajahi materi {cat.name.toLowerCase()}</span>
                    </div>
                    <div class="arrow">→</div>
                </a>
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
    .category-section {
        margin-top: 1rem;
        margin-bottom: 3rem;
    }
    .search-box {
        position: relative;
    }
    .search-box input:focus {
        outline: none;
        border-color: var(--brand);
        box-shadow: 0 0 0 3px rgba(252, 192, 0, 0.15);
    }
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
    }
    .category-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 1.25rem 1.5rem;
        text-decoration: none;
        color: var(--text);
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .category-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .category-card:hover {
        transform: translateY(-4px) scale(1.01);
        border-color: var(--brand);
        box-shadow: 0 12px 30px rgba(252, 192, 0, 0.1);
    }
    .category-card:hover::before {
        opacity: 1;
    }
    .category-card .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
        transition: all 0.3s ease;
    }
    .category-card.news .icon-wrapper { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.2); }
    .category-card.education .icon-wrapper { background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); }
    .category-card.research .icon-wrapper { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2); }
    .category-card.activity .icon-wrapper { background: rgba(245, 102, 10, 0.1); border-color: rgba(245, 102, 10, 0.2); }

    .category-card:hover .icon-wrapper {
        transform: scale(1.05) rotate(-5deg);
    }
    .category-card .icon {
        font-size: 1.75rem;
    }
    .category-card .content-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .category-card .name {
        font-weight: 700;
        font-size: 1.15rem;
        letter-spacing: -0.01em;
        margin-bottom: 0.15rem;
    }
    .category-card .desc {
        font-size: 0.85rem;
        color: var(--muted);
        line-height: 1.3;
    }
    .category-card .arrow {
        color: var(--muted);
        font-size: 1.25rem;
        font-weight: 300;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(-10px);
    }
    .category-card:hover .arrow {
        color: var(--brand);
        opacity: 1;
        transform: translateX(0);
    }
    @media (max-width: 768px) {
        .category-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
