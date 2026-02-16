<script lang="ts">
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import TradingViewWidget from "$lib/components/TradingViewWidget.svelte";
    import type { TokenDetail } from "$types/api";

    interface Props {
        data: {
            token: TokenDetail;
        };
    }

    let { data }: Props = $props();
    let token = $derived(data.token);

    const statusLabels: Record<string, string> = {
        halal: "Halal",
        syubhat: "Syubhat",
        haram: "Haram",
    };
</script>

<svelte:head>
    <title>{token.name} ({token.ticker}) Screening · CryptoSharia News</title>
    <meta name="description" content={token.excerpt} />
</svelte:head>

<main class="container">
    <!-- Breadcrumb / Back -->
    <div class="breadcrumb">
        <a href="/screening">← Back to Screening</a>
    </div>

    <!-- Header -->
    <header class="token-header">
        <div class="identity">
            <img
                src={getTokenLogoUrl(token.logo)}
                alt="{token.name} logo"
                class="logo"
            />
            <div>
                <h1>{token.name} <span class="ticker">{token.ticker}</span></h1>
                <div class="meta">
                    <span class="rank">Rank #{token.rank}</span>
                    <span class="category">{token.category}</span>
                </div>
            </div>
        </div>
        <div class="status">
            <span class="status-badge {token.shariaStatus}">
                {statusLabels[token.shariaStatus] || token.shariaStatus}
            </span>
        </div>
    </header>

    <!-- Chart -->
    <section class="chart-section">
        <TradingViewWidget symbol={token.ticker} />
    </section>

    <!-- Details -->
    <div class="grid-details">
        <section class="content-section">
            <h2>Analisis Syariah</h2>
            <div class="prose">
                <p class="excerpt">{token.excerpt}</p>
                <p>{token.content}</p>
            </div>

            <div class="disclaimer-box">
                <h4>⚠️ Disclaimer</h4>
                <p>
                    Penilaian ini bersifat edukatif dan berdasarkan analisis tim
                    CryptoSharia. <strong>Bukan fatwa resmi.</strong> Untuk keputusan
                    investasi, konsultasikan dengan ulama atau lembaga fatwa terpercaya.
                </p>
            </div>
        </section>

        <aside class="sidebar">
            <div class="card info-card">
                <h3>Informasi Token</h3>
                <ul class="info-list">
                    <li>
                        <span>Website</span>
                        <a href={token.website} target="_blank" rel="noopener"
                            >{new URL(token.website).hostname}</a
                        >
                    </li>
                    <li>
                        <span>Category</span>
                        <span>{token.category}</span>
                    </li>
                    <li>
                        <span>Screening Date</span>
                        <span
                            >{token.publishedAt
                                ? new Date(
                                      token.publishedAt,
                                  ).toLocaleDateString()
                                : "-"}</span
                        >
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</main>

<style>
    .breadcrumb {
        margin: 1rem 0;
    }
    .breadcrumb a {
        color: var(--muted);
        text-decoration: none;
        font-size: 0.9rem;
    }
    .breadcrumb a:hover {
        color: var(--brand);
    }

    .token-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .identity {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }
    .logo {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
    h1 {
        margin: 0;
        font-size: 2.5rem; /* Larger title like screenshot */
        font-weight: 700;
        line-height: 1.1;
        font-family: serif; /* Screenshot implies serif font for "Bitcoin" */
    }
    .ticker {
        color: var(--muted);
        font-weight: 400;
        font-size: 1.25rem;
        font-family: sans-serif;
        margin-left: 0.5rem;
        vertical-align: middle;
    }
    .meta {
        display: flex;
        gap: 1.5rem;
        margin-top: 0.5rem;
        font-size: 0.95rem;
        color: var(--text); /* Darker text for meta */
        font-weight: 500;
    }
    .rank {
        font-weight: 700;
    }
    .category {
        font-family: serif;
        font-style: italic;
    }
    .status-badge {
        padding: 0.5rem 1rem;
        border-radius: 99px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
    }
    .status-badge.halal {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .status-badge.syubhat {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .status-badge.haram {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .grid-details {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }

    .prose {
        line-height: 1.6;
        color: var(--text);
    }
    .excerpt {
        font-size: 1.1rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
    }

    .disclaimer-box {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.2);
        padding: 1.5rem;
        border-radius: var(--radius);
        margin-top: 2rem;
    }
    .disclaimer-box h4 {
        margin-top: 0;
        color: #f59e0b;
    }
    .disclaimer-box p {
        margin-bottom: 0;
        font-size: 0.9rem;
    }

    .info-card {
        padding: 1.5rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        background: var(--elev);
    }
    .info-card h3 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .info-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.9rem;
    }
    .info-list li:last-child {
        border-bottom: none;
    }
    .info-list li span:first-child {
        color: var(--muted);
    }

    @media (max-width: 768px) {
        .grid-details {
            grid-template-columns: 1fr;
        }
        .token-header {
            flex-direction: column;
            align-items: flex-start;
        }
        .identity {
            width: 100%;
        }
        .status {
            width: 100%;
        }
        .status-badge {
            display: block;
            text-align: center;
            width: 100%;
        }
    }
</style>
