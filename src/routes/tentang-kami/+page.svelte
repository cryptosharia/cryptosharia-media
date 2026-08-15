<script lang="ts">
    import { enhance } from '$app/forms';
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import StateMessage from '$lib/components/StateMessage.svelte';
    import InteractiveTeamDirectory from '$lib/components/team/InteractiveTeamDirectory.svelte';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData, PageData } from './$types';

    let { data, form }: { data: PageData; form: ActionData | null } = $props();
    let submitting = $state(false);
    const focus = ['Edukasi aset digital', 'Analisis dan riset', 'Screening syariah', 'Pengembangan komunitas'];
    const principles = [
        ['Visi', 'Menjadi platform media dan riset kripto syariah yang menjadi rujukan bagi umat Muslim dalam memahami ekonomi digital.'],
        ['Misi', 'Menyediakan edukasi yang mudah dipahami, membangun komunitas yang aktif, dan menyajikan analisis serta riset yang bertanggung jawab.'],
        ['Tujuan', 'Membantu masyarakat mengambil keputusan yang lebih terinformasi saat berinteraksi dengan aset digital dan teknologi blockchain.']
    ];
    const handleSubmit: SubmitFunction = () => {
        submitting = true;
        return async ({ update }) => { try { await update(); } finally { submitting = false; } };
    };
</script>

<Seo title="Tentang CryptoSharia" description="Kenali visi, misi, tujuan, tim, aktivitas, dan cara menghubungi CryptoSharia." canonicalPath="/tentang-kami" />

<main id="main-content" class="site-main about-page">
    <header class="container about-hero">
        <div><p class="eyebrow">Tentang Kami</p><h1>Menghubungkan inovasi aset digital dengan nilai syariah.</h1><p>CryptoSharia mengintegrasikan edukasi, literasi, dan inovasi aset digital untuk membantu masyarakat memahami ekosistem kripto secara etis, transparan, dan bertanggung jawab.</p></div>
        <aside><p>Fokus Kami</p><ol>{#each focus as item, i (item)}<li><span>0{i + 1}</span>{item}</li>{/each}</ol></aside>
    </header>

    <section id="visi-misi" class="about-direction" aria-labelledby="visi-misi-title">
        <div class="container"><p class="eyebrow">Arah kami</p><h2 id="visi-misi-title">Visi, Misi &amp; Tujuan</h2><div class="about-principles">{#each principles as principle, i (principle[0])}<article><span>0{i + 1}</span><h3>{principle[0]}</h3><p>{principle[1]}</p></article>{/each}</div></div>
    </section>

    <InteractiveTeamDirectory />

    <section id="aktivitas" class="about-activities" aria-labelledby="aktivitas-title">
        <div class="container"><div class="about-heading"><p class="eyebrow">Aktivitas</p><h2 id="aktivitas-title">Aktivitas Kami</h2><p>Dokumentasi kegiatan CryptoSharia yang telah dipublikasikan.</p></div>{#if data.activities.length}<div class="about-activity-grid" role="region" aria-label="Daftar aktivitas CryptoSharia">{#each data.activities as post (post.id)}<ArticleCard {post} href={`/aktivitas/${post.slug}`} label="Aktivitas" />{/each}</div>{:else}<StateMessage title="Aktivitas belum tersedia" message={data.activityError || 'Dokumentasi kegiatan akan segera ditambahkan.'} />{/if}</div>
    </section>

    <section id="hubungi-kami" class="container section" aria-labelledby="contact-title">
        <div class="about-contact">
            <div><p class="eyebrow">Kontak</p><h2 id="contact-title">Hubungi Kami</h2><p>Punya pertanyaan, masukan, atau peluang kolaborasi? Tim kami siap membantu.</p><dl><div><dt>WhatsApp</dt><dd><a href="https://wa.me/6282186584279" target="_blank" rel="noopener noreferrer">+62 821-8658-4279 ↗</a></dd></div><div><dt>Email</dt><dd><a href="mailto:contact@cryptosharia.id">contact@cryptosharia.id</a></dd></div><div><dt>Alamat</dt><dd><a href="https://maps.google.com/?q=Jl.+Wibawa+Mukti+II+No.+6,+Jatiluhur,+Jatiasih,+Kota+Bekasi" target="_blank" rel="noopener noreferrer">Jl. Wibawa Mukti II No. 6, Jatiluhur, Jatiasih, Bekasi ↗</a></dd></div></dl></div>
            <form class="form-grid about-form" method="POST" action="?/sendMessage#hubungi-kami" aria-busy={submitting} use:enhance={handleSubmit}><div class="field"><label for="contact-name">Nama</label><input id="contact-name" class="input" name="name" autocomplete="name" required minlength="2" maxlength="120" value={form?.fields?.name ?? ''} /></div><div class="field"><label for="contact-email">Email</label><input id="contact-email" class="input" type="email" name="email" autocomplete="email" required maxlength="255" value={form?.fields?.email ?? ''} /></div><div class="field"><label for="contact-message">Pesan</label><textarea id="contact-message" class="textarea" name="message" required minlength="10" maxlength="5000">{form?.fields?.message ?? ''}</textarea></div><button class="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Mengirim…' : 'Kirim Pesan →'}</button>{#if data.messageSent}<div class="alert alert-success" role="status">Pesan berhasil dikirim. Terima kasih.</div>{/if}{#if form?.error}<div class="alert alert-error" role="alert">{form.error}</div>{/if}</form>
        </div>
    </section>
</main>

<style>
    .about-page {
        overflow-x: clip;
    }

    .about-page .eyebrow::before {
        display: none;
    }

    .about-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.65fr) minmax(240px, .75fr);
        align-items: end;
        gap: clamp(40px, 7vw, 96px);
        padding-block: clamp(60px, 8vw, 100px);
    }

    .about-hero h1,
    .about-heading h2,
    .about-contact h2,
    .about-direction h2 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.65rem);
        line-height: 1.07;
        letter-spacing: -.045em;
    }

    .about-hero > div > p:last-child,
    .about-heading > p:last-child,
    .about-contact > div > p:last-of-type {
        max-width: 660px;
        margin: 20px 0 0;
        color: var(--muted);
    }

    .about-hero aside {
        padding-left: 32px;
        border-left: 1px solid var(--border);
    }

    .about-hero aside > p {
        margin: 0;
        color: var(--accent-text);
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
    }

    .about-hero ol {
        margin: 16px 0 0;
        padding: 0;
        border-block: 1px solid var(--border);
        list-style: none;
    }

    .about-hero li {
        display: flex;
        gap: 14px;
        padding: 11px 0;
        border-bottom: 1px solid var(--border);
        font-weight: 600;
    }

    .about-hero li:last-child {
        border: 0;
    }

    .about-hero li span,
    .about-principles span {
        color: var(--accent-text);
        font-size: .78rem;
    }

    .about-direction,
    .about-activities {
        padding-block: clamp(56px, 7vw, 88px);
        border-block: 1px solid var(--border);
        background: color-mix(in srgb, var(--surface-muted) 54%, transparent);
    }

    .about-direction h2,
    .about-heading h2,
    .about-contact h2 {
        font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    }

    .about-principles {
        margin-top: 36px;
        border-top: 1px solid var(--border);
    }

    .about-principles article {
        display: grid;
        grid-template-columns: 72px minmax(120px, .55fr) minmax(0, 1.45fr);
        gap: 24px;
        padding: 28px 0;
        border-bottom: 1px solid var(--border);
    }

    .about-principles h3 {
        margin: 0;
        font-size: 1.12rem;
    }

    .about-principles p {
        margin: 0;
        color: var(--muted);
    }

    .about-heading {
        margin-bottom: 32px;
    }

    .about-activity-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

    .about-contact {
        display: grid;
        grid-template-columns: minmax(220px, .75fr) minmax(0, 1.25fr);
        gap: clamp(40px, 7vw, 88px);
    }

    .about-contact dl {
        margin: 32px 0 0;
        border-block: 1px solid var(--border);
    }

    .about-contact dl div {
        padding: 14px 0;
        border-bottom: 1px solid var(--border);
    }

    .about-contact dl div:last-child {
        border: 0;
    }

    .about-contact dt {
        color: var(--accent-text);
        font-size: .73rem;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
    }

    .about-contact dd {
        margin: 4px 0 0;
        font-size: .92rem;
    }

    .about-contact dd a:hover {
        color: var(--accent-text);
    }

    .about-form {
        padding-left: clamp(24px, 4vw, 48px);
        border-left: 1px solid var(--border);
    }

    .about-form .button {
        width: fit-content;
    }

    #visi-misi,
    #aktivitas,
    #hubungi-kami {
        scroll-margin-top: calc(var(--header-height) + 16px);
    }

    @media (max-width: 1020px) {
        .about-hero {
            grid-template-columns: 1fr;
            gap: 32px;
        }

        .about-hero aside {
            max-width: 600px;
            padding: 24px 0 0;
            border-top: 1px solid var(--border);
            border-left: 0;
        }

        .about-activity-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 768px) {
        .about-page :global(.container) {
            width: calc(100% - 40px);
        }

        .about-hero {
            gap: 24px;
            padding-block: 48px 56px;
        }

        .about-hero h1 {
            max-width: 620px;
            font-size: clamp(1.875rem, 8vw, 2.25rem);
            line-height: 1.08;
        }

        .about-hero > div > p:last-child,
        .about-heading > p:last-child,
        .about-contact > div > p:last-of-type {
            margin-top: 14px;
            font-size: .9375rem;
            line-height: 1.58;
        }

        .about-hero aside {
            max-width: none;
            padding-top: 18px;
        }

        .about-hero ol {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0 18px;
            margin-top: 10px;
            border-bottom: 0;
        }

        .about-hero li {
            gap: 8px;
            padding: 9px 0;
            font-size: .8125rem;
            line-height: 1.35;
        }

        .about-direction,
        .about-activities {
            padding-block: 56px;
        }

        .about-direction h2,
        .about-heading h2,
        .about-contact h2 {
            font-size: clamp(1.625rem, 7vw, 1.875rem);
            line-height: 1.1;
        }

        .about-principles {
            margin-top: 24px;
        }

        .about-principles article {
            grid-template-columns: 32px minmax(0, 1fr);
            gap: 4px 8px;
            padding-block: 18px;
        }

        .about-principles article > span {
            grid-row: 1 / 3;
            padding-top: 2px;
        }

        .about-principles h3,
        .about-principles p {
            grid-column: 2;
        }

        .about-principles h3 {
            font-size: 1rem;
            line-height: 1.35;
        }

        .about-principles p {
            font-size: .9375rem;
            line-height: 1.55;
        }

        .about-heading {
            margin-bottom: 24px;
        }

        .about-activity-grid {
            display: flex;
            max-width: 100%;
            min-width: 0;
            grid-template-columns: none;
            gap: 14px;
            padding: 2px 2px 8px;
            overflow-x: auto;
            overscroll-behavior-inline: contain;
            scroll-padding-inline: 2px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .about-activity-grid::-webkit-scrollbar {
            display: none;
        }

        .about-activity-grid > :global(.article-card) {
            flex: 0 0 min(84vw, 340px);
            scroll-snap-align: start;
        }

        .about-activity-grid :global(.article-card-body) {
            padding: 15px;
        }

        .about-activity-grid :global(.article-card h3) {
            display: -webkit-box;
            margin-block: 7px;
            overflow: hidden;
            font-size: 1rem;
            line-height: 1.3;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
        }

        .about-activity-grid :global(.article-card p) {
            font-size: .855rem;
            line-height: 1.5;
            -webkit-line-clamp: 2;
            line-clamp: 2;
        }

        .about-activity-grid :global(.card-meta) {
            min-height: 44px;
            padding-top: 10px;
        }

        .about-contact {
            grid-template-columns: 1fr;
            gap: 24px;
        }

        .about-contact > * {
            min-width: 0;
        }

        .about-contact dl {
            margin-top: 20px;
        }

        .about-contact dl div {
            display: grid;
            min-height: 52px;
            grid-template-columns: 76px minmax(0, 1fr);
            align-items: center;
            gap: 12px;
            padding: 4px 0;
        }

        .about-contact dd {
            margin-top: 2px;
            min-width: 0;
            overflow-wrap: anywhere;
            font-size: .875rem;
            line-height: 1.5;
        }

        .about-contact dd a {
            display: flex;
            min-height: 44px;
            align-items: center;
        }

        .about-form {
            gap: 14px;
            padding: 24px 0 0;
            border-top: 1px solid var(--border);
            border-left: 0;
        }

        .about-form :global(.field) {
            gap: 5px;
        }

        .about-form :global(.field label) {
            font-size: .875rem;
        }

        .about-form :global(.input),
        .about-form :global(.textarea) {
            min-height: 46px;
            border-radius: 10px;
        }

        .about-form :global(.textarea) {
            min-height: 112px;
        }

        .about-form .button {
            width: 100%;
        }

        #hubungi-kami {
            padding-block: 56px;
        }
    }

    @media (max-width: 480px) {
        .about-hero ol {
            gap: 0 12px;
        }

        .about-hero li {
            align-items: baseline;
        }
    }

    @media (max-width: 360px) {
        .about-page :global(.container) {
            width: calc(100% - 32px);
        }

        .about-hero h1 {
            font-size: 1.875rem;
        }

        .about-direction,
        .about-activities,
        #hubungi-kami {
            padding-block: 48px;
        }
    }
</style>
