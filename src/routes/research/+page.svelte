<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            posts: Post[];
        };
    }

    let { data }: Props = $props();
</script>

<svelte:head>
    <title>Research · CryptoSharia News</title>
    <meta
        name="description"
        content="Riset mendalam tentang cryptocurrency dari perspektif syariah, teknologi, dan studi kasus pasar."
    />
</svelte:head>

<main class="container">
    <!-- Research Articles -->
    <section class="section">
        <h3>Artikel Riset</h3>
        <div class="grid">
            {#each data.posts as post}
                <a
                    href="/article/{post.slug}"
                    style="display: block; text-decoration: none; color: inherit; grid-column: span 12;"
                    class="post-link"
                >
                    <article class="card">
                        <img
                            src={post.coverImage?.url ??
                                getPostCoverUrl(post.coverImage?.id)}
                            alt={post.title}
                            loading="lazy"
                        />
                        <div class="body">
                            <span class="kicker">{post.section}</span>
                            <h4>{post.title}</h4>
                            {#if post.excerpt}
                                <p>{post.excerpt}</p>
                            {/if}
                        </div>
                    </article>
                </a>
            {:else}
                <p class="muted">Belum ada riset untuk saat ini.</p>
            {/each}
        </div>
    </section>
</main>
