<script lang="ts">
    import { SOCIAL_LINKS } from '$lib/config';
    import { reveal } from '$lib/actions/reveal';
</script>

<footer class="site-footer">
    <div class="container">
        <div class="footer-layout">
            <div class="footer-intro" use:reveal>
                <a class="brand footer-brand" href="/" aria-label="CryptoSharia — Beranda">
                    <img src="/logo.webp" alt="" width="40" height="40" loading="lazy" decoding="async" />
                    <span class="brand-name">CryptoSharia</span>
                </a>
                <p>Berita, edukasi, dan screening aset kripto dari perspektif syariah.</p>
            </div>

            <nav class="footer-navigation footer-navigation-desktop" use:reveal={{ delay: 80 }} aria-label="Navigasi footer">
                <div class="footer-group">
                    <h2>Konten</h2>
                    <div class="footer-links">
                        <a href="/berita">Berita</a>
                        <a href="/edukasi">Edukasi</a>
                        <a href="/screening">Screening Coin</a>
                    </div>
                </div>

                <div class="footer-group">
                    <h2>CryptoSharia</h2>
                    <div class="footer-links">
                        <a href="/tentang-kami">Tentang Kami</a>
                        <a href="/tentang-kami#aktivitas">Aktivitas</a>
                        <a href="/komunitas">Komunitas</a>
                        <a href="/tentang-kami#hubungi-kami">Hubungi Kami</a>
                    </div>
                </div>

                <div class="footer-group footer-group-social">
                    <h2>Ikuti Kami</h2>
                    <div class="footer-links social-links">
                        {#each SOCIAL_LINKS as link (link.label)}
                            <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        {/each}
                    </div>
                </div>
            </nav>

            <nav class="footer-navigation-mobile" aria-label="Navigasi footer">
                <details class="footer-accordion">
                    <summary>Konten</summary>
                    <div class="footer-links">
                        <a href="/berita">Berita</a>
                        <a href="/edukasi">Edukasi</a>
                        <a href="/screening">Screening Coin</a>
                    </div>
                </details>

                <details class="footer-accordion">
                    <summary>CryptoSharia</summary>
                    <div class="footer-links">
                        <a href="/tentang-kami">Tentang Kami</a>
                        <a href="/tentang-kami#aktivitas">Aktivitas</a>
                        <a href="/komunitas">Komunitas</a>
                        <a href="/tentang-kami#hubungi-kami">Hubungi Kami</a>
                    </div>
                </details>

                <details class="footer-accordion">
                    <summary>Ikuti Kami</summary>
                    <div class="footer-links social-links">
                        {#each SOCIAL_LINKS as link (link.label)}
                            <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                        {/each}
                    </div>
                </details>
            </nav>
        </div>

        <div class="footer-bottom">
            <span>© {new Date().getFullYear()} CryptoSharia.</span>
            <span>Seluruh hak cipta dilindungi.</span>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        margin-top: 0;
        padding-block: 64px 28px;
        color: #eeeef1;
        border-top: 1px solid #2b303b;
        background: #0f1115;
    }

    .footer-layout {
        display: grid;
        grid-template-columns: minmax(260px, 1.15fr) minmax(520px, 1.85fr);
        gap: clamp(48px, 8vw, 112px);
        align-items: start;
    }

    .footer-intro {
        max-width: 390px;
    }

    .footer-brand {
        display: inline-flex;
        min-height: 44px;
        align-items: center;
        gap: 11px;
        color: #ffffff;
        font-size: 1.08rem;
        font-weight: 800;
        letter-spacing: -0.025em;
    }

    .footer-brand img {
        width: 40px;
        height: 40px;
        object-fit: contain;
    }

    .brand-name {
        display: inline;
    }

    .footer-intro p {
        max-width: 350px;
        margin: 20px 0 0;
        color: #b5bbc7;
        font-size: 0.96rem;
        line-height: 1.7;
    }

    .footer-navigation {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: clamp(28px, 4vw, 56px);
    }

    .footer-navigation-mobile {
        display: none;
    }

    .footer-group h2 {
        margin: 0 0 18px;
        color: #eeeef1;
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .footer-links {
        display: grid;
        gap: 4px;
    }

    .footer-links a {
        display: flex;
        min-height: 38px;
        align-items: center;
        width: fit-content;
        color: #aeb5c1;
        font-size: 0.9rem;
        text-decoration: none;
        text-underline-offset: 4px;
        transition: color var(--motion-micro) var(--ease-standard), transform var(--motion-micro) var(--ease-standard);
    }

    .footer-links a:hover {
        color: #ffffff;
        text-decoration: underline;
        transform: translateX(2px);
    }

    .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-top: 52px;
        padding-top: 22px;
        color: #8f97a5;
        border-top: 1px solid #2b303b;
        font-size: 0.8rem;
    }

    @media (max-width: 900px) {
        .footer-layout {
            grid-template-columns: 1fr;
            gap: 44px;
        }

        .footer-intro {
            max-width: 520px;
        }

        .footer-navigation {
            gap: 32px;
        }
    }

    @media (max-width: 768px) {
        .site-footer {
            padding-block: 32px 20px;
        }

        .site-footer > .container {
            width: calc(100% - 40px);
        }

        .footer-layout {
            gap: 22px;
        }

        .brand-name {
            display: inline;
        }

        .footer-intro p {
            max-width: 320px;
            margin-top: 10px;
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .footer-navigation-desktop {
            display: none;
        }

        .footer-navigation-mobile {
            display: block;
            border-bottom: 1px solid #2b303b;
        }

        .footer-accordion {
            border-top: 1px solid #2b303b;
        }

        .footer-accordion summary {
            display: flex;
            min-height: 44px;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            color: #eeeef1;
            cursor: pointer;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            list-style: none;
            text-transform: uppercase;
        }

        .footer-accordion summary::-webkit-details-marker {
            display: none;
        }

        .footer-accordion summary::after {
            content: '+';
            flex: 0 0 auto;
            color: #aeb5c1;
            font-size: 1.15rem;
            font-weight: 400;
            line-height: 1;
            transition: transform var(--motion-micro) var(--ease-standard);
        }

        .footer-accordion[open] summary::after {
            transform: rotate(45deg);
        }

        .footer-accordion summary:focus-visible {
            border-radius: 4px;
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }

        .footer-accordion .footer-links {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0 12px;
            padding: 0 0 8px;
        }

        .footer-accordion .footer-links a {
            min-width: 0;
            min-height: 44px;
            width: 100%;
            overflow-wrap: anywhere;
        }

        .footer-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 2px;
            margin-top: 24px;
            padding-top: 16px;
        }
    }

    @media (max-width: 360px) {
        .site-footer > .container {
            width: calc(100% - 32px);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .footer-links a:hover,
        .footer-accordion[open] summary::after {
            transform: none;
        }
    }
</style>
