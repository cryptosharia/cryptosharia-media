<script lang="ts">
    import "../../../app.css";
    import { getPostCoverUrl } from "$lib/utils/assets";
    import type { Post, PostDetail } from "$types/api";

    interface Props {
        data: {
            webinar: PostDetail | null;
        };
    }

    let { data }: Props = $props();
</script>

<svelte:head>
    {#if data.webinar}
        <title>{data.webinar.title} · CryptoSharia Webinar</title>
        <meta name="description" content={data.webinar.excerpt ?? ""} />
    {:else}
        <title>Webinar Tidak Ditemukan · CryptoSharia</title>
    {/if}
</svelte:head>

<header>
    <nav class="menu">
        <a href="/">News</a>
        <a href="/education" class="active">Education</a>
        <a href="/research">Research</a>
        <a href="/community">Premium</a>
        <a href="/profile">Profile</a>
    </nav>
    <div class="container nav">
        <a href="/" class="brand">
            <div class="logo"></div>
            <span class="title">CryptoSharia</span>
        </a>
    </div>
</header>

<main class="container webinar-page">
    {#if data.webinar}
        <a href="/education" class="back-link">← Kembali ke Education</a>

        <div class="webinar-content">
            <img
                class="cover"
                src={getPostCoverUrl(data.webinar.coverImage?.id)}
                alt={data.webinar.title}
            />

            <div class="info">
                <span class="badge">Webinar</span>
                <h1>{data.webinar.title}</h1>

                {#if data.webinar.eventDate}
                    <div class="event-date">
                        <span class="icon">📅</span>
                        <span>
                            {new Date(
                                data.webinar.eventDate,
                            ).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })} WIB
                        </span>
                    </div>
                {/if}

                {#if data.webinar.excerpt}
                    <p class="excerpt">{data.webinar.excerpt}</p>
                {/if}

                {#if data.webinar.externalLink}
                    <a
                        href={data.webinar.externalLink}
                        class="btn primary"
                        target="_blank"
                        rel="noopener"
                    >
                        ▶ {new Date(data.webinar.eventDate ?? "") > new Date()
                            ? "Daftar Sekarang"
                            : "Tonton Rekaman"}
                    </a>
                {/if}
            </div>
        </div>
    {:else}
        <div class="not-found">
            <h1>Webinar Tidak Ditemukan</h1>
            <p>Webinar yang Anda cari tidak tersedia atau telah dihapus.</p>
            <a href="/education" class="btn">Kembali ke Education</a>
        </div>
    {/if}
</main>

<style>
    .webinar-page {
        max-width: 900px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .back-link {
        display: inline-block;
        color: var(--brand);
        text-decoration: none;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
    }
    .webinar-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        background: var(--elev);
        border-radius: var(--radius);
        overflow: hidden;
    }
    .cover {
        width: 100%;
        height: 100%;
        min-height: 300px;
        object-fit: cover;
    }
    .info {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .badge {
        background: var(--accent);
        color: var(--bg);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        width: fit-content;
        margin-bottom: 1rem;
    }
    .info h1 {
        margin: 0 0 1rem;
        font-size: 1.5rem;
        line-height: 1.3;
    }
    .event-date {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-muted);
        margin-bottom: 1rem;
    }
    .excerpt {
        color: var(--text-muted);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    .btn.primary {
        background: var(--brand);
        color: var(--bg);
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        width: fit-content;
    }
    .not-found {
        text-align: center;
        padding: 4rem 2rem;
    }
    .not-found h1 {
        margin-bottom: 1rem;
    }
    .not-found .btn {
        display: inline-block;
        margin-top: 1.5rem;
        background: var(--brand);
        color: var(--bg);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
    }
    @media (max-width: 768px) {
        .webinar-content {
            grid-template-columns: 1fr;
        }
        .cover {
            height: 200px;
        }
    }
</style>
