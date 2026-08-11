<script lang="ts">
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import TokenCard from '$lib/components/TokenCard.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function buildHref(targetPage: number) {
        const query = new URLSearchParams();
        if (data.status) query.set('status', data.status);
        if (data.search) query.set('q', data.search);
        if (targetPage > 1) query.set('page', String(targetPage));
        return `/screening${query.size ? `?${query}` : ''}`;
    }

    function canonicalPath() {
        const query = new URLSearchParams();
        if (data.status) query.set('status', data.status);
        if (data.pagination.page > 1) query.set('page', String(data.pagination.page));
        return `/screening${query.size ? `?${query}` : ''}`;
    }
</script>

<Seo
    title="Screening Coin — CryptoSharia"
    description="Cari dan baca hasil screening coin yang telah dipublikasikan oleh CryptoSharia."
    canonicalPath={canonicalPath()}
    noindex={Boolean(data.search)}
/>

<main id="main-content" class="site-main">
    <header class="container page-hero compact">
        <p class="eyebrow">Screening Coin</p>
        <h1>Kenali status setiap coin</h1>
        <p>Cari coin dan buka penjelasan screening yang telah dipublikasikan oleh tim CryptoSharia.</p>
    </header>

    <section class="container section-sm" aria-label="Daftar screening coin">
        <form class="filter-bar" method="GET" action="/screening" role="search">
            <div style="flex:1;min-width:min(100%,280px)">
                <label class="sr-only" for="search-coin">Cari coin atau ticker</label>
                <input id="search-coin" class="input" type="search" name="q" value={data.search} placeholder="Cari coin atau ticker…" />
            </div>
            <div>
                <label class="sr-only" for="screening-status">Filter status</label>
                <select id="screening-status" class="select" name="status" value={data.status}>
                    <option value="">Semua status</option>
                    <option value="halal">Halal</option>
                    <option value="syubhat">Syubhat</option>
                    <option value="haram">Haram</option>
                </select>
            </div>
            <button class="button button-primary" type="submit">Terapkan</button>
            {#if data.search || data.status}<a class="button button-secondary" href="/screening">Reset</a>{/if}
        </form>

        {#if data.tokens.length}
            <div class="token-grid">
                {#each data.tokens as token (token.id)}<TokenCard {token} />{/each}
            </div>
            <Pagination pagination={data.pagination} {buildHref} />
        {:else}
            <StateMessage
                title={data.error ? 'Data screening belum dapat dimuat' : 'Coin tidak ditemukan'}
                message={data.error || 'Coba kata kunci atau filter status yang berbeda.'}
                actionHref="/screening"
                actionLabel="Reset pencarian"
            />
        {/if}

        <div class="alert" style="margin-top:32px">
            Hasil screening bersifat informasi dan bukan nasihat finansial. Baca penjelasan lengkap serta
            lakukan pertimbangan mandiri sebelum mengambil keputusan.
        </div>
    </section>
</main>
