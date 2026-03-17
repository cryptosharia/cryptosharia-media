<script lang="ts">
    import "../../app.css";
</script>

<svelte:head>
    <title>Premium Community · CryptoSharia</title>
    <meta
        name="description"
        content="Bergabung dengan komunitas premium CryptoSharia untuk akses eksklusif signal, diskusi, dan materi premium."
    />
</svelte:head>

<main class="container">
    <section class="discord-hero">
        <div class="hero-top">
            <div class="hero-left">
                <h1>
                    Kenapa Bergabung dengan <br/>
                    <span class="gradient-text">Discord Premium</span>?
                </h1>
                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">1000+</div>
                        <div class="stat-label">Active Members</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Live Discussion</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Signals per Month</div>
                    </div>
                </div>
                
                <div class="cta-wrapper">
                    <a href="https://berbagi.link/cryptosharia/" class="cta-button" target="_blank" rel="noopener noreferrer">Bergabung Sekarang</a>
                </div>

                <ul class="features-list-left">
                    <li class="highlighted">
                        <span class="check-icon">✓</span>
                        <span>Trading Strategies & Tutorials</span>
                    </li>
                    <li class="highlighted">
                        <span class="check-icon">✓</span>
                        <span>Daily market updates</span>
                    </li>
                </ul>
            </div>

            <div class="hero-right">
                <div class="hero-visual">
                    <img src="/discord-preview.png" alt="Discord Community" class="promo-image">
                </div>

                <ul class="features-list">
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Beginner & Advanced education modules</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Shariah-based crypto modules + fatwa</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Exclusive Crypto Outlook & Trade Insights</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Global Macro Market Analysis</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Private 2-way discussions</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Weekly Live Sessions (Members Only)</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Access to Paid Research</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>Daily Portfolio Updates</span>
                    </li>
                    <li>
                        <span class="check-icon">✓</span>
                        <span>All Access Free Members</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</main>

<style>
    .discord-hero {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        padding: 4rem 5rem;
        position: relative;
        overflow: hidden;
        margin: 2rem 0;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    }
    
    .hero-top {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 3rem;
        z-index: 1;
    }

    .hero-left {
        flex: 1;
        max-width: 650px;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .hero-left h1 {
        font-size: 3.5rem;
        line-height: 1.1;
        margin: 0;
        letter-spacing: -1px;
    }

    .hero-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 580px;
    }

    .cta-wrapper {
        text-align: left;
        margin-top: 1rem;
    }
    
    /* Decorative radial gradient behind the text */
    .discord-hero::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 60%);
        pointer-events: none;
        z-index: 0;
    }

    .gradient-text {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 800;
    }

    /* Decorative radial gradient behind the text */

    .hero-stats {
        display: flex;
        gap: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .stat-number {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--text);
    }

    .stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .cta-button {
        display: inline-block;
        background: #f97316;
        color: white;
        text-decoration: none;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 700;
        border-radius: 12px;
        transition: all 0.2s;
        box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        margin-top: 1rem;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
        background: #ea580c;
    }

    .hero-visual {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
    }

    .promo-image {
        width: 100%;
        height: auto;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        transition: transform 0.3s ease;
    }

    .promo-image:hover {
        transform: translateY(-5px) scale(1.02);
    }

    /* Features List Inline */
    .features-list,
    .features-list-left {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .features-list-left {
        margin-top: 1rem; /* spacing from cta button */
    }

    .features-list li,
    .features-list-left li {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: var(--bg);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        transition: transform 0.2s, background 0.2s;
        font-size: 0.95rem;
        line-height: 1.3;
    }

    .features-list li:hover,
    .features-list-left li:hover {
        transform: translateY(-2px);
        background: var(--elev);
        border-color: #0ea5e9;
    }

    .features-list-left li.highlighted {
        font-weight: 700;
        border-color: rgba(249, 115, 22, 0.3);
    }

    .features-list-left li.highlighted:hover {
        border-color: #f97316;
    }

    .check-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #0ea5e9;
        color: white;
        border-radius: 50%;
        width: 24px;
        min-width: 24px;
        height: 24px;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .features-list-left li.highlighted .check-icon {
        background: #f97316;
    }

    @media (max-width: 992px) {
        .discord-hero {
            padding: 2.5rem;
        }

        .hero-top {
            flex-direction: column;
            text-align: center;
            gap: 3rem;
        }
        
        .hero-left {
            text-align: center;
            max-width: 100%;
        }
        
        .hero-left h1 {
            font-size: 2.5rem;
        }

        .hero-stats {
            justify-content: center;
        }

        .features-list {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 600px) {
        .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
        }
    }
</style>
