<script lang="ts">
    import { page } from "$app/stores";

    function isActive(path: string) {
        if (path === "/") return $page.url.pathname === "/";
        return $page.url.pathname.startsWith(path);
    }
</script>

<nav class="bottom-nav" aria-label="Navigasi cepat">
    <a href="/berita" class="tab" class:active={isActive("/berita")} aria-current={isActive("/berita") ? 'page' : undefined}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8Z"
            />
        </svg>
        <span>News</span>
    </a>
    <a href="/edukasi" class="tab" class:active={isActive("/edukasi")} aria-current={isActive("/edukasi") ? 'page' : undefined}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
        </svg>
        <span>Education</span>
    </a>
    <a href="/riset" class="tab" class:active={isActive("/riset")} aria-current={isActive("/riset") ? 'page' : undefined}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
        <span>Research</span>
    </a>
    <a href="/screening" class="tab" class:active={isActive("/screening")} aria-current={isActive("/screening") ? 'page' : undefined}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l2 2 4-4" />
        </svg>
        <span>Screening</span>
    </a>
    <a href="/komunitas#premium" class="tab" class:active={isActive("/komunitas")} aria-current={isActive("/komunitas") ? 'page' : undefined}>
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Premium</span>
    </a>
</nav>

<style>
    .bottom-nav{position:fixed;right:0;bottom:0;left:0;z-index:900;display:none;grid-template-columns:repeat(5,minmax(0,1fr));padding:4px 8px calc(4px + env(safe-area-inset-bottom));border-top:1px solid var(--border);background:var(--surface)}
    .tab{display:grid;min-width:0;min-height:54px;align-content:center;justify-items:center;gap:3px;padding:4px 2px;color:var(--muted);border-radius:7px;font-size:.63rem;font-weight:650;line-height:1.1;text-align:center}
    .tab svg{width:19px;height:19px}
    .tab.active{color:var(--accent-text);background:color-mix(in srgb,var(--accent) 9%,var(--surface))}
    .tab:focus-visible{outline-offset:-2px}
    @media(max-width:1020px){.bottom-nav{display:grid}}
    @media(max-width:360px){.tab{font-size:.58rem}}
</style>
