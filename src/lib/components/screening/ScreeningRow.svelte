<script lang="ts">
    import ScreeningStatus from '$lib/components/screening/ScreeningStatus.svelte';
    import type { Token } from '$types/api';
    let { token }: { token: Token } = $props();
</script>

<a class="screening-row" href={`/screening/${token.slug}`} aria-label={`Lihat screening ${token.name} ${token.ticker}, status ${token.shariaStatus}`}>
    {#if token.logo?.url}<img src={token.logo.url} alt="" loading="lazy" width="38" height="38" />
    {:else}<span class="logo-fallback" aria-hidden="true">{token.ticker.slice(0, 3)}</span>{/if}
    <span class="asset-identity"><strong>{token.ticker}</strong><small>{token.name}</small></span>
    <span class="status-cell"><ScreeningStatus status={token.shariaStatus} /></span>
</a>

<style>
    .screening-row { display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; grid-template-areas: 'logo identity status' 'logo identity status'; column-gap: 12px; min-height: 72px; align-content: center; padding: 14px; color: var(--text); border: 1px solid var(--border); border-radius: 8px; background: var(--surface); cursor: pointer; transition: background 180ms var(--ease-standard), border-color 180ms var(--ease-standard); }
    .screening-row:hover { border-color: var(--border-control); background: color-mix(in srgb, var(--surface-muted) 56%, var(--surface)); }
    .screening-row:focus-visible { outline-offset: 2px; }
    img, .logo-fallback { grid-area: logo; width: 38px; height: 38px; align-self: center; object-fit: contain; }
    .logo-fallback { display: grid; place-items: center; color: var(--muted); border: 1px solid var(--border); border-radius: 50%; background: var(--surface-muted); font-size: .62rem; font-weight: 750; }
    .asset-identity { display: grid; grid-area: identity; min-width: 0; gap: 0; align-self: center; }
    strong { overflow: hidden; font-size: 1rem; line-height: 1.2; letter-spacing: -.02em; text-overflow: ellipsis; white-space: nowrap; }
    small { overflow: hidden; color: var(--muted); font-size: .76rem; line-height: 1.3; text-overflow: ellipsis; white-space: nowrap; }
    .screening-row:hover strong { color: var(--accent-text); }
    .status-cell { display: inline-flex; grid-area: status; align-self: start; }
    @media (max-width: 440px) { .screening-row { grid-template-columns: 34px minmax(0, 1fr) auto; min-height: 64px; padding: 12px; } img, .logo-fallback { width: 34px; height: 34px; } }
    @media (max-width: 380px) { .screening-row { column-gap: 10px; } .status-cell :global(.screening-status) { padding-inline: 7px; font-size: .62rem; } }
</style>
