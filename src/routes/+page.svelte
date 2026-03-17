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
    <div class="grid">
      {#each data.posts as post}
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
        <p class="muted">Belum ada berita.</p>
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
