<script lang="ts">
    import { page } from "$app/stores";

    let searchQuery = $state("");

    function isActive(path: string) {
        if (path === "/") {
            return $page.url.pathname === "/";
        }
        return $page.url.pathname.startsWith(path);
    }
</script>

<header>
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
