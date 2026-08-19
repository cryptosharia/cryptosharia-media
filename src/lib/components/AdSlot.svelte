<script lang="ts">
    import { dev } from '$app/environment';
    import { env } from '$env/dynamic/public';
    import { AD_PLACEMENTS, type AdPlacement } from '$lib/config/ads';

    let { placement }: { placement: AdPlacement } = $props();
    const config = $derived(AD_PLACEMENTS[placement]);
    const showPlaceholder = $derived(!config.enabled && (dev || env.PUBLIC_SHOW_AD_PLACEHOLDERS === 'true'));
</script>

{#if config.enabled || showPlaceholder}
    <aside class={`ad-slot ${config.format}`} data-ad-placement={placement} aria-label="Iklan">
        <span class="ad-label">Iklan</span>
        {#if showPlaceholder}
            <div class="ad-placeholder" aria-hidden="true">Advertising placement</div>
        {/if}
    </aside>
{/if}

<style>
    .ad-slot { width: min(100% - 32px, 100%); margin-inline: auto; }
    .ad-label { display: block; margin-bottom: 8px; color: var(--muted); font-size: .64rem; font-weight: 700; letter-spacing: .16em; text-align: center; text-transform: uppercase; }
    .ad-placeholder { display: grid; width: 100%; place-items: center; color: var(--muted); border: 1px dashed var(--border-control); background: color-mix(in srgb, var(--surface-muted) 45%, transparent); font-size: .72rem; letter-spacing: .04em; }
    .leaderboard { max-width: 970px; }
    .leaderboard .ad-placeholder { min-height: 90px; }
    .billboard { max-width: 970px; }
    .billboard .ad-placeholder { min-height: 90px; }
    .rectangle { max-width: 340px; }
    .rectangle .ad-placeholder { min-height: 250px; }
    .inline { max-width: 720px; margin-block: 44px; }
    .inline .ad-placeholder { min-height: 120px; }
    [data-ad-placement='homepage-top'] { margin-top: 56px; }
    [data-ad-placement='homepage-middle'] { margin-top: 72px; }
    [data-ad-placement='article-sidebar'] { margin-top: 36px; }
    @media (max-width: 600px) { .leaderboard .ad-placeholder, .billboard .ad-placeholder { min-height: 80px; } .inline { margin-block: 36px; } }
</style>
