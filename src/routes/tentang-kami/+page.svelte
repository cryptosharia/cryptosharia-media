<script lang="ts">
    import { enhance } from '$app/forms';
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import { initials } from '$lib/format';
    import { TEAM_MEMBERS } from '$lib/team';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData, PageData } from './$types';

    let { data, form }: { data: PageData; form: ActionData | null } = $props();
    let submitting = $state(false);

    const handleSubmit: SubmitFunction = () => {
        submitting = true;
        return async ({ update }) => {
            try {
                await update();
            } finally {
                submitting = false;
            }
        };
    };
</script>

<Seo
    title="Tentang CryptoSharia"
    description="Kenali visi, misi, tujuan, tim, aktivitas, dan cara menghubungi CryptoSharia."
    canonicalPath="/tentang-kami"
/>

<main id="main-content" class="site-main">
    <header class="container page-hero">
        <p class="eyebrow">Tentang Kami</p>
        <h1>Menghubungkan inovasi aset digital dengan nilai syariah.</h1>
        <p>
            CryptoSharia mengintegrasikan edukasi, literasi, dan inovasi aset digital untuk membantu
            masyarakat memahami ekosistem kripto secara etis, transparan, dan bertanggung jawab.
        </p>
    </header>

    <section id="visi-misi" class="section-sm section-muted" aria-labelledby="visi-misi-title">
        <div class="container">
            <div class="section-heading">
                <div><p class="eyebrow">Arah kami</p><h2 id="visi-misi-title">Visi, Misi & Tujuan</h2></div>
            </div>
            <div class="card-grid">
                <article class="feature-card">
                    <span class="icon-tile" aria-hidden="true">01</span>
                    <h3>Visi</h3>
                    <p>Menjadi platform media dan riset kripto syariah yang menjadi rujukan bagi umat Muslim dalam memahami ekonomi digital.</p>
                </article>
                <article class="feature-card">
                    <span class="icon-tile" aria-hidden="true">02</span>
                    <h3>Misi</h3>
                    <p>Menyediakan edukasi yang mudah dipahami, membangun komunitas yang aktif, dan menyajikan analisis serta riset yang bertanggung jawab.</p>
                </article>
                <article class="feature-card">
                    <span class="icon-tile" aria-hidden="true">03</span>
                    <h3>Tujuan</h3>
                    <p>Membantu masyarakat mengambil keputusan yang lebih terinformasi saat berinteraksi dengan aset digital dan teknologi blockchain.</p>
                </article>
            </div>
        </div>
    </section>

    <section id="tim" class="container section" aria-labelledby="tim-title">
        <div class="section-heading">
            <div><p class="eyebrow">Orang di balik CryptoSharia</p><h2 id="tim-title">Tim Kami</h2><p>Struktur pengurus yang mengembangkan arah, edukasi, riset, dan komunitas CryptoSharia.</p></div>
        </div>
        <div class="team-grid">
            {#each TEAM_MEMBERS as member (member.name)}
                <article class="team-card">
                    <span class="team-avatar" aria-hidden="true">{initials(member.name.replace('Ust. ', ''))}</span>
                    <div><h3>{member.name}</h3><p>{member.role}</p></div>
                </article>
            {/each}
        </div>
    </section>

    <section id="aktivitas" class="section-sm section-muted" aria-labelledby="aktivitas-title">
        <div class="container">
            <div class="section-heading">
                <div><p class="eyebrow">Kegiatan</p><h2 id="aktivitas-title">Aktivitas Kami</h2><p>Dokumentasi kegiatan CryptoSharia yang telah dipublikasikan.</p></div>
            </div>
            {#if data.activities.length}
                <div class="card-grid">
                    {#each data.activities as post (post.id)}
                        <ArticleCard {post} href={`/aktivitas/${post.slug}`} label="Aktivitas" />
                    {/each}
                </div>
            {:else}
                <StateMessage title="Aktivitas belum tersedia" message={data.activityError || 'Dokumentasi kegiatan akan segera ditambahkan.'} />
            {/if}
        </div>
    </section>

    <section id="hubungi-kami" class="container section" aria-labelledby="contact-title">
        <div class="section-heading">
            <div><p class="eyebrow">Kontak</p><h2 id="contact-title">Hubungi Kami</h2><p>Punya pertanyaan, masukan, atau peluang kolaborasi? Kirimkan pesan kepada tim kami.</p></div>
        </div>
        <div class="card-grid two">
            <div class="feature-card">
                <h3>Informasi kontak</h3>
                <div class="footer-links" style="margin-top:18px">
                    <a href="https://wa.me/6282186584279" target="_blank" rel="noopener noreferrer">WhatsApp: +62 821-8658-4279 ↗</a>
                    <a href="mailto:contact@cryptosharia.id">contact@cryptosharia.id</a>
                    <a href="https://maps.google.com/?q=Jl.+Wibawa+Mukti+II+No.+6,+Jatiluhur,+Jatiasih,+Kota+Bekasi" target="_blank" rel="noopener noreferrer">Jl. Wibawa Mukti II No. 6, Jatiluhur, Jatiasih, Bekasi ↗</a>
                </div>
            </div>
            <div class="feature-card">
                <form class="form-grid" method="POST" action="?/sendMessage#hubungi-kami" aria-busy={submitting} use:enhance={handleSubmit}>
                    <div class="field">
                        <label for="contact-name">Nama</label>
                        <input id="contact-name" class="input" name="name" autocomplete="name" required minlength="2" maxlength="120" value={form?.fields?.name ?? ''} />
                    </div>
                    <div class="field">
                        <label for="contact-email">Email</label>
                        <input id="contact-email" class="input" type="email" name="email" autocomplete="email" required maxlength="255" value={form?.fields?.email ?? ''} />
                    </div>
                    <div class="field">
                        <label for="contact-message">Pesan</label>
                        <textarea id="contact-message" class="textarea" name="message" required minlength="10" maxlength="5000">{form?.fields?.message ?? ''}</textarea>
                    </div>
                    <button class="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Mengirim…' : 'Kirim Pesan'}</button>
                    {#if data.messageSent}<div class="alert alert-success" role="status">Pesan berhasil dikirim. Terima kasih.</div>{/if}
                    {#if form?.error}<div class="alert alert-error" role="alert">{form.error}</div>{/if}
                </form>
            </div>
        </div>
    </section>
</main>
