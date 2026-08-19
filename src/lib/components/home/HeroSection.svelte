<script lang="ts">
    import MarketTicker from '$lib/components/home/MarketTicker.svelte';
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
                <a class="hero-cta primary" href="/screening">Cek Screening Coin</a>
                <a class="hero-cta secondary" href="/berita">Baca Berita <span aria-hidden="true">→</span></a>
            </div>
        </div>

    </div>
</section>

<style>
    .home-hero {
        position: relative;
        padding-block: 96px 112px;
        overflow: clip;
        background: var(--canvas);
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
            linear-gradient(color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: linear-gradient(90deg, transparent 30%, black 70%, transparent);
        opacity: .16;
        content: '';
    }

    .hero-layout {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: clamp(48px, 7vw, 88px);
    }

    .home-hero-copy {
        max-width: 690px;
    }

    .hero-kicker {
        margin: 0;
        color: var(--muted);
        font-size: 0.73rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    h1 {
        margin: 20px 0 0;
        font-size: clamp(3.5rem, 5.1vw, 4rem);
        line-height: 1.02;
        letter-spacing: -0.055em;
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
        color: var(--muted);
        font-size: 1.1rem;
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
        color: var(--text);
        border-color: var(--border-control);
        background: transparent;
    }

    .hero-cta.secondary:hover {
        border-color: var(--text);
    }

    .hero-cta.secondary span {
        transition: transform 180ms ease;
    }

    .hero-cta.secondary:hover span {
        transform: translateX(3px);
    }

    @keyframes hero-enter { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes underline-sweep { to { transform: scaleX(1); } }

    @media (max-width: 900px) {
        .home-hero {
            padding-block: 80px 96px;
        }

        .hero-layout {
            grid-template-columns: 1fr;
            gap: 48px;
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
            padding-block: 64px 80px;
        }

        .hero-layout {
            gap: 40px;
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
