<script lang="ts">
  import "../app.css";
  import { getPostCoverUrl, getTokenLogoUrl } from "$lib/utils/assets";
  import type { Post, Token } from "$types/api";

  interface Props {
    data: {
      posts: Post[];
      tokens: Token[];
    };
  }

  let { data }: Props = $props();

  // Filter only 'news' section for top featured spots
  const filteredNews = $derived(data.posts.filter((p) => p.section?.toLowerCase() === "news" || p.section?.toLowerCase() === "berita"));
  
  const newsPosts = $derived.by(() => {
    let posts = [...filteredNews];
    if (posts.length > 0 && posts.length < 7) {
      while (posts.length < 7) {
        posts = [...posts, ...filteredNews].slice(0, 7);
      }
    }
    return posts;
  });

  const heroPost = $derived(newsPosts[0]);
  const sidebarPosts = $derived(newsPosts.slice(1, 4));
  const gridPosts = $derived(newsPosts.slice(4, 7));
  const tickerPosts = $derived(newsPosts.slice(0, 5));

  // Carousel for hero
  const carouselPosts = $derived(newsPosts.slice(0, 3));
  let currentSlide = $state(0);
  let autoplayInterval: ReturnType<typeof setInterval>;

  $effect(() => {
    if (carouselPosts.length > 1) {
      autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselPosts.length;
      }, 5000);
    }
    return () => clearInterval(autoplayInterval);
  });

  function goToSlide(index: number) {
    currentSlide = index;
    clearInterval(autoplayInterval);
    if (carouselPosts.length > 1) {
      autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselPosts.length;
      }, 5000);
    }
  }

  function timeAgo(dateStr: string): string {
    const now = new Date();
    const d = new Date(dateStr);
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}dtk lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)}mnt lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}hr lalu`;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }
</script>

<svelte:head>
  <title>CryptoSharia - News & Education Crypto Berperspektif Syariah</title>
  <meta
    name="description"
    content="Portal berita dan edukasi cryptocurrency dengan perspektif syariah Islam. Analisis token halal, haram, dan syubhat."
  />
</svelte:head>

<main class="news-page">
  <!-- Breaking News Ticker -->
  {#if tickerPosts.length > 0}
    <div class="container">
      <section class="ticker-bar" aria-label="Breaking News">
        <span class="ticker-label">
          <span class="pulse-dot"></span>
          TERKINI
        </span>
        <div class="ticker-scroll">
          <div class="ticker-track">
            {#each [1, 2] as _}
              {#each tickerPosts as post}
                <a href="/article/{post.slug}" class="ticker-item">
                  <span class="ticker-bullet">•</span>
                  {post.title}
                </a>
              {/each}
            {/each}
          </div>
        </div>
      </section>
    </div>
  {/if}

  <!-- Hero Section: Carousel + Sidebar -->
  {#if carouselPosts.length > 0}
    <div class="container">
      <section class="hero-layout">
        <!-- Main Carousel -->
        <div class="hero-carousel">
          <div class="carousel-track" style="transform: translateX(-{currentSlide * 100}%)">
            {#each carouselPosts as post}
              <a href="/article/{post.slug}" class="carousel-slide">
                <img
                  src={post.coverImage?.url ?? getPostCoverUrl(null)}
                  alt={post.title}
                  loading="lazy"
                />
                <div class="slide-overlay">
                  <span class="slide-section">{post.section}</span>
                  <h2>{post.title}</h2>
                  {#if post.excerpt}
                    <p class="slide-excerpt">{post.excerpt}</p>
                  {/if}
                  <div class="slide-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {#if post.publishedAt}
                      {timeAgo(post.publishedAt)}
                    {/if}
                  </div>
                </div>
              </a>
            {/each}
          </div>

          <!-- Indicators -->
          {#if carouselPosts.length > 1}
            <div class="carousel-dots">
              {#each carouselPosts as _, i}
                <button
                  class="dot {i === currentSlide ? 'active' : ''}"
                  onclick={() => goToSlide(i)}
                  aria-label="Slide {i + 1}"
                ></button>
              {/each}
            </div>
          {/if}

          <!-- Nav Arrows -->
          {#if carouselPosts.length > 1}
            <button class="carousel-arrow prev" onclick={() => goToSlide((currentSlide - 1 + carouselPosts.length) % carouselPosts.length)} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button class="carousel-arrow next" onclick={() => goToSlide((currentSlide + 1) % carouselPosts.length)} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          {/if}
        </div>

        <!-- Sidebar Headlines -->
        <div class="hero-sidebar">
          <h3 class="sidebar-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>
            </svg>
            Berita Lainnya
          </h3>
          {#each sidebarPosts as post, i}
            <a href="/article/{post.slug}" class="sidebar-item">
              <img
                src={post.coverImage?.url ?? getPostCoverUrl(null)}
                alt={post.title}
                class="sidebar-thumb"
                loading="lazy"
              />
              <div class="sidebar-text">
                <h4>{post.title}</h4>
                <span class="sidebar-meta">
                  {#if post.publishedAt}
                    {timeAgo(post.publishedAt)}
                  {/if}
                </span>
              </div>
            </a>
          {/each}
        </div>
      </section>
    </div>
  {/if}

  <!-- Grid Section -->
  {#if gridPosts.length > 0}
    <div class="container">
      <section class="grid-section">
        <div class="section-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
            Berita Terbaru
          </h3>
        </div>
        <div class="news-grid">
          {#each gridPosts as post}
            <a href="/article/{post.slug}" class="news-card">
              <div class="card-img-wrap">
                <img
                  src={post.coverImage?.url ?? getPostCoverUrl(null)}
                  alt={post.title}
                  loading="lazy"
                />
                <span class="card-section">{post.section}</span>
              </div>
              <div class="card-body">
                <h4>{post.title}</h4>
                {#if post.excerpt}
                  <p class="card-excerpt">{post.excerpt}</p>
                {/if}
                <div class="card-footer">
                  <span class="card-date">
                    {#if post.publishedAt}
                      {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    {/if}
                  </span>
                  <span class="read-more">
                    Baca
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </section>
    </div>
  {/if}

  <!-- Quick Screening Preview -->
  {#if data.tokens.length > 0}
    <div class="container">
      <section class="screening-preview">
        <div class="section-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>
            </svg>
            Screening Syariah
          </h3>
          <a href="/screening" class="view-all">
            Lihat Semua
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </a>
        </div>
        <div class="token-row">
          {#each data.tokens.slice(0, 8) as token}
            <a href="/tokens/{token.slug}" class="token-chip">
              <img
                src={token.logo?.url ?? getTokenLogoUrl(token.logo?.id)}
                alt={token.name}
                class="token-chip-logo"
              />
              <div class="token-chip-info">
                <span class="token-chip-ticker">{token.ticker}</span>
                <span class="token-chip-name">{token.name}</span>
              </div>
              <span class="token-chip-status {token.shariaStatus}">{token.shariaStatus}</span>
            </a>
          {/each}
        </div>
      </section>
    </div>
  {/if}

  <div class="container">
    <div class="divider"></div>
  </div>
</main>

<style>
  /* ===== Page ===== */
  .news-page {
    padding-bottom: 2rem;
  }

  .container {
    width: min(1200px, 100%);
    margin-inline: auto;
    padding-inline: 4vw;
  }

  /* ===== Breaking Ticker ===== */
  .ticker-bar {
    display: flex;
    align-items: center;
    background: var(--elev);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    margin: 1.25rem 0 1.5rem;
  }

  .ticker-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #e11d48, #be123c);
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 1px;
    padding: 0.75rem 1.25rem;
    white-space: nowrap;
    z-index: 2;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .ticker-scroll {
    flex: 1;
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 1rem, black calc(100% - 1rem), transparent);
  }

  .ticker-track {
    display: inline-flex;
    white-space: nowrap;
    animation: ticker-scroll 35s linear infinite;
  }

  .ticker-track:hover {
    animation-play-state: paused;
  }

  .ticker-item {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1.25rem;
    font-size: 0.88rem;
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .ticker-item:hover {
    color: var(--brand);
  }

  .ticker-bullet {
    color: var(--brand);
    font-size: 1.2rem;
  }

  @keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ===== Hero Layout ===== */
  .hero-layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }

  /* Carousel */
  .hero-carousel {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: var(--elev);
    border: 1px solid var(--border-color);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    height: 420px;
  }

  .carousel-slide {
    min-width: 100%;
    height: 100%;
    position: relative;
    display: block;
    text-decoration: none;
    color: white;
  }

  .carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-slide::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
  }

  .slide-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    z-index: 10;
  }

  .slide-section {
    display: inline-block;
    background: linear-gradient(135deg, var(--brand), var(--accent));
    color: #000;
    padding: 0.3rem 0.9rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
  }

  .slide-overlay h2 {
    font-size: 1.85rem;
    margin: 0 0 0.5rem;
    line-height: 1.25;
    font-weight: 800;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
    max-width: 90%;
  }

  .slide-excerpt {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 0.75rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 80%;
  }

  .slide-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.6);
  }

  /* Carousel Dots */
  .carousel-dots {
    position: absolute;
    bottom: 1.25rem;
    right: 2.5rem;
    display: flex;
    gap: 0.4rem;
    z-index: 20;
  }

  .dot {
    width: 28px;
    height: 3px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
  }

  .dot:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .dot.active {
    background: var(--brand);
    width: 40px;
  }

  /* Carousel Arrows */
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    opacity: 0;
  }

  .hero-carousel:hover .carousel-arrow {
    opacity: 1;
  }

  .carousel-arrow:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.05);
  }

  .carousel-arrow.prev {
    left: 1rem;
  }

  .carousel-arrow.next {
    right: 1rem;
  }

  /* Sidebar */
  .hero-sidebar {
    display: flex;
    flex-direction: column;
    gap: 0;
    background: var(--elev);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 1.25rem;
    overflow: hidden;
  }

  .sidebar-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.92rem;
    font-weight: 700;
    margin: 0 0 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--text);
  }

  .sidebar-title svg {
    color: var(--brand);
  }

  .sidebar-item {
    display: flex;
    gap: 0.85rem;
    padding: 0.85rem 0;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s;
  }

  .sidebar-item:last-child {
    border-bottom: none;
  }

  .sidebar-item:hover {
    background: rgba(252, 192, 0, 0.04);
    margin: 0 -1.25rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .sidebar-thumb {
    width: 80px;
    height: 64px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .sidebar-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    min-width: 0;
  }

  .sidebar-text h4 {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .sidebar-meta {
    font-size: 0.75rem;
    color: var(--muted);
  }

  /* ===== Grid Section ===== */
  .grid-section {
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

  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .news-card {
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

  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(252, 192, 0, 0.2);
  }

  .card-img-wrap {
    position: relative;
    overflow: hidden;
  }

  .card-img-wrap img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .news-card:hover .card-img-wrap img {
    transform: scale(1.03);
  }

  .card-section {
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

  .card-body {
    flex: 1;
    padding: 1.15rem 1.25rem;
    display: flex;
    flex-direction: column;
  }

  .card-body h4 {
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

  .card-excerpt {
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

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
  }

  .card-date {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--brand);
    transition: gap 0.2s;
  }

  .news-card:hover .read-more {
    gap: 0.5rem;
  }

  /* ===== Screening Preview ===== */
  .screening-preview {
    margin-bottom: 2rem;
  }

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--brand);
    text-decoration: none;
    transition: gap 0.2s;
  }

  .view-all:hover {
    gap: 0.55rem;
  }

  .token-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.85rem;
  }

  .token-chip {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1rem;
    background: var(--elev);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  .token-chip:hover {
    border-color: rgba(252, 192, 0, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .token-chip-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  .token-chip-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .token-chip-ticker {
    font-weight: 700;
    font-size: 0.88rem;
  }

  .token-chip-name {
    font-size: 0.72rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .token-chip-status {
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: capitalize;
    flex-shrink: 0;
  }

  .token-chip-status.halal {
    background: rgba(16, 185, 129, 0.12);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.25);
  }

  .token-chip-status.syubhat {
    background: rgba(245, 158, 11, 0.12);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.25);
  }

  .token-chip-status.haram {
    background: rgba(239, 68, 68, 0.12);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.25);
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-color), transparent);
    margin: 1rem 0;
  }

  /* ===== Responsive ===== */
  @media (max-width: 992px) {
    .hero-layout {
      grid-template-columns: 1fr;
    }

    .hero-sidebar {
      flex-direction: row;
      overflow-x: auto;
      gap: 1rem;
      padding: 1rem;
    }

    .sidebar-title {
      display: none;
    }

    .sidebar-item {
      flex-direction: column;
      min-width: 200px;
      border-bottom: none;
      padding: 0;
    }

    .sidebar-item:hover {
      margin: 0;
      padding: 0;
    }

    .sidebar-thumb {
      width: 100%;
      height: 120px;
      border-radius: 10px;
    }

    .token-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .carousel-track {
      height: 300px;
    }

    .slide-overlay {
      padding: 1.5rem;
    }

    .slide-overlay h2 {
      font-size: 1.3rem;
      max-width: 100%;
    }

    .slide-excerpt {
      display: none;
    }

    .carousel-dots {
      bottom: 1rem;
      right: 1.5rem;
    }

    .news-grid {
      grid-template-columns: 1fr;
    }

    .carousel-arrow {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .hero-sidebar {
      padding: 0.75rem;
    }

    .token-row {
      grid-template-columns: 1fr;
    }
  }
</style>
