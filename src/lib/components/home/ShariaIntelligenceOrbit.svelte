<script lang="ts">
    const nodes = [
        { label: 'Utility', className: 'utility' },
        { label: 'Tokenomics', className: 'tokenomics' },
        { label: 'Business model', className: 'business' },
        { label: 'Gharar review', className: 'gharar' }
    ];
</script>

<aside class="intelligence-orbit" aria-label="Kerangka screening syariah CryptoSharia">
    <div class="orbit-grid" aria-hidden="true"></div>
    <p class="orbit-kicker">Sharia intelligence</p>
    <div class="orbit-stage" aria-hidden="true">
        <span class="orbit orbit-one"></span>
        <span class="orbit orbit-two"></span>
        {#each nodes as node}
            <span class={`orbit-node ${node.className}`}>{node.label}</span>
        {/each}
        <div class="orbit-core">
            <strong>CS</strong>
            <span>Screening</span>
        </div>
    </div>
    <div class="framework-card">
        <p>Screening framework</p>
        <ul>
            <li>Business activity</li>
            <li>Token structure</li>
            <li>Financial & utility review</li>
        </ul>
        <a href="/screening">Lihat metodologi <span aria-hidden="true">→</span></a>
    </div>
</aside>

<style>
    .intelligence-orbit {
        position: relative;
        min-height: 400px;
        overflow: hidden;
        border: 1px solid rgb(255 255 255 / 11%);
        border-radius: var(--radius);
        background: linear-gradient(140deg, rgb(255 140 0 / 10%), transparent 38%), #14171c;
        box-shadow: inset 0 1px rgb(255 255 255 / 4%);
    }

    .orbit-grid {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 4%) 1px, transparent 1px);
        background-size: 32px 32px;
        mask-image: radial-gradient(circle at 55% 46%, black 10%, transparent 72%);
    }

    .orbit-kicker {
        position: absolute;
        top: 24px;
        left: 26px;
        margin: 0;
        color: #d3d8e1;
        font-size: .68rem;
        font-weight: 750;
        letter-spacing: .14em;
        text-transform: uppercase;
    }

    .orbit-stage { position: absolute; inset: 42px 0 105px; }
    .orbit { position: absolute; border: 1px solid rgb(255 140 0 / 19%); border-radius: 50%; }
    .orbit-one { top: 50%; left: 50%; width: 236px; aspect-ratio: 1; transform: translate(-50%, -50%) rotate(-16deg) scaleY(.56); }
    .orbit-two { top: 50%; left: 50%; width: 316px; aspect-ratio: 1; border-color: rgb(255 255 255 / 10%); transform: translate(-50%, -50%) rotate(34deg) scaleY(.42); }

    .orbit-core {
        position: absolute;
        top: 50%; left: 50%;
        display: grid;
        width: 92px;
        aspect-ratio: 1;
        place-content: center;
        gap: 2px;
        border: 1px solid rgb(255 140 0 / 58%);
        border-radius: 50%;
        color: #14171c;
        background: var(--accent);
        box-shadow: 0 0 0 8px rgb(255 140 0 / 8%), 0 16px 34px rgb(0 0 0 / 32%);
        text-align: center;
        transform: translate(-50%, -50%);
    }

    .orbit-core strong { font-size: 1.35rem; line-height: 1; letter-spacing: -.06em; }
    .orbit-core span { font-size: .58rem; font-weight: 750; letter-spacing: .05em; text-transform: uppercase; }
    .orbit-node { position: absolute; padding: 6px 8px; color: #d3d8e1; border: 1px solid rgb(255 255 255 / 12%); border-radius: 5px; background: #1a1e25; font-size: .64rem; font-weight: 650; box-shadow: 0 8px 18px rgb(0 0 0 / 17%); white-space: nowrap; }
    .orbit-node::before { display: inline-block; width: 5px; height: 5px; margin-right: 6px; border-radius: 50%; background: var(--accent); content: ''; vertical-align: middle; }
    .utility { top: 51%; left: 8%; } .tokenomics { top: 15%; left: 48%; transform: translateX(-50%); } .business { right: 7%; bottom: 15%; } .gharar { top: 42%; right: 7%; }

    .framework-card {
        position: absolute;
        right: 18px;
        bottom: 18px;
        left: 18px;
        padding: 14px 16px;
        border: 1px solid rgb(255 255 255 / 11%);
        border-radius: var(--radius-sm);
        background: rgb(12 14 18 / 91%);
        box-shadow: 0 12px 24px rgb(0 0 0 / 22%);
    }

    .framework-card p { margin: 0; color: #f1f0ec; font-size: .68rem; font-weight: 750; letter-spacing: .11em; text-transform: uppercase; }
    .framework-card ul { display: flex; flex-wrap: wrap; gap: 5px 13px; margin: 10px 0; padding: 0; color: #aeb4be; font-size: .68rem; list-style: none; }
    .framework-card li::before { margin-right: 5px; color: #62d49a; content: '•'; }
    .framework-card a { display: inline-flex; gap: 7px; color: #f1f0ec; border-bottom: 1px solid rgb(255 255 255 / 24%); font-size: .72rem; font-weight: 700; }
    .framework-card a span { transition: transform var(--motion-micro) var(--ease-standard); }
    .framework-card a:hover span, .framework-card a:focus-visible span { transform: translateX(3px); }

    @media (max-width: 600px) {
        .intelligence-orbit { min-height: 360px; }
        .orbit-stage { inset: 34px 0 100px; }
        .orbit-one { width: 190px; } .orbit-two { width: 260px; }
        .orbit-core { width: 78px; }
        .orbit-node { font-size: .58rem; } .utility { left: 4%; } .gharar { right: 3%; } .business { right: 4%; }
    }

    @media (prefers-reduced-motion: reduce) { .framework-card a:hover span, .framework-card a:focus-visible span { transform: none; } }
</style>
