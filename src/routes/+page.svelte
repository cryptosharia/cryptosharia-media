<script lang="ts">
  import '../app.css';
  import { getPostCoverUrl, getTokenLogoUrl } from '$lib/utils/assets';
  import type { Post, Token } from '$types/api';

  interface Props {
    data: {
      posts: Post[];
      tokens: Token[];
    };
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>CryptoSharia - News & Education Crypto Berperspektif Syariah</title>
  <meta name="description" content="Portal berita dan edukasi cryptocurrency dengan perspektif syariah Islam. Analisis token halal, haram, dan syubhat." />
</svelte:head>

<!-- Header -->
<header>
  <nav class="menu">
    <a href="/" class="active">News</a>
    <a href="/education">Education</a>
    <a href="/research">Research</a>
    <a href="/community">Premium</a>
    <a href="/profile">Profile</a>
  </nav>
  <div class="container nav">
    <a href="/" class="brand">
      <div class="logo"></div>
      <span class="title">CryptoSharia</span>
      <span class="pill">News</span>
    </a>
    <div class="search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input type="text" placeholder="Cari berita..." />
    </div>
  </div>
</header>

<main class="container">
  <!-- Berita Terkini Section -->
  <section class="section">
    <h3>Berita Terkini</h3>
    <div class="grid">
      {#each data.posts as post}
        <article class="card">
          <img src={getPostCoverUrl(post.coverImageId)} alt={post.title} loading="lazy" />
          <div class="body">
            <span class="kicker">{post.section}</span>
            <h4>{post.title}</h4>
            {#if post.excerpt}
              <p>{post.excerpt}</p>
            {/if}
            <div class="meta">
              {#if post.publishedAt}
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              {/if}
            </div>
          </div>
        </article>
      {:else}
        <p class="muted">Belum ada berita.</p>
      {/each}
    </div>
  </section>

  <div class="divider"></div>

  <!-- Token Screening Section -->
  <section class="section">
    <h3>Token Screening</h3>
    <p class="muted">Daftar token cryptocurrency dengan status kehalalan berdasarkan analisis syariah.</p>
    <div class="token-grid">
      {#each data.tokens as token}
        <a href="/tokens/{token.slug}" class="token-card">
          <img src={getTokenLogoUrl(token.logoId)} alt={token.name} />
          <div class="token-info">
            <span class="token-ticker">{token.ticker}</span>
            <span class="token-name">{token.name}</span>
          </div>
          <span class="token-status {token.shariaStatus}">{token.shariaStatus}</span>
        </a>
      {:else}
        <p class="muted">Belum ada token.</p>
      {/each}
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <div class="brand">
          <div class="logo"></div>
          <span class="title">CryptoSharia</span>
        </div>
        <p>News & education crypto berperspektif syariah.</p>
      </div>
      <div class="social-links">
        <a href="https://t.me/cryptosharia" class="social-link" target="_blank" rel="noopener">
          Telegram
        </a>
        <a href="https://youtube.com/@cryptosharia" class="social-link" target="_blank" rel="noopener">
          YouTube
        </a>
        <a href="https://instagram.com/cryptosharia" class="social-link" target="_blank" rel="noopener">
          Instagram
        </a>
        <a href="https://discord.gg/cryptosharia" class="social-link" target="_blank" rel="noopener">
          Discord
        </a>
        <a href="mailto:halo@cryptosharia.news" class="social-link">
          ✉️ Email
        </a>
      </div>
    </div>
    <div class="footer-mini">
      <span>© 2024 CryptoSharia. All rights reserved.</span>
      <div>
        <a href="/privacy">Privacy Policy</a> · <a href="/disclaimer">Disclaimer</a>
      </div>
    </div>
  </div>
</footer>

<!-- Mobile Bottom Navigation -->
<nav class="bottom-nav">
  <a href="/" class="tab active">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8Z"/>
    </svg>
    <span>News</span>
  </a>
  <a href="/education" class="tab">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 14l9-5-9-5-9 5 9 5z"/>
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
    </svg>
    <span>Education</span>
  </a>
  <a href="/research" class="tab">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
    <span>Research</span>
  </a>
  <a href="/community" class="tab">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/>
    </svg>
    <span>Premium</span>
  </a>
  <a href="/profile" class="tab">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span>Profile</span>
  </a>
</nav>
