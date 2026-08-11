<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { NEWS_CATEGORIES } from '$lib/config';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function buildHref(targetPage: number) {
        const query = new URLSearchParams();
        if (data.category) query.set('kategori', data.category.slug);
        if (data.search) query.set('q', data.search);
        if (targetPage > 1) query.set('page', String(targetPage));
        return `/berita${query.size ? `?${query}` : ''}`;
    }

    function canonicalPath() {
        const query = new URLSearchParams();
        if (data.category) query.set('kategori', data.category.slug);
        if (data.pagination.page > 1) query.set('page', String(data.pagination.page));
        return `/berita${query.size ? `?${query}` : ''}`;
    }
</script>

<Seo
    title={`${data.category?.label ?? 'Berita'} — CryptoSharia`}
    description="Berita kripto, teknologi, ekonomi, dan geopolitik pilihan dari CryptoSharia."
    canonicalPath={canonicalPath()}
    noindex={Boolean(data.search)}
/>

<main id="main-content" class="site-main">
    <header class="container page-hero compact">
        <p class="eyebrow">Berita</p>
        <h1>{data.category?.label ?? 'Berita terbaru'}</h1>
        <p>Ikuti perkembangan kripto dan konteks yang memengaruhinya melalui berita yang tersusun rapi.</p>
    </header>

    <section class="container section-sm" aria-label="Daftar berita">
        <nav class="filter-bar" aria-label="Kategori berita">
            <a class="filter-chip" class:active={!data.category} href="/berita">Semua</a>
            {#each NEWS_CATEGORIES as category (category.slug)}
                <a
                    class="filter-chip"
                    class:active={data.category?.slug === category.slug}
                    href={`/berita?kategori=${category.slug}`}
                >{category.label}</a>
            {/each}
        </nav>

        <form class="search-form" method="GET" action="/berita" role="search">
            {#if data.category}<input type="hidden" name="kategori" value={data.category.slug} />{/if}
            <label class="sr-only" for="search-news">Cari berita</label>
            <input id="search-news" class="input" type="search" name="q" value={data.search} placeholder="Cari judul atau topik berita…" />
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
                title={data.error ? 'Berita belum dapat dimuat' : 'Belum ada berita pada kategori ini'}
                message={data.error || 'Artikel akan muncul setelah dipublikasikan melalui admin CryptoSharia.'}
                actionHref="/berita"
                actionLabel="Lihat semua berita"
            />
        {/if}
    </section>
</main>
