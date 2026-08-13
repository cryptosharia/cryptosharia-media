<script lang="ts">
    import { formatDate } from '$lib/format';
    import type { Token } from '$types/api';

    let { token }: { token?: Token } = $props();

    const snapshotDate = $derived(token?.updatedAt ?? token?.publishedAt ?? token?.createdAt);
</script>

<section class="home-hero" aria-labelledby="home-title">
    <div class="container hero-layout">
        <div class="home-hero-copy">
            <p class="hero-kicker">Riset · Edukasi · Screening Aset Digital</p>
            <h1 id="home-title">Pahami dunia kripto dengan <span>perspektif syariah.</span></h1>
            <p class="hero-intro">
                Berita aktual, edukasi yang mudah dipahami, dan screening aset digital berdasarkan
                metodologi CryptoSharia—disajikan jernih untuk keputusan yang lebih bertanggung jawab.
            </p>
            <div class="hero-actions">
                <a class="hero-cta primary" href="/berita">Baca Berita</a>
                <a class="hero-cta secondary" href="/screening">Cek Screening Coin <span aria-hidden="true">→</span></a>
            </div>
        </div>

        <aside class="research-snapshot" aria-labelledby="snapshot-title">
            <img class="snapshot-watermark" src="/logo.png" alt="" width="96" height="96" />
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
                        <dt>Peringkat data</dt>
                        <dd>#{token.rank}</dd>
                    </div>
                </dl>
                <a class="snapshot-link" href={`/screening/${token.slug}`}>
                    Lihat analisis <span aria-hidden="true">→</span>
                </a>
            {:else}
                <div class="snapshot-empty">
                    <h2 id="snapshot-title">Basis riset aset digital</h2>
                    <p>Jelajahi hasil screening yang telah dipublikasikan CryptoSharia.</p>
                </div>
                <a class="snapshot-link" href="/screening">
                    Buka screening <span aria-hidden="true">→</span>
                </a>
            {/if}
        </aside>
    </div>
</section>

<style>
    .home-hero {
        padding-block: 96px 112px;
        background: var(--canvas);
    }

    .hero-layout {
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
        color: var(--accent-text);
    }

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
        transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
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
        background: var(--surface);
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
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
    }

    .snapshot-status.halal {
        color: var(--success);
        border-color: color-mix(in srgb, var(--success) 34%, var(--border));
    }

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
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
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
