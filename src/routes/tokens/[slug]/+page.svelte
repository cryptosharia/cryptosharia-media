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
    let showChart = $state(false);

    onMount(() => {
        if (!browser) return;
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => { tvScriptLoaded = true; };
        document.head.appendChild(script);
    });

    $effect(() => {
        if (showChart && tvScriptLoaded && token.tradingviewSymbol && (window as any).TradingView) {
            // Give the DOM a tiny moment to render the container before injecting
            setTimeout(() => {
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
            }, 50);
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

        <div class="action-buttons">
            {#if token.tradingviewSymbol}
                <button 
                    class="btn btn-chart {showChart ? 'active' : ''}" 
                    onclick={() => showChart = !showChart}
                >Grafik</button>
            {/if}
            {#if token.website}
                <a href={token.website} target="_blank" rel="noopener noreferrer" class="btn btn-website">Website</a>
            {/if}
        </div>

        {#if showChart && token.tradingviewSymbol}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="modal-overlay" onclick={() => showChart = false}>
                <div class="modal-content" onclick={(e) => e.stopPropagation()}>
                    <button class="modal-close" onclick={() => showChart = false}>&times;</button>
                    <h2>Grafik: {token.name}</h2>
                    <div class="tradingview-widget-container" style="height: 500px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color);">
                        <div id="tradingview_{token.tradingviewSymbol}" style="height: 100%;"></div>
                    </div>
                </div>
            </div>
        {/if}

        {#if token.content}
            <div class="markdown-body" style="margin-top: 2rem; line-height: 1.6;">
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html parsedContent}
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

    .action-buttons {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    .action-buttons .btn {
        padding: 0.4rem 1rem;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        text-decoration: none;
        transition: opacity 0.2s;
    }
    .action-buttons .btn:hover {
        opacity: 0.9;
    }
    .btn-chart {
        background: var(--text);
        color: var(--bg);
    }
    .btn-website {
        background: #0ea5e9;
        color: white;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 1rem;
    }

    .modal-content {
        background: var(--bg-surface);
        width: 100%;
        max-width: 900px;
        border-radius: 16px;
        padding: 1.5rem;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: modalFadeIn 0.2s ease-out forwards;
    }

    .modal-content h2 {
        margin: 0 0 1rem 0;
        font-size: 1.3rem;
        padding-right: 2rem;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        background: none;
        border: none;
        font-size: 1.8rem;
        line-height: 1;
        cursor: pointer;
        color: var(--text-muted);
        transition: color 0.2s;
    }

    .modal-close:hover {
        color: var(--text);
    }

    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
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
