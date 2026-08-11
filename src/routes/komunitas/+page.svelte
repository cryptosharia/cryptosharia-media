<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import { COMMUNITY_LINKS, SOCIAL_LINKS } from '$lib/config';
</script>

<Seo title="Komunitas CryptoSharia" description="Gabung komunitas, temukan kanal sosial, dan pelajari Komunitas Premium CryptoSharia." canonicalPath="/komunitas" />

<main id="main-content" class="site-main">
    <header class="container page-hero">
        <p class="eyebrow">Komunitas</p>
        <h1>Belajar dan berdiskusi bersama komunitas CryptoSharia.</h1>
        <p>Pilih ruang yang sesuai untuk mengikuti informasi, berdiskusi, dan terhubung dengan ekosistem CryptoSharia.</p>
    </header>

    <section id="gabung" class="section-sm section-muted" aria-labelledby="gabung-title">
        <div class="container">
            <div class="section-heading"><div><p class="eyebrow">Mulai dari sini</p><h2 id="gabung-title">Gabung Komunitas</h2></div></div>
            <div class="card-grid two">
                <article class="community-card">
                    <span class="icon-tile" aria-hidden="true">WA</span>
                    <h3>Grup WhatsApp</h3>
                    <p>Ruang diskusi komunitas untuk berbagi informasi dan pandangan secara sehat.</p>
                    <div class="button-row"><a class="button button-primary" href={COMMUNITY_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">Gabung WhatsApp ↗</a></div>
                </article>
                <article class="community-card">
                    <span class="icon-tile" aria-hidden="true">DC</span>
                    <h3>Discord</h3>
                    <p>Ikuti kanal topik, kegiatan, dan diskusi komunitas CryptoSharia.</p>
                    <div class="button-row"><a class="button button-secondary" href={COMMUNITY_LINKS.discord} target="_blank" rel="noopener noreferrer">Buka Discord ↗</a></div>
                </article>
            </div>
        </div>
    </section>

    <section id="sosial-media" class="container section" aria-labelledby="social-title">
        <div class="section-heading"><div><p class="eyebrow">Kanal resmi</p><h2 id="social-title">Sosial Media</h2><p>Ikuti kanal resmi agar tidak melewatkan publikasi dan aktivitas terbaru.</p></div></div>
        <div class="card-grid">
            {#each SOCIAL_LINKS as link (link.label)}
                <a class="community-card" href={link.href} target="_blank" rel="noopener noreferrer">
                    <span class="icon-tile" aria-hidden="true">↗</span><h3>{link.label}</h3><p>Buka kanal resmi {link.label} CryptoSharia.</p>
                </a>
            {/each}
        </div>
    </section>

    <section id="premium" class="section-sm section-muted" aria-labelledby="premium-title">
        <div class="container hero-grid">
            <div class="hero-copy">
                <p class="eyebrow">Informasi layanan</p>
                <h2 id="premium-title" style="font-size:clamp(2rem,5vw,3.6rem);margin:0;line-height:1.05">Komunitas Premium</h2>
                <p>Pelajari informasi dan benefit yang sedang tersedia melalui halaman layanan CryptoSharia. Keanggotaan dan pembayaran tetap menggunakan sistem existing pada Phase 1.</p>
                <div class="button-row"><a class="button button-primary" href={COMMUNITY_LINKS.premium} target="_blank" rel="noopener noreferrer">Lihat Informasi Premium ↗</a></div>
            </div>
            <div class="hero-visual" aria-hidden="true"><img src="/discord-preview.png" alt="" style="width:82%;border-radius:18px" /></div>
        </div>
    </section>
</main>
