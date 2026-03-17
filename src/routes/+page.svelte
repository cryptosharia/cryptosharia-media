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

  const carouselPosts = $derived(data.posts.slice(0, 3));
  const gridPosts = $derived(data.posts.slice(3));

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
    <h3>Berita Terkini</h3>
    
    <!-- Carousel Section -->
    {#if carouselPosts.length > 0}
      <div class="carousel-container">
        <div class="carousel-track" style="transform: translateX(-{currentSlide * 100}%)">
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

    <!-- Regular Grid -->
    <div class="grid" style="margin-top: 2rem;">
      {#each gridPosts as post}
        <a href="/article/{post.slug}" style="display: block; text-decoration: none; color: inherit; grid-column: span 12;" class="post-link">
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

  <!-- Token Screening Section -->
  <section class="section">
    <h3>Token Screening</h3>
    <p class="muted">
      Daftar token cryptocurrency dengan status kehalalan berdasarkan analisis
      syariah.
    </p>
    <div class="token-grid">
      {#each data.tokens as token}
        <a href="/tokens/{token.slug}" class="token-card">
          <img
            src={token.logo?.url ?? getTokenLogoUrl(token.logo?.id)}
            alt={token.name}
            class="token-logo"
          />
          <div class="token-info">
            <span class="token-ticker">{token.ticker}</span>
            <span class="token-name">{token.name}</span>
          </div>
          <span class="token-status {token.shariaStatus}"
            >{token.shariaStatus}</span
          >
        </a>
      {:else}
        <p class="muted">Belum ada token.</p>
      {/each}
    </div>
  </section>
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
  
  .carousel-slide::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
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
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }
  
  .carousel-meta {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.8);
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
  }
</style>
