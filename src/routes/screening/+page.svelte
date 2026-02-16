<script lang="ts">
    import "../../app.css";
    import { getTokenLogoUrl } from "$lib/utils/assets";
    import type { TokenDetail } from "$types/api"; // Ensure TokenDetail is used if needed

    // Props
    let { data } = $props();

    // State
    let searchQuery = $state(data.params.search);
    let currentFilter = $state(data.params.status);

    // Derived
    // We are doing client-side filtering for immediate feedback if data is small enough,
    // OR we can rely on server-side reloading.
    // The previous implementation used client-side filtering on a full dataset.
    // Since we fetch 100 items, let's assume we can filter client-side or use form submission.
    // Let's use form submission (GET) for robust server-side filtering as implemented in +page.server.ts.

    function handleFilter(status: string) {
        currentFilter = status;
        const url = new URL(window.location.href);
        url.searchParams.set("status", status);
        if (status === "all") url.searchParams.delete("status");
        window.location.href = url.toString();
    }

    function handleSearch(e: Event) {
        if ((e as KeyboardEvent).key === "Enter") {
            const url = new URL(window.location.href);
            if (searchQuery) url.searchParams.set("q", searchQuery);
            else url.searchParams.delete("q");
            window.location.href = url.toString();
        }
    }
</script>

<svelte:head>
    <title>Screening Crypto Syariah | CryptoSharia</title>
    <meta
        name="description"
        content="Daftar token yang sudah di-screening oleh tim CryptoSharia. Status: Halal, Syubhat, atau Haram."
    />
</svelte:head>

<main class="container screening-page">
    <div class="header-section">
        <h1>Screening <span class="text-brand">Syariah</span></h1>
        <p class="muted">Penilaian crypto berdasarkan prinsip syariah</p>
    </div>

    <!-- Filter Bar -->
    <section class="filter-section">
        <div class="filter-bar">
            <button
                class="filter-btn"
                class:active={currentFilter === "all"}
                onclick={() => handleFilter("all")}
            >
                <span class="filter-icon">🔍</span> Semua
            </button>
            <button
                class="filter-btn"
                class:active={currentFilter === "halal"}
                onclick={() => handleFilter("halal")}
            >
                <span class="filter-icon">✅</span> Halal
            </button>
            <button
                class="filter-btn"
                class:active={currentFilter === "syubhat"}
                onclick={() => handleFilter("syubhat")}
            >
                <span class="filter-icon">⚠️</span> Syubhat
            </button>
            <button
                class="filter-btn"
                class:active={currentFilter === "haram"}
                onclick={() => handleFilter("haram")}
            >
                <span class="filter-icon">❌</span> Haram
            </button>
        </div>
        <div class="search-box">
            <input
                type="text"
                placeholder="Cari coin..."
                bind:value={searchQuery}
                onkeydown={handleSearch}
            />
        </div>
    </section>

    <!-- Legend -->
    <section class="legend-section">
        <div class="legend-card">
            <h4>Kriteria Penilaian Syariah</h4>
            <div class="legend-grid">
                <div class="legend-item">
                    <span class="status-badge halal">Halal</span>
                    <p>
                        Tidak mengandung unsur riba, gharar berlebihan, atau
                        maisir
                    </p>
                </div>
                <div class="legend-item">
                    <span class="status-badge syubhat">Syubhat</span>
                    <p>
                        Ada perbedaan pendapat ulama, perlu kehati-hatian dalam
                        penggunaannya
                    </p>
                </div>
                <div class="legend-item">
                    <span class="status-badge haram">Haram</span>
                    <p>
                        Mengandung unsur yang jelas bertentangan dengan prinsip
                        syariah
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Coin Grid -->
    <section class="section">
        <h3 style="margin-bottom: 1.5rem;">
            {data.tokens.length} Coin Ditampilkan
        </h3>

        <div class="coin-grid">
            {#each data.tokens as coin}
                <article class="coin-card" data-status={coin.shariaStatus}>
                    <div class="coin-header">
                        <img
                            src={getTokenLogoUrl(coin.logo?.id)}
                            alt={coin.name}
                            class="coin-logo"
                        />
                        <div class="coin-info">
                            <h4 class="coin-name">{coin.name}</h4>
                            <span class="coin-ticker">{coin.ticker}</span>
                        </div>
                        <span class="status-badge {coin.shariaStatus}"
                            >{coin.shariaStatus}</span
                        >
                    </div>

                    <div class="coin-category">
                        <span class="tag"
                            >{coin.category ?? "Uncategorized"}</span
                        >
                    </div>

                    {#if coin.excerpt}
                        <p class="coin-notes">{coin.excerpt}</p>
                    {/if}

                    <details class="coin-details">
                        <summary>Lihat Detail</summary>
                        <p style="margin-top: 1rem; color: var(--text);">
                            {coin.content}
                        </p>
                        {#if coin.slug}
                            <a href="/tokens/{coin.slug}" class="detail-link"
                                >Baca selengkapnya →</a
                            >
                        {/if}
                    </details>
                </article>
            {:else}
                <div class="empty-state">
                    <p>Tidak ada coin yang ditemukan.</p>
                    <button class="btn" onclick={() => handleFilter("all")}
                        >Reset Filter</button
                    >
                </div>
            {/each}
        </div>
    </section>

    <!-- Disclaimer -->
    <section class="disclaimer-section">
        <div class="disclaimer-card">
            <h4>⚠️ Disclaimer</h4>
            <p>
                Penilaian ini bersifat edukatif dan berdasarkan analisis tim
                CryptoSharia. <strong>Bukan fatwa resmi.</strong> Untuk keputusan
                investasi, konsultasikan dengan ulama atau lembaga fatwa terpercaya.
            </p>
        </div>
    </section>
</main>

<style>
    .screening-page {
        padding-bottom: 100px;
    }
    .header-section {
        text-align: center;
        margin: 2rem 0 3rem;
    }
    .header-section h1 {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }
    .text-brand {
        color: var(--brand);
    }

    /* Filter Bar */
    .filter-section {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    .filter-bar {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }
    .filter-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        background: var(--elev);
        color: var(--text); /* Explicitly set text color */
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        white-space: nowrap;
        transition: all 0.2s; /* Add transition for smoothness */
    }
    .filter-btn:hover {
        background: var(--bg-hover);
    }
    .filter-btn.active {
        background: var(--brand);
        color: white;
        border-color: var(--brand);
    }

    .search-box input {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 1px solid var(--border);
        background: var(--elev);
        min-width: 200px;
    }

    /* Legend */
    .legend-section {
        margin-bottom: 3rem;
    }
    .legend-card {
        background: var(--elev);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1.5rem;
    }
    .legend-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }
    .legend-item p {
        font-size: 0.85rem;
        color: var(--text-muted);
        margin-top: 0.5rem;
        line-height: 1.4;
    }

    /* Coin Grid */
    .coin-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    .coin-card {
        background: var(--elev);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1.5rem;
        transition: transform 0.2s;
    }
    .coin-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .coin-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .coin-logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .coin-info {
        flex: 1;
    }
    .coin-name {
        margin: 0;
        font-size: 1.1rem;
    }
    .coin-ticker {
        font-size: 0.85rem;
        color: var(--text-muted);
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: capitalize;
    }
    .status-badge.halal {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }
    .status-badge.syubhat {
        background: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
    }
    .status-badge.haram {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }

    .coin-category {
        margin-bottom: 1rem;
    }
    .tag {
        background: var(--bg);
        border: 1px solid var(--border);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .coin-notes {
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .coin-details summary {
        cursor: pointer;
        color: var(--brand);
        font-size: 0.9rem;
        font-weight: 500;
    }
    .detail-link {
        display: inline-block;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--brand);
        text-decoration: none;
    }

    /* Disclaimer */
    .disclaimer-section {
        margin-top: 4rem;
    }
    .disclaimer-card {
        background: rgba(245, 158, 11, 0.1);
        border: 1px solid rgba(245, 158, 11, 0.2);
        padding: 1.5rem;
        border-radius: var(--radius);
        text-align: center;
    }
    .disclaimer-card h4 {
        color: #f59e0b;
        margin-bottom: 0.5rem;
    }
    .disclaimer-card p {
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem;
        background: var(--elev);
        border-radius: var(--radius);
    }
    .empty-state .btn {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: var(--brand);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
</style>
