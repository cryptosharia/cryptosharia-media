<div class="hero-artwork-wrapper">
    <img
        class="hero-artwork hero-artwork--light"
        src="/hero/sharia-intelligence-light.png"
        alt="Ilustrasi framework screening aset digital CryptoSharia"
        width="768"
        height="1024"
        loading="eager"
    />
    <img
        class="hero-artwork hero-artwork--dark"
        src="/hero/sharia-intelligence-dark.png"
        alt="Ilustrasi framework screening aset digital CryptoSharia"
        width="768"
        height="1024"
        loading="eager"
    />
</div>

<style>
    .hero-artwork-wrapper {
        position: relative;
        width: min(100%, 600px);
        margin-left: auto;
        aspect-ratio: 3 / 4;
    }

    .hero-artwork {
        position: relative;
        z-index: 0;
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    /* The supplied dark artwork has an opaque canvas. Fade only its outer edge into the hero canvas. */
    .hero-artwork-wrapper::before,
    .hero-artwork-wrapper::after {
        position: absolute;
        z-index: 1;
        pointer-events: none;
        content: '';
    }

    .hero-artwork-wrapper::before {
        inset: 0;
        background: linear-gradient(to bottom, var(--hero-artwork-fade) 0%, transparent 7%, transparent 93%, var(--hero-artwork-fade) 100%);
    }

    .hero-artwork-wrapper::after {
        inset: 0;
        background: linear-gradient(to right, var(--hero-artwork-fade) 0%, transparent 6%, transparent 94%, var(--hero-artwork-fade) 100%);
    }

    .hero-artwork--dark {
        display: none;
    }

    :global(:root[data-theme='dark']) .hero-artwork--light {
        display: none;
    }

    :global(:root[data-theme='dark']) .hero-artwork--dark {
        display: block;
    }

    @media (max-width: 900px) {
        .hero-artwork-wrapper {
            width: min(100%, 600px);
            margin-inline: auto;
        }
    }

    @media (max-width: 600px) {
        .hero-artwork-wrapper {
            width: min(100%, 480px);
        }
    }
</style>
