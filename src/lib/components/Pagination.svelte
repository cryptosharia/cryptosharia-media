<script lang="ts">
    import type { Pagination } from '$types/api';

    let {
        pagination,
        buildHref
    }: { pagination: Pagination; buildHref: (page: number) => string } = $props();
</script>

{#if pagination.totalPages > 1}
    <nav class="pagination" aria-label="Paginasi">
        {#if pagination.page > 1}
            <a class="button button-secondary" href={buildHref(pagination.page - 1)}>← Sebelumnya</a>
        {:else}
            <span class="button button-secondary" aria-disabled="true">← Sebelumnya</span>
        {/if}
        <span>Halaman {pagination.page} dari {pagination.totalPages}</span>
        {#if pagination.page < pagination.totalPages}
            <a class="button button-secondary" href={buildHref(pagination.page + 1)}>Berikutnya →</a>
        {:else}
            <span class="button button-secondary" aria-disabled="true">Berikutnya →</span>
        {/if}
    </nav>
{/if}
