<script lang="ts">
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }



    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let { data }: Props = $props();
    let token = $derived(data.token);

    let tvScriptLoaded = $state(false);

    onMount(() => {
        if (!browser) return;
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => { tvScriptLoaded = true; };
        document.head.appendChild(script);
    });

    $effect(() => {
        if (tvScriptLoaded && token.tradingviewSymbol && (window as any).TradingView) {
            new (window as any).TradingView.widget({
                "autosize": true,
                "symbol": token.tradingviewSymbol,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "backgroundColor": "rgba(0, 0, 0, 0)",
                "gridColor": "rgba(42, 46, 57, 0.06)",
                "hide_top_toolbar": false,
                "hide_legend": false,
                "save_image": false,
                "container_id": `tradingview_${token.tradingviewSymbol}`
            });
        }
    });

    let parsedContent = $state('');

    $effect(() => {
        if (!token.content) {
            parsedContent = '';
            return;
        }
        
        if (browser) {
            Promise.all([
                import('marked'),
                import('dompurify')
            ]).then(([{ marked }, { default: DOMPurify }]) => {
                const rawHtml = marked.parse(token.content);
                parsedContent = DOMPurify.sanitize(rawHtml as string);
            }).catch(console.error);
        } else {
            // Very naive fallback for SSR
            parsedContent = token.content;
        }
    });
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
            src={token.logo?.url ?? getTokenLogoUrl(token.logo?.id)}
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
                    <span class="label">Peringkat</span>
                    <span class="value">#{token.rank}</span>
                </div>
                <div class="stat-box">
                    <span class="label">Harga per Token</span>
                    <div class="value-row">
                        <span class="value">
                            ${data.quote.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </span>
                        <span class="separator">|</span>
                        <span class="change {data.quote.percentChange24h >= 0 ? 'positive' : 'negative'}">
                            {data.quote.percentChange24h >= 0 ? '+' : ''}{data.quote.percentChange24h.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <div class="stat-box">
                    <span class="label">Kapitalisasi Pasar</span>
                    <span class="value">
                        ${data.quote.marketCapUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
                <div class="stat-box">
                    <span class="label">Dominasi Pasar</span>
                    <span class="value">
                        {data.quote.marketCapDominance.toFixed(2)}%
                    </span>
                </div>
                <div class="stat-box">
                    <span class="label"><em>Supply</em> Maksimum</span>
                    <span class="value">
                        {#if data.quote.maxSupply}
                            {data.quote.maxSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        {:else}
                            <i>Unlimited</i>
                        {/if}
                    </span>
                </div>
                <div class="stat-box">
                    <span class="label"><em>Supply</em> Beredar</span>
                    <span class="value">
                        {data.quote.circulatingSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                </div>
            </div>
        {/if}

        <div class="details">
            <div class="detail-item">
                <span class="label">Website</span>
                <a
                    href={token.website}
                    target="_blank"
                    class="btn primary btn-sm"
                    style="display: inline-block; padding: 0.5rem 1rem; border-radius: 6px; background: var(--brand); color: #000; font-weight: 500; text-decoration: none;"
                    rel="noopener noreferrer">Kunjungi Website</a
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
            <div class="markdown-body" style="margin-top: 2rem; line-height: 1.6;">
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html parsedContent}
            </div>
        {/if}

        {#if token.tradingviewSymbol}
            <div class="tradingview-widget-container" style="margin-top: 3rem; height: 500px;">
                <div id="tradingview_{token.tradingviewSymbol}" style="height: 100%;"></div>
            </div>
        {/if}
    </div>

    <a href="/screening" class="back-link">← Kembali ke Screening</a>
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
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem 0.5rem;
        margin-bottom: 2rem;
        padding: 1rem 0;
        border-top: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
    }

    .stat-box {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
        min-width: max-content;
    }
    
    .stat-box .label {
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
        letter-spacing: 0;
        text-transform: none;
    }

    .stat-box .value {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text);
    }

    .value-row {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .separator {
        color: var(--border-color);
    }

    .change {
        font-size: 0.95rem;
        font-weight: 600;
        display: flex;
        align-items: center;
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
