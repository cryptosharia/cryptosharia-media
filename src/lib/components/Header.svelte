<script lang="ts">
    import { page } from "$app/stores";
    import { theme, type Theme } from "$lib/stores/theme";

    let searchQuery = $state("");

    function isActive(path: string) {
        if (path === "/") {
            return $page.url.pathname === "/";
        }
        return $page.url.pathname.startsWith(path);
    }

    const themes: Theme[] = ['light', 'dark', 'system'];
    const themeIcons = {
        light: "M12 3v1m0 16v1m9-9h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
        dark: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
        system: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M3 5h18v10H3V5z M8 20h8v1H8v-1z"
    };

    function toggleTheme() {
        theme.update(current => {
            const nextIndex = (themes.indexOf(current) + 1) % themes.length;
            return themes[nextIndex];
        });
    }
</script>

<header class="site-header">
    <nav class="menu">
        <a href="/" class="brand">
            <div class="logo">
                <img
                    src="/logo.png"
                    alt="CryptoSharia Logo"
                    style="width: 100%; height: 100%; object-fit: contain;"
                />
            </div>
        </a>
        <a href="/" class:active={isActive("/")}>News</a>
        <a href="/education" class:active={isActive("/education")}>Education</a>
        <a href="/research" class:active={isActive("/research")}>Research</a>
        <a href="/screening" class:active={isActive("/screening")}>Screening</a>
        <a href="/community" class:active={isActive("/community")}>Premium</a>

        <button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
            {#if $theme === 'light'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d={themeIcons.light} />
                </svg>
            {:else}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d={themeIcons.dark} />
                </svg>
            {/if}
            <span class="theme-label">{$theme}</span>
        </button>
    </nav>
    <div class="container nav">
        {#if !["/community", "/", "/education", "/research", "/screening"].includes($page.url.pathname) && !$page.url.pathname.startsWith('/article') && !$page.url.pathname.startsWith('/tokens/')}
            <form action="/screening" method="get" class="search">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    name="q"
                    placeholder="Cari koin..."
                    bind:value={searchQuery}
                />
            </form>
        {/if}
    </div>
</header>

<style>
    .theme-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.45rem 0.75rem;
        border-radius: 10px;
        color: var(--muted);
        border: 1px solid var(--border-color);
        background: transparent;
        cursor: pointer;
        transition: all 0.2s;
        text-transform: capitalize;
        font-size: 0.85rem;
        margin-left: 0.5rem;
    }

    .theme-toggle:hover {
        color: var(--text);
        border-color: rgba(255, 248, 248, 0.3);
        background: rgba(255, 248, 248, 0.04);
    }

    :global(body.light-mode) .theme-toggle:hover {
        border-color: rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.04);
    }

    .theme-label {
        font-weight: 500;
        opacity: 0.8;
    }

    @media (max-width: 900px) {
        .theme-toggle {
            display: none;
        }
    }
</style>
