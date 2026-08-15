<script lang="ts">
    import StateMessage from '$lib/components/StateMessage.svelte';
    import type { Token } from '$types/api';
    import { reveal } from '$lib/actions/reveal';

    let { tokens, unavailable }: { tokens: Token[]; unavailable?: string | null } = $props();
</script>

<section class="screening-section" aria-labelledby="screening-pilihan">
    <div class="container">
        <div class="screening-shell" use:reveal>
            <header class="screening-header">
                <div>
                    <p class="section-label">Screening coin</p>
                    <h2 id="screening-pilihan">Cek status syariah aset kripto.</h2>
                </div>
                <p>
                    Temukan hasil screening dan pelajari dasar penilaian setiap aset yang telah ditinjau
                    CryptoSharia.
                </p>
            </header>

            {#if tokens.length}
                <div class="screening-table" aria-label="Ringkasan screening coin">
                    <div class="table-head" aria-hidden="true">
                        <span>Ticker</span>
                        <span>Aset digital</span>
                        <span>Status kajian</span>
                        <span aria-hidden="true"></span>
                    </div>
                    <div class="table-body">
                        {#each tokens as token (token.id)}
                            <a
                                class="screening-row"
                                use:reveal={{ delay: 110 + tokens.indexOf(token) * 65, distance: 14 }}
                                href={`/screening/${token.slug}`}
                                aria-label={`Lihat screening ${token.name}, status ${token.shariaStatus}`}
                            >
                                <strong>{token.ticker}</strong>
                                <span class="asset-name">{token.name}</span>
                                <span>
                                    <span class={`status-label ${token.shariaStatus}`}>
                                        <span class="status-dot" aria-hidden="true"></span>
                                        {token.shariaStatus.toUpperCase()}
                                    </span>
                                </span>
                                <span class="row-arrow" aria-hidden="true">→</span>
                            </a>
                        {/each}
                    </div>
                </div>

                <p class="screening-disclaimer">
                    Status merupakan hasil analisis berdasarkan metodologi CryptoSharia dan bukan fatwa.
                </p>
                <div class="screening-action">
                    <a href="/screening">Lihat Semua Screening <span aria-hidden="true">→</span></a>
                </div>
            {:else}
                <StateMessage
                    title="Data screening belum tersedia"
                    message={unavailable || 'Data screening akan segera ditambahkan.'}
                    actionHref="/screening"
                />
            {/if}
        </div>
    </div>
</section>

<style>
    .screening-section {
        padding-block: 112px;
        background: var(--canvas);
    }

    .screening-shell {
        padding: clamp(28px, 5vw, 56px);
        border: 1px solid var(--border);
        border-radius: 10px;
        background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 5%, transparent), transparent 34%), var(--surface);
        box-shadow: var(--shadow-sm);
    }

    .screening-header {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
        align-items: end;
        gap: 48px;
        padding-bottom: 40px;
    }

    .section-label {
        margin: 0 0 12px;
        color: var(--accent-text);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    }

    h2 {
        max-width: 660px;
        margin: 0;
        font-size: clamp(2rem, 3.4vw, 2.75rem);
        line-height: 1.1;
        letter-spacing: -0.045em;
        text-wrap: balance;
    }

    .screening-header > p {
        margin: 0;
        color: var(--muted);
        line-height: 1.65;
    }

    .screening-table {
        border-top: 1px solid var(--border-control);
    }

    .table-head,
    .screening-row {
        display: grid;
        grid-template-columns: minmax(110px, 0.75fr) minmax(200px, 1.6fr) minmax(140px, 0.8fr) 24px;
        align-items: center;
        gap: 24px;
    }

    .table-head {
        min-height: 48px;
        color: var(--muted);
        border-bottom: 1px solid var(--border);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .screening-row {
        min-height: 76px;
        border-bottom: 1px solid var(--border);
        transition: background var(--motion-micro) var(--ease-standard), color var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard);
    }

    .screening-row:hover, .screening-row:focus-visible {
        background: color-mix(in srgb, var(--surface-muted) 56%, transparent);
        border-bottom-color: var(--border-control);
    }

    .screening-row:hover strong, .screening-row:focus-visible strong { color: var(--accent-text); }

    .screening-row strong {
        font-size: 1rem;
        letter-spacing: -0.02em;
    }

    .asset-name {
        color: var(--muted);
    }

    .status-label {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        gap: 7px;
        padding: 5px 8px;
        border: 1px solid var(--border);
        border-radius: 5px;
        font-size: 0.68rem;
        font-weight: 700;
        transition: background var(--motion-micro) var(--ease-standard), border-color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
        letter-spacing: 0.08em;
    }

    .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
    }

    .status-label.halal {
        color: var(--success);
        border-color: color-mix(in srgb, var(--success) 34%, var(--border));
    }

    .screening-row:hover .status-label, .screening-row:focus-visible .status-label { transform: translateY(-1px); background: color-mix(in srgb, currentColor 10%, var(--surface)); }

    .status-label.syubhat {
        color: var(--warning);
        border-color: color-mix(in srgb, var(--warning) 34%, var(--border));
    }

    .status-label.haram {
        color: var(--danger);
        border-color: color-mix(in srgb, var(--danger) 34%, var(--border));
    }

    .row-arrow {
        color: var(--muted);
        transition: color 180ms ease, transform 180ms ease;
    }

    .screening-row:hover .row-arrow {
        color: var(--text);
        transform: translateX(3px);
    }

    .screening-action {
        display: flex;
        justify-content: flex-end;
        padding-top: 28px;
    }

    .screening-disclaimer {
        max-width: 680px;
        margin: 18px 0 0;
        color: var(--muted);
        font-size: 0.78rem;
        line-height: 1.55;
    }

    .screening-action a {
        display: inline-flex;
        min-height: 44px;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        color: #17130e;
        border-radius: 7px;
        background: var(--accent);
        font-size: 0.86rem;
        font-weight: 700;
        transition: transform var(--motion-micro) var(--ease-standard), box-shadow var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard);
    }

    .screening-action a span {
        transition: transform 180ms ease;
    }

    .screening-action a:hover span {
        transform: translateX(3px);
    }

    .screening-action a:hover { transform: translateY(-1px); background: var(--accent-hover); box-shadow: 0 8px 18px rgb(255 140 0 / 18%); }

    @media (max-width: 760px) {
        .screening-section {
            padding-block: 80px;
        }

        .screening-shell {
            padding: 24px 20px;
        }

        .screening-header {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 32px;
        }

        .table-head {
            display: none;
        }

        .screening-table {
            border-top-color: var(--border-control);
        }

        .screening-row {
            grid-template-columns: minmax(0, 1fr) auto 16px;
            gap: 12px;
            min-height: 86px;
            padding-block: 16px;
        }

        .screening-row strong {
            grid-column: 1;
            grid-row: 1;
        }

        .asset-name {
            grid-column: 1;
            grid-row: 2;
            font-size: 0.86rem;
        }

        .screening-row > span:nth-child(3) {
            grid-column: 2;
            grid-row: 1 / span 2;
        }

        .row-arrow {
            grid-column: 3;
            grid-row: 1 / span 2;
        }

        .screening-action {
            justify-content: flex-start;
        }
    }

    @media (max-width: 380px) {
        .status-label {
            gap: 5px;
            padding-inline: 6px;
            font-size: 0.62rem;
        }
    }
</style>
