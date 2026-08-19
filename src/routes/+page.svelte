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
    title="CryptoSharia — Berita, Edukasi & Screening Aset Digital"
    description="Platform berita, edukasi, dan screening aset digital untuk membantu Anda memahami ekosistem kripto dari perspektif syariah."
    canonicalPath="/"
/>

<main id="main-content" class="site-main">
    <HeroSection tokens={data.tokens} quotes={data.tokenQuotes} />
    <TrustStrip />
    <NewsSection posts={data.news} unavailable={data.unavailable.news} />
    <EducationSection posts={data.education} unavailable={data.unavailable.education} />
    <ScreeningSection tokens={data.tokens} unavailable={data.unavailable.tokens} />
    <AboutSection />
</main>
