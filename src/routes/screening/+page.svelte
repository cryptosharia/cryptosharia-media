<script lang="ts">
    import Pagination from '$lib/components/Pagination.svelte';
    import MarketMap from '$lib/components/screening/MarketMap.svelte';
    import MarketSummary from '$lib/components/screening/MarketSummary.svelte';
    import ScreeningRow from '$lib/components/screening/ScreeningRow.svelte';
    import TrendingTokens from '$lib/components/screening/TrendingTokens.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { formatDate } from '$lib/format';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    const filters = [{ value: '', label: 'Semua' }, { value: 'halal', label: 'Halal' }, { value: 'syubhat', label: 'Syubhat' }, { value: 'haram', label: 'Haram' }] as const;

    function buildHref(targetPage: number) { const query = new URLSearchParams(); if (data.status) query.set('status', data.status); if (data.search) query.set('q', data.search); if (data.sort !== 'popular') query.set('sort', data.sort); if (targetPage > 1) query.set('page', String(targetPage)); return `/screening${query.size ? `?${query}` : ''}`; }
    function canonicalPath() { const query = new URLSearchParams(); if (data.status) query.set('status', data.status); if (data.sort !== 'popular') query.set('sort', data.sort); if (data.pagination.page > 1) query.set('page', String(data.pagination.page)); return `/screening${query.size ? `?${query}` : ''}`; }
    function filterHref(status: string) { const query = new URLSearchParams(); if (status) query.set('status', status); if (data.search) query.set('q', data.search); if (data.sort !== 'popular') query.set('sort', data.sort); return `/screening${query.size ? `?${query}` : ''}`; }
</script>

<Seo title="Screening Crypto Syariah — CryptoSharia" description="Cari dan baca hasil screening aset kripto yang telah dipublikasikan oleh CryptoSharia." canonicalPath={canonicalPath()} noindex={Boolean(data.search)} />

<main id="main-content" class="site-main screening-page">
    <header class="container screening-hero">
        <p class="screening-kicker">CryptoSharia · Screening aset digital</p>
        <h1>Screening Crypto Syariah</h1>
        <p class="hero-description">Cari aset dan pelajari status screening berdasarkan kajian CryptoSharia.</p>
        <form class="screening-search" method="GET" action="/screening" role="search">
            {#if data.status}<input type="hidden" name="status" value={data.status} />{/if}
            {#if data.sort !== 'popular'}<input type="hidden" name="sort" value={data.sort} />{/if}
            <label class="sr-only" for="search-coin">Cari nama aset atau ticker</label>
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.25"></circle><path d="m12.4 12.4 4.1 4.1"></path></svg>
            <input id="search-coin" type="search" name="q" value={data.search} placeholder="Cari nama aset atau tickerâ€¦" autocomplete="off" />
            <button type="submit">Cari</button>
        </form>
    </header>

    <section class="container screening-controls" aria-label="Filter status screening">
        <nav class="status-tabs" aria-label="Filter status">
            {#each filters as filter (filter.value)}<a class={`status-tab ${filter.value || 'all'}`} class:active={data.status === filter.value} href={filterHref(filter.value)} aria-current={data.status === filter.value ? 'page' : undefined}><span class={`filter-dot ${filter.value || 'all'}`} aria-hidden="true"></span>{filter.label}</a>{/each}
        </nav>
    </section>

    <MarketMap items={data.marketMap} />
    <TrendingTokens tokens={data.trendingTokens} />
    <MarketSummary items={data.marketMap} />

    <section class="container screening-results" aria-labelledby="results-heading">
        <header class="results-header">
            <div>
                <p class="results-kicker">CryptoSharia</p>
                <h2 id="results-heading">Daftar Screening</h2>
                <p class="results-count">Menampilkan {data.pagination.total ? (data.pagination.page - 1) * data.pagination.limit + 1 : 0}â€“{Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} dari {data.pagination.total} aset</p>
            </div>
            <form class="sort-control" method="GET" action="/screening">
                {#if data.status}<input type="hidden" name="status" value={data.status} />{/if}
                {#if data.search}<input type="hidden" name="q" value={data.search} />{/if}
                <label for="screening-sort">Urutkan</label>
                <select id="screening-sort" name="sort" value={data.sort} onchange={(event) => event.currentTarget.form?.requestSubmit()}><option value="popular">Paling terkenal</option><option value="latest">Terbaru diperbarui</option><option value="az">Aâ€“Z</option></select>
            </form>
        </header>
        {#if data.latestUpdatedAt}<p class="screening-freshness">Pembaruan terbaru {formatDate(data.latestUpdatedAt)}</p>{/if}
        {#if data.tokens.length}
            <div class="screening-directory">{#each data.tokens as token (token.id)}<ScreeningRow {token} />{/each}</div>
            <div class="screening-pagination"><Pagination pagination={data.pagination} {buildHref} /></div>
        {:else}
            <StateMessage title={data.error ? 'Data screening belum dapat dimuat' : 'Tidak ada aset yang cocok'} message={data.error || 'Coba kata kunci atau filter status yang berbeda.'} actionHref="/screening" actionLabel="Reset pencarian" />
        {/if}
        <aside class="screening-note"><strong>Catatan</strong><span>Hasil screening merupakan informasi berdasarkan metodologi CryptoSharia, bukan fatwa personal maupun nasihat finansial.</span></aside>
    </section>
</main>

<style>
    .screening-hero{padding-top:48px}.screening-kicker,.results-kicker{margin:0 0 8px;color:var(--muted);font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.screening-hero h1{margin:0;font-size:clamp(2.1rem,4vw,3.15rem);line-height:1.08;letter-spacing:-.045em}.hero-description{margin:10px 0 22px;color:var(--muted);font-size:.96rem}.screening-search{display:grid;width:min(760px,100%);min-height:58px;grid-template-columns:24px minmax(0,1fr) auto;align-items:center;gap:10px;padding:6px 7px 6px 17px;border:1px solid var(--border-control);border-radius:10px;background:var(--surface);transition:border-color 140ms ease,box-shadow 140ms ease}.screening-search:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 18%,transparent)}.screening-search svg{width:19px;height:19px;fill:none;stroke:var(--muted);stroke-linecap:round;stroke-width:1.7}.screening-search input{width:100%;min-width:0;height:42px;color:var(--text);border:0;outline:0;background:transparent;font:inherit}.screening-search input::placeholder{color:var(--muted);opacity:.82}.screening-search button{min-height:42px;padding:0 20px;color:var(--on-accent);border:0;border-radius:7px;background:var(--accent);font-size:.84rem;font-weight:700;cursor:pointer}.screening-search button:hover{background:var(--accent-hover)}
    .screening-controls{margin-top:22px}.status-tabs{display:flex;flex-wrap:wrap;gap:8px}.status-tab{display:inline-flex;min-height:38px;align-items:center;gap:8px;padding:7px 12px;color:var(--muted);border:1px solid var(--border);border-radius:8px;background:var(--surface);font-size:.8rem;font-weight:650}.status-tab:hover{color:var(--text);border-color:var(--border-control)}.status-tab.active{color:var(--text);border-color:color-mix(in srgb,var(--accent) 55%,var(--border));background:color-mix(in srgb,var(--accent) 10%,var(--surface))}.filter-dot{width:7px;height:7px;border-radius:50%;background:var(--muted)}.filter-dot.halal{background:var(--success)}.filter-dot.syubhat{background:var(--warning)}.filter-dot.haram{background:var(--danger)}.filter-dot.all{background:var(--accent)}
    .screening-results{padding-block:42px 80px}.results-header{display:flex;align-items:end;justify-content:space-between;gap:20px;padding-bottom:15px;border-bottom:1px solid var(--border)}.results-kicker{margin-bottom:5px}.results-header h2{margin:0;font-size:1.55rem;line-height:1.2;letter-spacing:-.03em}.results-count{margin:6px 0 0;color:var(--muted);font-size:.82rem}.sort-control{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.77rem}.sort-control select{min-height:38px;padding:6px 28px 6px 10px;color:var(--text);border:1px solid var(--border);border-radius:7px;background:var(--surface);font:inherit}.screening-freshness{margin:12px 0;color:var(--muted);font-size:.74rem}.screening-directory{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}.screening-pagination :global(.pagination){flex-wrap:wrap;margin-top:28px;padding-top:18px;border-top:1px solid var(--border)}.screening-pagination :global(.pagination .button){border-radius:7px;background:var(--surface)}.screening-note{display:flex;max-width:860px;gap:16px;margin-top:38px;padding:14px 0 0;color:var(--muted);border-top:1px solid var(--border);font-size:.8rem;line-height:1.55}.screening-note strong{flex:0 0 auto;color:var(--text)}
    @media(max-width:1100px){.screening-directory{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:760px){.screening-hero{padding-top:34px}.screening-search{min-height:54px}.screening-results{padding-block:30px 68px}.screening-directory{grid-template-columns:1fr}}
    @media(max-width:520px){.screening-hero h1{font-size:2rem}.hero-description{font-size:.88rem}.screening-search{grid-template-columns:20px minmax(0,1fr) auto;gap:7px;padding-left:12px}.screening-search button{padding-inline:14px}.status-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.status-tab{justify-content:center;gap:5px;padding-inline:5px;font-size:.72rem}.filter-dot{width:6px;height:6px}.results-header{align-items:start;flex-direction:column}.sort-control{width:100%;justify-content:space-between}.screening-note{gap:10px;font-size:.74rem}}
</style>
