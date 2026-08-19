<script lang="ts">
    import type { Token, TokenQuote } from '$types/api';

    let { tokens, quotes }: { tokens: Token[]; quotes: TokenQuote[] } = $props();

    const quoteBySlug = $derived(new Map(quotes.map((quote) => [quote.slug, quote])));

    function formatPrice(value: number | null | undefined) {
        if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: value >= 1_000 ? 'compact' : 'standard',
            maximumFractionDigits: value >= 1 ? 2 : 6
        }).format(value);
    }

    function formatChange(value: number | null | undefined) {
        if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
        return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
    }
</script>

<section class="market-ticker" aria-label="Ringkasan pasar aset digital">
    <div class="market-ticker-track">
        {#each tokens as token (token.id)}
            {@const quote = quoteBySlug.get(token.slug)}
            <a href={`/screening/${token.slug}`} aria-label={`Lihat screening ${token.name} (${token.ticker})`}>
                {#if token.logo?.url}
                    <img src={token.logo.url} alt="" width="30" height="30" loading="lazy" />
                {:else}
                    <span class="ticker-mark" aria-hidden="true">{token.ticker.slice(0, 2)}</span>
                {/if}
                <span class="ticker-copy">
                    <span class="ticker-name">{token.name} <small>({token.ticker})</small></span>
                    <span class="ticker-quote">
                        <strong>{formatPrice(quote?.priceUsd)}</strong>
                        <span class:positive={(quote?.percentChange24h ?? 0) > 0} class:negative={(quote?.percentChange24h ?? 0) < 0}>
                            {formatChange(quote?.percentChange24h)}
                        </span>
                    </span>
                </span>
            </a>
        {/each}
    </div>
</section>

<style>
    .market-ticker {
        overflow: hidden;
        color: #f1f0ec;
        background: #12151a;
        border-block: 1px solid #292e37;
    }

    .market-ticker-track {
        display: flex;
        width: min(100%, 1600px);
        min-width: max-content;
        margin-inline: auto;
    }

    a {
        display: flex;
        min-width: 184px;
        align-items: center;
        gap: 10px;
        padding: 10px 18px;
        border-right: 1px solid rgb(255 255 255 / 8%);
        transition: background var(--motion-micro) var(--ease-standard);
    }

    a:hover,
    a:focus-visible {
        background: rgb(255 255 255 / 6%);
    }

    img,
    .ticker-mark {
        width: 30px;
        height: 30px;
        flex: 0 0 auto;
        border-radius: 50%;
        object-fit: cover;
    }

    .ticker-mark {
        display: grid;
        place-items: center;
        color: #17130e;
        background: var(--accent);
        font-size: 0.6rem;
        font-weight: 800;
    }

    .ticker-copy,
    .ticker-quote {
        display: grid;
        min-width: 0;
        line-height: 1.2;
    }

    .ticker-name {
        overflow: hidden;
        color: #aeb4be;
        font-size: 0.68rem;
        font-weight: 650;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ticker-name small {
        color: #798291;
        font-size: inherit;
    }

    .ticker-quote {
        grid-template-columns: auto auto;
        justify-content: start;
        gap: 6px;
        margin-top: 3px;
        font-size: 0.76rem;
    }

    .ticker-quote strong {
        font-weight: 700;
    }

    .ticker-quote span {
        color: #aeb4be;
        font-size: 0.68rem;
        font-weight: 700;
    }

    .ticker-quote span.positive { color: #62d49a; }
    .ticker-quote span.negative { color: #ff7b72; }

    @media (max-width: 700px) {
        .market-ticker {
            overflow-x: auto;
            scrollbar-width: none;
        }

        .market-ticker::-webkit-scrollbar { display: none; }
        a { min-width: 176px; padding-inline: 14px; }
    }
</style>
