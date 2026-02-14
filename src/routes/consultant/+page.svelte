<script lang="ts">
    import "../../app.css";

    const services = [
        {
            icon: "🎯",
            title: "Portfolio Review",
            desc: "Analisis portfolio crypto Anda dari perspektif syariah dan optimasi alokasi aset.",
            price: "Rp 500.000",
            duration: "60 menit",
        },
        {
            icon: "📊",
            title: "Investment Strategy",
            desc: "Strategi investasi customized sesuai profil risiko dan tujuan keuangan Anda.",
            price: "Rp 750.000",
            duration: "90 menit",
        },
        {
            icon: "🔍",
            title: "Token Analysis",
            desc: "Riset mendalam tentang token tertentu termasuk fundamental dan teknikal.",
            price: "Rp 300.000",
            duration: "45 menit",
        },
        {
            icon: "📈",
            title: "Trading Mentorship",
            desc: "Bimbingan trading 1-on-1 untuk memahami market dan membangun strategi.",
            price: "Rp 1.500.000",
            duration: "4 sesi x 60 menit",
        },
    ];
</script>

<svelte:head>
    <title>Consultant · CryptoSharia</title>
    <meta
        name="description"
        content="Konsultasi crypto syariah 1-on-1 dengan ahli kami untuk portfolio review, investment strategy, dan mentoring."
    />
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

<main class="container consultant-page">
    <section class="hero">
        <h1>🎓 Consultant Crypto Sharia</h1>
        <p>
            Butuh bimbingan lebih personal? Konsultasikan langsung dengan ahli
            kami.
        </p>
    </section>

    <section class="services">
        {#each services as service}
            <div class="service-card">
                <span class="icon">{service.icon}</span>
                <div class="content">
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                    <div class="meta">
                        <span class="price">{service.price}</span>
                        <span class="duration">{service.duration}</span>
                    </div>
                </div>
                <a
                    href="https://wa.me/628123456789?text=Saya%20ingin%20konsultasi%20{service.title}"
                    class="btn"
                    target="_blank"
                    rel="noopener"
                >
                    Book Now
                </a>
            </div>
        {/each}
    </section>

    <section class="why-us">
        <h3>Mengapa Memilih Kami?</h3>
        <div class="reasons">
            <div class="reason">
                <span class="icon">✅</span>
                <span>Konsultan bersertifikat syariah</span>
            </div>
            <div class="reason">
                <span class="icon">✅</span>
                <span>Pengalaman 5+ tahun di crypto</span>
            </div>
            <div class="reason">
                <span class="icon">✅</span>
                <span>Track record profitabel</span>
            </div>
            <div class="reason">
                <span class="icon">✅</span>
                <span>Garansi kepuasan 100%</span>
            </div>
        </div>
    </section>

    <a href="/community" class="back-link">← Kembali ke Premium</a>
</main>

<style>
    .consultant-page {
        max-width: 800px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .hero {
        text-align: center;
        padding: 2rem;
        margin-bottom: 2rem;
    }
    .hero h1 {
        margin: 0 0 0.5rem;
    }
    .hero p {
        margin: 0;
        color: var(--text-muted);
    }
    .services {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .service-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
    }
    .service-card .icon {
        font-size: 2.5rem;
        flex-shrink: 0;
    }
    .service-card .content {
        flex: 1;
    }
    .service-card h4 {
        margin: 0 0 0.5rem;
        color: var(--brand);
    }
    .service-card p {
        margin: 0 0 0.75rem;
        font-size: 0.9rem;
        color: var(--text-muted);
    }
    .service-card .meta {
        display: flex;
        gap: 1rem;
        font-size: 0.875rem;
    }
    .service-card .price {
        font-weight: 600;
        color: var(--brand);
    }
    .service-card .duration {
        color: var(--text-muted);
    }
    .service-card .btn {
        background: var(--brand);
        color: var(--bg);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        white-space: nowrap;
    }
    .why-us {
        background: var(--elev);
        border-radius: var(--radius);
        padding: 2rem;
        margin-bottom: 2rem;
        text-align: center;
    }
    .why-us h3 {
        margin: 0 0 1.5rem;
    }
    .reasons {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    .reason {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: center;
    }
    .back-link {
        color: var(--brand);
        text-decoration: none;
        display: block;
        text-align: center;
    }
    @media (max-width: 768px) {
        .service-card {
            flex-direction: column;
            text-align: center;
        }
        .service-card .meta {
            justify-content: center;
        }
        .reasons {
            grid-template-columns: 1fr;
        }
    }
</style>
