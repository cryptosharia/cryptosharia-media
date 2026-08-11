<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import type { PageData } from './$types';
    let { data }: { data: PageData } = $props();
</script>

<Seo title="Profil Akun — CryptoSharia" description="Profil akun CryptoSharia." noindex />
<main id="main-content" class="site-main">
    <section class="container section">
        <div class="feature-card" style="max-width:620px;margin-inline:auto">
            <p class="eyebrow">Akun</p>
            <h1>{data.user.name}</h1>
            <p>{data.user.email}</p>
            <form method="POST" action="?/logout" style="margin-top:24px">
                <button class="button button-secondary" type="submit">Keluar</button>
            </form>
        </div>
    </section>
</main>
