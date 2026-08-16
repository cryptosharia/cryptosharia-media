<script lang="ts">
    import { page } from '$app/state';
    import Seo from '$lib/components/Seo.svelte';

    const isNotFound = $derived(page.status === 404);
</script>

<Seo
    title={isNotFound ? 'Halaman tidak ditemukan — CryptoSharia' : 'Terjadi kendala — CryptoSharia'}
    description="Halaman CryptoSharia tidak dapat ditampilkan."
    noindex
/>

<main id="main-content" class="site-main">
    <section class="container section">
        <div class="state-card">
            <div>
                <p class="eyebrow">{page.status}</p>
                <h1>{isNotFound ? 'Halaman tidak ditemukan' : 'Terjadi kendala'}</h1>
                <p>{isNotFound ? 'Alamat mungkin sudah berubah atau halaman tidak tersedia.' : 'Silakan coba lagi beberapa saat lagi.'}</p>
                <div class="button-row" style="justify-content:center">
                    <a class="button button-primary" href="/">Kembali ke Beranda</a>
                </div>
            </div>
        </div>
    </section>
</main>
