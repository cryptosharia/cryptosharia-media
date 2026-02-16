<script lang="ts">
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import TradingViewWidget from "$lib/components/TradingViewWidget.svelte";
    import { page } from "$app/stores";
    import type { TokenDetail } from "$types/api";
    import type { PageData } from "./$types";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    // Cast to TokenDetail to access manually added fields (price, marketCap, etc.)
    let token = $derived(data.token as unknown as TokenDetail);

    let showChart = $state(false);

    function toggleChart() {
        showChart = !showChart;
    }

    // Helper to format currency
    function formatCurrency(value?: number) {
        if (!value) return "-";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(value);
    }

    // Helper to format number
    function formatNumber(value?: number) {
        if (!value) return "-";
        return new Intl.NumberFormat("en-US").format(value);
    }
</script>

<svelte:head>
    <title>{token.name} ({token.ticker}) - CryptoSharia</title>
    <meta
        name="description"
        content="Detail analisis syariah untuk token {token.name} ({token.ticker}). Status: {token.shariaStatus}."
    />
</svelte:head>

<main class="container">
    <div class="header-card">
        <div class="header-top">
            <div class="token-identity">
                <img
                    src={getTokenLogoUrl(token.logo)}
                    alt={token.name}
                    class="token-logo"
                />
                <div class="token-name-group">
                    <h1>{token.name}</h1>
                    <span class="ticker">{token.ticker}</span>
                </div>
            </div>
            <div class="token-status">
                <span class="status-label">Status :</span>
                <span class="status-badge {token.shariaStatus}">
                    {token.shariaStatus}
                </span>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-item">
                <span class="metric-label">Peringkat</span>
                <span class="metric-value">{token.rank ?? "-"}</span>
            </div>
            <div class="metric-item">
                <span class="metric-label">Harga per Token</span>
                <div class="metric-value-group">
                    <span class="metric-value"
                        >{formatCurrency(token.price)}</span
                    >
                    {#if token.priceChange24h}
                        <span
                            class="metric-change {token.priceChange24h >= 0
                                ? 'positive'
                                : 'negative'}"
                        >
                            {token.priceChange24h > 0
                                ? "+"
                                : ""}{token.priceChange24h}%
                        </span>
                    {/if}
                </div>
            </div>
            <div class="metric-item">
                <span class="metric-label">Kapitalisasi Pasar</span>
                <span class="metric-value"
                    >{formatCurrency(token.marketCap)}</span
                >
            </div>
            <div class="metric-item">
                <span class="metric-label">Dominasi Pasar</span>
                <span class="metric-value"
                    >{token.marketCapDominance
                        ? `${token.marketCapDominance}%`
                        : "-"}</span
                >
            </div>
            <div class="metric-item">
                <span class="metric-label">Supply Maksimum</span>
                <span class="metric-value">{formatNumber(token.maxSupply)}</span
                >
            </div>
            <div class="metric-item">
                <span class="metric-label">Supply Beredar</span>
                <span class="metric-value"
                    >{formatNumber(token.circulatingSupply)}</span
                >
            </div>
        </div>

        <div class="action-buttons">
            <button class="btn btn-chart" onclick={toggleChart}>Grafik</button>
            <a
                href={token.website}
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-website">Website</a
            >
        </div>
    </div>

    <div class="tags-section">
        {#if token.category}
            <span class="tag">{token.category}</span>
        {/if}
        <!-- Additional hardcoded tags for demo if needed, or split category -->
    </div>

    <div class="content-body">
        {@html token.content}
    </div>

    <!-- Chart Modal -->
    {#if showChart}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div
            class="modal-overlay"
            onclick={() => (showChart = false)}
            role="dialog"
            aria-modal="true"
        >
            <div class="modal-content" onclick={(e) => e.stopPropagation()}>
                <button class="close-btn" onclick={() => (showChart = false)}
                    >&times;</button
                >
                <div class="chart-container">
                    <TradingViewWidget
                        symbol={token.tradingviewSymbol || token.ticker}
                    />
                </div>
            </div>
        </div>
    {/if}

    <a href="/screening" class="back-link">← Kembali ke Screening</a>
</main>

<style>
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    /* Header Card */
    .header-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .token-identity {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .token-logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }

    .token-name-group h1 {
        margin: 0;
        font-size: 2rem;
        color: var(--brand);
        /* The reference has orange title for Bitcoin */
    }

    .ticker {
        font-size: 1.25rem;
        color: var(--text);
        font-weight: 600;
        display: block;
    }

    .token-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .status-label {
        font-weight: 600;
        color: var(--text);
    }

    .status-badge {
        padding: 0.25rem 1rem;
        border-radius: 999px;
        font-size: 0.875rem;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
    }

    .status-badge.halal {
        background-color: #22c55e;
    }
    .status-badge.haram {
        background-color: #ef4444;
    }
    .status-badge.syubhat {
        background-color: #eab308;
    }

    /* Metrics Grid */
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
        margin-bottom: 2rem;
    }

    .metric-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .metric-label {
        font-size: 0.85rem;
        color: var(--muted);
    }

    .metric-value {
        font-weight: 700;
        font-size: 1rem;
        color: var(--text);
    }

    .metric-value-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .metric-change {
        font-size: 0.85rem;
        font-weight: 600;
    }
    .metric-change.positive {
        color: #22c55e;
    }
    .metric-change.negative {
        color: #ef4444;
    }

    /* Action Buttons */
    .action-buttons {
        display: flex;
        gap: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1.25rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
    }

    .btn-certificate {
        background-color: #f97316; /* Orange */
        color: white;
    }
    .btn-certificate:hover {
        background-color: #ea580c;
    }

    .btn-chart {
        background-color: #1f2937; /* Dark */
        color: white;
    }
    .btn-chart:hover {
        background-color: #111827;
    }

    .btn-website {
        background-color: #3b82f6; /* Blue */
        color: white;
    }
    .btn-website:hover {
        background-color: #2563eb;
    }

    /* Tags */
    .tags-section {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .tag {
        background: var(--elev);
        border: 1px solid var(--border-color);
        padding: 0.35rem 1rem;
        border-radius: 999px;
        font-size: 0.9rem;
        color: var(--text);
    }

    /* Content Body */
    .content-body {
        background: var(
            --elev
        ); /* Optional: distinct background for content? Reference seems to just have it on the page body or inside a card */
        /* Reference screenshot 3 shows "Tujuan Proyek" inside a white card-like container? No, it looks like it's just on the page background or a large card. I'll make it part of the page flow for now but ensure headers style matches. */
        color: var(--text);
        line-height: 1.7;
    }

    /* Deep selector for HTML content styles */
    :global(.content-body h3) {
        color: #f97316; /* Orange headers */
        font-size: 1.5rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    :global(.content-body p) {
        margin-bottom: 1rem;
        color: var(--text); /* Ensure good contrast */
    }

    :global(.content-body ul) {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }

    :global(.content-body li) {
        margin-bottom: 0.5rem;
    }

    /* Summary Box */
    :global(.content-body .summary-box) {
        background: var(--elev);
        border: 1px solid var(--border-color);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1.5rem 0;
    }

    /* Global Badge Styles for Content */
    :global(.content-body .status-badge) {
        display: inline-block;
        padding: 0.25rem 1rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
        margin-bottom: 0.5rem;
    }
    :global(.content-body .status-badge.halal) {
        background-color: #22c55e;
    }
    :global(.content-body .status-badge.syubhat) {
        background-color: #eab308;
    }
    :global(.content-body .status-badge.haram) {
        background-color: #ef4444;
    }

    /* Table Styles */
    :global(.content-body table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        font-size: 0.95rem;
    }
    :global(.content-body th),
    :global(.content-body td) {
        border: 1px solid var(--border-color);
        padding: 0.75rem;
        text-align: left;
    }
    :global(.content-body th) {
        background-color: var(--bg-hover);
        font-weight: 600;
        color: var(--text);
    }
    :global(.content-body tr:nth-child(even)) {
        background-color: rgba(255, 255, 255, 0.02);
    }

    /* Chart Section */
    .chart-section {
        margin-top: 3rem;
        margin-bottom: 2rem;
        height: 500px;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--border-color);
    }

    .back-link {
        display: inline-block;
        margin-top: 2rem;
        color: var(--muted);
        text-decoration: none;
        font-weight: 500;
    }
    .back-link:hover {
        color: var(--brand);
    }

    @media (max-width: 768px) {
        .header-top {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .token-identity {
            flex-direction: column;
            gap: 1rem;
        }
        .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .modal-content {
        background: var(--elev);
        border: 1px solid var(--border-color);
        padding: 1rem;
        border-radius: 16px;
        width: 90%;
        max-width: 1000px;
        height: 80vh;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
    }

    .close-btn {
        position: absolute;
        top: -1rem;
        right: -1rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        color: var(--text);
        font-size: 1.5rem;
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        transition: all 0.2s;
        z-index: 10;
    }
    .close-btn:hover {
        transform: scale(1.1);
        color: var(--brand);
        border-color: var(--brand);
    }

    .chart-container {
        flex: 1;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
    }

    @media (max-width: 640px) {
        .modal-content {
            width: 95%;
            height: 70vh;
        }
        .close-btn {
            top: -0.75rem;
            right: -0.75rem;
            width: 2rem;
            height: 2rem;
            font-size: 1.25rem;
        }
    }
</style>
