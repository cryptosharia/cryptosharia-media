<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import type { ActionData } from './$types';

    let { form }: { form: ActionData | null } = $props();

    function normalizeOtp(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 6);
    }
</script>

<Seo title="Login — CryptoSharia" description="Masuk ke akun CryptoSharia." canonicalPath="/login" noindex />

<main id="main-content" class="site-main">
    <section class="container section">
        <div class="feature-card" style="max-width:440px;margin-inline:auto">
            <p class="eyebrow">Akun</p>
            <h1>Login ke CryptoSharia</h1>
            <p class="muted">Masukkan email untuk menerima kode OTP 6 digit.</p>

            {#if form?.error}
                <div class="alert alert-error" role="alert">{form.error}</div>
            {/if}

            <form class="form-grid" method="POST" action="?/requestOtp" style="margin-top:24px">
                <div class="field">
                    <label for="email">Email</label>
                    <input class="input" type="email" id="email" name="email" autocomplete="email" required maxlength="255" value={form?.email ?? ''} />
                </div>
                <button type="submit" class="button button-primary">Kirim kode OTP</button>
            </form>

            {#if form?.otpRequested}
                <form class="form-grid" method="POST" action="?/verifyOtp" style="margin-top:16px">
                    <input type="hidden" name="email" value={form.email} />
                    <div class="field">
                        <label for="code">Kode OTP</label>
                        <input
                            class="input"
                            type="text"
                            inputmode="numeric"
                            id="code"
                            name="code"
                            autocomplete="one-time-code"
                            required
                            minlength="6"
                            maxlength="6"
                            aria-describedby="code-hint"
                            oninput={normalizeOtp}
                        />
                        <small id="code-hint" class="muted">Masukkan tepat 6 angka dari email.</small>
                    </div>
                    <button type="submit" class="button button-primary">Verifikasi dan masuk</button>
                </form>
            {/if}

            <p class="muted" style="margin-top:24px">
                Informasi Komunitas Premium tersedia di <a href="/komunitas#premium">halaman Komunitas</a>.
            </p>
        </div>
    </section>
</main>
