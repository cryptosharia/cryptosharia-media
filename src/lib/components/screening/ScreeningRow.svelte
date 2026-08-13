<script lang="ts">
    import ScreeningStatus from '$lib/components/screening/ScreeningStatus.svelte';
    import { formatDate } from '$lib/format';
    import type { Token } from '$types/api';
    let { token }: { token: Token } = $props();
    const date = $derived(token.updatedAt ?? token.publishedAt ?? token.createdAt);
</script>

<a class="screening-row" href={`/screening/${token.slug}`} aria-label={`Lihat screening ${token.name}, status ${token.shariaStatus}`}>
    <span class="asset-identity">
        {#if token.logo?.url}<img src={token.logo.url} alt="" loading="lazy" width="38" height="38" />
        {:else}<span class="logo-fallback" aria-hidden="true">{token.ticker.slice(0, 3)}</span>{/if}
        <span><strong>{token.ticker}</strong><small>{token.name}</small></span>
    </span>
    <span class="status-cell"><ScreeningStatus status={token.shariaStatus} /></span>
    <time datetime={date}>{formatDate(date)}</time>
    <span class="row-arrow" aria-hidden="true">→</span>
</a>

<style>
    .screening-row { display: grid; grid-template-columns: minmax(250px, 1.6fr) minmax(120px, .72fr) minmax(150px, .72fr) 20px; gap: 24px; align-items: center; min-height: 82px; padding: 12px 10px; color: var(--text); border-bottom: 1px solid var(--border); transition: background 180ms ease; }
    .screening-row:hover { background: color-mix(in srgb, var(--surface-muted) 56%, transparent); }
    .asset-identity { display: flex; min-width: 0; align-items: center; gap: 13px; }
    img, .logo-fallback { width: 38px; height: 38px; flex: 0 0 auto; object-fit: contain; }
    .logo-fallback { display: grid; place-items: center; color: var(--muted); border: 1px solid var(--border); border-radius: 50%; background: var(--surface-muted); font-size: .62rem; font-weight: 750; }
    .asset-identity > span:last-child { display: grid; min-width: 0; gap: 1px; }
    strong { overflow: hidden; font-size: 1rem; letter-spacing: -.02em; text-overflow: ellipsis; white-space: nowrap; }
    small, time { overflow: hidden; color: var(--muted); font-size: .84rem; text-overflow: ellipsis; white-space: nowrap; }
    .row-arrow { color: var(--muted); transition: color 180ms ease, transform 180ms ease; }
    .screening-row:hover .row-arrow { color: var(--text); transform: translateX(3px); }
    .status-cell { display: inline-flex; }
    @media (max-width: 720px) { .screening-row { grid-template-columns: minmax(0, 1fr) auto 14px; gap: 12px; min-height: 72px; padding-block: 12px; } time { display: none; } img, .logo-fallback { width: 34px; height: 34px; } .status-cell { justify-self: end; } }
    @media (max-width: 380px) { .screening-row { gap: 9px; } .asset-identity { gap: 10px; } small { font-size: .78rem; } }
</style>
