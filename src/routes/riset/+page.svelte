<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<Seo
    title="Riset — CryptoSharia"
    description="Arsip riset CryptoSharia yang tetap tersedia untuk menjaga akses ke publikasi sebelumnya."
    canonicalPath={`/riset${data.pagination.page > 1 ? `?page=${data.pagination.page}` : ''}`}
/>

<main id="main-content" class="site-main">
    <header class="container page-hero compact">
        <p class="eyebrow">Arsip</p>
        <h1>Riset CryptoSharia</h1>
        <p>Publikasi riset terdahulu tetap tersedia meski tidak ditampilkan sebagai menu utama Phase 1.</p>
    </header>
    <section class="container section-sm">
        {#if data.posts.length}
            <div class="card-grid">
                {#each data.posts as post (post.id)}<ArticleCard {post} />{/each}
            </div>
            <Pagination pagination={data.pagination} buildHref={(page) => `/riset${page > 1 ? `?page=${page}` : ''}`} />
        {:else}
            <StateMessage title="Riset belum dapat dimuat" message={data.error || 'Belum ada riset yang dipublikasikan.'} />
        {/if}
    </section>
</main>
