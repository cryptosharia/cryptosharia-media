<script lang="ts">
    import type { ShariaStatus } from '$types/api';

    type MarketItem = { slug: string; name: string; ticker: string; shariaStatus: ShariaStatus; marketCapUsd: number; percentChange24h: number };
    let { items }: { items: MarketItem[] } = $props();

    const counts = $derived({
        halal: items.filter((item) => item.shariaStatus === 'halal').length,
        syubhat: items.filter((item) => item.shariaStatus === 'syubhat').length,
        haram: items.filter((item) => item.shariaStatus === 'haram').length
    });
    const gainers = $derived(items.filter((item) => item.shariaStatus === 'halal' && Number.isFinite(item.percentChange24h))
        .sort((a, b) => b.percentChange24h - a.percentChange24h).slice(0, 3));
    const halalMarketCap = $derived(items.filter((item) => item.shariaStatus === 'halal').reduce((sum, item) => sum + item.marketCapUsd, 0));

    function compactUsd(value: number) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    }

    function change(value: number) { return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`; }
</script>

<section class="market-summary" aria-label="Ringkasan data market map">
    {#if items.length}
        <article class="summary-card">
            <h3>Status screening</h3>
            <div class="count-row"><span><strong>{counts.halal}</strong> Halal</span><span><strong>{counts.syubhat}</strong> Syubhat</span><span><strong>{counts.haram}</strong> Haram</span></div>
            <p>{items.length} aset dipetakan dari kandidat tersedia</p>
        </article>
        <article class="summary-card">
            <h3>Top halal gainers · 24 jam</h3>
            {#if gainers.length}
                <ol>{#each gainers as token (token.slug)}<li><span>{token.name} <small>{token.ticker}</small></span><strong class:positive={token.percentChange24h >= 0} class:negative={token.percentChange24h < 0}>{change(token.percentChange24h)}</strong></li>{/each}</ol>
            {:else}<p>Data perubahan harga halal belum tersedia.</p>{/if}
        </article>
        <article class="summary-card">
            <h3>Kapitalisasi aset halal</h3>
            <strong class="total-cap">{compactUsd(halalMarketCap)}</strong>
            <p>dari {counts.halal} aset halal CryptoSharia dengan data pasar tersedia</p>
        </article>
    {:else}
        <p class="summary-empty">Ringkasan pasar belum tersedia saat ini.</p>
    {/if}
</section>

<style>
    .market-summary{display:grid;width:min(var(--max-width),calc(100% - 48px));grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:16px auto 0}.summary-card{min-width:0;padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.summary-card h3{margin:0 0 10px;color:var(--muted);font-size:.68rem;letter-spacing:.08em;text-transform:uppercase}.count-row{display:flex;flex-wrap:wrap;gap:8px 14px}.count-row span{display:grid;color:var(--muted);font-size:.72rem}.count-row strong{color:var(--text);font-size:1.05rem;line-height:1.2}.summary-card p{margin:8px 0 0;color:var(--muted);font-size:.72rem;line-height:1.4}.summary-card ol{display:grid;gap:5px;margin:0;padding:0;list-style:none}.summary-card li{display:flex;justify-content:space-between;gap:8px;font-size:.73rem}.summary-card li span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.summary-card small{color:var(--muted)}.positive{color:var(--success)}.negative{color:var(--danger)}.total-cap{font-size:1.4rem;letter-spacing:-.04em}.summary-empty{grid-column:1/-1;margin:0;padding:16px;color:var(--muted);border:1px dashed var(--border);border-radius:10px;text-align:center}
    @media(max-width:760px){.market-summary{width:calc(100% - 32px);grid-template-columns:1fr}.summary-card{padding:13px}}
</style>
