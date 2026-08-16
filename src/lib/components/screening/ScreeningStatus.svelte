<script lang="ts">
    import type { ShariaStatus } from '$types/api';
    let { status }: { status: ShariaStatus } = $props();
    const labels = { halal: 'Halal', syubhat: 'Syubhat', haram: 'Haram' } as const;
</script>

<span class={`screening-status ${status}`} aria-label={`Status screening: ${labels[status]}`}>{labels[status]}</span>

<style>
    .screening-status { display: inline-flex; width: fit-content; align-items: center; padding: 5px 9px; border: 1px solid currentColor; border-radius: 999px; font-size: .68rem; font-weight: 750; letter-spacing: .09em; line-height: 1; text-transform: uppercase; }
    .halal { color: var(--success); background: color-mix(in srgb, var(--success-bg) 68%, transparent); }
    .syubhat { color: var(--warning); background: color-mix(in srgb, var(--warning-bg) 68%, transparent); }
    .haram { color: var(--danger); background: color-mix(in srgb, var(--danger-bg) 68%, transparent); }
</style>
