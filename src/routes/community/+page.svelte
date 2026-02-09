<script lang="ts">
    import "../../app.css";

    const discordBenefits = [
        {
            title: "Signal Coin (Spot Only)",
            icon: "📈",
            desc: "Signal trading real-time untuk spot (tanpa leverage). Entry point, target profit, stop loss, dan risk analysis.",
        },
        {
            title: "Diskusi Trader Harian 24/7",
            icon: "💬",
            desc: "Komunitas trader aktif saling berbagi insight, analisis teknikal, dan fundamental.",
        },
        {
            title: "Arbitrage CEX-CEX",
            icon: "⚡",
            desc: "Notifikasi real-time untuk peluang arbitrase antar exchange dengan profit potential 1-3%.",
        },
        {
            title: "Airdrop & Testnet Kurasi",
            icon: "🎁",
            desc: "Project-project legitimate yang sudah dikurasi, lengkap dengan guide dan deadline tracker.",
        },
    ];

    const membershipPlans = [
        {
            name: "Bulanan",
            price: "Rp 299.000",
            period: "/bulan",
            popular: false,
        },
        {
            name: "3 Bulan",
            price: "Rp 799.000",
            period: "/3 bulan",
            popular: true,
        },
        {
            name: "Tahunan",
            price: "Rp 2.499.000",
            period: "/tahun",
            popular: false,
        },
    ];

    const consultantServices = [
        {
            icon: "🎯",
            title: "Portfolio Review",
            desc: "Analisis portfolio crypto Anda dari perspektif syariah",
        },
        {
            icon: "📊",
            title: "Investment Strategy",
            desc: "Strategi investasi yang sesuai dengan profil risiko Anda",
        },
        {
            icon: "🔍",
            title: "Token Analysis",
            desc: "Riset mendalam tentang token tertentu",
        },
        {
            icon: "📈",
            title: "Trading Mentorship",
            desc: "Bimbingan trading 1-on-1 dengan trader berpengalaman",
        },
    ];
</script>

<svelte:head>
    <title>Premium Community · CryptoSharia</title>
    <meta
        name="description"
        content="Bergabung dengan komunitas premium CryptoSharia untuk akses eksklusif signal, diskusi, dan konsultasi."
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
            <span class="pill">Premium</span>
        </a>
    </div>
</header>

<main class="container">
    <!-- Hero Section -->
    <section class="hero">
        <h1>Kenapa Bergabung dengan Discord Premium?</h1>
        <p>
            Akses eksklusif ke signal, diskusi, dan tools untuk trader crypto
            syariah.
        </p>
    </section>

    <!-- Benefits -->
    <section class="section">
        <h3>Apa yang Kalian Dapatkan?</h3>
        <div class="benefits-grid">
            {#each discordBenefits as benefit}
                <div class="benefit-card">
                    <span class="icon">{benefit.icon}</span>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                </div>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Membership Plans -->
    <section class="section">
        <h3>Pilih Paket Membership</h3>
        <div class="pricing-grid">
            {#each membershipPlans as plan}
                <div class="pricing-card" class:popular={plan.popular}>
                    {#if plan.popular}
                        <span class="badge">Popular</span>
                    {/if}
                    <h4>{plan.name}</h4>
                    <div class="price">{plan.price}</div>
                    <span class="period">{plan.period}</span>
                    <a href="/discord" class="btn">Pilih Paket</a>
                </div>
            {/each}
        </div>
    </section>

    <div class="divider"></div>

    <!-- Consultant Section -->
    <section class="section" id="consultant">
        <h3>🎓 Consultant Crypto Sharia</h3>
        <p class="muted">
            Butuh bimbingan lebih personal? Konsultasikan langsung dengan ahli
            kami.
        </p>
        <div class="services-grid">
            {#each consultantServices as service}
                <div class="service-card">
                    <span class="icon">{service.icon}</span>
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                </div>
            {/each}
        </div>
        <div class="cta-center">
            <a href="/consultant" class="btn primary">Jadwalkan Konsultasi</a>
        </div>
    </section>
</main>

<style>
    .hero {
        text-align: center;
        padding: 3rem 1rem;
        background: linear-gradient(
            135deg,
            var(--brand) 0%,
            var(--accent) 100%
        );
        border-radius: var(--radius);
        margin-bottom: 2rem;
        color: var(--bg);
    }
    .hero h1 {
        margin: 0 0 1rem;
        font-size: 2rem;
    }
    .hero p {
        margin: 0;
        opacity: 0.9;
    }
    .benefits-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    .benefit-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
    }
    .benefit-card .icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 1rem;
    }
    .benefit-card h4 {
        margin: 0 0 0.5rem;
        color: var(--brand);
    }
    .benefit-card p {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.9rem;
    }
    .pricing-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    .pricing-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 2rem;
        text-align: center;
        position: relative;
    }
    .pricing-card.popular {
        border-color: var(--brand);
        transform: scale(1.05);
    }
    .pricing-card .badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--brand);
        color: var(--bg);
        padding: 0.25rem 1rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .pricing-card h4 {
        margin: 0 0 1rem;
    }
    .pricing-card .price {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--brand);
    }
    .pricing-card .period {
        color: var(--text-muted);
        font-size: 0.875rem;
    }
    .pricing-card .btn {
        display: block;
        margin-top: 1.5rem;
        background: var(--brand);
        color: var(--bg);
        padding: 0.75rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
    }
    .services-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-top: 1.5rem;
    }
    .service-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 1.5rem;
        text-align: center;
    }
    .service-card .icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
    }
    .service-card h4 {
        margin: 0 0 0.5rem;
        font-size: 0.9rem;
    }
    .service-card p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--text-muted);
    }
    .cta-center {
        text-align: center;
        margin-top: 2rem;
    }
    .btn.primary {
        background: var(--brand);
        color: var(--bg);
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        display: inline-block;
    }
    @media (max-width: 900px) {
        .benefits-grid {
            grid-template-columns: 1fr;
        }
        .pricing-grid {
            grid-template-columns: 1fr;
        }
        .pricing-card.popular {
            transform: none;
        }
        .services-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
