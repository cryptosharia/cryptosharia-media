<script lang="ts">
    import { formatDate } from '$lib/format';
    import type { Token, TokenQuote } from '$types/api';

    let { token, quote }: { token?: Token; quote?: TokenQuote | null } = $props();

    const snapshotDate = $derived(token?.updatedAt ?? token?.publishedAt ?? token?.createdAt);

    function formatSupply(value: number | null | undefined, infinite = false) {
        if (infinite) return '∞';
        if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
        return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value);
    }

    function formatPercent(value: number | null | undefined) {
        if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
        return `${value.toFixed(2)}%`;
    }

</script>

<section class="home-hero" aria-labelledby="home-title">
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

        <a
            class="research-snapshot hero-enter hero-enter-card"
            href={token ? `/screening/${token.slug}` : '/screening'}
            aria-labelledby="snapshot-title"
        >
            <img class="snapshot-watermark" src="/logo.webp" alt="" width="96" height="96" />
            <div class="snapshot-heading">
                <p>Screening snapshot</p>
                <span>Research desk</span>
            </div>

            {#if token}
                <div class="snapshot-asset">
                    <div>
                        <p class="snapshot-ticker">{token.ticker}</p>
                        <h2 id="snapshot-title">{token.name}</h2>
                    </div>
                    <span class={`snapshot-status ${token.shariaStatus}`}>
                        <span class="status-dot" aria-hidden="true"></span>
                        {token.shariaStatus.toUpperCase()}
                    </span>
                </div>
                <dl class="snapshot-meta">
                    <div>
                        <dt>Diperbarui</dt>
                        <dd><time datetime={snapshotDate}>{formatDate(snapshotDate)}</time></dd>
                    </div>
                    <div>
                        <dt>Supply</dt>
                        <dd title="Supply beredar / supply maksimum">{formatSupply(quote?.circulatingSupply)} / {formatSupply(quote?.maxSupply, quote?.infiniteSupply)}</dd>
                    </div>
                    <div>
                        <dt>Dominasi pasar</dt>
                        <dd>{formatPercent(quote?.marketCapDominance)}</dd>
                    </div>
                </dl>
                <span class="snapshot-link">
                    Lihat analisis <span aria-hidden="true">→</span>
                </span>
            {:else}
                <div class="snapshot-empty">
                    <h2 id="snapshot-title">Basis riset aset digital</h2>
                    <p>Jelajahi hasil screening yang telah dipublikasikan CryptoSharia.</p>
                </div>
                <span class="snapshot-link">
                    Buka screening <span aria-hidden="true">→</span>
                </span>
            {/if}
        </a>
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
        grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.9fr);
        align-items: center;
        gap: clamp(48px, 7vw, 88px);
    }

    .home-hero-copy {
        max-width: 690px;
    }

    .hero-kicker,
    .snapshot-heading p {
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
    .hero-enter-card { animation-delay: 260ms; }

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

    .hero-cta.secondary span,
    .snapshot-link span {
        transition: transform 180ms ease;
    }

    .hero-cta.secondary:hover span,
    .snapshot-link:hover span {
        transform: translateX(3px);
    }

    .research-snapshot {
        position: relative;
        min-height: 376px;
        padding: 28px;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 10px;
        color: var(--text);
        background:
            linear-gradient(145deg, color-mix(in srgb, var(--accent) 4%, transparent), transparent 42%),
            var(--surface);
        box-shadow: var(--shadow-sm);
        transition: transform var(--motion-ui) var(--ease-out), border-color var(--motion-ui) var(--ease-standard), box-shadow var(--motion-ui) var(--ease-standard);
    }

    .research-snapshot:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--accent) 34%, var(--border)); box-shadow: 0 18px 42px rgb(20 24 31 / 12%), 0 0 0 1px rgb(255 140 0 / 7%); }

    .research-snapshot:focus-visible {
        outline-offset: 5px;
    }

    .snapshot-watermark {
        position: absolute;
        top: 50%;
        right: -12px;
        width: 104px;
        height: 104px;
        opacity: 0.055;
        transform: translateY(-50%);
    }

    .snapshot-heading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border);
    }

    .hero-enter-card .snapshot-heading { animation: divider-reveal 520ms var(--ease-out) 550ms both; }

    .snapshot-heading p {
        color: var(--text);
    }

    .snapshot-heading span {
        color: var(--muted);
        font-size: 0.76rem;
    }

    .snapshot-asset {
        position: relative;
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 24px;
        padding-block: 32px;
    }

    .snapshot-ticker {
        margin: 0;
        color: var(--text);
        font-size: clamp(2.7rem, 5vw, 3.6rem);
        font-weight: 700;
        letter-spacing: -0.065em;
        line-height: 0.95;
    }

    .snapshot-asset h2 {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 0.96rem;
        font-weight: 500;
    }

    .snapshot-status {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin-top: 2px;
        padding: 5px 8px;
        border: 1px solid var(--border);
        border-radius: 5px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
    }

    .status-dot {
        position: relative;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
    }

    .status-dot::after {
        position: absolute;
        inset: -4px;
        border: 1px solid currentColor;
        border-radius: inherit;
        content: '';
        opacity: 0;
    }

    .snapshot-status.halal {
        color: var(--success);
        border-color: color-mix(in srgb, var(--success) 34%, var(--border));
    }

    .hero-enter-card .snapshot-status { animation: status-enter 360ms var(--ease-out) 620ms both; }
    .hero-enter-card .status-dot::after { animation: status-pulse-once 720ms var(--ease-out) 900ms both; }

    .snapshot-status.syubhat {
        color: var(--warning);
        border-color: color-mix(in srgb, var(--warning) 34%, var(--border));
    }

    .snapshot-status.haram {
        color: var(--danger);
        border-color: color-mix(in srgb, var(--danger) 34%, var(--border));
    }

    .snapshot-meta {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 16px;
        row-gap: 18px;
        margin: 0;
        padding: 18px 0;
        border-block: 1px solid var(--border);
    }

    .snapshot-meta div {
        display: grid;
        gap: 3px;
    }

    .snapshot-meta dt {
        color: var(--muted);
        font-size: 0.7rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .snapshot-meta dd {
        margin: 0;
        font-size: 0.86rem;
        font-weight: 600;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .research-snapshot:hover .snapshot-meta dd,
    .research-snapshot:focus-visible .snapshot-meta dd {
        color: var(--accent-text);
    }

    .snapshot-link {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 22px;
        color: var(--text);
        font-size: 0.88rem;
        font-weight: 700;
    }

    .research-snapshot:hover .snapshot-link > span,
    .research-snapshot:focus-visible .snapshot-link > span {
        transform: translateX(3px);
    }

    @keyframes hero-enter { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes underline-sweep { to { transform: scaleX(1); } }
    @keyframes divider-reveal { from { opacity: 0; transform: scaleX(.1); transform-origin: left; } to { opacity: 1; transform: scaleX(1); } }
    @keyframes status-enter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes status-pulse-once {
        0% { opacity: 0; transform: scale(.65); }
        35% { opacity: .38; }
        100% { opacity: 0; transform: scale(1.55); }
    }

    .snapshot-empty {
        position: relative;
        min-height: 200px;
        padding-block: 32px;
    }

    .snapshot-empty h2 {
        max-width: 260px;
        margin: 0;
        font-size: 1.7rem;
        line-height: 1.15;
        letter-spacing: -0.035em;
    }

    .snapshot-empty p {
        max-width: 300px;
        margin: 16px 0 0;
        color: var(--muted);
    }

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

        .research-snapshot {
            width: min(620px, 100%);
            min-height: auto;
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

        .research-snapshot {
            padding: 22px;
        }

        .snapshot-asset {
            padding-block: 28px;
        }

        .snapshot-ticker {
            font-size: 2.75rem;
        }
    }

    @media (max-width: 480px) {
        .snapshot-meta {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .home-hero::before, .hero-enter, h1 span::after, .hero-enter-card .snapshot-heading, .hero-enter-card .snapshot-status, .hero-enter-card .status-dot::after { animation: none; }
        .hero-enter { opacity: 1; transform: none; }
        .research-snapshot:hover,
        .research-snapshot:focus-visible,
        .research-snapshot:hover .snapshot-link > span,
        .research-snapshot:focus-visible .snapshot-link > span,
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

        .snapshot-heading span {
            display: none;
        }
    }
</style>
