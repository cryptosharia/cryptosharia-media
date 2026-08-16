<script lang="ts">
    import EditorialMedia from '$lib/components/EditorialMedia.svelte';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';

    let {
        post,
        label,
        variant = 'archive',
        headingLevel = 3,
        eager = false
    }: {
        post: Post;
        label: string;
        variant?: 'featured' | 'archive';
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
                compact={variant === 'archive'}
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
            <p>{post.excerpt}</p>
            {#if variant === 'featured'}
                <span class="read-link">Pelajari <span aria-hidden="true">→</span></span>
            {/if}
        </div>

        {#if variant === 'archive'}
            <span class="story-arrow" aria-hidden="true">→</span>
        {/if}
    </a>
</article>

<style>
    .education-story { min-width: 0; }
    a { color: var(--text); }
    .story-media { overflow: hidden; border-radius: 9px; }
    .story-copy { min-width: 0; }
    .story-meta { display: flex; flex-wrap: wrap; gap: 7px 12px; align-items: center; color: var(--muted); font-size: .72rem; letter-spacing: .035em; text-transform: uppercase; }
    .story-meta span { color: var(--accent-text); font-weight: 700; }
    h2, h3 { margin: 0; font-weight: 650; letter-spacing: -.035em; transition: color 180ms ease; }
    a:hover h2, a:hover h3 { color: var(--accent-text); }
    .featured a { display: grid; grid-template-columns: minmax(0, .94fr) minmax(0, 1.06fr); gap: clamp(30px, 5vw, 64px); align-items: center; padding-bottom: 8px; }
    .featured h2 { max-width: 590px; margin-top: 11px; font-size: clamp(1.8rem, 2.75vw, 2.2rem); line-height: 1.14; text-wrap: balance; }
    .featured p { display: -webkit-box; max-width: 590px; margin: 15px 0 0; overflow: hidden; color: var(--muted); font-size: .96rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
    .read-link { display: inline-flex; gap: 8px; margin-top: 22px; padding-bottom: 3px; border-bottom: 1px solid var(--border-control); font-size: .84rem; font-weight: 700; }
    .read-link span, .story-arrow { transition: color 180ms ease, transform 180ms ease; }
    a:hover .read-link span, a:hover .story-arrow { color: var(--text); transform: translateX(3px); }
    .archive a { display: grid; grid-template-columns: 148px minmax(0, 1fr) 16px; gap: 18px; align-items: center; min-height: 166px; padding-block: 22px; border-bottom: 1px solid var(--border); }
    .archive h3 { display: -webkit-box; margin-top: 8px; overflow: hidden; font-size: 1.14rem; line-height: 1.3; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
    .archive p { display: -webkit-box; margin: 9px 0 0; overflow: hidden; color: var(--muted); font-size: .83rem; line-height: 1.52; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
    .story-arrow { color: var(--muted); }
    @media (max-width: 900px) { .featured a { grid-template-columns: 1fr; gap: 18px; } .featured h2 { font-size: clamp(1.5rem, 5vw, 1.9rem); } }
    @media (max-width: 760px) { .archive a { grid-template-columns: 108px minmax(0, 1fr) 14px; gap: 14px; min-height: 124px; padding-block: 18px; } .archive h3 { margin-top: 6px; font-size: 1rem; line-height: 1.28; -webkit-line-clamp: 3; line-clamp: 3; } .archive p { display: none; } .story-meta { gap: 5px 9px; font-size: .66rem; } }
    @media (max-width: 380px) { .archive a { grid-template-columns: minmax(0, 1fr) 92px; gap: 12px; min-height: 112px; } .archive .story-media { grid-column: 2; grid-row: 1; } .archive .story-copy { grid-column: 1; grid-row: 1; } .archive .story-arrow { display: none; } .archive h3 { font-size: .94rem; } .archive time { display: none; } }
</style>
