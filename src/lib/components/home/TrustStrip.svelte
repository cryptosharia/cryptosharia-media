<script lang="ts">
    const focusAreas = [
        'Riset & Analisis',
        'Screening Syariah',
        'Edukasi Terstruktur',
        'Komunitas Muslim'
    ];
</script>

<section class="trust-strip" aria-label="Fokus CryptoSharia">
    <div class="container">
        <ul>
            {#each focusAreas as area}
                <li><span aria-hidden="true"></span>{area}</li>
            {/each}
        </ul>
    </div>
</section>

<style>
    .trust-strip {
        border-top: 1px solid var(--border);
        background: var(--surface);
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
        min-height: 62px;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        color: var(--muted);
        border-right: 1px solid var(--border);
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.04em;
    }

    li:first-child {
        padding-left: 0;
    }

    li:last-child {
        padding-right: 0;
        border-right: 0;
    }

    li span {
        width: 6px;
        height: 6px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: var(--accent);
    }

    @media (max-width: 680px) {
        ul {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        li {
            min-height: 54px;
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
