<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import { formatDate, formatUsd, safeExternalUrl } from '$lib/format';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const statusLabel = { halal: 'Halal', haram: 'Haram', syubhat: 'Syubhat' } as const;
    const website = $derived(safeExternalUrl(data.token.website));
</script>

<Seo
    title={`${data.token.name} (${data.token.ticker}) — Screening CryptoSharia`}
    description={data.token.excerpt}
    image={data.token.logo?.url || '/logo.png'}
    canonicalPath={`/screening/${data.token.slug}`}
/>

<main id="main-content" class="site-main">
    <header class="container page-hero compact">
        <a class="button button-link" href="/screening">← Kembali ke Screening Coin</a>
        <div style="display:flex;align-items:center;gap:18px;margin-top:24px">
            {#if data.token.logo?.url}
                <img src={data.token.logo.url} alt="" width="72" height="72" style="width:72px;height:72px;object-fit:contain;border-radius:50%;background:var(--surface)" />
            {/if}
            <div>
                <p class="eyebrow">#{data.token.rank} · {data.token.ticker}</p>
                <h1>{data.token.name}</h1>
            </div>
        </div>
        <div class="button-row">
            <span class={`token-status ${data.token.shariaStatus}`}>{statusLabel[data.token.shariaStatus]}</span>
            <span class="badge">Diperbarui {formatDate(data.token.updatedAt ?? data.token.publishedAt)}</span>
        </div>
        <p>{data.token.excerpt}</p>
    </header>

    <section class="container section-sm">
        {#if data.quote}
            <div class="card-grid">
                <div class="feature-card"><p class="muted">Harga</p><h2>{formatUsd(data.quote.priceUsd)}</h2></div>
                <div class="feature-card"><p class="muted">Market cap</p><h2>{formatUsd(data.quote.marketCapUsd)}</h2></div>
                <div class="feature-card"><p class="muted">Perubahan 24 jam</p><h2>{data.quote.percentChange24h.toFixed(2)}%</h2></div>
            </div>
        {/if}

        <div style="height:36px" aria-hidden="true"></div>
        <div class="prose">{@html data.html}</div>

        <div class="button-row" style="max-width:760px;margin-inline:auto;margin-top:36px">
            {#if website}<a class="button button-secondary" href={website} target="_blank" rel="noopener noreferrer">Website resmi ↗</a>{/if}
        </div>

        <div class="alert" style="max-width:760px;margin:36px auto 0">
            Informasi ini bukan fatwa personal maupun rekomendasi investasi. Status dan penjelasan dapat
            diperbarui mengikuti temuan serta kajian terbaru.
        </div>
    </section>
</main>
