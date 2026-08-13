<script lang="ts">
    let {
        imageUrl,
        imageFilename,
        imageAlt,
        label,
        width,
        height,
        eager = false,
        compact = false
    }: {
        imageUrl?: string | null;
        imageFilename?: string | null;
        imageAlt: string;
        label: string;
        width?: number | null;
        height?: number | null;
        eager?: boolean;
        compact?: boolean;
    } = $props();

    let imageFailed = $state(false);

    function isEditorialImage(url?: string | null, filename?: string | null) {
        if (!url) return false;

        const assetName = `${filename ?? ''} ${url.split('?')[0]}`.toLowerCase();
        return !/(^|[\s/_-])(logo|favicon)([.\s/_-]|$)/.test(assetName);
    }

    const showImage = $derived(isEditorialImage(imageUrl, imageFilename) && !imageFailed);
</script>

<div class:compact class="editorial-media">
    {#if showImage}
        <img
            src={imageUrl ?? ''}
            alt={imageAlt}
            loading={eager ? 'eager' : 'lazy'}
            width={width ?? 1200}
            height={height ?? 675}
            onerror={() => (imageFailed = true)}
        />
    {:else}
        <div class="editorial-fallback" role="img" aria-label={`Sampul editorial ${label}`}>
            <span class="fallback-mark">CS / Editorial</span>
            <span class="fallback-label">{label}</span>
            <span class="fallback-monogram" aria-hidden="true">CS</span>
        </div>
    {/if}
</div>

<style>
    .editorial-media {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: #15181e;
    }

    .editorial-media.compact {
        aspect-ratio: 3 / 2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 180ms ease;
    }

    .editorial-fallback {
        position: relative;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        padding: clamp(16px, 3vw, 28px);
        overflow: hidden;
        color: #f3f1ec;
        border: 1px solid #292e37;
        background: #15181e;
    }

    .editorial-fallback::before {
        position: absolute;
        top: 0;
        right: 18%;
        width: 1px;
        height: 100%;
        background: #343a44;
        content: '';
        transform: rotate(18deg) scaleY(1.4);
    }

    .editorial-fallback::after {
        position: absolute;
        right: 0;
        bottom: 22%;
        width: 38%;
        height: 3px;
        background: var(--accent);
        content: '';
    }

    .fallback-mark,
    .fallback-label {
        position: relative;
        z-index: 1;
    }

    .fallback-mark {
        color: #aeb4be;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    .fallback-label {
        max-width: 72%;
        font-size: clamp(0.86rem, 1.6vw, 1.05rem);
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    .fallback-monogram {
        position: absolute;
        right: -0.05em;
        bottom: -0.25em;
        color: rgb(243 241 236 / 5%);
        font-size: clamp(5rem, 13vw, 9rem);
        font-weight: 700;
        letter-spacing: -0.12em;
        line-height: 1;
    }

    .compact .editorial-fallback {
        padding: 12px;
    }

    .compact .fallback-mark {
        font-size: 0.56rem;
    }

    .compact .fallback-label {
        font-size: 0.72rem;
    }

    @media (hover: hover) {
        :global(a:hover) .editorial-media img {
            transform: scale(1.02);
        }
    }
</style>
