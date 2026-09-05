<script lang="ts">
    import { reveal } from '$lib/actions/reveal';
    import Seo from '$lib/components/Seo.svelte';
    import { COMMUNITY_LINKS, SOCIAL_LINKS } from '$lib/config';

    const communityContext = [
        'Diskusi aset digital',
        'Edukasi dan insight',
        'Informasi kegiatan',
        'Kanal publikasi resmi'
    ];

    const communityProof = [
        {
            title: 'Ruang diskusi terbuka',
            description: 'WhatsApp menjadi pintu masuk untuk berbagi informasi dan pandangan secara sehat.'
        },
        {
            title: 'Topik lintas disiplin',
            description: 'Percakapan menghubungkan pasar, edukasi aset digital, dan perspektif syariah.'
        },
        {
            title: 'Kegiatan dan publikasi',
            description: 'Informasi program serta materi terbaru dibagikan melalui kanal resmi CryptoSharia.'
        },
        {
            title: 'Ekosistem lintas kanal',
            description: 'Anggota dapat memilih ruang yang paling sesuai untuk belajar, mengikuti, atau berdiskusi.'
        }
    ];

    const channelDescriptions: Record<string, string> = {
        Instagram: 'Sorotan visual, edukasi singkat, dan dokumentasi kegiatan.',
        YouTube: 'Video edukasi, diskusi, dan dokumentasi program.',
        Telegram: 'Pembaruan ringkas dan pengumuman kanal resmi.',
        X: 'Percakapan dan pembaruan singkat dari CryptoSharia.',
        LinkedIn: 'Informasi organisasi, kolaborasi, dan perkembangan profesional.',
        Facebook: 'Publikasi dan informasi komunitas CryptoSharia.'
    };

    const channelMarks: Record<string, string> = {
        Instagram: 'IG',
        YouTube: 'YT',
        Telegram: 'TG',
        X: 'X',
        LinkedIn: 'IN',
        Facebook: 'FB'
    };

    const premiumInformation = ['Cakupan layanan', 'Akses dan kanal', 'Cara bergabung'];
    const officialChannels = SOCIAL_LINKS.filter((link) => link.href !== COMMUNITY_LINKS.discord);
</script>

<Seo
    title="Komunitas CryptoSharia — WhatsApp, Discord & Kanal Resmi"
    description="Gabung komunitas CryptoSharia melalui WhatsApp dan Discord, ikuti kanal sosial resmi, serta pelajari layanan Komunitas Premium."
    canonicalPath="/komunitas"
/>

<main id="main-content" class="site-main community-page">
    <header class="container community-hero">
        <div class="community-hero-copy">
            <p class="eyebrow page-enter page-enter-1">Komunitas</p>
            <h1 class="page-enter page-enter-2">Belajar dan berdiskusi bersama komunitas CryptoSharia.</h1>
            <p class="page-enter page-enter-3">
                Pilih ruang yang sesuai untuk mengikuti informasi, berdiskusi, dan terhubung dengan
                ekosistem CryptoSharia.
            </p>
        </div>

        <aside class="community-context page-enter page-enter-4" aria-label="Di dalam komunitas">
            <p>Di dalam komunitas</p>
            <ul>
                {#each communityContext as item, index (item)}
                    <li><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
                {/each}
            </ul>
        </aside>
    </header>

    <section class="community-proof" aria-labelledby="proof-title">
        <div class="container proof-layout">
            <header class="proof-heading" use:reveal>
                <p class="eyebrow">Denyut komunitas</p>
                <h2 id="proof-title">Komunitas yang terus bertumbuh</h2>
                <p>
                    Aktivitas komunitas hadir melalui ruang diskusi, publikasi, dan kegiatan yang
                    terhubung dalam satu ekosistem.
                </p>
            </header>

            <ol class="proof-grid" aria-label="Bentuk aktivitas komunitas CryptoSharia">
                {#each communityProof as item, index (item.title)}
                    <li use:reveal={{ delay: index * 70, distance: 16 }}>
                        <span class="proof-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                    </li>
                {/each}
            </ol>
        </div>
    </section>

    <section id="gabung" class="community-hub" aria-labelledby="gabung-title">
        <div class="container">
            <div class="section-heading community-heading" use:reveal>
                <div>
                    <p class="eyebrow">Mulai dari sini</p>
                    <h2 id="gabung-title">Gabung Komunitas</h2>
                    <p>Pilih kanal utama untuk mulai terhubung dengan komunitas CryptoSharia.</p>
                </div>
            </div>

            <div class="community-join-grid">
                <article class="community-join-card community-join-primary" use:reveal={{ distance: 18 }}>
                    <div class="community-card-topline">
                        <span class="community-mark" aria-hidden="true">WA</span>
                        <span class="community-priority">Pintu masuk utama</span>
                    </div>
                    <p class="community-kind">WhatsApp</p>
                    <h3>Grup WhatsApp</h3>
                    <p>Ruang diskusi komunitas untuk berbagi informasi dan pandangan secara sehat.</p>
                    <a
                        class="button button-primary"
                        href={COMMUNITY_LINKS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                    >Gabung WhatsApp <span aria-hidden="true">↗</span></a>
                </article>

                <article class="community-join-card" use:reveal={{ delay: 90, distance: 18 }}>
                    <div class="community-card-topline">
                        <span class="community-mark" aria-hidden="true">DC</span>
                        <span class="community-priority">Ruang bertopik</span>
                    </div>
                    <p class="community-kind">Discord</p>
                    <h3>Discord</h3>
                    <p>Ikuti kanal topik, kegiatan, dan diskusi komunitas CryptoSharia.</p>
                    <a
                        class="button button-secondary"
                        href={COMMUNITY_LINKS.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                    >Buka Discord <span aria-hidden="true">↗</span></a>
                </article>
            </div>

            <div id="sosial-media" class="community-channels" aria-labelledby="social-title">
                <div class="section-heading community-heading" use:reveal>
                    <div>
                        <p class="eyebrow">Kanal resmi</p>
                        <h2 id="social-title">Sosial Media</h2>
                        <p>Ikuti kanal resmi agar tidak melewatkan publikasi dan aktivitas terbaru.</p>
                    </div>
                </div>

                <div class="channel-directory">
                    {#each officialChannels as link, index (link.label)}
                        <a
                            class="channel-row"
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            use:reveal={{ delay: (index % 2) * 60, distance: 14 }}
                            aria-label={`Buka kanal ${link.label} CryptoSharia`}
                        >
                            <span class="channel-mark" aria-hidden="true">{channelMarks[link.label] ?? link.label.slice(0, 2)}</span>
                            <span class="channel-copy">
                                <strong>{link.label}</strong>
                                <small>{channelDescriptions[link.label] ?? `Buka kanal resmi ${link.label} CryptoSharia.`}</small>
                            </span>
                            <span class="channel-arrow" aria-hidden="true">↗</span>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <section id="premium" class="community-premium" aria-labelledby="premium-title">
        <div class="container community-premium-grid">
            <div class="premium-copy" use:reveal>
                <p class="eyebrow">Ruang belajar lanjutan</p>
                <h2 id="premium-title">Komunitas Premium</h2>
                <p>
                    Kenali ruang belajar lanjutan CryptoSharia dengan tenang. Informasi layanan,
                    akses, dan cara bergabung tersedia pada halaman khusus.
                </p>

                <div class="premium-information" aria-label="Informasi yang tersedia">
                    <span>Yang dapat Anda cek</span>
                    <ul>
                        {#each premiumInformation as item}
                            <li><span aria-hidden="true">✓</span>{item}</li>
                        {/each}
                    </ul>
                </div>

                <div class="button-row">
                    <a
                        class="button button-primary"
                        href={COMMUNITY_LINKS.premium}
                        target="_blank"
                        rel="noopener noreferrer"
                    >Lihat Informasi Premium <span aria-hidden="true">↗</span></a>
                </div>
            </div>

            <figure class="community-premium-visual" use:reveal={{ delay: 140, distance: 24 }}>
                <div class="premium-visual-frame">
                    <img
                        src="/discord-preview.webp"
                        alt="Pratinjau kanal Discord CryptoSharia"
                        loading="lazy"
                        decoding="async"
                        width="2880"
                        height="1800"
                    />
                </div>
                <figcaption>Pratinjau ruang komunitas Discord CryptoSharia.</figcaption>
            </figure>
        </div>
    </section>
</main>

<style>
    .community-page { overflow-x: clip; }
    .community-page .eyebrow::before { display: none; }
    .community-hero { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(240px, .75fr); align-items: end; gap: clamp(40px, 7vw, 96px); padding-block: clamp(60px, 8vw, 100px) clamp(64px, 8vw, 104px); }
    .community-hero h1 { max-width: 760px; margin: 0; font-size: clamp(2.35rem, 5vw, 3.65rem); line-height: 1.06; letter-spacing: -.045em; text-wrap: balance; }
    .community-hero-copy > p:last-child { max-width: 660px; margin: 20px 0 0; color: var(--muted); font-size: clamp(1rem, 1.4vw, 1.06rem); }
    .community-context { padding-left: clamp(20px, 3vw, 40px); border-left: 1px solid var(--border); }
    .community-context > p, .community-kind { margin: 0; color: var(--accent-text); font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
    .community-context ul { margin: 16px 0 0; padding: 0; border-block: 1px solid var(--border); list-style: none; }
    .community-context li { display: flex; gap: 14px; padding: 11px 0; border-bottom: 1px solid var(--border); font-size: .92rem; font-weight: 600; }
    .community-context li:last-child { border-bottom: 0; }
    .community-context li span { color: var(--accent-text); font-size: .74rem; font-variant-numeric: tabular-nums; }

    .community-proof { padding-block: clamp(56px, 7vw, 84px); border-block: 1px solid var(--border); background: var(--surface); }
    .proof-layout { display: grid; grid-template-columns: minmax(230px, .7fr) minmax(0, 1.3fr); align-items: start; gap: clamp(40px, 7vw, 88px); }
    .proof-heading h2, .community-heading h2, .community-premium h2 { margin: 0; font-size: clamp(1.9rem, 3.7vw, 2.75rem); line-height: 1.08; letter-spacing: -.04em; text-wrap: balance; }
    .proof-heading > p:last-child, .community-heading p:last-child { max-width: 600px; margin: 16px 0 0; color: var(--muted); }
    .proof-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; padding: 0; border-top: 1px solid var(--border-control); list-style: none; }
    .proof-grid li { min-width: 0; padding: 22px clamp(16px, 2vw, 24px) 24px 0; border-bottom: 1px solid var(--border); }
    .proof-grid li:nth-child(even) { padding-right: 0; padding-left: clamp(16px, 2vw, 24px); border-left: 1px solid var(--border); }
    .proof-index { display: block; margin-bottom: 16px; color: var(--accent-text); font-size: .7rem; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: .1em; }
    .proof-grid strong { font-size: 1rem; letter-spacing: -.015em; }
    .proof-grid p { margin: 7px 0 0; color: var(--muted); font-size: .88rem; line-height: 1.55; }

    .community-hub { padding-block: clamp(64px, 8vw, 96px); border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--surface-muted) 54%, transparent); }
    .community-heading { margin-bottom: 28px; }
    .community-join-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .community-join-card { position: relative; display: flex; min-height: 250px; flex-direction: column; padding: clamp(22px, 2.5vw, 30px); overflow: hidden; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); box-shadow: var(--shadow-sm); transition: transform var(--motion-ui) var(--ease-out), border-color var(--motion-ui) var(--ease-standard), box-shadow var(--motion-ui) var(--ease-standard), background var(--motion-ui) var(--ease-standard); }
    .community-join-primary { border-top-color: var(--accent); }
    .community-join-card:hover,
    .community-join-card:focus-within { border-color: var(--border-control); background: color-mix(in srgb, var(--surface) 94%, var(--surface-muted)); box-shadow: 0 14px 34px rgb(20 24 31 / 8%); transform: translateY(-2px); }
    .community-card-topline { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
    .community-mark, .channel-mark { display: inline-grid; place-items: center; color: var(--text); border: 1px solid var(--border); background: var(--surface-muted); font-size: .65rem; font-weight: 800; letter-spacing: .04em; }
    .community-mark { width: 38px; height: 38px; border-radius: 8px; }
    .community-join-primary .community-mark { color: #17130e; border-color: var(--accent); background: var(--accent); }
    .community-priority { color: var(--muted); font-size: .7rem; font-weight: 650; }
    .community-join-card h3 { margin: 10px 0 6px; font-size: 1.35rem; letter-spacing: -.025em; }
    .community-join-card > p:not(.community-kind) { max-width: 430px; margin: 0; color: var(--muted); }
    .community-join-card .button { width: fit-content; margin-top: auto; padding-inline: 14px; }

    .community-channels { margin-top: clamp(64px, 9vw, 104px); }
    .channel-directory { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 clamp(22px, 4vw, 52px); border-top: 1px solid var(--border-control); }
    .channel-row { display: grid; min-height: 104px; grid-template-columns: 40px minmax(0, 1fr) 18px; align-items: center; gap: 14px; padding: 16px 12px; border-bottom: 1px solid var(--border); transition: color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard); }
    .channel-row:hover, .channel-row:focus-visible { color: var(--accent-text); border-bottom-color: var(--border-control); background: color-mix(in srgb, var(--surface) 70%, transparent); }
    .channel-mark { width: 40px; height: 40px; border-radius: 50%; }
    .channel-copy { min-width: 0; }
    .channel-copy strong, .channel-copy small { display: block; }
    .channel-copy strong { font-size: 1rem; letter-spacing: -.01em; }
    .channel-copy small { margin-top: 4px; color: var(--muted); font-size: .84rem; line-height: 1.45; }
    .channel-arrow { display: inline-grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; color: var(--accent-text); border: 1px solid var(--border-control); border-radius: 50%; font-size: 1rem; line-height: 1; transition: transform var(--motion-micro) var(--ease-standard), color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard); }
    .channel-row:hover .channel-arrow, .channel-row:focus-visible .channel-arrow { color: var(--on-accent); background: var(--accent); border-color: var(--accent); }
    .channel-row:hover .channel-arrow, .channel-row:focus-visible .channel-arrow { transform: translate(3px, -3px); }

    .community-premium { position: relative; padding-block: clamp(72px, 9vw, 112px); overflow: clip; background: var(--canvas); }
    .community-premium::before { position: absolute; right: -220px; bottom: -280px; width: 540px; height: 540px; border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent); border-radius: 50%; content: ''; pointer-events: none; }
    .community-premium-grid { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(340px, .95fr); align-items: center; gap: clamp(44px, 7vw, 88px); }
    .premium-copy > p:nth-of-type(2) { max-width: 570px; margin: 18px 0 0; color: var(--muted); font-size: 1.04rem; }
    .premium-information { max-width: 520px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--border); }
    .premium-information > span { color: var(--accent-text); font-size: .7rem; font-weight: 750; letter-spacing: .1em; text-transform: uppercase; }
    .premium-information ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 14px 0 0; padding: 0; list-style: none; }
    .premium-information li { display: flex; align-items: baseline; gap: 7px; font-size: .84rem; font-weight: 650; }
    .premium-information li span { color: var(--accent-text); }
    .community-premium-visual { min-width: 0; margin: 0; }
    .premium-visual-frame { aspect-ratio: 8 / 5; overflow: hidden; border: 1px solid var(--border-control); border-radius: 10px; background: var(--surface-muted); box-shadow: 0 22px 48px rgb(20 24 31 / 12%); transform: perspective(900px) rotateY(-2deg) rotateX(1deg); transform-origin: center; transition: transform 500ms var(--ease-out), box-shadow 500ms var(--ease-out); }
    .community-premium-visual:hover .premium-visual-frame { box-shadow: 0 16px 36px rgb(20 24 31 / 10%); transform: perspective(900px) rotateY(-.5deg) rotateX(.25deg) translateY(-2px); }
    .premium-visual-frame img { width: 100%; height: 100%; object-fit: cover; }
    .community-premium-visual figcaption { margin-top: 12px; color: var(--muted); font-size: .72rem; }
    #gabung, #sosial-media, #premium { scroll-margin-top: calc(var(--header-height) + 16px); }

    @media (max-width: 1020px) {
        .community-hero, .proof-layout { grid-template-columns: 1fr; gap: 32px; }
        .community-context { max-width: 600px; padding: 24px 0 0; border-top: 1px solid var(--border); border-left: 0; }
        .proof-heading { max-width: 680px; }
        .community-premium-grid { grid-template-columns: minmax(0, 1fr) minmax(320px, .9fr); gap: 36px; }
        .premium-information ul { grid-template-columns: 1fr; }
    }

    @media (max-width: 720px) {
        .community-hero { gap: 28px; padding-block: 48px 64px; }
        .community-hero h1 { font-size: clamp(2rem, 10vw, 2.45rem); }
        .community-context li { padding-block: 9px; }
        .proof-grid, .community-join-grid, .channel-directory, .community-premium-grid { grid-template-columns: 1fr; }
        .proof-grid li, .proof-grid li:nth-child(even) { padding: 19px 0 20px; border-left: 0; }
        .proof-index { margin-bottom: 10px; }
        .community-join-card { min-height: 0; padding: 20px; }
        .community-join-card .button, .community-premium .button { width: 100%; margin-top: 24px; }
        .community-channels { margin-top: 64px; }
        .channel-row { min-height: 92px; padding-inline: 6px; }
        .community-premium { padding-block: 72px; }
        .community-premium-grid { gap: 42px; }
        .community-premium-visual { width: min(100%, 620px); }
        .premium-visual-frame, .community-premium-visual:hover .premium-visual-frame { transform: none; }
    }

    @media (max-width: 390px) {
        .community-card-topline { margin-bottom: 18px; }
        .channel-row { grid-template-columns: 36px minmax(0, 1fr) 16px; gap: 11px; }
        .channel-mark { width: 36px; height: 36px; }
        .channel-copy small { font-size: .8rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .premium-visual-frame, .community-premium-visual:hover .premium-visual-frame { transform: none; }
        .community-join-card:hover,
        .community-join-card:focus-within,
        .channel-row:hover .channel-arrow,
        .channel-row:focus-visible .channel-arrow,
        .community-join-card .button:hover > span,
        .community-premium .button:hover > span {
            transform: none;
        }
    }
</style>
