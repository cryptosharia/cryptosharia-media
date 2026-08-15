<script lang="ts">
    import NewsStory from '$lib/components/news/NewsStory.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { NEWS_CATEGORIES } from '$lib/config';
    import type { Post } from '$types/api';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const useEditorialLead = $derived(
        !data.category && !data.search && data.pagination.page === 1
    );
    const leadStory = $derived(useEditorialLead ? data.posts[0] : undefined);
    const secondaryStories = $derived(useEditorialLead ? data.posts.slice(1, 4) : []);
    const archiveStories = $derived(useEditorialLead ? data.posts.slice(4) : data.posts);
    const resultCount = $derived(`${data.pagination.total} artikel`);

    function categoryLabel(post: Post) {
        const category = NEWS_CATEGORIES.find((item) =>
            post.tags?.some((tag) => tag.slug === item.slug)
        );
        return category?.label ?? data.category?.label ?? 'Berita';
    }

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

    function clearSearchHref() {
        return data.category ? `/berita?kategori=${data.category.slug}` : '/berita';
    }

    function emptyTitle() {
        if (data.search) return 'Tidak ada berita ditemukan';
        if (data.category) return `Belum ada berita ${data.category.label}`;
        return 'Berita belum tersedia';
    }

    function emptyMessage() {
        if (data.search) return 'Coba gunakan kata kunci lain atau pilih kategori berbeda.';
        if (data.category) return 'Pilih kategori lain untuk menjelajahi publikasi CryptoSharia.';
        return 'Artikel akan muncul setelah dipublikasikan melalui admin CryptoSharia.';
    }
</script>

<Seo
    title={`${data.category?.label ?? 'Berita'} — CryptoSharia`}
    description="Berita kripto, teknologi, ekonomi, dan geopolitik pilihan dari CryptoSharia."
    canonicalPath={canonicalPath()}
    noindex={Boolean(data.search)}
/>

<main id="main-content" class="site-main">
    <header class="container news-intro">
        <p class="news-kicker">Berita</p>
        <h1>{data.category?.label ?? 'Sorotan Redaksi'}</h1>
        <p>Ikuti perkembangan kripto dan konteks yang memengaruhinya melalui berita yang tersusun rapi.</p>
    </header>

    <section class="container news-discovery" aria-label="Temukan berita">
        <div class="discovery-toolbar">
            <nav class="category-tabs" aria-label="Kategori berita">
                <a
                    class="category-tab"
                    class:active={!data.category}
                    href="/berita"
                    aria-current={!data.category ? 'page' : undefined}>Semua</a
                >
                {#each NEWS_CATEGORIES as category (category.slug)}
                    <a
                        class="category-tab"
                        class:active={data.category?.slug === category.slug}
                        href={`/berita?kategori=${category.slug}`}
                        aria-current={data.category?.slug === category.slug ? 'page' : undefined}
                    >{category.label}</a>
                {/each}
            </nav>

            <form class="news-search" method="GET" action="/berita" role="search">
                {#if data.category}<input type="hidden" name="kategori" value={data.category.slug} />{/if}
                <label class="sr-only" for="search-news">Cari berita</label>
                <input
                    id="search-news"
                    type="search"
                    name="q"
                    value={data.search}
                    placeholder="Cari judul atau topik berita…"
                    autocomplete="off"
                />
                <button type="submit" aria-label="Cari berita">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="8.5" cy="8.5" r="5.25"></circle>
                        <path d="m12.4 12.4 4.1 4.1"></path>
                    </svg>
                </button>
            </form>
        </div>
    </section>

    <section class="container news-content" aria-label="Daftar berita">
        {#if data.posts.length}
            {#if leadStory}
                <div
                    class="lead-layout"
                    class:single={!secondaryStories.length}
                >
                    <NewsStory
                        post={leadStory}
                        label={categoryLabel(leadStory)}
                        variant="lead"
                        headingLevel={2}
                        eager
                    />

                    {#if secondaryStories.length}
                        <div class="secondary-list" aria-label="Berita terbaru lainnya">
                            {#each secondaryStories as post (post.id)}
                                <NewsStory post={post} label={categoryLabel(post)} variant="row" headingLevel={2} />
                            {/each}
                        </div>
                    {/if}
                </div>

                {#if archiveStories.length}
                    <section class="archive-section" aria-labelledby="berita-lainnya">
                        <header class="archive-heading">
                            <div>
                                <p class="news-kicker">Arsip</p>
                                <h2 id="berita-lainnya">Berita lainnya</h2>
                            </div>
                        </header>
                        <div class="archive-grid">
                            {#each archiveStories as post (post.id)}
                                <NewsStory post={post} label={categoryLabel(post)} variant="archive" headingLevel={3} />
                            {/each}
                        </div>
                    </section>
                {/if}
            {:else}
                <header class="results-heading">
                    <div>
                        <p class="news-kicker">Arsip berita</p>
                        <h2>Hasil berita</h2>
                    </div>
                    <div class="results-meta">
                        <span>{resultCount}</span>
                        {#if data.search}
                            <a href={clearSearchHref()}>Hapus pencarian</a>
                        {/if}
                    </div>
                </header>

                <div class="archive-grid results-grid">
                    {#each archiveStories as post (post.id)}
                        <NewsStory post={post} label={categoryLabel(post)} variant="archive" headingLevel={3} />
                    {/each}
                </div>
            {/if}

            <div class="news-pagination">
                <Pagination pagination={data.pagination} {buildHref} />
            </div>
        {:else}
            <div class="news-empty" role="status">
                <p class="news-kicker">Arsip berita</p>
                <h2>{emptyTitle()}</h2>
                <p>{emptyMessage()}</p>
                {#if data.search || data.category}
                    <a href={data.search ? clearSearchHref() : '/berita'}>
                        {data.search ? 'Hapus pencarian' : 'Lihat semua berita'} <span aria-hidden="true">→</span>
                    </a>
                {/if}
            </div>
        {/if}
    </section>
</main>

<style>
    .news-intro {
        padding-top: 80px;
    }

    .news-kicker {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    .news-intro h1 {
        max-width: 760px;
        margin: 0;
        font-size: clamp(3rem, 4.5vw, 3.5rem);
        line-height: 1.08;
        letter-spacing: -0.05em;
    }

    .news-intro > p:last-child {
        max-width: 660px;
        margin: 16px 0 0;
        color: var(--muted);
        font-size: 1.02rem;
        line-height: 1.65;
    }

    .news-discovery {
        margin-top: 52px;
    }

    .discovery-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding-block: 16px;
        border-block: 1px solid var(--border);
    }

    .category-tabs {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 6px;
    }

    .category-tab {
        display: inline-flex;
        min-height: 40px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        color: var(--muted);
        border: 1px solid transparent;
        border-radius: 7px;
        font-size: 0.82rem;
        font-weight: 650;
        white-space: nowrap;
        transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .category-tab:hover {
        color: var(--text);
        border-color: var(--border);
    }

    .category-tab.active {
        color: #17130e;
        border-color: var(--accent);
        background: var(--accent);
    }

    .news-search {
        display: grid;
        width: min(350px, 100%);
        min-height: 46px;
        flex: 0 0 350px;
        grid-template-columns: minmax(0, 1fr) 46px;
        align-items: center;
        overflow: hidden;
        border: 1px solid var(--border-control);
        border-radius: 8px;
        background: var(--surface);
        transition: border-color 160ms ease;
    }

    .news-search:focus-within {
        border-color: var(--accent);
    }

    .news-search input {
        width: 100%;
        min-width: 0;
        height: 44px;
        padding: 0 4px 0 14px;
        color: var(--text);
        border: 0;
        outline: 0;
        background: transparent;
        font: inherit;
        font-size: 0.86rem;
    }

    .news-search input::placeholder {
        color: var(--muted);
        opacity: 0.8;
    }

    .news-search button {
        display: grid;
        width: 46px;
        height: 44px;
        place-items: center;
        padding: 0;
        color: var(--muted);
        border: 0;
        background: transparent;
        cursor: pointer;
        transition: color 160ms ease, background 160ms ease;
    }

    .news-search button:hover {
        color: var(--text);
        background: var(--surface-muted);
    }

    .news-search svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-width: 1.6;
    }

    .news-content {
        padding-block: 48px 104px;
    }

    .lead-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.7fr) minmax(340px, 1fr);
        gap: clamp(32px, 4.5vw, 56px);
        align-items: start;
    }

    .lead-layout.single {
        grid-template-columns: minmax(0, 820px);
    }

    .secondary-list {
        border-top: 1px solid var(--border-control);
    }

    .archive-section {
        margin-top: 80px;
    }

    .archive-heading,
    .results-heading {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border-control);
    }

    .archive-heading h2,
    .results-heading h2 {
        margin: 0;
        font-size: clamp(1.55rem, 2.8vw, 2rem);
        line-height: 1.15;
        letter-spacing: -0.04em;
    }

    .archive-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0 36px;
    }

    .archive-grid > :global(.news-story:last-child:nth-child(odd)) {
        grid-column: 1 / -1;
    }

    .results-meta {
        display: flex;
        align-items: center;
        gap: 16px;
        color: var(--muted);
        font-size: 0.78rem;
    }

    .results-meta a {
        color: var(--text);
        border-bottom: 1px solid var(--border-control);
        font-weight: 650;
    }

    .news-empty {
        max-width: 620px;
        padding-block: 56px 72px;
        border-top: 1px solid var(--border-control);
        border-bottom: 1px solid var(--border);
    }

    .news-empty h2 {
        margin: 0;
        font-size: clamp(1.6rem, 3vw, 2.1rem);
        line-height: 1.2;
        letter-spacing: -0.04em;
    }

    .news-empty > p:last-of-type {
        margin: 12px 0 0;
        color: var(--muted);
    }

    .news-empty a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 24px;
        padding-bottom: 3px;
        border-bottom: 1px solid var(--border-control);
        font-size: 0.84rem;
        font-weight: 700;
    }

    .news-empty a span {
        transition: transform 180ms ease;
    }

    .news-empty a:hover span {
        transform: translateX(3px);
    }

    .news-pagination :global(.pagination) {
        flex-wrap: wrap;
        margin-top: 64px;
        padding-top: 28px;
        border-top: 1px solid var(--border);
    }

    .news-pagination :global(.pagination .button) {
        border-radius: 7px;
        background: transparent;
    }

    @media (max-width: 1080px) {
        .discovery-toolbar {
            gap: 16px;
        }

        .category-tab {
            padding-inline: 9px;
            font-size: 0.78rem;
        }

        .news-search {
            width: 310px;
            flex-basis: 310px;
        }

        .lead-layout {
            grid-template-columns: minmax(0, 1.45fr) minmax(300px, 1fr);
            gap: 32px;
        }

        .archive-grid {
            column-gap: 28px;
        }
    }

    @media (max-width: 900px) {
        .news-intro {
            padding-top: 64px;
        }

        .news-intro h1 {
            font-size: 2.25rem;
        }

        .discovery-toolbar {
            align-items: stretch;
            flex-direction: column;
        }

        .category-tabs {
            overflow-x: auto;
            padding-bottom: 2px;
            scrollbar-width: none;
            overscroll-behavior-inline: contain;
        }

        .category-tabs::-webkit-scrollbar {
            display: none;
        }

        .news-search {
            width: 100%;
            flex-basis: auto;
        }

        .lead-layout {
            grid-template-columns: 1fr;
            gap: 36px;
        }

        .secondary-list {
            border-top-color: var(--border-control);
        }

        .archive-grid {
            grid-template-columns: 1fr;
        }

        .archive-grid > :global(.news-story:last-child:nth-child(odd)) {
            grid-column: auto;
        }
    }

    @media (max-width: 600px) {
        .news-intro {
            padding-top: 52px;
        }

        .news-intro h1 {
            font-size: clamp(2rem, 9.2vw, 2.25rem);
        }

        .news-intro > p:last-child {
            margin-top: 12px;
            font-size: 0.94rem;
        }

        .news-discovery {
            margin-top: 36px;
        }

        .discovery-toolbar {
            gap: 12px;
            padding-block: 12px;
        }

        .category-tabs {
            width: calc(100% + 16px);
            padding-right: 16px;
        }

        .category-tab {
            min-height: 38px;
            padding: 7px 10px;
        }

        .news-content {
            padding-block: 40px 80px;
        }

        .lead-layout {
            gap: 32px;
        }

        .archive-section {
            margin-top: 56px;
        }

        .archive-heading,
        .results-heading {
            align-items: start;
            flex-direction: column;
            gap: 12px;
            padding-bottom: 16px;
        }

        .archive-heading h2,
        .results-heading h2 {
            font-size: 1.55rem;
        }

        .results-meta {
            width: 100%;
            justify-content: space-between;
        }

        .news-empty {
            padding-block: 40px 56px;
        }

        .news-pagination :global(.pagination) {
            gap: 8px;
            margin-top: 48px;
        }

        .news-pagination :global(.pagination > span:not(.button)) {
            order: -1;
            width: 100%;
            text-align: center;
        }
    }
</style>
