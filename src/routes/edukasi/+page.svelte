<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { EDUCATION_CATEGORIES } from '$lib/config';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function buildHref(targetPage: number) {
        const query = new URLSearchParams();
        if (data.category) query.set('kategori', data.category.slug);
        if (data.search) query.set('q', data.search);
        if (targetPage > 1) query.set('page', String(targetPage));
        return `/edukasi${query.size ? `?${query}` : ''}`;
    }

    function canonicalPath() {
        const query = new URLSearchParams();
        if (data.category) query.set('kategori', data.category.slug);
        if (data.pagination.page > 1) query.set('page', String(data.pagination.page));
        return `/edukasi${query.size ? `?${query}` : ''}`;
    }
</script>

<Seo
    title={`${data.category?.label ?? 'Edukasi'} — CryptoSharia`}
    description="Pelajari kripto, keuangan, dan prinsip syariah melalui materi edukasi CryptoSharia."
    canonicalPath={canonicalPath()}
    noindex={Boolean(data.search)}
/>

<main id="main-content" class="site-main">
    <header class="container page-hero compact">
        <p class="eyebrow">Edukasi</p>
        <h1>{data.category?.label ?? 'Belajar aset digital'}</h1>
        <p>Materi terstruktur untuk membantu Anda memahami kripto, keuangan, dan perspektif syariah.</p>
    </header>

    <section class="container section-sm" aria-label="Daftar edukasi">
        <nav class="filter-bar" aria-label="Kategori edukasi">
            <a class="filter-chip" class:active={!data.category} href="/edukasi">Semua</a>
            {#each EDUCATION_CATEGORIES as category (category.slug)}
                <a
                    class="filter-chip"
                    class:active={data.category?.slug === category.slug}
                    href={`/edukasi?kategori=${category.slug}`}
                >{category.label}</a>
            {/each}
        </nav>

        <form class="search-form" method="GET" action="/edukasi" role="search">
            {#if data.category}<input type="hidden" name="kategori" value={data.category.slug} />{/if}
            <label class="sr-only" for="search-education">Cari materi edukasi</label>
            <input id="search-education" class="input" type="search" name="q" value={data.search} placeholder="Cari materi edukasi…" />
            <button class="button button-primary" type="submit">Cari</button>
        </form>

        <div style="height:28px" aria-hidden="true"></div>

        {#if data.posts.length}
            <div class="card-grid">
                {#each data.posts as post (post.id)}
                    <ArticleCard {post} label={data.category?.label} />
                {/each}
            </div>
            <Pagination pagination={data.pagination} {buildHref} />
        {:else}
            <StateMessage
                title={data.error ? 'Materi belum dapat dimuat' : 'Belum ada materi pada kategori ini'}
                message={data.error || 'Materi akan muncul setelah dipublikasikan melalui admin CryptoSharia.'}
                actionHref="/edukasi"
                actionLabel="Lihat semua edukasi"
            />
        {/if}
    </section>
</main>
