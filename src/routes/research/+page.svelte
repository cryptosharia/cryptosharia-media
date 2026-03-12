<script lang="ts">
    import "../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post } from "$types/api";

    interface Props {
        data: {
            fatwa: Post[];
            teknologi: Post[];
            studiKasus: Post[];
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
    <!-- Fatwa & Fiqh -->
    <section class="section">
        <h3>📿 Fatwa & Fiqh</h3>
        <p class="muted">
            Kajian hukum syariah terkait cryptocurrency dan teknologi
            blockchain.
        </p>
        <div class="grid">
            {#each data.fatwa as post}
                <article class="card">
                    <img
                        src={getPostCoverUrl(post.coverImage?.id)}
                        alt={post.title}
                        loading="lazy"
                    />
                    <div class="body">
                        <span class="kicker">Fatwa</span>
                        <h4>{post.title}</h4>
                        {#if post.excerpt}
                            <p>{post.excerpt}</p>
                        {/if}
                    </div>
                </article>
            {:else}
                <p class="muted">Belum ada artikel di kategori ini.</p>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Teknologi & Protokol -->
    <section class="section">
        <h3>🔗 Teknologi & Protokol</h3>
        <p class="muted">
            Analisis teknis tentang berbagai protokol dan teknologi blockchain.
        </p>
        <div class="grid">
            {#each data.teknologi as post}
                <article class="card">
                    <img
                        src={getPostCoverUrl(post.coverImage?.id)}
                        alt={post.title}
                        loading="lazy"
                    />
                    <div class="body">
                        <span class="kicker">Teknologi</span>
                        <h4>{post.title}</h4>
                        {#if post.excerpt}
                            <p>{post.excerpt}</p>
                        {/if}
                    </div>
                </article>
            {:else}
                <p class="muted">Belum ada artikel di kategori ini.</p>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Studi Kasus Pasar -->
    <section class="section">
        <h3>📊 Studi Kasus Pasar</h3>
        <p class="muted">
            Analisis mendalam tentang pergerakan pasar dan event-event penting.
        </p>
        <div class="grid">
            {#each data.studiKasus as post}
                <article class="card">
                    <img
                        src={getPostCoverUrl(post.coverImage?.id)}
                        alt={post.title}
                        loading="lazy"
                    />
                    <div class="body">
                        <span class="kicker">Studi Kasus</span>
                        <h4>{post.title}</h4>
                        {#if post.excerpt}
                            <p>{post.excerpt}</p>
                        {/if}
                    </div>
                </article>
            {:else}
                <p class="muted">Belum ada artikel di kategori ini.</p>
            {/each}
        </div>
    </section>
</main>
