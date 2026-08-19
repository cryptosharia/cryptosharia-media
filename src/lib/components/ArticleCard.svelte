<script lang="ts">
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';

    let {
        post,
        href = `/artikel/${post.slug}`,
        label
    }: { post: Post; href?: string; label?: string } = $props();

    const sectionLabels = {
        news: 'Berita',
        education: 'Edukasi',
        research: 'Riset',
        activity: 'Aktivitas'
    } as const;
</script>

<a class="article-card" {href} aria-label={`Baca ${post.title}`}>
    <div class="article-card-media">
        {#if post.coverImage?.url}
            <img src={post.coverImage.url} alt="" loading="lazy" width={post.coverImage.width ?? 800} height={post.coverImage.height ?? 450} />
        {:else}
            <span class="sr-only">Tidak ada gambar sampul</span>
        {/if}
    </div>
    <div class="article-card-body">
        <span class="badge">{label || sectionLabels[post.section]}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div class="card-meta">
            <time datetime={post.publishedAt ?? post.createdAt}>{formatDate(post.publishedAt ?? post.createdAt)}</time>
        </div>
    </div>
</a>
