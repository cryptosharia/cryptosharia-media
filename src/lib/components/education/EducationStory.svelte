<script lang="ts">
    import EditorialMedia from '$lib/components/EditorialMedia.svelte';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';

    let {
        post,
        label,
        variant = 'row',
        headingLevel = 3,
        eager = false
    }: {
        post: Post;
        label: string;
        variant?: 'lead' | 'row' | 'archive';
        headingLevel?: 2 | 3;
        eager?: boolean;
    } = $props();

    const date = $derived(post.publishedAt ?? post.createdAt);
</script>

<article class={`education-story ${variant}`}>
    <a href={`/artikel/${post.slug}`} aria-label={`Pelajari ${post.title}`}>
        <div class="story-media">
            <EditorialMedia
                imageUrl={post.coverImage?.url}
                imageFilename={post.coverImage?.filename}
                imageAlt={`Sampul materi ${post.title}`}
                {label}
                width={post.coverImage?.width}
                height={post.coverImage?.height}
                {eager}
                compact={variant !== 'lead'}
            />
        </div>

        <div class="story-copy">
            <div class="story-meta">
                <span>{label}</span>
                <time datetime={date}>{formatDate(date)}</time>
            </div>
            {#if headingLevel === 2}
                <h2>{post.title}</h2>
            {:else}
                <h3>{post.title}</h3>
            {/if}
            {#if variant !== 'row'}
                <p>{post.excerpt}</p>
            {/if}
        </div>

    </a>
</article>

<style>
    .education-story { min-width: 0; }
    a { color: var(--text); }
    .story-media { overflow: hidden; border-radius: var(--radius); }
    .story-copy { min-width: 0; }
    .story-meta { display: flex; flex-wrap: wrap; gap: 7px 12px; align-items: center; color: var(--muted); font-size: .72rem; letter-spacing: .035em; text-transform: uppercase; }
    .story-meta span { color: var(--accent-text); font-weight: 700; }
    h2, h3 { margin: 0; font-weight: 650; letter-spacing: -.035em; transition: color 180ms ease; }
    a:hover h2, a:hover h3 { color: var(--accent-text); }
    .lead a { display: block; }
    .lead .story-copy { padding-top: 22px; }
    .lead h2 { max-width: 720px; margin-top: 10px; font-size: clamp(1.95rem, 3vw, 2.45rem); line-height: 1.15; text-wrap: balance; }
    .lead p { display: -webkit-box; max-width: 680px; margin: 14px 0 0; overflow: hidden; color: var(--muted); font-size: .95rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
    .row a { display: grid; grid-template-columns: 132px minmax(0, 1fr); gap: 18px; align-items: center; min-height: 132px; padding-block: 20px; border-bottom: 1px solid var(--border); }
    .row h2, .row h3 { display: -webkit-box; margin-top: 8px; overflow: hidden; font-size: clamp(1.05rem, 1.55vw, 1.22rem); line-height: 1.3; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
    .archive a { display: block; padding: 0 0 8px; border-radius: var(--radius-sm); transition: background var(--motion-micro) var(--ease-standard); }
    .archive .story-media { border-radius: 14px; }
    .archive .story-copy { padding: 16px 4px 0; }
    .archive h3 { display: -webkit-box; margin-top: 8px; overflow: hidden; font-size: clamp(1.1rem, 1.7vw, 1.28rem); line-height: 1.25; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
    .archive p { display: -webkit-box; margin: 9px 0 0; overflow: hidden; color: var(--muted); font-size: .88rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
    .archive a:hover { background: color-mix(in srgb, var(--surface-muted) 56%, transparent); }
    @media (max-width: 760px) { .lead .story-copy { padding-top: 18px; } .lead h2 { font-size: clamp(1.4rem, 6vw, 1.6rem); } .lead p { margin-top: 12px; font-size: .9rem; } .row a { grid-template-columns: 108px minmax(0, 1fr); gap: 14px; min-height: 124px; padding-block: 18px; } .row h2, .row h3 { margin-top: 6px; font-size: 1rem; line-height: 1.28; } .story-meta { gap: 5px 9px; font-size: .66rem; } }
    @media (max-width: 380px) { .row a { grid-template-columns: 88px minmax(0, 1fr); gap: 11px; min-height: 108px; padding-block: 16px; } .story-meta time { display: none; } .row h2, .row h3 { font-size: .94rem; } }
</style>
