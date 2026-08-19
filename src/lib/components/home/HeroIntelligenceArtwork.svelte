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
        width: min(100%, 540px);
        margin-left: auto;
    }

    .hero-artwork {
        width: 100%;
        height: auto;
        object-fit: contain;
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
            width: min(100%, 540px);
            margin-inline: auto;
        }
    }

    @media (max-width: 600px) {
        .hero-artwork-wrapper {
            width: min(100%, 440px);
        }
    }
</style>
