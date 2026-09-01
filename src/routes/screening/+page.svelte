<script lang="ts">
    import Pagination from '$lib/components/Pagination.svelte';
    import ScreeningRow from '$lib/components/screening/ScreeningRow.svelte';
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

<Seo title="Screening Coin — CryptoSharia" description="Cari dan baca hasil screening coin yang telah dipublikasikan oleh CryptoSharia." canonicalPath={canonicalPath()} noindex={Boolean(data.search)} />

<main id="main-content" class="site-main">
    <header class="container screening-intro"><p class="screening-kicker">Screening Coin</p><h1>Kenali status setiap coin</h1><p>Cari coin dan buka penjelasan screening yang telah dipublikasikan oleh tim CryptoSharia.</p></header>
    <section class="container screening-discovery" aria-label="Screener coin">
        <form class="screening-search" method="GET" action="/screening" role="search">
            {#if data.status}<input type="hidden" name="status" value={data.status} />{/if}
            {#if data.sort !== 'popular'}<input type="hidden" name="sort" value={data.sort} />{/if}
            <label class="sr-only" for="search-coin">Cari coin atau ticker</label><input id="search-coin" type="search" name="q" value={data.search} placeholder="Cari nama coin atau ticker…" autocomplete="off" />
            <button type="submit" aria-label="Cari coin"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.25"></circle><path d="m12.4 12.4 4.1 4.1"></path></svg></button>
        </form>
        <nav class="status-tabs" aria-label="Filter status screening">{#each filters as filter (filter.value)}<a class={`status-tab ${filter.value || 'all'}`} class:active={data.status === filter.value} href={filterHref(filter.value)} aria-current={data.status === filter.value ? 'page' : undefined}>{filter.label}</a>{/each}</nav>
        <div class="toolbar-meta">
            <form class="sort-control" method="GET" action="/screening">
                {#if data.status}<input type="hidden" name="status" value={data.status} />{/if}{#if data.search}<input type="hidden" name="q" value={data.search} />{/if}
                <label for="screening-sort">Urutkan</label><select id="screening-sort" name="sort" value={data.sort} onchange={(event) => event.currentTarget.form?.requestSubmit()}><option value="popular">Paling terkenal</option><option value="latest">Terbaru diperbarui</option><option value="az">A–Z</option></select>
            </form>
            <span class="asset-count" aria-live="polite">{data.pagination.total} aset</span>
        </div>
    </section>
    {#if data.latestUpdatedAt}<p class="container screening-freshness">Pembaruan terbaru {formatDate(data.latestUpdatedAt)}</p>{/if}
    <section class="container screening-content" aria-label="Daftar coin tersaring">
        {#if data.tokens.length}
            <div class="screening-directory">{#each data.tokens as token (token.id)}<ScreeningRow {token} />{/each}</div>
            <div class="screening-pagination"><Pagination pagination={data.pagination} {buildHref} /></div>
        {:else}<StateMessage title={data.error ? 'Data screening belum dapat dimuat' : 'Tidak ada aset yang cocok'} message={data.error || 'Coba kata kunci atau filter status yang berbeda.'} actionHref="/screening" actionLabel="Reset pencarian" />{/if}
        <aside class="screening-note"><p>Catatan</p><span>Hasil screening bersifat informasi dan bukan nasihat finansial. Baca penjelasan lengkap serta lakukan pertimbangan mandiri sebelum mengambil keputusan.</span></aside>
    </section>
</main>

<style>
 .screening-intro{padding-top:80px}.screening-kicker{margin:0 0 12px;color:var(--muted);font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.screening-intro h1{max-width:760px;margin:0;font-size:clamp(3rem,4.5vw,3.5rem);line-height:1.08;letter-spacing:-.05em}.screening-intro>p:last-child{max-width:660px;margin:16px 0 0;color:var(--muted);font-size:1.02rem;line-height:1.65}
 .screening-discovery{position:sticky;top:calc(var(--header-height) + 12px);z-index:10;display:grid;grid-template-columns:minmax(280px,1.3fr) auto auto;align-items:center;gap:12px 16px;margin-top:52px;padding-block:14px;border-block:1px solid var(--border);background:var(--canvas)}.screening-search{display:grid;min-height:46px;grid-template-columns:minmax(0,1fr) 46px;align-items:center;overflow:hidden;border:1px solid var(--border-control);border-radius:8px;background:var(--surface)}.screening-search:focus-within{border-color:var(--accent)}.screening-search input{width:100%;min-width:0;height:44px;padding:0 4px 0 14px;color:var(--text);border:0;outline:0;background:transparent;font:inherit;font-size:.86rem}.screening-search input::placeholder{color:var(--muted);opacity:.8}.screening-search button{display:grid;width:46px;height:44px;place-items:center;padding:0;color:var(--muted);border:0;background:transparent;cursor:pointer}.screening-search button:hover{color:var(--text);background:var(--surface-muted)}.screening-search svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-width:1.6}
 .status-tabs{display:flex;gap:5px;min-width:0}.status-tab{display:inline-flex;min-height:36px;flex:0 0 auto;align-items:center;padding:7px 10px;color:var(--muted);border:1px solid transparent;border-radius:7px;font-size:.8rem;font-weight:650}.status-tab:hover{color:var(--text);border-color:var(--border)}.status-tab.active.all{color:#17130e;border-color:var(--accent);background:var(--accent)}.status-tab.active.halal{color:var(--success);border-color:color-mix(in srgb,var(--success) 45%,var(--border));background:color-mix(in srgb,var(--success-bg) 68%,transparent)}.status-tab.active.syubhat{color:var(--warning);border-color:color-mix(in srgb,var(--warning) 45%,var(--border));background:color-mix(in srgb,var(--warning-bg) 68%,transparent)}.status-tab.active.haram{color:var(--danger);border-color:color-mix(in srgb,var(--danger) 45%,var(--border));background:color-mix(in srgb,var(--danger-bg) 68%,transparent)}.toolbar-meta{display:flex;align-items:center;justify-content:end;gap:14px}.sort-control{display:inline-flex;align-items:center;gap:7px;color:var(--muted);font-size:.76rem;white-space:nowrap}.sort-control select{min-width:128px;padding:6px 22px 6px 8px;color:var(--text);border:1px solid var(--border);border-radius:6px;background:var(--surface);font:inherit;font-size:.76rem;cursor:pointer}.asset-count{color:var(--muted);font-size:.8rem;white-space:nowrap}
 .screening-freshness{margin-top:14px;color:var(--muted);font-size:.78rem}.screening-content{padding-block:18px 104px}.screening-directory{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 14px}.screening-pagination :global(.pagination){flex-wrap:wrap;margin-top:48px;padding-top:28px;border-top:1px solid var(--border)}.screening-pagination :global(.pagination .button){border-radius:7px;background:transparent}.screening-note{display:grid;max-width:760px;grid-template-columns:110px minmax(0,1fr);gap:20px;margin-top:56px;padding:20px 0 0 18px;color:var(--muted);border-top:1px solid var(--border);border-left:2px solid var(--accent);font-size:.9rem;line-height:1.65}.screening-note p{margin:0;color:var(--text);font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
 @media(min-width:1440px){.screening-directory{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 14px}}@media(max-width:1040px){.screening-discovery{grid-template-columns:minmax(280px,1fr) auto}.toolbar-meta{justify-content:flex-start}}@media(max-width:760px){.screening-intro{padding-top:64px}.screening-intro h1{font-size:2.25rem}.screening-discovery{position:static;grid-template-columns:1fr;gap:12px;margin-top:36px}.status-tabs{width:calc(100% + 16px);overflow-x:auto;padding-right:16px;scrollbar-width:none}.status-tabs::-webkit-scrollbar{display:none}.toolbar-meta{justify-content:space-between}.screening-directory{grid-template-columns:1fr;gap:10px}}@media(max-width:600px){.screening-intro{padding-top:52px}.screening-intro h1{font-size:clamp(2rem,9.2vw,2.25rem)}.screening-intro>p:last-child{margin-top:12px;font-size:.94rem}.screening-freshness{margin-top:12px;font-size:.76rem}.screening-content{padding-block:16px 80px}.sort-control label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.screening-pagination :global(.pagination){gap:8px;margin-top:40px}.screening-pagination :global(.pagination>span:not(.button)){order:-1;width:100%;text-align:center}.screening-note{grid-template-columns:1fr;gap:7px;margin-top:44px;padding-left:15px}}
</style>
