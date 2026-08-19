<script lang="ts">
    const focusAreas = [
        { title: 'Riset & Analisis', description: 'Konteks pasar yang terukur' },
        { title: 'Screening Syariah', description: 'Evaluasi berbasis prinsip' },
        { title: 'Edukasi Terstruktur', description: 'Belajar dengan fondasi jelas' },
        { title: 'Komunitas Muslim', description: 'Diskusi untuk bertumbuh bersama' }
    ];
</script>

<section class="trust-strip" aria-label="Fokus CryptoSharia">
    <div class="container">
        <ul>
            {#each focusAreas as area, index}
                <li>
                    <span class="capability-index">{String(index + 1).padStart(2, '0')}</span>
                    <span class="capability-copy"><strong>{area.title}</strong><small>{area.description}</small></span>
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    .trust-strip {
        border-top: 1px solid rgb(255 255 255 / 10%);
        color: #f1f0ec;
        background: #14171c;
    }

    ul {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: flex;
        min-width: 0;
        min-height: 76px;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        border-right: 1px solid rgb(255 255 255 / 8%);
        transition: background var(--motion-micro) var(--ease-standard);
    }

    li:first-child {
        padding-left: 0;
    }

    li:last-child {
        padding-right: 0;
        border-right: 0;
    }

    li:hover { background: rgb(255 255 255 / 4%); }

    .capability-index {
        color: var(--accent);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: .68rem;
        font-weight: 750;
    }

    .capability-copy { display: grid; gap: 3px; min-width: 0; }
    .capability-copy strong { font-size: .76rem; letter-spacing: .02em; }
    .capability-copy small { overflow: hidden; color: #aeb4be; font-size: .64rem; text-overflow: ellipsis; white-space: nowrap; }

    @media (max-width: 680px) {
        .trust-strip {
            display: none;
        }

        ul {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        li {
            min-height: 66px;
            padding: 10px 12px;
            border-bottom: 1px solid var(--border);
            font-size: 0.72rem;
        }

        li:first-child,
        li:nth-child(3) {
            padding-left: 0;
        }

        li:nth-child(2) {
            padding-right: 0;
            border-right: 0;
        }

        li:nth-last-child(-n + 2) {
            border-bottom: 0;
        }
    }

    @media (max-width: 360px) {
        li {
            gap: 7px;
            padding-inline: 8px;
            font-size: 0.68rem;
            letter-spacing: 0.02em;
        }

        li:first-child,
        li:nth-child(3) {
            padding-left: 0;
        }

        li:nth-child(2),
        li:last-child {
            padding-right: 0;
        }
    }
</style>
