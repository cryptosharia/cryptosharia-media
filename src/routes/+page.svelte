<script lang="ts">
    import AboutSection from '$lib/components/home/AboutSection.svelte';
    import EducationSection from '$lib/components/home/EducationSection.svelte';
    import HeroSection from '$lib/components/home/HeroSection.svelte';
    import NewsSection from '$lib/components/home/NewsSection.svelte';
    import ScreeningSection from '$lib/components/home/ScreeningSection.svelte';
    import TrustStrip from '$lib/components/home/TrustStrip.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<Seo
    title="CryptoSharia — Berita, Edukasi & Screening Coin"
    description="Satu tempat untuk mengikuti berita, mempelajari aset digital, dan membaca hasil screening coin dari perspektif syariah."
/>

<main id="main-content" class="site-main">
    <HeroSection token={data.tokens[0]} />
    <TrustStrip />
    <NewsSection posts={data.news} unavailable={data.unavailable.news} />
    <EducationSection posts={data.education} unavailable={data.unavailable.education} />
    <ScreeningSection tokens={data.tokens} unavailable={data.unavailable.tokens} />
    <AboutSection />
</main>
