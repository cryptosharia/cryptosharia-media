<script lang="ts">
    import { ACADEMY_URLS } from '$lib/config';

    const focusAreas = [
        { title: 'Riset & Analisis', description: 'Konteks pasar yang terukur' },
        { title: 'Screening Syariah', description: 'Evaluasi berbasis prinsip' },
        { title: 'Edukasi Terstruktur', description: 'Belajar dengan fondasi jelas', href: ACADEMY_URLS.catalog },
        { title: 'Komunitas Muslim', description: 'Diskusi untuk bertumbuh bersama' }
    ];
</script>

<section class="trust-strip" aria-label="Fokus CryptoSharia">
    <div class="container">
        <ul>
            {#each focusAreas as area, index}
                <li class:linked={area.href}>
                    {#if area.href}
                        <a class="capability-item capability-link" href={area.href} target="_blank" rel="noopener noreferrer" aria-label="Edukasi Terstruktur, jelajahi Academy di tab baru">
                            <span class="capability-index">{String(index + 1).padStart(2, '0')}</span>
                            <span class="capability-copy"><strong>{area.title}</strong><small>{area.description}</small></span>
                        </a>
                    {:else}
                        <div class="capability-item">
                            <span class="capability-index">{String(index + 1).padStart(2, '0')}</span>
                            <span class="capability-copy"><strong>{area.title}</strong><small>{area.description}</small></span>
                        </div>
                    {/if}
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
        min-width: 0;
        border-right: 1px solid rgb(255 255 255 / 8%);
    }

    li:first-child {
        padding-left: 0;
    }

    li:last-child {
        padding-right: 0;
        border-right: 0;
    }

    .capability-item {
        display: flex;
        width: 100%;
        min-height: 76px;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        color: inherit;
        text-decoration: none;
        transition: background var(--motion-micro) var(--ease-standard), color var(--motion-micro) var(--ease-standard);
    }

    .capability-link:hover,
    .capability-link:focus-visible {
        color: #fff;
        background: rgb(255 255 255 / 6%);
    }

    .capability-link:focus-visible {
        position: relative;
        z-index: 1;
        outline: 2px solid var(--accent);
        outline-offset: -3px;
    }

    li:first-child .capability-item { padding-left: 0; }
    li:last-child .capability-item { padding-right: 0; }

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
        ul {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        li {
            border-bottom: 1px solid var(--border);
            font-size: 0.72rem;
        }

        li:nth-child(even) {
            border-right: 0;
        }

        .capability-item { min-height: 66px; padding: 10px 12px; }
        li:nth-child(odd) .capability-item { padding-left: 0; }
        li:nth-child(even) .capability-item { padding-right: 0; }

        li:nth-last-child(-n + 2) {
            border-bottom: 0;
        }
    }

    @media (max-width: 360px) {
        li {
            font-size: 0.68rem;
            letter-spacing: 0.02em;
        }

        .capability-item { gap: 7px; padding-inline: 8px; }
    }
</style>
