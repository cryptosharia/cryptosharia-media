<script lang="ts">
    import ScreeningStatus from '$lib/components/screening/ScreeningStatus.svelte';
    import type { ShariaStatus } from '$types/api';

    type TrendingToken = {
        slug: string;
        name: string;
        ticker: string;
        shariaStatus: ShariaStatus;
        rank: number;
        marketCapUsd: number;
        priceUsd: number;
        percentChange24h: number;
        logoUrl: string | null;
    };

    let { tokens }: { tokens: TrendingToken[] } = $props();

    function compactUsd(value: number) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value);
    }

    function price(value: number) {
        const digits = value >= 1 ? 2 : value >= 0.01 ? 4 : 8;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits }).format(value);
    }
</script>

<section class="trending-section" aria-labelledby="trending-heading">
    <header class="section-heading">
        <div>
            <p class="eyebrow">Aktivitas pasar · 24 jam</p>
            <h2 id="trending-heading">Trending Tokens</h2>
        </div>
        <p class="section-note">Diurutkan berdasarkan perubahan pasar 24 jam pada aset CryptoSharia.</p>
    </header>
    {#if tokens.length}
        <div class="trending-grid">
            {#each tokens as token (token.slug)}
                <a class="trending-card" href={`/screening/${encodeURIComponent(token.slug)}`} aria-label={`Buka screening ${token.name} (${token.ticker}), status ${token.shariaStatus}, rank pasar ${token.rank}`}>
                    <div class="card-top">
                        {#if token.logoUrl}<img src={token.logoUrl} alt="" width="34" height="34" loading="lazy" />
                        {:else}<span class="token-fallback" aria-hidden="true">{token.ticker.slice(0, 3)}</span>{/if}
                        <div class="identity"><strong>{token.name}</strong><span>{token.ticker} · Rank #{token.rank}</span></div>
                        <strong class="change" class:positive={token.percentChange24h >= 0} class:negative={token.percentChange24h < 0}>{token.percentChange24h > 0 ? '+' : ''}{token.percentChange24h.toFixed(2)}%</strong>
                    </div>
                    <div class="card-bottom">
                        <ScreeningStatus status={token.shariaStatus} />
                        <span title={price(token.priceUsd)}>{price(token.priceUsd)}</span>
                        <span title={compactUsd(token.marketCapUsd)}>MC {compactUsd(token.marketCapUsd)}</span>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="empty-state">Data aktivitas pasar belum tersedia.</p>
    {/if}
</section>

<style>
    .trending-section{width:min(var(--max-width),calc(100% - 48px));margin:32px auto 0}.section-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:14px}.section-heading h2{margin:0;font-size:clamp(1.4rem,2.5vw,1.8rem);line-height:1.15;letter-spacing:-.03em}.eyebrow{margin:0 0 6px;color:var(--muted);font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.section-note{max-width:430px;margin:0;color:var(--muted);font-size:.8rem;text-align:right}.trending-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.trending-card{display:grid;min-width:0;gap:12px;padding:12px;border:1px solid var(--border);border-radius:10px;background:var(--surface);transition:border-color 140ms ease,background 140ms ease}.trending-card:hover{border-color:var(--border-control);background:var(--surface-muted)}.card-top{display:flex;min-width:0;align-items:center;gap:8px}.card-top img,.token-fallback{width:34px;height:34px;flex:0 0 34px;object-fit:contain;border-radius:50%;background:var(--surface-muted)}.token-fallback{display:grid;place-items:center;color:var(--muted);font-size:.6rem;font-weight:750}.identity{display:grid;min-width:0;flex:1}.identity strong{overflow:hidden;font-size:.8rem;text-overflow:ellipsis;white-space:nowrap}.identity span{overflow:hidden;color:var(--muted);font-size:.68rem;text-overflow:ellipsis;white-space:nowrap}.change{flex:0 0 auto;font-size:.74rem}.positive{color:var(--success)}.negative{color:var(--danger)}.card-bottom{display:flex;min-width:0;align-items:center;justify-content:space-between;gap:6px;color:var(--muted);font-size:.66rem}.card-bottom span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.empty-state{padding:20px;color:var(--muted);border:1px dashed var(--border);border-radius:10px;text-align:center}
    @media(max-width:1140px){.trending-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
    @media(max-width:900px){.trending-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:600px){.trending-section{width:calc(100% - 32px);margin-top:26px}.section-heading{align-items:start;flex-direction:column;gap:6px}.section-note{text-align:left}.trending-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.trending-card{padding:10px}.card-top{flex-wrap:wrap}.card-top .change{margin-left:auto}.card-bottom{flex-wrap:wrap}.card-bottom :global(.screening-status){padding:3px 6px;font-size:.6rem}}
    @media(prefers-reduced-motion:reduce){.trending-card{transition:none}}
</style>
