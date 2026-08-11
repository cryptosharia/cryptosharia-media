<script lang="ts">
    let {
        title,
        message,
        actionHref,
        actionLabel = 'Coba lagi'
    }: { title: string; message: string; actionHref?: string; actionLabel?: string } = $props();
</script>

<div class="state-card" role="status">
    <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {#if actionHref}
            <div class="button-row" style="justify-content:center">
                <a class="button button-secondary" href={actionHref}>{actionLabel}</a>
            </div>
        {/if}
    </div>
</div>
