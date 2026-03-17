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
  
  // Pad the array if we have at least 1 post but less than 7 total required slots
  const newsPosts = $derived.by(() => {
    let posts = [...filteredNews];
    if (posts.length > 0 && posts.length < 7) {
      while (posts.length < 7) {
        posts = [...posts, ...filteredNews].slice(0, 7);
      }
    }
    return posts;
  });

  const carouselPosts = $derived(newsPosts.slice(0, 3));
  const breakingNewsPost = $derived(newsPosts[3]); // 4th news item overall
  const gridPosts = $derived(newsPosts.slice(4, 7)); // Show 3 items in grid to balance the layout

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
</script>

<svelte:head>
  <title>CryptoSharia - News & Education Crypto Berperspektif Syariah</title>
  <meta
    name="description"
    content="Portal berita dan edukasi cryptocurrency dengan perspektif syariah Islam. Analisis token halal, haram, dan syubhat."
  />
</svelte:head>

<main class="container">
  <!-- Berita Terkini Section -->
  <section class="section">
    <!-- Carousel Section -->
    {#if carouselPosts.length > 0}
      <div class="carousel-container">
        <div
          class="carousel-track"
          style="transform: translateX(-{currentSlide * 100}%)"
        >
          {#each carouselPosts as post}
            <a href="/article/{post.slug}" class="carousel-slide">
              <img
                src={post.coverImage?.url ?? getPostCoverUrl(null)}
                alt={post.title}
                loading="lazy"
              />
              <div class="carousel-overlay">
                <span class="carousel-kicker">{post.section}</span>
                <h2>{post.title}</h2>
                <div class="carousel-meta">
                  {#if post.publishedAt}
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  {/if}
                </div>
              </div>
            </a>
          {/each}
        </div>

        {#if carouselPosts.length > 1}
          <div class="carousel-indicators">
            {#each carouselPosts as _, i}
              <button
                class="indicator {i === currentSlide ? 'active' : ''}"
                onclick={() => goToSlide(i)}
                aria-label="Go to slide {i + 1}"
              ></button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Breaking News Ticker -->
    {#if carouselPosts.length > 0}
      <section class="breaking" aria-label="Breaking News">
        <span class="label">Breaking</span>
        <div class="ticker" aria-live="polite" aria-atomic="true">
          <div class="track">
            <!-- Render the list twice to create a seamless infinite scroll effect -->
            {#each [1, 2] as _}
              {#each carouselPosts as post}
                <span class="item">
                  • <a href="/article/{post.slug}">{post.title}</a>
                </span>
              {/each}
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- Featured Breaking News Card -->
    {#if breakingNewsPost}
      <section class="section breaking-news" style="margin-top: 2rem;">
        <h3>Breaking News</h3>
        <a href="/article/{breakingNewsPost.slug}" style="text-decoration: none; color: inherit; display: block;">
          <div class="breaking-card">
            <img 
              src={breakingNewsPost.coverImage?.url ?? getPostCoverUrl(null)} 
              alt={breakingNewsPost.title}
              loading="lazy"
            >
            <div class="body">
              <span class="kicker">{breakingNewsPost.section}</span>
              <h4>{breakingNewsPost.title}</h4>
              <div class="row">
                <span>
                  {#if breakingNewsPost.publishedAt}
                    {new Date(breakingNewsPost.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  {/if}
                </span>
              </div>
              {#if breakingNewsPost.excerpt}
                <p>{breakingNewsPost.excerpt}</p>
              {/if}
            </div>
          </div>
        </a>
      </section>
    {/if}

    <!-- Regular Grid -->
    <div class="grid" style="margin-top: 2rem;">
      {#each gridPosts as post}
        <a
          href="/article/{post.slug}"
          style="display: block; text-decoration: none; color: inherit; grid-column: span 12;"
          class="post-link"
        >
          <article class="card">
            <img
              src={post.coverImage?.url ?? getPostCoverUrl(null)}
              alt={post.title}
              loading="lazy"
            />
            <div class="body">
              <span class="kicker">{post.section}</span>
              <h4>{post.title}</h4>
              {#if post.excerpt}
                <p>{post.excerpt}</p>
              {/if}
              <div class="meta">
                {#if post.publishedAt}
                  {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                {/if}
              </div>
            </div>
          </article>
        </a>
      {:else}
        {#if carouselPosts.length === 0}
          <p class="muted">Belum ada berita.</p>
        {/if}
      {/each}
    </div>
  </section>

  <div class="divider"></div>
</main>

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    margin-bottom: 2.5rem;
    border-radius: 20px;
    overflow: hidden;
    background: var(--elev);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    height: 400px;
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

  /* Breaking News Ticker Styles */
  .breaking {
    display: flex;
    align-items: center;
    background: var(--elev);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .breaking .label {
    background: #e11d48;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    padding: 0.75rem 1.25rem;
    white-space: nowrap;
    z-index: 2;
  }

  .breaking .ticker {
    flex: 1;
    overflow: hidden;
    position: relative;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    height: 100%;
    /* Fade out the ends slightly to make the scroll look cleaner */
    mask-image: linear-gradient(
      to right,
      transparent,
      black 5%,
      black 95%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 1rem,
      black calc(100% - 1rem),
      transparent
    );
  }

  .breaking .track {
    display: inline-flex;
    white-space: nowrap;
    animation: ticker-scroll 30s linear infinite;
  }

  /* Pause the animation on hover so users can read the links */
  .breaking .track:hover {
    animation-play-state: paused;
  }

  .breaking .item {
    font-size: 0.95rem;
    color: var(--text);
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .breaking .item a {
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .breaking .item a:hover {
    color: var(--brand);
    text-decoration: underline;
  }

  @keyframes ticker-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      /* Translate exactly half of the double-appended content to loop smoothly */
      transform: translateX(-50%);
    }
  }

  /* Featured Breaking News Card Styles */
  .breaking-news h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
  
  .breaking-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: var(--elev);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .breaking-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }

  .breaking-card img {
    width: 100%;
    height: 100%;
    min-height: 250px;
    object-fit: cover;
  }

  .breaking-card .body {
    padding: 2rem 2rem 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .breaking-card .kicker {
    display: inline-block;
    background: #e11d48;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    width: fit-content;
    margin-bottom: 1rem;
  }

  .breaking-card h4 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    line-height: 1.3;
  }

  .breaking-card .row {
    color: var(--muted);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .breaking-card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .carousel-slide::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      transparent 100%
    );
  }

  .carousel-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2.5rem;
    z-index: 10;
  }

  .carousel-kicker {
    display: inline-block;
    background: var(--brand);
    color: #000;
    padding: 0.35rem 1rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
  }

  .carousel-overlay h2 {
    font-size: 2.2rem;
    margin: 0 0 0.75rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .carousel-meta {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .carousel-indicators {
    position: absolute;
    bottom: 1.5rem;
    right: 2.5rem;
    display: flex;
    gap: 0.5rem;
    z-index: 20;
  }

  .indicator {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .indicator.active {
    background: var(--brand);
  }

  @media (max-width: 768px) {
    .carousel-track {
      height: 300px;
    }
    .carousel-overlay {
      padding: 1.5rem;
    }
    .carousel-overlay h2 {
      font-size: 1.5rem;
    }
    .carousel-indicators {
      bottom: 1rem;
      right: 1.5rem;
    }
    .indicator {
      width: 24px;
    }
    .breaking-card {
      grid-template-columns: 1fr;
    }
    .breaking-card .body {
      padding: 1.5rem;
    }
  }
</style>
