<script lang="ts">
    import "../app.css";
    import type { ActionData } from './$types';

    interface Props {
        form: ActionData;
    }

    let { form }: Props = $props();
</script>

<svelte:head>
    <title>Login - CryptoSharia</title>
</svelte:head>

<main class="login-page">
    <div class="login-card">
        <div class="logo"></div>
        <h1>Login ke CryptoSharia</h1>
        <p class="muted">Silakan masukkan email dan password Anda.</p>

        {#if form?.error}
            <div class="alert error">
                {form.error}
            </div>
        {/if}

        <form method="POST" action="?/login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required value={form?.email ?? ''} />
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
            </div>

            <button type="submit" class="btn primary full-width">Sign In</button>
        </form>

        <p class="signup-link">
            Belum punya akun? <a href="/community">Gabung Premium</a>
        </p>
    </div>
</main>

<style>
    .login-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 200px);
        padding: 2rem 1rem;
    }

    .login-card {
        background: var(--elev);
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        padding: 2.5rem;
        width: 100%;
        max-width: 400px;
        text-align: center;
    }

    .logo {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%);
        border-radius: 12px;
        margin: 0 auto 1.5rem;
    }

    h1 {
        margin: 0 0 0.5rem;
        font-size: 1.5rem;
    }

    .muted {
        margin-bottom: 2rem;
    }

    .form-group {
        text-align: left;
    }

    .full-width {
        width: 100%;
        margin-top: 1rem;
    }

    .signup-link {
        margin-top: 2rem;
        font-size: 0.875rem;
        color: var(--text-muted);
    }
</style>
