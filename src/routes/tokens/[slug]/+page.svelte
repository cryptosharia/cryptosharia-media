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
            setTimeout(() => {
                new (window as any).TradingView.widget({
                    "autosize": true,
                    "symbol": token.tradingviewSymbol,
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
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
            parsedContent = token.content;
        }
    });

    function formatNumber(n: number, decimals = 0) {
        if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
        if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
        if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
        return `$${n.toLocaleString(undefined, { maximumFractionDigits: decimals })}`;
    }

    function formatSupply(n: number) {
        if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
        return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
</script>

<svelte:head>
    <title>{token.name} ({token.ticker}) - CryptoSharia</title>
    <meta
        name="description"
        content="Detail analisis syariah untuk token {token.name} ({token.ticker}). Status: {token.shariaStatus}."
    />
</svelte:head>

<main class="token-page">
    <!-- Back Navigation -->
    <div class="container">
        <a href="/screening" class="back-nav">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5m7-7-7 7 7 7"/>
            </svg>
            Kembali ke Screening
        </a>
    </div>

    <!-- Hero Card -->
    <div class="container">
        <section class="hero-card">
            <div class="hero-glow"></div>
            <div class="hero-top">
                <div class="token-identity">
                    <div class="logo-wrapper">
                        <img
                            src={token.logo?.url ?? getTokenLogoUrl(token.logo?.id)}
                            alt={token.name}
                            class="token-logo"
                        />
                        <div class="status-dot {token.shariaStatus}"></div>
                    </div>
                    <div class="token-info">
                        <h1>{token.name} <span class="ticker">{token.ticker}</span></h1>
                        <div class="badge-row">
                            <span class="status-badge {token.shariaStatus}">{token.shariaStatus}</span>
                            <span class="rank-badge">Rank #{token.rank}</span>
                            {#if token.category && token.category !== "Uncategorized"}
                                <span class="cat-badge">{token.category}</span>
                            {/if}
                        </div>
                    </div>
                </div>

                {#if data.quote}
                    <div class="price-block">
                        <span class="price-label">Harga Saat Ini</span>
                        <span class="price-value">
                            ${data.quote.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </span>
                        <span class="price-change {data.quote.percentChange24h >= 0 ? 'up' : 'down'}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                {#if data.quote.percentChange24h >= 0}
                                    <path d="M12 4l8 8h-5v8h-6v-8H4l8-8z"/>
                                {:else}
                                    <path d="M12 20l-8-8h5V4h6v8h5l-8 8z"/>
                                {/if}
                            </svg>
                            {Math.abs(data.quote.percentChange24h).toFixed(2)}% (24h)
                        </span>
                    </div>
                {/if}
            </div>

            {#if token.excerpt}
                <p class="excerpt">{token.excerpt}</p>
            {/if}

            <!-- Action Row -->
            <div class="action-row">
                {#if token.tradingviewSymbol}
                    <button
                        class="action-btn chart-btn"
                        onclick={() => showChart = !showChart}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                        </svg>
                        Lihat Grafik
                    </button>
                {/if}
                {#if token.website}
                    <a href={token.website} target="_blank" rel="noopener noreferrer" class="action-btn website-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        Website
                    </a>
                {/if}
            </div>
        </section>
    </div>

    <!-- Market Stats Grid -->
    {#if data.quote}
        <div class="container">
            <section class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <span class="stat-label">Kapitalisasi Pasar</span>
                    <span class="stat-value">{formatNumber(data.quote.marketCapUsd)}</span>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏆</div>
                    <span class="stat-label">Dominasi Pasar</span>
                    <span class="stat-value">{data.quote.marketCapDominance.toFixed(2)}%</span>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <span class="stat-label">Supply Beredar</span>
                    <span class="stat-value">{formatSupply(data.quote.circulatingSupply)} {token.ticker}</span>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔒</div>
                    <span class="stat-label">Supply Maksimum</span>
                    <span class="stat-value">
                        {#if data.quote.maxSupply}
                            {formatSupply(data.quote.maxSupply)} {token.ticker}
                        {:else}
                            <em>Unlimited</em>
                        {/if}
                    </span>
                </div>
            </section>
        </div>
    {/if}

    <!-- TradingView Modal -->
    {#if showChart && token.tradingviewSymbol}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-overlay" onclick={() => showChart = false}>
            <div class="modal-content" onclick={(e) => e.stopPropagation()}>
                <div class="modal-header">
                    <h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                        </svg>
                        Grafik {token.name}
                    </h2>
                    <button class="modal-close" onclick={() => showChart = false}>&times;</button>
                </div>
                <div class="tradingview-widget-container">
                    <div id="tradingview_{token.tradingviewSymbol}" style="height: 100%;"></div>
                </div>
            </div>
        </div>
    {/if}

    <!-- Markdown Content -->
    {#if token.content}
        <div class="container">
            <section class="content-section">
                <h2 class="section-title">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8m2-8H8"/>
                    </svg>
                    Analisis & Pembahasan
                </h2>
                <div class="markdown-body">
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html parsedContent}
                </div>
            </section>
        </div>
    {/if}
</main>

<style>
    /* ===== Page ===== */
    .token-page {
        padding-bottom: 100px;
    }

    .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 1.25rem;
    }

    /* ===== Back Nav ===== */
    .back-nav {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 1.5rem 0 1rem;
        color: var(--muted);
        text-decoration: none;
        font-size: 0.88rem;
        font-weight: 500;
        transition: color 0.2s;
    }

    .back-nav:hover {
        color: var(--brand);
    }

    .back-nav svg {
        transition: transform 0.2s;
    }

    .back-nav:hover svg {
        transform: translateX(-3px);
    }

    /* ===== Hero Card ===== */
    .hero-card {
        position: relative;
        padding: 2rem 2.5rem;
        border-radius: 24px;
        background: linear-gradient(135deg, rgba(252, 192, 0, 0.04) 0%, rgba(245, 102, 10, 0.04) 100%);
        border: 1px solid var(--border-color);
        overflow: hidden;
        margin-bottom: 1.5rem;
    }

    .hero-glow {
        position: absolute;
        top: -40%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(252, 192, 0, 0.08) 0%, transparent 70%);
        pointer-events: none;
    }

    .hero-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 2rem;
        position: relative;
        margin-bottom: 1.25rem;
    }

    /* Token Identity */
    .token-identity {
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }

    .logo-wrapper {
        position: relative;
        flex-shrink: 0;
    }

    .token-logo {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--border-color);
        background: var(--bg);
    }

    .status-dot {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 3px solid var(--elev);
    }

    .status-dot.halal { background: #10b981; }
    .status-dot.syubhat { background: #f59e0b; }
    .status-dot.haram { background: #ef4444; }

    .token-info h1 {
        margin: 0;
        font-size: 1.85rem;
        font-weight: 800;
        letter-spacing: -0.3px;
        line-height: 1.2;
    }

    .ticker {
        font-size: 1rem;
        color: var(--muted);
        font-weight: 500;
    }

    .badge-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.65rem;
    }

    .status-badge {
        padding: 0.25rem 0.8rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: capitalize;
        letter-spacing: 0.3px;
    }

    .status-badge.halal {
        background: rgba(16, 185, 129, 0.12);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .status-badge.syubhat {
        background: rgba(245, 158, 11, 0.12);
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.25);
    }

    .status-badge.haram {
        background: rgba(239, 68, 68, 0.12);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.25);
    }

    .rank-badge {
        padding: 0.25rem 0.8rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border-color);
        color: var(--muted);
    }

    .cat-badge {
        padding: 0.25rem 0.65rem;
        border-radius: 6px;
        font-size: 0.72rem;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--border-color);
        color: var(--muted);
    }

    /* Price Block */
    .price-block {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;
        flex-shrink: 0;
    }

    .price-label {
        font-size: 0.78rem;
        color: var(--muted);
        font-weight: 500;
    }

    .price-value {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.5px;
        color: var(--text);
    }

    .price-change {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.85rem;
        font-weight: 600;
        padding: 0.2rem 0.65rem;
        border-radius: 8px;
    }

    .price-change.up {
        color: #10b981;
        background: rgba(16, 185, 129, 0.1);
    }

    .price-change.down {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
    }

    /* Excerpt */
    .excerpt {
        font-size: 1rem;
        color: var(--muted);
        line-height: 1.65;
        margin: 0 0 1.5rem;
        position: relative;
    }

    /* Action Row */
    .action-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.65rem;
        position: relative;
    }

    .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.6rem 1.25rem;
        border-radius: 12px;
        font-size: 0.88rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .chart-btn {
        background: linear-gradient(135deg, var(--brand), var(--accent));
        color: #000;
    }

    .chart-btn:hover {
        box-shadow: 0 4px 15px rgba(252, 192, 0, 0.3);
        transform: translateY(-2px);
    }

    .website-btn {
        background: rgba(14, 165, 233, 0.12);
        color: #0ea5e9;
        border: 1px solid rgba(14, 165, 233, 0.25);
    }

    .website-btn:hover {
        background: rgba(14, 165, 233, 0.2);
        transform: translateY(-2px);
    }

    /* ===== Stats Grid ===== */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        padding: 1.25rem;
        border-radius: 16px;
        background: var(--elev);
        border: 1px solid var(--border-color);
        transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .stat-card:hover {
        transform: translateY(-2px);
        border-color: rgba(252, 192, 0, 0.2);
    }

    .stat-icon {
        font-size: 1.25rem;
        margin-bottom: 0.15rem;
    }

    .stat-label {
        font-size: 0.78rem;
        color: var(--muted);
        font-weight: 500;
    }

    .stat-value {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--text);
    }

    /* ===== Modal ===== */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 1rem;
        animation: fadeIn 0.2s ease;
    }

    .modal-content {
        background: var(--elev);
        width: 100%;
        max-width: 960px;
        border-radius: 20px;
        padding: 1.75rem;
        position: relative;
        border: 1px solid var(--border-color);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        animation: slideUp 0.3s ease;
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .modal-close {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border-color);
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        color: var(--muted);
        transition: all 0.2s;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        color: var(--text);
        background: rgba(255, 255, 255, 0.1);
    }

    .tradingview-widget-container {
        height: 500px;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--border-color);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ===== Content Section ===== */
    .content-section {
        padding: 2rem 2.5rem;
        border-radius: 20px;
        background: var(--elev);
        border: 1px solid var(--border-color);
        margin-bottom: 2rem;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text);
    }

    .section-title svg {
        color: var(--brand);
    }

    /* Markdown body styling */
    .markdown-body {
        line-height: 1.75;
        color: var(--text);
        font-size: 0.95rem;
    }

    .markdown-body :global(h1),
    .markdown-body :global(h2),
    .markdown-body :global(h3),
    .markdown-body :global(h4) {
        margin-top: 2rem;
        margin-bottom: 0.75rem;
        font-weight: 700;
        line-height: 1.3;
    }

    .markdown-body :global(h2) {
        font-size: 1.3rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .markdown-body :global(h3) {
        font-size: 1.1rem;
    }

    .markdown-body :global(p) {
        margin: 0 0 1rem;
    }

    .markdown-body :global(ul),
    .markdown-body :global(ol) {
        margin: 0 0 1rem;
        padding-left: 1.5rem;
    }

    .markdown-body :global(li) {
        margin-bottom: 0.4rem;
    }

    .markdown-body :global(a) {
        color: var(--brand);
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .markdown-body :global(a:hover) {
        color: var(--accent);
    }

    .markdown-body :global(blockquote) {
        margin: 1rem 0;
        padding: 0.75rem 1.25rem;
        border-left: 3px solid var(--brand);
        background: rgba(252, 192, 0, 0.04);
        border-radius: 0 8px 8px 0;
        color: var(--muted);
    }

    .markdown-body :global(code) {
        background: rgba(255, 255, 255, 0.06);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-size: 0.88em;
    }

    .markdown-body :global(pre) {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem 1.25rem;
        border-radius: 10px;
        overflow-x: auto;
        margin: 1rem 0;
        border: 1px solid var(--border-color);
    }

    .markdown-body :global(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
    }

    .markdown-body :global(th),
    .markdown-body :global(td) {
        padding: 0.6rem 1rem;
        border: 1px solid var(--border-color);
        text-align: left;
    }

    .markdown-body :global(th) {
        background: rgba(255, 255, 255, 0.04);
        font-weight: 600;
    }

    .markdown-body :global(img) {
        border-radius: 12px;
        margin: 1rem 0;
    }

    .markdown-body :global(hr) {
        border: none;
        height: 1px;
        background: var(--border-color);
        margin: 2rem 0;
    }

    /* ===== Responsive ===== */
    @media (max-width: 768px) {
        .hero-card {
            padding: 1.5rem;
        }

        .hero-top {
            flex-direction: column;
            gap: 1.25rem;
        }

        .price-block {
            align-items: flex-start;
        }

        .token-info h1 {
            font-size: 1.5rem;
        }

        .price-value {
            font-size: 1.4rem;
        }

        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .content-section {
            padding: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .token-identity {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }

        .token-logo {
            width: 56px;
            height: 56px;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .token-info h1 {
            font-size: 1.3rem;
        }
    }
</style>
