<script lang="ts">
    import { reveal } from '$lib/actions/reveal';
</script>

<section class="about-section" aria-labelledby="tentang-ringkas">
    <div class="container about-layout">
        <article class="about-copy panel-link" use:reveal>
            <p class="section-label">Tentang CryptoSharia</p>
            <h2 id="tentang-ringkas">Mempertemukan riset aset digital dengan prinsip keuangan Islam.</h2>
            <p>
                CryptoSharia membantu masyarakat memahami aset digital melalui edukasi, riset pasar,
                dan analisis syariah yang mudah diakses.
            </p>
            <a href="/tentang-kami">Kenali CryptoSharia <span aria-hidden="true">→</span></a>
        </article>

        <aside class="community-note panel-link" use:reveal={{ delay: 100 }} aria-labelledby="community-title">
            <p class="section-label">Komunitas</p>
            <h2 id="community-title">Bertumbuh lewat diskusi dan pembelajaran bersama.</h2>
            <p>Ikuti diskusi pasar, pembelajaran aset digital, dan pembahasan syariah bersama komunitas CryptoSharia.</p>
            <a href="/komunitas#gabung">Gabung Komunitas <span aria-hidden="true">→</span></a>
        </aside>
    </div>
</section>

<style>
    .about-section {
        padding-block: 0 112px;
        background: var(--canvas);
    }

    .about-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.8fr);
        border-block: 1px solid var(--border);
    }

    .about-copy,
    .community-note {
        padding-block: 56px;
        transition: background var(--motion-ui) var(--ease-standard), box-shadow var(--motion-ui) var(--ease-standard);
    }

    .about-copy {
        padding-right: clamp(48px, 9vw, 120px);
    }

    .community-note {
        padding-left: clamp(32px, 5vw, 56px);
        border-left: 1px solid var(--border);
        background: var(--surface);
    }

    .section-label {
        margin: 0 0 14px;
        color: var(--muted);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    h2 {
        margin: 0;
        font-size: clamp(1.75rem, 3.2vw, 2.55rem);
        line-height: 1.13;
        letter-spacing: -0.045em;
        text-wrap: balance;
    }

    .panel-link h2 { transition: color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard); }
    .panel-link:hover, .panel-link:focus-within { background: color-mix(in srgb, var(--surface-selected) 34%, var(--surface)); box-shadow: inset 0 2px 0 color-mix(in srgb, var(--accent) 30%, transparent); }
    .panel-link:hover h2, .panel-link:focus-within h2 { color: var(--accent-text); transform: translateX(2px); }

    .community-note h2 {
        font-size: clamp(1.5rem, 2.4vw, 2rem);
    }

    article > p:last-of-type,
    aside > p:last-of-type {
        max-width: 660px;
        margin: 20px 0 0;
        color: var(--muted);
        line-height: 1.65;
    }

    a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 28px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--border-control);
        font-size: 0.88rem;
        font-weight: 700;
    }

    a span {
        transition: transform 180ms ease;
    }

    a:hover span {
        transform: translateX(3px);
    }

    @media (max-width: 820px) {
        .about-layout {
            grid-template-columns: 1fr;
        }

        .about-copy {
            padding-right: 0;
        }

        .community-note {
            padding: 40px 0;
            border-top: 1px solid var(--border);
            border-left: 0;
            background: transparent;
        }
    }

    @media (max-width: 600px) {
        .about-section {
            padding-bottom: 80px;
        }

        .about-copy {
            padding-block: 48px;
        }

        .community-note {
            padding-block: 40px;
        }
    }
</style>
