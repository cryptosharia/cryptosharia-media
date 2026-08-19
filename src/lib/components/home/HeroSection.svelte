<script lang="ts">
    import MarketTicker from '$lib/components/home/MarketTicker.svelte';
    import ShariaIntelligenceOrbit from '$lib/components/home/ShariaIntelligenceOrbit.svelte';
    import type { Token, TokenQuote } from '$types/api';

    let { tokens, quotes }: { tokens: Token[]; quotes: TokenQuote[] } = $props();
</script>

<section class="home-hero" aria-labelledby="home-title">
    {#if tokens.length}
        <MarketTicker {tokens} {quotes} />
    {/if}
    <div class="container hero-layout">
        <div class="home-hero-copy">
            <p class="hero-kicker hero-enter hero-enter-1">Riset · Edukasi · Screening Aset Digital</p>
            <h1 id="home-title" class="hero-enter hero-enter-2">Pahami dunia kripto dengan <span>perspektif syariah.</span></h1>
            <p class="hero-intro hero-enter hero-enter-3">
                Berita, riset, edukasi, dan screening aset kripto untuk membantu Muslim memahami pasar
                dan menilai aset digital dari perspektif syariah.
            </p>
            <div class="hero-actions hero-enter hero-enter-4">
                <a class="hero-cta primary" href="/screening">Cek Screening Coin <span aria-hidden="true">→</span></a>
                <a class="hero-cta secondary" href="/berita">Baca Berita <span aria-hidden="true">→</span></a>
            </div>
            <p class="hero-trust hero-enter hero-enter-4">Riset berbasis data <span>•</span> Screening syariah <span>•</span> Edukasi terstruktur</p>
        </div>
        <div class="intelligence-visual hero-enter hero-enter-3">
            <ShariaIntelligenceOrbit />
        </div>
    </div>
</section>

<style>
    .home-hero {
        position: relative;
        padding: 0 0 64px;
        overflow: clip;
        color: #f1f0ec;
        background: #0f1115;
    }

    .home-hero::before {
        position: absolute;
        top: -260px;
        right: max(-11vw, -160px);
        width: min(58vw, 720px);
        aspect-ratio: 1;
        border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
        border-radius: 50%;
        content: '';
        opacity: .72;
    }

    .home-hero::after {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image:
            linear-gradient(rgb(255 255 255 / 5%) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 5%) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse 90% 105% at 62% 46%, black 15%, transparent 74%);
        opacity: .64;
        content: '';
    }

    .hero-layout {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(420px, .95fr);
        min-height: 570px;
        align-items: center;
        gap: clamp(48px, 7vw, 88px);
        padding-top: 56px;
    }

    .home-hero-copy {
        max-width: 650px;
    }

    .hero-kicker {
        margin: 0;
        color: #aeb4be;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .hero-kicker::before { display: inline-block; width: 6px; height: 6px; margin: -1px 8px 0 0; border-radius: 50%; background: var(--accent); content: ''; vertical-align: middle; }

    h1 {
        margin: 20px 0 0;
        max-width: 650px;
        font-size: clamp(3.35rem, 4.2vw, 4.75rem);
        line-height: 1;
        letter-spacing: -0.045em;
        text-wrap: balance;
    }

    h1 span {
        position: relative;
        color: var(--accent-text);
    }

    h1 span::after {
        position: absolute;
        right: 0;
        bottom: .02em;
        left: 0;
        height: .09em;
        background: color-mix(in srgb, var(--accent) 48%, transparent);
        content: '';
        transform: scaleX(0);
        transform-origin: left;
        animation: underline-sweep 600ms var(--ease-out) 580ms forwards;
    }

    .hero-enter { animation: hero-enter 620ms var(--ease-out) both; }
    .hero-enter-1 { animation-delay: 60ms; }
    .hero-enter-2 { animation-delay: 130ms; }
    .hero-enter-3 { animation-delay: 220ms; }
    .hero-enter-4 { animation-delay: 300ms; }

    .hero-intro {
        max-width: 610px;
        margin: 24px 0 0;
        color: #aeb4be;
        font-size: 1.02rem;
        line-height: 1.65;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 32px;
    }

    .hero-cta {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 18px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-size: 0.94rem;
        font-weight: 700;
        transition: color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard), box-shadow var(--motion-micro) var(--ease-standard);
    }

    .hero-cta.primary {
        color: #17130e;
        border-color: var(--accent);
        background: var(--accent);
    }

    .hero-cta.primary:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
    }

    .hero-cta.primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgb(255 140 0 / 20%); }
    .hero-cta:active { transform: translateY(0); }

    .hero-cta.secondary {
        color: #f1f0ec;
        border-color: rgb(255 255 255 / 24%);
        background: rgb(255 255 255 / 3%);
    }

    .hero-cta.secondary:hover {
        border-color: rgb(255 255 255 / 62%);
        background: rgb(255 255 255 / 8%);
    }

    .hero-cta.secondary span {
        transition: transform 180ms ease;
    }

    .hero-cta.secondary:hover span {
        transform: translateX(3px);
    }

    .hero-trust { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 0; color: #aeb4be; font-size: .72rem; font-weight: 600; }
    .hero-trust span { color: var(--accent); }
    .intelligence-visual { min-width: 0; }

    @keyframes hero-enter { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes underline-sweep { to { transform: scaleX(1); } }

    @media (max-width: 900px) {
        .home-hero {
            padding-bottom: 76px;
        }

        .hero-layout {
            grid-template-columns: 1fr;
            min-height: 0;
            gap: 42px;
            padding-top: 56px;
        }

        .home-hero-copy {
            max-width: 720px;
        }

    }

    @media (max-width: 800px) {
        h1 {
            font-size: 2.75rem;
            line-height: 1.04;
        }
    }

    @media (max-width: 600px) {
        .home-hero {
            padding-bottom: 64px;
        }

        .hero-layout {
            gap: 40px;
            padding-top: 44px;
        }

        h1 {
            margin-top: 16px;
            font-size: clamp(2.5rem, 11vw, 2.75rem);
            line-height: 1.04;
            letter-spacing: -0.05em;
        }

        .hero-intro {
            margin-top: 20px;
            font-size: 1rem;
            line-height: 1.6;
        }

        .hero-actions {
            margin-top: 28px;
        }

        .hero-trust { margin-top: 18px; font-size: .68rem; }

    }

    @media (prefers-reduced-motion: reduce) {
        .home-hero::before, .hero-enter, h1 span::after { animation: none; }
        .hero-enter { opacity: 1; transform: none; }
        .hero-cta:hover,
        .hero-cta:active,
        .hero-cta:hover span,
        .hero-cta:focus-visible span {
            transform: none;
        }
    }

    @media (max-width: 380px) {
        .hero-actions {
            align-items: flex-start;
            flex-direction: column;
        }
    }
</style>
