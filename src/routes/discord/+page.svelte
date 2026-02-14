<script lang="ts">
    import "../../app.css";
</script>

<svelte:head>
    <title>Discord Premium · CryptoSharia</title>
</svelte:head>

<header>
    <nav class="menu">
        <a href="/">News</a>
        <a href="/education">Education</a>
        <a href="/research">Research</a>
        <a href="/community" class="active">Premium</a>
        <a href="/profile">Profile</a>
    </nav>
    <div class="container nav">
        <a href="/" class="brand">
            <div class="logo"></div>
            <span class="title">CryptoSharia</span>
        </a>
    </div>
</header>

<main class="container discord-page">
    <section class="hero">
        <div class="discord-icon">💬</div>
        <h1>Join CryptoSharia Discord</h1>
        <p>Komunitas trader crypto syariah terbesar di Indonesia.</p>
        <a
            href="https://discord.gg/cryptosharia"
            class="btn primary"
            target="_blank"
            rel="noopener"
        >
            Gabung Sekarang
        </a>
    </section>

    <section class="features">
        <div class="feature">
            <span class="icon">📈</span>
            <h4>Signal Trading</h4>
            <p>Akses signal real-time untuk spot trading</p>
        </div>
        <div class="feature">
            <span class="icon">💬</span>
            <h4>Diskusi 24/7</h4>
            <p>Diskusi dengan trader dari berbagai level</p>
        </div>
        <div class="feature">
            <span class="icon">🎓</span>
            <h4>Mentoring</h4>
            <p>Belajar langsung dari trader berpengalaman</p>
        </div>
        <div class="feature">
            <span class="icon">🎁</span>
            <h4>Airdrop Kurasi</h4>
            <p>Info airdrop terpercaya dan guide lengkap</p>
        </div>
    </section>

    <a href="/community" class="back-link">← Kembali ke Premium</a>
</main>

<style>
    .discord-page {
        max-width: 700px;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 100px;
    }
    .hero {
        padding: 3rem 2rem;
        background: linear-gradient(135deg, #5865f2 0%, #7289da 100%);
        border-radius: var(--radius);
        margin-bottom: 2rem;
        color: white;
    }
    .discord-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    .hero h1 {
        margin: 0 0 0.5rem;
    }
    .hero p {
        margin: 0 0 1.5rem;
        opacity: 0.9;
    }
    .btn.primary {
        background: white;
        color: #5865f2;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        display: inline-block;
    }
    .features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .feature {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
    }
    .feature .icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
    }
    .feature h4 {
        margin: 0 0 0.5rem;
    }
    .feature p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.875rem;
    }
    .back-link {
        color: var(--brand);
        text-decoration: none;
    }
</style>
