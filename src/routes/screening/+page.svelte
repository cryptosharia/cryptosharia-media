<script lang="ts">
    import "../../app.css";
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import { goto } from "$app/navigation";
    import Seo from "$lib/components/Seo.svelte";

    // Props
    let { data } = $props();

    // State
    let searchQuery = $state(data.params.search);
    let currentFilter = $state(data.params.status);

    function handleFilter(status: string) {
        currentFilter = status;
        const url = new URL(window.location.href);
        url.searchParams.set("status", status);
        if (status === "all") url.searchParams.delete("status");
        url.searchParams.delete("page");
        goto(url.toString(), {
            keepFocus: true,
            noScroll: true,
            replaceState: true,
        });
    }

    let searchTimeout: ReturnType<typeof setTimeout>;

    function handleSearchInput() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const url = new URL(window.location.href);
            if (searchQuery) url.searchParams.set("q", searchQuery);
            else url.searchParams.delete("q");
            url.searchParams.delete("page");
            goto(url.toString(), {
                keepFocus: true,
                noScroll: true,
                replaceState: true,
            });
        }, 300);
    }

    function goToPage(page: number) {
        const url = new URL(window.location.href);
        if (page <= 1) url.searchParams.delete("page");
        else url.searchParams.set("page", String(page));
        goto(url.toString(), { noScroll: false });
    }

    function getPageNumbers(current: number, total: number): (number | '...')[] {
        if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
        const pages: (number | '...')[] = [1];
        if (current > 3) pages.push('...');
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
            pages.push(i);
        }
        if (current < total - 2) pages.push('...');
        pages.push(total);
        return pages;
    }

    const filterOptions = [
        { value: "all", icon: "🪙", label: "Semua" },
        { value: "halal", icon: "✅", label: "Halal" },
        { value: "syubhat", icon: "⚠️", label: "Syubhat" },
        { value: "haram", icon: "❌", label: "Haram" },
    ];
</script>

<Seo 
    title="Screening Crypto Syariah | CryptoSharia"
    description="Daftar token yang sudah di-screening oleh tim CryptoSharia. Status: Halal, Syubhat, atau Haram."
/>

<main class="container screening-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
        <div class="hero-glow"></div>
        <h1>Screening <span class="text-brand">Syariah</span></h1>
        <p class="hero-sub">
            Penilaian crypto berdasarkan prinsip syariah oleh tim CryptoSharia
        </p>

        <!-- Search -->
        <div class="search-wrapper">
            <svg
                class="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
                type="text"
                class="search-input"
                placeholder="Cari nama atau ticker coin..."
                bind:value={searchQuery}
                oninput={handleSearchInput}
            />
        </div>
    </section>

    <!-- Filter Pills -->
    <section class="filter-section">
        {#each filterOptions as opt}
            <button
                class="filter-pill"
                class:active={currentFilter === opt.value}
                onclick={() => handleFilter(opt.value)}
            >
                <span class="pill-icon">{opt.icon}</span>
                <span>{opt.label}</span>
            </button>
        {/each}
    </section>

    <!-- Legend -->
    <section class="legend-strip">
        <div class="legend-item halal">
            <span class="legend-dot"></span>
            <strong>Halal</strong>
            <span class="legend-desc"
                >– Tidak mengandung riba, gharar, atau maisir</span
            >
        </div>
        <div class="legend-item syubhat">
            <span class="legend-dot"></span>
            <strong>Syubhat</strong>
            <span class="legend-desc"
                >– Perbedaan pendapat ulama, perlu kehati-hatian</span
            >
        </div>
        <div class="legend-item haram">
            <span class="legend-dot"></span>
            <strong>Haram</strong>
            <span class="legend-desc"
                >– Bertentangan dengan prinsip syariah</span
            >
        </div>
    </section>

    <!-- Results count -->
    <div class="results-bar">
        {#if data.pagination.total > 0}
            {@const start = (data.pagination.page - 1) * data.pagination.limit + 1}
            {@const end = Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)}
            <span class="results-count">Menampilkan {start}–{end} dari {data.pagination.total} coin</span>
        {:else}
            <span class="results-count">0 coin ditampilkan</span>
        {/if}
    </div>

    <!-- Coin Grid -->
    <div class="coin-grid">
        {#each data.tokens as coin}
            <article class="coin-card" data-status={coin.shariaStatus}>
                <div class="card-accent {coin.shariaStatus}"></div>
                <div class="card-body">
                    <div class="coin-header">
                        <div class="coin-avatar">
                            <img
                                src={coin.logo?.url ??
                                    getTokenLogoUrl(coin.logo?.id)}
                                alt={coin.name}
                                class="coin-logo"
                            />
                        </div>
                        <div class="coin-meta">
                            <h4 class="coin-name">{coin.name}</h4>
                            <span class="coin-ticker">{coin.ticker}</span>
                        </div>
                        <span class="status-badge {coin.shariaStatus}"
                            >{coin.shariaStatus}</span
                        >
                    </div>

                    {#if coin.category && coin.category !== "Uncategorized"}
                        <div class="coin-tags">
                            <span class="coin-tag">{coin.category}</span>
                        </div>
                    {/if}

                    {#if coin.excerpt}
                        <p class="coin-excerpt">{coin.excerpt}</p>
                    {/if}

                    {#if coin.slug}
                        <a href="/tokens/{coin.slug}" class="detail-btn">
                            Lihat Detail
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2.5"
                            >
                                <path d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                        </a>
                    {/if}
                </div>
            </article>
        {:else}
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>Tidak ada coin ditemukan</h3>
                <p>Coba ubah kata kunci atau reset filter</p>
                <button class="reset-btn" onclick={() => handleFilter("all")}
                    >Reset Filter</button
                >
            </div>
        {/each}
    </div>

    <!-- Pagination -->
    {#if data.pagination.totalPages > 1}
        <nav class="pagination" aria-label="Pagination">
            <button
                class="page-btn nav-btn"
                disabled={data.pagination.page <= 1}
                onclick={() => goToPage(data.pagination.page - 1)}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span class="nav-label">Prev</span>
            </button>

            <div class="page-numbers">
                {#each getPageNumbers(data.pagination.page, data.pagination.totalPages) as pg}
                    {#if pg === '...'}
                        <span class="page-ellipsis">…</span>
                    {:else}
                        <button
                            class="page-btn"
                            class:active={pg === data.pagination.page}
                            onclick={() => goToPage(pg as number)}
                        >
                            {pg}
                        </button>
                    {/if}
                {/each}
            </div>

            <button
                class="page-btn nav-btn"
                disabled={data.pagination.page >= data.pagination.totalPages}
                onclick={() => goToPage(data.pagination.page + 1)}
            >
                <span class="nav-label">Next</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </nav>
    {/if}
</main>

<style>
    /* ===== Page ===== */
    .screening-page {
        padding-bottom: 100px;
    }

    /* ===== Hero Banner ===== */
    .hero-banner {
        position: relative;
        text-align: center;
        padding: 3.5rem 2rem 2.5rem;
        margin-bottom: 2rem;
        border-radius: 24px;
        background: linear-gradient(
            135deg,
            rgba(252, 192, 0, 0.06) 0%,
            rgba(245, 102, 10, 0.06) 100%
        );
        border: 1px solid var(--border-color);
        overflow: hidden;
    }

    .hero-glow {
        position: absolute;
        top: -60%;
        left: 50%;
        transform: translateX(-50%);
        width: 500px;
        height: 500px;
        background: radial-gradient(
            circle,
            rgba(252, 192, 0, 0.12) 0%,
            transparent 70%
        );
        pointer-events: none;
    }

    .hero-banner h1 {
        font-size: 2.75rem;
        font-weight: 800;
        margin: 0 0 0.5rem;
        letter-spacing: -0.5px;
        position: relative;
    }

    .text-brand {
        background: linear-gradient(
            135deg,
            var(--brand) 0%,
            var(--accent) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-sub {
        color: var(--muted);
        font-size: 1.05rem;
        margin: 0 0 2rem;
        position: relative;
    }

    /* ===== Search ===== */
    .search-wrapper {
        position: relative;
        max-width: 480px;
        margin: 0 auto;
    }

    .search-icon {
        position: absolute;
        left: 1.1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--muted);
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 0.85rem 1.25rem 0.85rem 3rem;
        border-radius: 14px;
        border: 1px solid var(--border-color);
        background: var(--elev);
        color: var(--text);
        font-size: 0.95rem;
        transition:
            border-color 0.25s,
            box-shadow 0.25s;
        outline: none;
    }

    .search-input::placeholder {
        color: var(--muted);
    }

    .search-input:focus {
        border-color: var(--brand);
        box-shadow: 0 0 0 3px rgba(252, 192, 0, 0.15);
    }

    /* ===== Filter Pills ===== */
    .filter-section {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        justify-content: center;
        margin-bottom: 2rem;
    }

    .filter-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.55rem 1.15rem;
        border-radius: 999px;
        border: 1px solid var(--border-color);
        background: var(--elev);
        color: var(--text);
        cursor: pointer;
        font-size: 0.88rem;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;
    }

    .filter-pill:hover {
        border-color: rgba(252, 192, 0, 0.4);
        background: rgba(252, 192, 0, 0.06);
    }

    .filter-pill.active {
        background: linear-gradient(135deg, var(--brand), var(--accent));
        color: #000;
        border-color: transparent;
        font-weight: 700;
        box-shadow: 0 2px 12px rgba(252, 192, 0, 0.3);
    }

    .pill-icon {
        font-size: 1rem;
    }

    /* ===== Legend Strip ===== */
    .legend-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: center;
        padding: 1.25rem 1.5rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        margin-bottom: 2.5rem;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.85rem;
        color: var(--text);
    }

    .legend-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .legend-item.halal .legend-dot {
        background: #10b981;
    }
    .legend-item.syubhat .legend-dot {
        background: #f59e0b;
    }
    .legend-item.haram .legend-dot {
        background: #ef4444;
    }

    .legend-desc {
        color: var(--muted);
        font-weight: 400;
    }

    /* ===== Results Bar ===== */
    .results-bar {
        margin-bottom: 1.25rem;
    }

    .results-count {
        font-size: 0.9rem;
        color: var(--muted);
        font-weight: 500;
    }

    /* ===== Coin Grid ===== */
    .coin-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.25rem;
    }

    /* ===== Coin Card ===== */
    .coin-card {
        display: flex;
        border-radius: 16px;
        background: var(--elev);
        border: 1px solid var(--border-color);
        overflow: hidden;
        transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
    }

    .coin-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        border-color: rgba(252, 192, 0, 0.2);
    }

    .card-accent {
        width: 4px;
        flex-shrink: 0;
    }

    .card-accent.halal {
        background: linear-gradient(180deg, #10b981, #059669);
    }
    .card-accent.syubhat {
        background: linear-gradient(180deg, #f59e0b, #d97706);
    }
    .card-accent.haram {
        background: linear-gradient(180deg, #ef4444, #dc2626);
    }

    .card-body {
        flex: 1;
        padding: 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .coin-header {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        margin-bottom: 0.75rem;
    }

    .coin-avatar {
        position: relative;
    }

    .coin-logo {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--border-color);
        background: var(--bg);
    }

    .coin-meta {
        flex: 1;
        min-width: 0;
    }

    .coin-name {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.3;
    }

    .coin-ticker {
        font-size: 0.8rem;
        color: var(--muted);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* ===== Status Badge ===== */
    .status-badge {
        padding: 0.3rem 0.85rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: capitalize;
        letter-spacing: 0.3px;
        white-space: nowrap;
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

    /* ===== Tags ===== */
    .coin-tags {
        margin-bottom: 0.65rem;
    }

    .coin-tag {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        border-radius: 6px;
        font-size: 0.72rem;
        font-weight: 500;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--border-color);
    }

    /* ===== Excerpt ===== */
    .coin-excerpt {
        font-size: 0.88rem;
        color: var(--muted);
        line-height: 1.55;
        margin: 0 0 0.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* ===== Detail Button ===== */
    .detail-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-top: auto;
        padding: 0.55rem 1.1rem;
        border-radius: 10px;
        background: rgba(252, 192, 0, 0.1);
        color: var(--brand);
        font-size: 0.82rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
        width: fit-content;
    }

    .detail-btn:hover {
        background: rgba(252, 192, 0, 0.2);
        transform: translateX(2px);
    }

    .detail-btn svg {
        transition: transform 0.2s ease;
    }

    .detail-btn:hover svg {
        transform: translateX(3px);
    }

    /* ===== Empty State ===== */
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 20px;
    }

    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .empty-state h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
    }

    .empty-state p {
        color: var(--muted);
        margin: 0 0 1.5rem;
    }

    .reset-btn {
        padding: 0.65rem 1.5rem;
        background: linear-gradient(135deg, var(--brand), var(--accent));
        color: #000;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .reset-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(252, 192, 0, 0.3);
    }

    /* ===== Responsive ===== */
    @media (max-width: 768px) {
        .hero-banner {
            padding: 2.5rem 1.25rem 2rem;
        }

        .hero-banner h1 {
            font-size: 2rem;
        }

        .legend-strip {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
        }

        .coin-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        .hero-banner h1 {
            font-size: 1.75rem;
        }

        .filter-section {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
        }

        .filter-pill {
            flex-shrink: 0;
        }
    }

    /* ===== Pagination ===== */
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2.5rem;
        flex-wrap: wrap;
    }

    .page-numbers {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }

    .page-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        min-width: 40px;
        height: 40px;
        padding: 0 0.65rem;
        border-radius: 10px;
        border: 1px solid var(--border-color);
        background: var(--elev);
        color: var(--text);
        font-size: 0.88rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .page-btn:hover:not(:disabled):not(.active) {
        border-color: rgba(252, 192, 0, 0.4);
        background: rgba(252, 192, 0, 0.06);
    }

    .page-btn.active {
        background: linear-gradient(135deg, var(--brand), var(--accent));
        color: #000;
        border-color: transparent;
        font-weight: 700;
        box-shadow: 0 2px 12px rgba(252, 192, 0, 0.3);
    }

    .page-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    .page-ellipsis {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 40px;
        color: var(--muted);
        font-size: 0.95rem;
        user-select: none;
    }

    .nav-btn {
        padding: 0 0.85rem;
    }

    @media (max-width: 480px) {
        .nav-label {
            display: none;
        }

        .page-btn {
            min-width: 36px;
            height: 36px;
            font-size: 0.82rem;
        }
    }
</style>
