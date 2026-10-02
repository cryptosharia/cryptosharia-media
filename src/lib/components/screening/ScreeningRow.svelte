<script lang="ts">
    import ScreeningStatus from '$lib/components/screening/ScreeningStatus.svelte';
    import type { Token } from '$types/api';
    let { token }: { token: Token } = $props();
</script>

<a class="screening-row" href={`/screening/${token.slug}`} aria-label={`Lihat screening ${token.name} ${token.ticker}, status ${token.shariaStatus}`}>
    <span class="card-head">
        {#if token.logo?.url}<img src={token.logo.url} alt="" loading="lazy" width="40" height="40" />
        {:else}<span class="logo-fallback" aria-hidden="true">{token.ticker.slice(0, 3)}</span>{/if}
        <span class="asset-identity"><strong>{token.name}</strong><small>{token.ticker}</small></span>
        <span class="status-cell"><ScreeningStatus status={token.shariaStatus} /></span>
    </span>
    <span class="excerpt">{token.excerpt}</span>
    <span class="card-action">Baca hasil screening <span aria-hidden="true">&rarr;</span></span>
</a>

<style>
    .screening-row{display:grid;min-width:0;gap:12px;padding:15px;color:var(--text);border:1px solid var(--border);border-radius:10px;background:var(--surface);transition:border-color 140ms ease,background 140ms ease}.screening-row:hover{border-color:var(--border-control);background:var(--surface-muted)}.card-head{display:flex;min-width:0;align-items:center;gap:10px}.card-head img,.logo-fallback{width:40px;height:40px;flex:0 0 40px;object-fit:contain;border-radius:50%;background:var(--surface-muted)}.logo-fallback{display:grid;place-items:center;color:var(--muted);border:1px solid var(--border);font-size:.62rem;font-weight:750}.asset-identity{display:grid;min-width:0;flex:1;gap:2px}.asset-identity strong{overflow:hidden;font-size:.93rem;line-height:1.2;letter-spacing:-.02em;text-overflow:ellipsis;white-space:nowrap}.asset-identity small{color:var(--muted);font-size:.72rem}.status-cell{flex:0 0 auto}.status-cell :global(.screening-status){padding:5px 8px;font-size:.64rem;letter-spacing:.04em}.excerpt{display:-webkit-box;min-height:2.5em;overflow:hidden;color:var(--muted);font-size:.78rem;line-height:1.45;line-clamp:2;-webkit-box-orient:vertical;-webkit-line-clamp:2}.card-action{display:flex;align-items:center;gap:6px;color:var(--accent-text);font-size:.76rem;font-weight:700}.card-action span{transition:transform 140ms ease}.screening-row:hover .card-action span{transform:translateX(3px)}
    @media(max-width:380px){.screening-row{padding:12px}.card-head{gap:8px}.card-head img,.logo-fallback{width:34px;height:34px;flex-basis:34px}.status-cell :global(.screening-status){padding-inline:7px;font-size:.62rem}}
    @media(prefers-reduced-motion:reduce){.screening-row,.card-action span{transition:none}}
</style>
