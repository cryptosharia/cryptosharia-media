<script lang="ts">
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let token = $derived(data.token);
</script>

<svelte:head>
    <title>{token.name} ({token.ticker}) - CryptoSharia</title>
    <meta
        name="description"
        content="Detail analisis syariah untuk token {token.name} ({token.ticker}). Status: {token.shariaStatus}."
    />
</svelte:head>

<main class="container">
    <div class="token-header">
        <img
            src={getTokenLogoUrl(token.logo?.id)}
            alt={token.name}
            class="token-logo"
        />
        <div class="token-title">
            <h1>{token.name} <span class="ticker">{token.ticker}</span></h1>
            <div class="badges">
                <span class="badge {token.shariaStatus}"
                    >{token.shariaStatus}</span
                >
                <span class="badge rank">Rank #{token.rank}</span>
            </div>
        </div>
    </div>

    <div class="content">
        {#if token.excerpt}
            <p class="excerpt">{token.excerpt}</p>
        {/if}

        {#if data.quote}
            <div class="market-stats">
                <div class="stat-box">
                    <span class="label">Harga Saat Ini</span>
                    <span class="value">
                        ${data.quote.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </span>
                    <span class="change {data.quote.percentChange24h >= 0 ? 'positive' : 'negative'}">
                        {data.quote.percentChange24h >= 0 ? '▲' : '▼'} {Math.abs(data.quote.percentChange24h).toFixed(2)}% (24h)
                    </span>
                </div>
                <div class="stat-box">
                    <span class="label">Market Cap</span>
                    <span class="value">
                        ${data.quote.marketCapUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span class="subtext">
                        Dominance: {data.quote.marketCapDominance.toFixed(2)}%
                    </span>
                </div>
                <div class="stat-box">
                    <span class="label">Circulating Supply</span>
                    <span class="value">
                        {data.quote.circulatingSupply.toLocaleString()} {token.ticker}
                    </span>
                    {#if data.quote.maxSupply}
                        <span class="subtext">
                            Max: {data.quote.maxSupply.toLocaleString()}
                        </span>
                    {/if}
                </div>
            </div>
        {/if}

        <div class="details">
            <div class="detail-item">
                <span class="label">Website</span>
                <a
                    href={token.website}
                    target="_blank"
                    rel="noopener noreferrer">{token.website}</a
                >
            </div>
            {#if token.tradingviewSymbol}
                <div class="detail-item">
                    <span class="label">TradingView</span>
                    <span>{token.tradingviewSymbol}</span>
                </div>
            {/if}
        </div>

        {#if token.content}
            <div class="markdown-body">
                {@html token.content}
            </div>
        {/if}
    </div>

    <a href="/" class="back-link">← Kembali ke Beranda</a>
</main>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .token-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .token-logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }

    .token-title h1 {
        margin: 0;
        font-size: 2rem;
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
    }

    .ticker {
        font-size: 1.25rem;
        color: var(--text-muted);
        font-weight: normal;
    }

    .badges {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 500;
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color);
    }

    .badge.halal {
        background-color: #d1fae5;
        color: #065f46;
        border-color: #a7f3d0;
    }

    .badge.haram {
        background-color: #fee2e2;
        color: #991b1b;
        border-color: #fecaca;
    }

    .badge.syubhat {
        background-color: #ffedd5;
        color: #9a3412;
        border-color: #fed7aa;
    }

    .excerpt {
        font-size: 1.125rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .market-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-box {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .stat-box .label {
        font-size: 0.875rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .stat-box .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text);
    }
    
    .stat-box .subtext {
        font-size: 0.875rem;
        color: var(--text-muted);
    }

    .change {
        font-size: 0.875rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .change.positive {
        color: #10b981;
    }
    
    .change.negative {
        color: #ef4444;
    }

    @media (max-width: 768px) {
        .market-stats {
            grid-template-columns: 1fr;
        }
    }

    .details {
        display: grid;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: var(--bg-surface);
        border-radius: 0.75rem;
        border: 1px solid var(--border-color);
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .detail-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .label {
        font-weight: 500;
        color: var(--text-secondary);
    }

    .back-link {
        display: inline-block;
        margin-top: 2rem;
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
    }

    .back-link:hover {
        text-decoration: underline;
    }
</style>
