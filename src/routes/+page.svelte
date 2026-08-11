<script lang="ts">
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import TokenCard from '$lib/components/TokenCard.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<Seo
    title="CryptoSharia — Berita, Edukasi & Screening Coin"
    description="Satu tempat untuk mengikuti berita, mempelajari aset digital, dan membaca hasil screening coin dari perspektif syariah."
/>

<main id="main-content" class="site-main">
    <section class="section">
        <div class="container hero-grid">
            <div class="hero-copy">
                <p class="eyebrow">Literasi aset digital</p>
                <h1>Pahami dunia kripto dengan <span>perspektif syariah.</span></h1>
                <p>
                    Berita aktual, edukasi yang mudah dipahami, dan screening coin dalam satu website
                    CryptoSharia.
                </p>
                <div class="button-row">
                    <a class="button button-primary" href="/berita">Baca Berita</a>
                    <a class="button button-secondary" href="/screening">Cek Screening Coin</a>
                </div>
            </div>
            <div class="hero-visual" aria-hidden="true">
                <img src="/logo.png" alt="" width="210" height="210" />
            </div>
        </div>
    </section>

    <section class="section-sm section-muted" aria-labelledby="berita-terbaru">
        <div class="container">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Terbaru</p>
                    <h2 id="berita-terbaru">Berita pilihan</h2>
                    <p>Perkembangan kripto, teknologi, ekonomi, dan geopolitik yang perlu Anda ketahui.</p>
                </div>
                <a class="button button-link" href="/berita">Semua Berita →</a>
            </div>

            {#if data.news.length}
                <div class="card-grid">
                    {#each data.news.slice(0, 6) as post (post.id)}
                        <ArticleCard {post} />
                    {/each}
                </div>
            {:else}
                <StateMessage
                    title="Berita belum tersedia"
                    message={data.unavailable.news || 'Konten berita akan segera ditambahkan.'}
                    actionHref="/berita"
                />
            {/if}
        </div>
    </section>

    <section class="section" aria-labelledby="edukasi-pilihan">
        <div class="container">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Belajar bertahap</p>
                    <h2 id="edukasi-pilihan">Edukasi pilihan</h2>
                    <p>Pelajari kripto, keuangan, dan prinsip syariah dengan bahasa yang lebih terstruktur.</p>
                </div>
                <a class="button button-link" href="/edukasi">Semua Edukasi →</a>
            </div>
            {#if data.education.length}
                <div class="card-grid">
                    {#each data.education as post (post.id)}
                        <ArticleCard {post} />
                    {/each}
                </div>
            {:else}
                <StateMessage
                    title="Materi edukasi belum tersedia"
                    message={data.unavailable.education || 'Materi baru sedang disiapkan.'}
                    actionHref="/edukasi"
                />
            {/if}
        </div>
    </section>

    <section class="section-sm section-muted" aria-labelledby="screening-pilihan">
        <div class="container">
            <div class="section-heading">
                <div>
                    <p class="eyebrow">Screening Coin</p>
                    <h2 id="screening-pilihan">Lihat status screening</h2>
                    <p>Temukan ringkasan status dan penjelasan setiap coin yang telah dipublikasikan.</p>
                </div>
                <a class="button button-link" href="/screening">Lihat Semua →</a>
            </div>
            {#if data.tokens.length}
                <div class="token-grid">
                    {#each data.tokens as token (token.id)}
                        <TokenCard {token} />
                    {/each}
                </div>
            {:else}
                <StateMessage
                    title="Data screening belum tersedia"
                    message={data.unavailable.tokens || 'Data screening akan segera ditambahkan.'}
                    actionHref="/screening"
                />
            {/if}
        </div>
    </section>

    <section class="section" aria-labelledby="tentang-ringkas">
        <div class="container card-grid two">
            <article class="feature-card">
                <span class="icon-tile" aria-hidden="true">CS</span>
                <h2 id="tentang-ringkas">Tentang CryptoSharia</h2>
                <p>
                    Platform yang mengintegrasikan edukasi, literasi, dan inovasi aset digital dengan
                    prinsip kepatuhan syariah Islam.
                </p>
                <div class="button-row">
                    <a class="button button-secondary" href="/tentang-kami">Kenali Kami</a>
                </div>
            </article>
            <article class="community-card">
                <span class="icon-tile" aria-hidden="true">↗</span>
                <h2>Bertumbuh bersama komunitas</h2>
                <p>Temukan ruang diskusi, kanal sosial, dan informasi Komunitas Premium CryptoSharia.</p>
                <div class="button-row">
                    <a class="button button-primary" href="/komunitas">Lihat Komunitas</a>
                </div>
            </article>
        </div>
    </section>
</main>
