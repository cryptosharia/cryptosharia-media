<script lang="ts">
    import type { Token } from '$types/api';

    let { token, href = `/screening/${token.slug}` }: { token: Token; href?: string } = $props();
</script>

<a class="token-card" {href} aria-label={`Lihat screening ${token.name}`}>
    {#if token.logo?.url}
        <img src={token.logo.url} alt="" loading="lazy" width="46" height="46" />
    {:else}
        <span class="token-logo-fallback" aria-hidden="true">{token.ticker.slice(0, 3)}</span>
    {/if}
    <div class="token-info">
        <div class="token-ticker">{token.ticker}</div>
        <div class="token-name">{token.name}</div>
    </div>
    <span class={`token-status ${token.shariaStatus}`}>{token.shariaStatus}</span>
</a>
