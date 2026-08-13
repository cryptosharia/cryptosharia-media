<script lang="ts">
    import EducationStory from '$lib/components/education/EducationStory.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { EDUCATION_CATEGORIES } from '$lib/config';
    import type { Post } from '$types/api';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const useFeatured = $derived(!data.category && !data.search && data.pagination.page === 1);
    const featuredMaterial = $derived(useFeatured ? data.posts[0] : undefined);
    const archiveMaterials = $derived(useFeatured ? data.posts.slice(1) : data.posts);
    const resultCount = $derived(`${data.pagination.total} materi`);

    function categoryLabel(post: Post) {
        const category = EDUCATION_CATEGORIES.find((item) => post.tags?.some((tag) => tag.slug === item.slug));
        return category?.label ?? data.category?.label ?? 'Edukasi';
    }

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

    function clearSearchHref() { return data.category ? `/edukasi?kategori=${data.category.slug}` : '/edukasi'; }

    function emptyTitle() {
        if (data.search) return 'Tidak ada materi ditemukan';
        if (data.category) return `Belum ada materi ${data.category.label}`;
        return 'Materi edukasi belum tersedia';
    }
</script>

<Seo title={`${data.category?.label ?? 'Edukasi'} — CryptoSharia`} description="Pelajari kripto, keuangan, dan prinsip syariah melalui materi edukasi CryptoSharia." canonicalPath={canonicalPath()} noindex={Boolean(data.search)} />

<main id="main-content" class="site-main">
    <header class="container education-intro">
        <p class="education-kicker">Edukasi</p>
        <h1>{data.category?.label ?? 'Belajar aset digital'}</h1>
        <p>Materi terstruktur untuk membantu Anda memahami kripto, keuangan, dan perspektif syariah.</p>
    </header>

    <section class="container education-discovery" aria-label="Temukan materi edukasi">
        <div class="discovery-toolbar">
            <nav class="category-tabs" aria-label="Kategori edukasi">
                <a class="category-tab" class:active={!data.category} href="/edukasi" aria-current={!data.category ? 'page' : undefined}>Semua</a>
                {#each EDUCATION_CATEGORIES as category (category.slug)}
                    <a class="category-tab" class:active={data.category?.slug === category.slug} href={`/edukasi?kategori=${category.slug}`} aria-current={data.category?.slug === category.slug ? 'page' : undefined}>{category.label}</a>
                {/each}
            </nav>
            <form class="education-search" method="GET" action="/edukasi" role="search">
                {#if data.category}<input type="hidden" name="kategori" value={data.category.slug} />{/if}
                <label class="sr-only" for="search-education">Cari materi edukasi</label>
                <input id="search-education" type="search" name="q" value={data.search} placeholder="Cari materi edukasi…" autocomplete="off" />
                <button type="submit" aria-label="Cari materi edukasi"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.25"></circle><path d="m12.4 12.4 4.1 4.1"></path></svg></button>
            </form>
        </div>
    </section>

    <section class="container education-content" aria-label="Daftar materi edukasi">
        {#if data.posts.length}
            {#if featuredMaterial}
                <section class="featured-section" aria-labelledby="materi-pilihan">
                    <p class="education-kicker">Pilihan edukasi</p>
                    <EducationStory post={featuredMaterial} label={categoryLabel(featuredMaterial)} variant="featured" headingLevel={2} eager />
                </section>
                {#if archiveMaterials.length}
                    <section class="archive-section" aria-labelledby="materi-lainnya">
                        <header class="archive-heading"><div><p class="education-kicker">Arsip edukasi</p><h2 id="materi-lainnya">Materi lainnya</h2></div></header>
                        <div class="archive-grid">
                            {#each archiveMaterials as post (post.id)}<EducationStory {post} label={categoryLabel(post)} />{/each}
                        </div>
                    </section>
                {/if}
            {:else}
                <header class="results-heading"><div><p class="education-kicker">Arsip edukasi</p><h2>Hasil materi</h2></div><div class="results-meta"><span>{resultCount}</span>{#if data.search}<a href={clearSearchHref()}>Hapus pencarian</a>{/if}</div></header>
                <div class="archive-grid results-grid">{#each archiveMaterials as post (post.id)}<EducationStory {post} label={categoryLabel(post)} />{/each}</div>
            {/if}
            <div class="education-pagination"><Pagination pagination={data.pagination} {buildHref} /></div>
        {:else}
            <div class="education-empty" role="status"><p class="education-kicker">Arsip edukasi</p><h2>{emptyTitle()}</h2><p>Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>{#if data.search || data.category}<a href="/edukasi">Reset filter <span aria-hidden="true">→</span></a>{/if}</div>
        {/if}
    </section>
</main>

<style>
    .education-intro { padding-top: 80px; }
    .education-kicker { margin: 0 0 12px; color: var(--muted); font-size: .7rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
    .education-intro h1 { max-width: 760px; margin: 0; font-size: clamp(3rem, 4.5vw, 3.5rem); line-height: 1.08; letter-spacing: -.05em; }
    .education-intro > p:last-child { max-width: 660px; margin: 16px 0 0; color: var(--muted); font-size: 1.02rem; line-height: 1.65; }
    .education-discovery { margin-top: 52px; }
    .discovery-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-block: 16px; border-block: 1px solid var(--border); }
    .category-tabs { display: flex; min-width: 0; align-items: center; gap: 6px; }
    .category-tab { display: inline-flex; min-height: 40px; flex: 0 0 auto; align-items: center; justify-content: center; padding: 8px 12px; color: var(--muted); border: 1px solid transparent; border-radius: 7px; font-size: .82rem; font-weight: 650; white-space: nowrap; transition: color 160ms ease, border-color 160ms ease, background 160ms ease; }
    .category-tab:hover { color: var(--text); border-color: var(--border); }
    .category-tab.active { color: #17130e; border-color: var(--accent); background: var(--accent); }
    .education-search { display: grid; width: min(350px, 100%); min-height: 46px; flex: 0 0 350px; grid-template-columns: minmax(0, 1fr) 46px; align-items: center; overflow: hidden; border: 1px solid var(--border-control); border-radius: 8px; background: var(--surface); }
    .education-search:focus-within { border-color: var(--accent); }
    .education-search input { width: 100%; min-width: 0; height: 44px; padding: 0 4px 0 14px; color: var(--text); border: 0; outline: 0; background: transparent; font: inherit; font-size: .86rem; }
    .education-search input::placeholder { color: var(--muted); opacity: .8; }
    .education-search button { display: grid; width: 46px; height: 44px; place-items: center; padding: 0; color: var(--muted); border: 0; background: transparent; cursor: pointer; }
    .education-search button:hover { color: var(--text); background: var(--surface-muted); }
    .education-search svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-width: 1.6; }
    .education-content { padding-block: 48px 104px; }
    .featured-section { padding-bottom: 80px; border-bottom: 1px solid var(--border-control); }
    .archive-section { margin-top: 80px; }
    .archive-heading, .results-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-control); }
    .archive-heading h2, .results-heading h2 { margin: 0; font-size: clamp(1.55rem, 2.8vw, 2rem); line-height: 1.15; letter-spacing: -.04em; }
    .archive-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 36px; }
    .archive-grid > :global(.education-story:last-child:nth-child(odd)) { grid-column: 1 / -1; }
    .results-meta { display: flex; align-items: center; gap: 16px; color: var(--muted); font-size: .78rem; }
    .results-meta a { color: var(--text); border-bottom: 1px solid var(--border-control); font-weight: 650; }
    .education-empty { max-width: 620px; padding-block: 56px 72px; border-top: 1px solid var(--border-control); border-bottom: 1px solid var(--border); }
    .education-empty h2 { margin: 0; font-size: clamp(1.6rem, 3vw, 2.1rem); line-height: 1.2; letter-spacing: -.04em; }
    .education-empty > p:last-of-type { margin: 12px 0 0; color: var(--muted); }
    .education-empty a { display: inline-flex; gap: 8px; margin-top: 24px; padding-bottom: 3px; border-bottom: 1px solid var(--border-control); font-size: .84rem; font-weight: 700; }
    .education-pagination :global(.pagination) { flex-wrap: wrap; margin-top: 64px; padding-top: 28px; border-top: 1px solid var(--border); }
    .education-pagination :global(.pagination .button) { border-radius: 7px; background: transparent; }
    @media (max-width: 1080px) { .discovery-toolbar { gap: 16px; } .category-tab { padding-inline: 9px; font-size: .78rem; } .education-search { width: 310px; flex-basis: 310px; } .archive-grid { column-gap: 28px; } }
    @media (max-width: 900px) { .education-intro { padding-top: 64px; } .education-intro h1 { font-size: 2.25rem; } .discovery-toolbar { align-items: stretch; flex-direction: column; } .category-tabs { overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; overscroll-behavior-inline: contain; } .category-tabs::-webkit-scrollbar { display: none; } .education-search { width: 100%; flex-basis: auto; } .archive-grid { grid-template-columns: 1fr; } .archive-grid > :global(.education-story:last-child:nth-child(odd)) { grid-column: auto; } }
    @media (max-width: 600px) { .education-intro { padding-top: 52px; } .education-intro h1 { font-size: clamp(2rem, 9.2vw, 2.25rem); } .education-intro > p:last-child { margin-top: 12px; font-size: .94rem; } .education-discovery { margin-top: 36px; } .discovery-toolbar { gap: 12px; padding-block: 12px; } .category-tabs { width: calc(100% + 16px); padding-right: 16px; } .category-tab { min-height: 38px; padding: 7px 10px; } .education-content { padding-block: 32px 80px; } .featured-section { padding-bottom: 56px; } .archive-section { margin-top: 56px; } .archive-heading, .results-heading { align-items: start; flex-direction: column; gap: 12px; padding-bottom: 16px; } .archive-heading h2, .results-heading h2 { font-size: 1.55rem; } .results-meta { width: 100%; justify-content: space-between; } .education-empty { padding-block: 40px 56px; } .education-pagination :global(.pagination) { gap: 8px; margin-top: 48px; } .education-pagination :global(.pagination > span:not(.button)) { order: -1; width: 100%; text-align: center; } }
</style>
