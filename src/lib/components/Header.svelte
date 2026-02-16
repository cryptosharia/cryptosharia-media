<script lang="ts">
    import { page } from "$app/stores";

    function isActive(path: string) {
        if (path === "/") {
            return $page.url.pathname === "/";
        }
        return $page.url.pathname.startsWith(path);
    }
</script>

<header>
    <nav class="menu">
        <a href="/" class:active={isActive("/")}>News</a>
        <a href="/education" class:active={isActive("/education")}>Education</a>
        <a href="/research" class:active={isActive("/research")}>Research</a>
        <a href="/screening" class:active={isActive("/screening")}>Screening</a>
        <a href="/community" class:active={isActive("/community")}>Premium</a>
        <a href="/profile" class:active={isActive("/profile")}>Profile</a>
    </nav>
    <div class="container nav">
        <a href="/" class="brand">
            <div class="logo"></div>
            <div>
                <div class="title">CryptoSharia</div>
                <div class="muted" style="font-size: 0.85rem">
                    News & Education
                </div>
            </div>
        </a>
        <div class="search">
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
            <input type="text" placeholder="Cari berita..." />
        </div>
    </div>
</header>
