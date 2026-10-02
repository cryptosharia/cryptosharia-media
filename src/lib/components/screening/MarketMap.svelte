<script lang="ts">
    import type { ShariaStatus } from '$types/api';

    type MarketMapItem = {
        slug: string;
        name: string;
        ticker: string;
        shariaStatus: ShariaStatus;
        marketCapUsd: number;
        priceUsd: number;
        percentChange24h: number;
        logoUrl: string | null;
    };
    type Tile = MarketMapItem & { x: number; y: number; width: number; height: number };

    let { items }: { items: MarketMapItem[] } = $props();
    let selectedStatus = $state<ShariaStatus | ''>('');
    let activeItem = $state<MarketMapItem | null>(null);
    const filters: { value: ShariaStatus | ''; label: string }[] = [
        { value: '', label: 'Semua' },
        { value: 'halal', label: 'Halal' },
        { value: 'syubhat', label: 'Syubhat' },
        { value: 'haram', label: 'Haram' }
    ];
    const statusLabels: Record<ShariaStatus, string> = { halal: 'Halal', syubhat: 'Syubhat', haram: 'Haram' };
    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const visibleItems = $derived(items.filter((item) => !selectedStatus || item.shariaStatus === selectedStatus));
    const tiles = $derived(layoutTreemap(visibleItems));
    function layoutTreemap(source: MarketMapItem[]): Tile[] {
        const total = source.reduce((sum, item) => sum + item.marketCapUsd, 0);
        if (!total) return [];
        const output: Tile[] = [];
        const place = (entries: MarketMapItem[], x: number, y: number, width: number, height: number, totalWeight: number) => {
            if (!entries.length) return;
            if (entries.length === 1) {
                output.push({ ...entries[0], x, y, width, height });
                return;
            }
            const vertical = width >= height;
            const target = totalWeight / 2;
            let splitAt = 1;
            let accumulated = entries[0].marketCapUsd;
            while (splitAt < entries.length - 1 && accumulated < target) accumulated += entries[splitAt++].marketCapUsd;
            const first = entries.slice(0, splitAt);
            const firstWeight = first.reduce((sum, item) => sum + item.marketCapUsd, 0);
            const ratio = firstWeight / totalWeight;
            if (vertical) {
                const firstWidth = width * ratio;
                place(first, x, y, firstWidth, height, firstWeight);
                place(entries.slice(splitAt), x + firstWidth, y, width - firstWidth, height, totalWeight - firstWeight);
            } else {
                const firstHeight = height * ratio;
                place(first, x, y, width, firstHeight, firstWeight);
                place(entries.slice(splitAt), x, y + firstHeight, width, height - firstHeight, totalWeight - firstWeight);
            }
        };
        place([...source].sort((a, b) => b.marketCapUsd - a.marketCapUsd), 0, 0, 100, 56, total);
        return output;
    }

    function compactUsd(value: number) {
        const units = [{ value: 1e12, suffix: 'T' }, { value: 1e9, suffix: 'B' }, { value: 1e6, suffix: 'M' }];
        const unit = units.find((entry) => Math.abs(value) >= entry.value);
        return unit ? `$${formatter.format(value / unit.value)}${unit.suffix}` : `$${formatter.format(value)}`;
    }

    function price(value: number) {
        const digits = value >= 1 ? 2 : value >= 0.01 ? 4 : 8;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits }).format(value);
    }

    function change(value: number) {
        return `${value > 0 ? '+' : ''}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value)}%`;
    }
</script>

<section class="market-section" aria-labelledby="market-heading">
    <div class="market-heading">
        <div>
            <p class="eyebrow">Crypto Market Map</p>
            <h2 id="market-heading">Crypto Syariah, dipetakan.</h2>
            <p class="subtitle">Lihat ukuran pasar dan status screening aset kripto dalam satu tampilan.</p>
        </div>
        <div class="status-filters" aria-label="Filter status market map">
            {#each filters as filter (filter.value)}
                <button type="button" class:active={selectedStatus === filter.value} aria-pressed={selectedStatus === filter.value} onclick={() => selectedStatus = filter.value}>{filter.label}</button>
            {/each}
        </div>
    </div>

    {#if items.length}
        {#if visibleItems.length}
            <div class="treemap" role="group" aria-label="Peta pasar aset CryptoSharia berdasarkan kapitalisasi pasar">
                {#each tiles as tile (tile.slug)}
                    {@const area = tile.width * tile.height}
                    <a class="tile" class:halal={tile.shariaStatus === 'halal'} class:syubhat={tile.shariaStatus === 'syubhat'} class:haram={tile.shariaStatus === 'haram'} href={`/screening/${encodeURIComponent(tile.slug)}`}
                        style={`--x:${tile.x}%;--y:${tile.y}%;--w:${tile.width}%;--h:${tile.height}%;`}
                        aria-label={`${tile.name} (${tile.ticker}), status ${statusLabels[tile.shariaStatus]}, market cap ${compactUsd(tile.marketCapUsd)}, harga ${price(tile.priceUsd)}, perubahan 24 jam ${change(tile.percentChange24h)}. Buka screening.`}
                        title={`${tile.name} (${tile.ticker}) · ${statusLabels[tile.shariaStatus]} · ${compactUsd(tile.marketCapUsd)} · ${change(tile.percentChange24h)}`}
                        onpointerenter={() => activeItem = tile} onfocus={() => activeItem = tile}>
                        <span class="ticker">{tile.ticker}</span>
                        {#if area >= 125}<span class="status">{statusLabels[tile.shariaStatus]}</span>{/if}
                        {#if area >= 440}<span class="market-cap">{compactUsd(tile.marketCapUsd)}</span>{/if}
                    </a>
                {/each}
            </div>
            <div class="map-meta">
                <p>Ukuran kotak = kapitalisasi pasar <span aria-hidden="true">·</span> Warna = status screening</p>
                <div class="legend" aria-label="Legenda status">
                    <span class="halal-dot">Halal</span><span class="syubhat-dot">Syubhat</span><span class="haram-dot">Haram</span>
                </div>
            </div>
            {#if activeItem}
                <div class="active-details" aria-live="polite">
                    <div><strong>{activeItem.name}</strong><span>{activeItem.ticker} · <span class={`status-text ${activeItem.shariaStatus}`}>{statusLabels[activeItem.shariaStatus]}</span></span></div>
                    <div><span>Harga</span><strong>{price(activeItem.priceUsd)}</strong></div>
                    <div><span>Market cap</span><strong>{compactUsd(activeItem.marketCapUsd)}</strong></div>
                    <div><span>24 jam</span><strong class:positive={activeItem.percentChange24h >= 0} class:negative={activeItem.percentChange24h < 0}>{change(activeItem.percentChange24h)}</strong></div>
                    <a href={`/screening/${encodeURIComponent(activeItem.slug)}`}>Lihat screening →</a>
                </div>
            {/if}
        {:else}
            <div class="empty">Tidak ada aset dengan status {selectedStatus ? statusLabels[selectedStatus] : 'terpilih'} yang memiliki data kapitalisasi pasar.</div>
        {/if}

    {:else}
        <div class="empty">Data market map sementara belum tersedia. Silakan coba lagi nanti.</div>
    {/if}
</section>

<style>
    .market-section{width:min(var(--max-width),calc(100% - 48px));margin-inline:auto;padding-top:28px}.market-heading{display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:18px}.eyebrow{margin:0 0 10px;color:var(--accent-text);font-size:.72rem;font-weight:750;letter-spacing:.14em;text-transform:uppercase}.market-heading h2{margin:0;font-size:clamp(1.8rem,3.7vw,2.6rem);line-height:1.1;letter-spacing:-.045em}.subtitle{max-width:650px;margin:10px 0 0;color:var(--muted)}.status-filters{display:flex;flex-wrap:wrap;gap:6px}.status-filters button{min-height:38px;padding:7px 12px;color:var(--muted);border:1px solid var(--border);border-radius:8px;background:var(--surface);font-size:.82rem;font-weight:650;cursor:pointer}.status-filters button:hover,.status-filters button.active{color:var(--on-accent);border-color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--surface))}
    .treemap{position:relative;width:100%;height:clamp(340px,31vw,420px);overflow:hidden;border:1px solid var(--border);border-radius:12px;background:var(--surface-muted)}.tile{position:absolute;top:var(--y);left:var(--x);display:flex;min-width:0;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;padding:clamp(3px,.75vw,12px);color:#fff;border:2px solid var(--canvas);border-radius:6px;text-shadow:0 1px 2px rgb(0 0 0 / 30%);transition:filter 140ms ease,transform 140ms ease;width:var(--w);height:var(--h)}.tile:hover,.tile:focus-visible{z-index:2;filter:brightness(1.12);outline:3px solid var(--text);outline-offset:-4px}.tile.halal{background:#16734d}.tile.syubhat{background:#805307}.tile.haram{background:#a8322b}.ticker{overflow:hidden;font-size:clamp(.57rem,1.3vw,1.3rem);font-weight:800;line-height:1.05;text-overflow:ellipsis;white-space:nowrap}.status{font-size:clamp(.48rem,.78vw,.75rem);font-weight:750;letter-spacing:.06em;text-transform:uppercase}.market-cap{font-size:clamp(.58rem,1.05vw,.98rem);font-weight:650}.map-meta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin:10px 2px 0;color:var(--muted);font-size:.81rem}.map-meta p{margin:0}.legend{display:flex;flex-wrap:wrap;gap:14px}.legend span::before{display:inline-block;width:9px;height:9px;margin-right:6px;border-radius:50%;content:''}.halal-dot::before{background:#16734d}.syubhat-dot::before{background:#d2941b}.haram-dot::before{background:#c44740}.active-details{display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;margin-top:10px;padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--surface)}.active-details>div{display:grid;gap:1px}.active-details>div>span{color:var(--muted);font-size:.75rem}.active-details>div:first-child>span{font-size:.8rem}.active-details>a{margin-left:auto;color:var(--accent-text);font-size:.84rem;font-weight:700;text-decoration:underline;text-underline-offset:3px}.status-text{font-weight:700;text-transform:uppercase}.status-text.halal{color:var(--success)}.status-text.syubhat{color:var(--warning)}.status-text.haram{color:var(--danger)}.positive{color:var(--success)}.negative{color:var(--danger)}.empty{padding:32px;border:1px dashed var(--border-control);border-radius:10px;color:var(--muted);background:var(--surface);text-align:center}
    @media(max-width:760px){.market-heading{align-items:start;flex-direction:column;gap:14px}.status-filters{width:100%}.treemap{height:340px}.tile .status,.tile .market-cap{display:none}.tile .ticker{font-size:clamp(.48rem,1.4vw,.7rem)}.active-details{gap:12px 18px}.active-details>a{margin-left:0}}
    @media(max-width:600px){.market-section{width:calc(100% - 32px)}}
    @media(max-width:390px){.market-section{padding-top:42px}.market-heading h2{font-size:1.75rem}.treemap{height:420px}.map-meta{align-items:start;flex-direction:column}.active-details{display:grid;grid-template-columns:1fr 1fr}.active-details>div:first-child{grid-column:1/-1}.active-details>a{grid-column:1/-1}}
    @media(prefers-reduced-motion:reduce){.tile{transition:none}}
</style>
