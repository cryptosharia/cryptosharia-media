<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import { COMMUNITY_LINKS, SOCIAL_LINKS } from '$lib/config';

    const communityContext = ['Diskusi aset digital', 'Edukasi dan insight', 'Informasi kegiatan', 'Kanal publikasi resmi'];
    const officialChannels = SOCIAL_LINKS.filter((link) => link.href !== COMMUNITY_LINKS.discord);
</script>

<Seo title="Komunitas CryptoSharia" description="Gabung komunitas, temukan kanal sosial, dan pelajari Komunitas Premium CryptoSharia." canonicalPath="/komunitas" />

<main id="main-content" class="site-main community-page">
    <header class="container community-hero">
        <div class="community-hero-copy">
            <p class="eyebrow">Komunitas</p>
            <h1>Belajar dan berdiskusi bersama komunitas CryptoSharia.</h1>
            <p>Pilih ruang yang sesuai untuk mengikuti informasi, berdiskusi, dan terhubung dengan ekosistem CryptoSharia.</p>
        </div>
        <aside class="community-context" aria-label="Di dalam komunitas">
            <p>Di dalam komunitas</p>
            <ul>{#each communityContext as item, index (item)}<li><span>0{index + 1}</span>{item}</li>{/each}</ul>
        </aside>
    </header>

    <section id="gabung" class="community-hub" aria-labelledby="gabung-title">
        <div class="container">
            <div class="section-heading community-heading"><div><p class="eyebrow">Mulai dari sini</p><h2 id="gabung-title">Gabung Komunitas</h2></div></div>
            <div class="community-join-grid">
                <article class="community-join-card"><p class="community-kind">WhatsApp</p><h3>Grup WhatsApp</h3><p>Ruang diskusi komunitas untuk berbagi informasi dan pandangan secara sehat.</p><a class="button button-primary" href={COMMUNITY_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">Gabung WhatsApp <span aria-hidden="true">↗</span></a></article>
                <article class="community-join-card"><p class="community-kind">Discord</p><h3>Discord</h3><p>Ikuti kanal topik, kegiatan, dan diskusi komunitas CryptoSharia.</p><a class="button button-secondary" href={COMMUNITY_LINKS.discord} target="_blank" rel="noopener noreferrer">Buka Discord <span aria-hidden="true">↗</span></a></article>
            </div>

            <div id="sosial-media" class="community-channels" aria-labelledby="social-title">
                <div class="section-heading community-heading"><div><p class="eyebrow">Kanal resmi</p><h2 id="social-title">Sosial Media</h2><p>Ikuti kanal resmi agar tidak melewatkan publikasi dan aktivitas terbaru.</p></div></div>
                <div class="channel-directory">
                    {#each officialChannels as link (link.label)}
                        <a class="channel-row" href={link.href} target="_blank" rel="noopener noreferrer"><span><strong>{link.label}</strong><small>Buka kanal resmi {link.label} CryptoSharia.</small></span><span class="channel-arrow" aria-hidden="true">↗</span></a>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <section id="premium" class="community-premium" aria-labelledby="premium-title">
        <div class="container community-premium-grid">
            <div><p class="eyebrow">Informasi layanan</p><h2 id="premium-title">Komunitas Premium</h2><p>Pelajari informasi dan manfaat yang tersedia bagi anggota Premium CryptoSharia melalui halaman layanan kami.</p><div class="button-row"><a class="button button-primary" href={COMMUNITY_LINKS.premium} target="_blank" rel="noopener noreferrer">Lihat Informasi Premium <span aria-hidden="true">↗</span></a></div></div>
            <div class="community-premium-visual"><img src="/discord-preview.png" alt="Tampilan kanal Discord CryptoSharia" /></div>
        </div>
    </section>
</main>

<style>
    .community-page .eyebrow::before { display: none; }
    .community-hero { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(240px, .75fr); align-items: end; gap: clamp(40px, 7vw, 96px); padding-block: clamp(60px, 8vw, 100px) clamp(64px, 8vw, 104px); }
    .community-hero h1 { max-width: 720px; margin: 0; font-size: clamp(2.35rem, 5vw, 3.65rem); line-height: 1.06; letter-spacing: -.045em; }
    .community-hero-copy > p:last-child { max-width: 660px; margin: 20px 0 0; color: var(--muted); font-size: clamp(1rem, 1.4vw, 1.06rem); }
    .community-context { padding-left: clamp(20px, 3vw, 40px); border-left: 1px solid var(--border); }
    .community-context > p, .community-kind { margin: 0; color: var(--accent-text); font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
    .community-context ul { margin: 16px 0 0; padding: 0; border-block: 1px solid var(--border); list-style: none; }
    .community-context li { display: flex; gap: 14px; padding: 11px 0; border-bottom: 1px solid var(--border); font-size: .92rem; font-weight: 600; }.community-context li:last-child { border-bottom: 0; }.community-context li span { color: var(--accent-text); font-size: .74rem; font-variant-numeric: tabular-nums; }
    .community-hub { padding-block: clamp(56px, 7vw, 88px); border-block: 1px solid var(--border); background: color-mix(in srgb, var(--surface-muted) 54%, transparent); }.community-heading { margin-bottom: 28px; }.community-join-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    .community-join-card { display: flex; min-height: 226px; flex-direction: column; padding: clamp(20px, 2.5vw, 28px); border: 1px solid var(--border); border-radius: 10px; background: var(--surface); transition: border-color 180ms ease, background 180ms ease; }.community-join-card:hover { border-color: var(--border-control); background: color-mix(in srgb, var(--surface) 92%, var(--surface-muted)); }.community-join-card h3 { margin: 10px 0 6px; font-size: 1.25rem; letter-spacing: -.025em; }.community-join-card > p:not(.community-kind) { max-width: 430px; margin: 0; color: var(--muted); }.community-join-card .button { width: fit-content; margin-top: auto; padding-inline: 14px; }
    .community-channels { margin-top: clamp(56px, 8vw, 88px); }.community-channels .section-heading p:last-child { max-width: 590px; }.channel-directory { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(28px, 5vw, 64px); border-top: 1px solid var(--border); }.channel-row { display: flex; min-height: 92px; align-items: center; justify-content: space-between; gap: 18px; padding: 17px 0; border-bottom: 1px solid var(--border); transition: color 160ms ease, background 160ms ease; }.channel-row:hover { color: var(--accent-text); }.channel-row strong, .channel-row small { display: block; }.channel-row strong { font-size: 1rem; letter-spacing: -.01em; }.channel-row small { margin-top: 4px; color: var(--muted); font-size: .87rem; line-height: 1.45; }.channel-arrow { flex: 0 0 auto; color: var(--accent-text); font-size: 1.25rem; transition: transform 160ms ease; }.channel-row:hover .channel-arrow { transform: translate(3px, -3px); }
    .community-premium { padding-block: clamp(56px, 8vw, 96px); }.community-premium-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); align-items: center; gap: clamp(36px, 7vw, 88px); }.community-premium h2 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.08; letter-spacing: -.04em; }.community-premium h2 + p { max-width: 560px; margin: 18px 0 0; color: var(--muted); font-size: 1.04rem; }.community-premium-visual { overflow: hidden; border: 1px solid var(--border); border-radius: 10px; background: var(--surface-muted); }.community-premium-visual img { width: 100%; height: auto; }
    @media (max-width: 1020px) { .community-hero { grid-template-columns: 1fr; gap: 32px; }.community-context { max-width: 600px; padding: 24px 0 0; border-top: 1px solid var(--border); border-left: 0; }.community-premium-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
    @media (max-width: 680px) { .community-hero { gap: 28px; padding-block: 48px 64px; }.community-hero h1 { font-size: clamp(2rem, 10vw, 2.45rem); }.community-context li { padding-block: 9px; }.community-join-grid, .channel-directory, .community-premium-grid { grid-template-columns: 1fr; }.community-join-card { min-height: 0; padding: 20px; }.community-join-card .button, .community-premium .button { width: 100%; margin-top: 22px; }.community-channels { margin-top: 56px; }.channel-row { min-height: 0; padding-block: 14px; }.community-premium { padding-block: 64px; }.community-premium-visual { margin-top: 4px; } }
</style>
