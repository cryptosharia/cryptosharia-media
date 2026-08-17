<script lang="ts">
    import { reveal } from '$lib/actions/reveal';
</script>

<section class="about-section" aria-labelledby="tentang-ringkas">
    <div class="container about-layout">
        <a class="about-copy panel-link" href="/tentang-kami" use:reveal aria-labelledby="tentang-ringkas">
            <p class="section-label">Tentang CryptoSharia</p>
            <h2 id="tentang-ringkas">Mempertemukan riset aset digital dengan prinsip keuangan Islam.</h2>
            <p>
                CryptoSharia membantu masyarakat memahami aset digital melalui edukasi, riset pasar,
                dan analisis syariah yang mudah diakses.
            </p>
            <span class="panel-cta">Kenali CryptoSharia <span class="cta-arrow" aria-hidden="true">→</span></span>
        </a>

        <a class="community-note panel-link" href="/komunitas#gabung" use:reveal={{ delay: 100 }} aria-labelledby="community-title">
            <p class="section-label">Komunitas</p>
            <h2 id="community-title">Bertumbuh lewat diskusi dan pembelajaran bersama.</h2>
            <p>Ikuti diskusi pasar, pembelajaran aset digital, dan pembahasan syariah bersama komunitas CryptoSharia.</p>
            <span class="panel-cta">Gabung Komunitas <span class="cta-arrow" aria-hidden="true">→</span></span>
        </a>
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
        --panel-base: var(--canvas);
        position: relative;
        display: block;
        padding-block: 56px;
        overflow: hidden;
        cursor: pointer;
        transition: background var(--motion-micro) var(--ease-standard);
    }

    .panel-link::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 8%;
        height: 1px;
        background: color-mix(in srgb, var(--border-control) 55%, transparent);
        content: '';
        transition: width var(--motion-micro) var(--ease-standard), background-color var(--motion-micro) var(--ease-standard);
    }

    .about-copy {
        padding-right: clamp(48px, 9vw, 120px);
    }

    .community-note {
        --panel-base: var(--surface);
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

    .panel-link h2 {
        transition: color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .panel-link:focus-visible {
        z-index: 1;
        outline: 2px solid color-mix(in srgb, var(--accent-text) 72%, transparent);
        outline-offset: -2px;
    }

    .panel-link:focus-visible,
    .panel-link:active {
        background: color-mix(in srgb, var(--panel-base) 94%, var(--accent) 6%);
    }

    .panel-link:focus-visible::before,
    .panel-link:active::before {
        width: 32%;
        background: var(--accent);
    }

    .panel-link:focus-visible h2,
    .panel-link:active h2 {
        color: var(--accent-text);
        transform: translateX(2px);
    }

    @media (hover: hover) and (pointer: fine) {
        .panel-link:hover {
            background: color-mix(in srgb, var(--panel-base) 94%, var(--accent) 6%);
        }

        .panel-link:hover::before {
            width: 32%;
            background: var(--accent);
        }

        .panel-link:hover h2 {
            color: var(--accent-text);
            transform: translateX(2px);
        }

        .panel-link:hover .cta-arrow {
            transform: translateX(4px);
        }
    }

    .community-note h2 {
        font-size: clamp(1.5rem, 2.4vw, 2rem);
    }

    .panel-link > p:last-of-type {
        max-width: 660px;
        margin: 20px 0 0;
        color: var(--muted);
        line-height: 1.65;
    }

    .panel-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 28px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--border-control);
        font-size: 0.88rem;
        font-weight: 700;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .cta-arrow {
        color: var(--accent-text);
        transition: transform var(--motion-micro) var(--ease-standard), color var(--motion-micro) var(--ease-standard);
    }

    .panel-link:focus-visible .cta-arrow,
    .panel-link:active .cta-arrow {
        transform: translateX(4px);
    }

    @media (prefers-reduced-motion: reduce) {
        .panel-link:hover h2,
        .panel-link:focus-visible h2,
        .panel-link:active h2,
        .panel-link:hover .cta-arrow,
        .panel-link:focus-visible .cta-arrow,
        .panel-link:active .cta-arrow {
            transform: none;
        }
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

        .community-note::before {
            top: -1px;
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
