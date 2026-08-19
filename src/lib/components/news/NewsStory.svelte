<script lang="ts">
    import EditorialMedia from '$lib/components/EditorialMedia.svelte';
    import { formatDate } from '$lib/format';
    import type { Post } from '$types/api';

    let {
        post,
        label,
        variant = 'row',
        headingLevel = 2,
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

<article class={`news-story ${variant}`}>
    <a class="story-link" href={`/artikel/${post.slug}`} aria-label={`Baca ${post.title}`}>
        <div class="story-media">
            <EditorialMedia
                imageUrl={post.coverImage?.url}
                imageFilename={post.coverImage?.filename}
                imageAlt={`Sampul artikel ${post.title}`}
                {label}
                width={post.coverImage?.width}
                height={post.coverImage?.height}
                {eager}
                compact={variant !== 'lead'}
            />
        </div>

        <div class="story-copy">
            <div class="story-meta">
                <span class="story-category">{label}</span>
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
    .news-story {
        min-width: 0;
    }

    .story-link {
        color: var(--text);
    }

    .story-media {
        overflow: hidden;
        border-radius: var(--radius);
    }

    .story-copy {
        min-width: 0;
    }

    .story-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px 12px;
        color: var(--muted);
        font-size: 0.72rem;
        letter-spacing: 0.035em;
        text-transform: uppercase;
    }

    .story-category {
        color: var(--accent-text);
        font-weight: 700;
    }

    h2,
    h3 {
        margin: 0;
        font-weight: 650;
        letter-spacing: -0.035em;
        transition: color 180ms ease;
    }

    .story-link:hover h2,
    .story-link:hover h3 {
        color: var(--accent-text);
    }

    .lead .story-link {
        display: block;
    }

    .lead .story-copy {
        padding-top: 22px;
    }

    .lead h2,
    .lead h3 {
        max-width: 720px;
        margin-top: 10px;
        font-size: clamp(1.95rem, 3vw, 2.45rem);
        line-height: 1.15;
        text-wrap: balance;
    }

    .lead p {
        display: -webkit-box;
        max-width: 680px;
        margin: 14px 0 0;
        overflow: hidden;
        color: var(--muted);
        font-size: 0.95rem;
        line-height: 1.65;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    .row .story-link {
        display: grid;
        align-items: center;
        grid-template-columns: 148px minmax(0, 1fr);
        gap: 18px;
        min-height: 132px;
        padding-block: 20px;
        border-bottom: 1px solid var(--border);
    }

    .row h2,
    .row h3 {
        display: -webkit-box;
        margin-top: 8px;
        overflow: hidden;
        font-size: clamp(1.05rem, 1.55vw, 1.22rem);
        line-height: 1.3;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }

    .archive .story-link {
        display: block;
        padding: 0 0 8px;
        border-radius: var(--radius-sm);
        transition: background var(--motion-micro) var(--ease-standard);
    }

    .archive .story-copy {
        padding: 16px 4px 0;
    }

    .archive .story-media {
        border-radius: 14px;
    }

    .archive h2,
    .archive h3 {
        display: -webkit-box;
        margin-top: 8px;
        overflow: hidden;
        font-size: clamp(1.1rem, 1.7vw, 1.28rem);
        line-height: 1.25;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    .archive p {
        display: -webkit-box;
        margin: 9px 0 0;
        overflow: hidden;
        color: var(--muted);
        font-size: 0.88rem;
        line-height: 1.55;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }

    .archive .story-link:hover {
        background: color-mix(in srgb, var(--surface-muted) 56%, transparent);
    }

    @media (max-width: 1080px) {
        .row .story-link {
            grid-template-columns: 120px minmax(0, 1fr);
            gap: 14px;
            min-height: 128px;
        }

    }

    @media (max-width: 760px) {
        .lead .story-copy {
            padding-top: 18px;
        }

        .lead h2,
        .lead h3 {
            font-size: clamp(1.4rem, 6vw, 1.6rem);
        }

        .lead p {
            margin-top: 12px;
            font-size: 0.9rem;
        }

        .row .story-link {
            grid-template-columns: 108px minmax(0, 1fr);
            gap: 14px;
            min-height: 124px;
            padding-block: 18px;
        }

        .row h2,
        .row h3,
        .archive h2,
        .archive h3 {
            margin-top: 6px;
            font-size: 1rem;
            line-height: 1.28;
            -webkit-line-clamp: 3;
            line-clamp: 3;
        }

        .story-meta {
            gap: 5px 9px;
            font-size: 0.66rem;
        }
    }

    @media (max-width: 380px) {
        .row .story-link {
            grid-template-columns: 88px minmax(0, 1fr);
            gap: 11px;
            min-height: 108px;
            padding-block: 16px;
        }

        .story-meta time {
            display: none;
        }

    }
</style>
