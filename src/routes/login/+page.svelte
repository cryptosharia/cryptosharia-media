<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData | null } = $props();
</script>

<Seo title="Login — CryptoSharia" description="Masuk ke akun CryptoSharia." canonicalPath="/login" noindex />

<main id="main-content" class="site-main">
    <section class="container section">
        <div class="feature-card" style="max-width:440px;margin-inline:auto">
            <p class="eyebrow">Akun</p>
            <h1>Login ke CryptoSharia</h1>
            <p class="muted">Masukkan email dan password akun Anda.</p>

            {#if form?.error}
                <div class="alert alert-error" role="alert">{form.error}</div>
            {/if}

            <form class="form-grid" method="POST" action="?/login" style="margin-top:24px">
                <div class="field">
                    <label for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" autocomplete="email" required maxlength="255" value={form?.email ?? ''} />
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input class="input" type="password" id="password" name="password" autocomplete="current-password" required minlength="8" />
                </div>
                <button type="submit" class="button button-primary">Masuk</button>
            </form>

            <p class="muted" style="margin-top:24px">
                Informasi Komunitas Premium tersedia di <a href="/komunitas#premium">halaman Komunitas</a>.
            </p>
        </div>
    </section>
</main>
