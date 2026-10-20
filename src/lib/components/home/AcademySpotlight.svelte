<script lang="ts">
    import { reveal } from '$lib/actions/reveal';
    import { ACADEMY_URLS } from '$lib/config';

    const subjects = [
        {
            title: 'Analisis Fundamental',
            note: 'Karakter dan konteks nilai aset digital.',
            icon: 'fundamental'
        },
        {
            title: 'Analisis Teknikal',
            note: 'Data pasar dan pergerakan harga.',
            icon: 'technical'
        },
        {
            title: 'Fikih Muamalah',
            note: 'Prinsip muamalah dalam aset digital.',
            icon: 'muamalah'
        },
        {
            title: 'Web3 & Blockchain',
            note: 'Teknologi blockchain dan ekosistem Web3.',
            icon: 'web3'
        }
    ] as const;
</script>

<section class="academy-spotlight" aria-labelledby="academy-spotlight-title">
    <div class="container academy-layout">
        <div class="academy-copy" use:reveal>
            <p class="section-label">CryptoSharia Academy</p>
            <h2 id="academy-spotlight-title">Belajar kripto secara terarah, dari dasar hingga perspektif syariah.</h2>
            <p class="academy-description">
                Kenali kurikulum pembelajaran mandiri yang menghubungkan pemahaman teknologi, analisis aset,
                dan fikih muamalah.
            </p>
            <p class="academy-preview-note">Pratinjau katalog menunjukkan materi yang telah diterbitkan; bidang dan level lain mengikuti status kurikulumnya.</p>
            <a class="academy-preview-cta" href={ACADEMY_URLS.catalog} target="_blank" rel="noopener noreferrer">
                Lihat Pratinjau Kurikulum <span aria-hidden="true">↗</span>
            </a>
        </div>

        <div class="academy-subject-grid" aria-label="Empat bidang kurikulum Academy">
            {#each subjects as subject, index (subject.title)}
                <a
                    class="academy-subject-card"
                    href={ACADEMY_URLS.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat pratinjau kurikulum ${subject.title} di tab baru`}
                    use:reveal={{ delay: index * 70, distance: 12 }}
                >
                    <span class="subject-icon" aria-hidden="true">
                        {#if subject.icon === 'fundamental'}
                            <svg viewBox="0 0 24 24"><path d="M4 19h16M6 16l4-5 3 2 5-7" /><circle cx="18" cy="6" r="1.5" /></svg>
                        {:else if subject.icon === 'technical'}
                            <svg viewBox="0 0 24 24"><path d="M5 4v16M12 4v16M19 4v16M3 8h4m3 6h4m3-5h4" /></svg>
                        {:else if subject.icon === 'muamalah'}
                            <svg viewBox="0 0 24 24"><path d="M12 3 20 7v5c0 4.5-3.2 7.4-8 9-4.8-1.6-8-4.5-8-9V7l8-4Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>
                        {:else}
                            <svg viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.6 8-4.6M12 12v9" /></svg>
                        {/if}
                    </span>
                    <span class="subject-copy">
                        <strong>{subject.title}</strong>
                        <small>{subject.note}</small>
                    </span>
                    <span class="subject-arrow" aria-hidden="true">↗</span>
                </a>
            {/each}
        </div>
    </div>
</section>

<style>
    .academy-spotlight {
        padding-block: clamp(72px, 9vw, 112px);
        overflow: clip;
        border-block: 1px solid var(--border);
        background: var(--surface);
    }

    .academy-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.02fr) minmax(0, .98fr);
        align-items: center;
        gap: clamp(36px, 6vw, 80px);
    }

    .academy-copy { max-width: 600px; }

    .section-label {
        margin: 0 0 14px;
        color: var(--accent-text);
        font-size: .7rem;
        font-weight: 750;
        letter-spacing: .16em;
        text-transform: uppercase;
    }

    h2 {
        margin: 0;
        font-size: clamp(2rem, 3.5vw, 2.8rem);
        line-height: 1.1;
        letter-spacing: -.045em;
        text-wrap: balance;
    }

    .academy-description {
        max-width: 560px;
        margin: 18px 0 0;
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.68;
    }

    .academy-preview-note {
        max-width: 560px;
        margin: 13px 0 0;
        color: var(--muted);
        font-size: .78rem;
        line-height: 1.55;
    }

    .academy-preview-cta {
        display: inline-flex;
        min-height: 46px;
        align-items: center;
        justify-content: center;
        gap: 9px;
        margin-top: 26px;
        padding: 10px 16px;
        color: #17130e;
        border: 1px solid var(--accent);
        border-radius: 8px;
        background: var(--accent);
        font-size: .88rem;
        font-weight: 750;
        transition: background var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .academy-preview-cta:hover,
    .academy-preview-cta:focus-visible { background: var(--accent-hover); transform: translateY(-1px); }

    .academy-subject-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }

    .academy-subject-card {
        display: grid;
        min-width: 0;
        min-height: 150px;
        grid-template-columns: 40px minmax(0, 1fr) 18px;
        align-content: start;
        align-items: center;
        gap: 14px;
        padding: 20px 18px;
        color: var(--text);
        border: 1px solid var(--border);
        border-radius: 10px;
        background: color-mix(in srgb, var(--surface-muted) 46%, var(--surface));
        transition: border-color var(--motion-micro) var(--ease-standard), background var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .academy-subject-card:hover,
    .academy-subject-card:focus-visible {
        border-color: color-mix(in srgb, var(--accent) 65%, var(--border));
        background: var(--surface-selected);
        transform: translateY(-2px);
    }

    .academy-subject-card:focus-visible { outline: 2px solid var(--accent-text); outline-offset: 3px; }

    .subject-icon {
        display: grid;
        width: 40px;
        height: 40px;
        grid-row: span 2;
        place-items: center;
        color: var(--accent-text);
        border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
        border-radius: 9px;
        background: color-mix(in srgb, var(--accent) 8%, var(--surface));
    }

    .subject-icon svg { width: 21px; height: 21px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.55; }
    .subject-copy { display: grid; min-width: 0; gap: 7px; }
    .subject-copy strong { font-size: .93rem; line-height: 1.3; letter-spacing: -.015em; }
    .subject-copy small { color: var(--muted); font-size: .78rem; line-height: 1.5; }
    .subject-arrow { align-self: start; color: var(--muted); font-size: .85rem; transition: color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard); }
    .academy-subject-card:hover .subject-arrow,
    .academy-subject-card:focus-visible .subject-arrow { color: var(--accent-text); transform: translate(2px, -2px); }

    @media (max-width: 900px) {
        .academy-layout { grid-template-columns: 1fr; gap: 32px; }
        .academy-copy { max-width: 720px; }
    }

    @media (max-width: 600px) {
        .academy-spotlight { padding-block: 64px 72px; }
        .academy-layout { gap: 28px; }
        h2 { font-size: clamp(1.9rem, 8.5vw, 2.35rem); }
        .academy-description { margin-top: 14px; font-size: .94rem; }
        .academy-preview-cta { width: 100%; margin-top: 22px; }
        .academy-subject-grid { gap: 10px; }
        .academy-subject-card { min-height: 142px; grid-template-columns: 32px minmax(0, 1fr) 14px; gap: 10px; padding: 15px 12px; }
        .subject-icon { width: 32px; height: 32px; border-radius: 8px; }
        .subject-icon svg { width: 18px; height: 18px; }
        .subject-copy strong { font-size: .82rem; }
        .subject-copy small { font-size: .7rem; }
    }

    @media (max-width: 390px) {
        .academy-subject-grid { grid-template-columns: 1fr; }
        .academy-subject-card { min-height: 100px; grid-template-columns: 36px minmax(0, 1fr) 16px; padding: 16px; }
        .subject-icon { width: 36px; height: 36px; }
        .subject-copy strong { font-size: .9rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .academy-preview-cta:hover,
        .academy-preview-cta:focus-visible,
        .academy-subject-card:hover,
        .academy-subject-card:focus-visible { transform: none; }
    }
</style>
