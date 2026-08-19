<script lang="ts">
    import { page } from '$app/state';
    import { theme, type Theme } from '$lib/stores/theme';
    import { tick } from 'svelte';

    let { newsCategories, educationCategories }: { newsCategories: ReadonlyArray<{ label: string; slug: string }>; educationCategories: ReadonlyArray<{ label: string; slug: string }> } = $props();

    const DESKTOP_BREAKPOINT = 1020;
    const themes: Theme[] = ['light', 'dark', 'system'];
    const themeLabels: Record<Theme, string> = {
        light: 'terang',
        dark: 'gelap',
        system: 'mengikuti sistem'
    };

    let menuOpen = $state(false);
    let activeDropdown = $state<string | null>(null);
    let mobileDropdown = $state<string | null>(null);
    let menuButton: HTMLButtonElement;
    let mobilePanel: HTMLElement;
    let siteHeader: HTMLElement;
    let isScrolled = $state(false);
    let scrollFrame = 0;

    const isActive = (path: string) =>
        path === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(path);

    const isCategoryActive = (path: string, category: string) =>
        page.url.pathname === path && page.url.searchParams.get('kategori') === category;

    const isSectionIndex = (path: string) =>
        page.url.pathname === path && !page.url.searchParams.get('kategori');

    const isAnchorActive = (path: string, hash: string, defaultAnchor = false) =>
        page.url.pathname === path &&
        (page.url.hash === hash || (defaultAnchor && page.url.hash === ''));

    function closeMenu(returnFocus = false) {
        menuOpen = false;
        mobileDropdown = null;

        if (returnFocus) {
            menuButton?.focus();
        }
    }

    function closeDesktopDropdown() {
        activeDropdown = null;
    }

    function openDesktopDropdown(dropdown: string) {
        activeDropdown = dropdown;
    }

    function closeDesktopDropdownOnLeave(dropdown: string) {
        if (activeDropdown === dropdown) {
            closeDesktopDropdown();
        }
    }

    function toggleMobileDropdown(dropdown: string) {
        mobileDropdown = mobileDropdown === dropdown ? null : dropdown;
    }

    function handleWindowClick(event: MouseEvent) {
        const target = event.target;
        if (target instanceof Element && !target.closest('.nav-dropdown')) {
            closeDesktopDropdown();
        }
    }

    function handleResize() {
        if (window.innerWidth > DESKTOP_BREAKPOINT) {
            if (menuOpen) closeMenu();
        } else {
            closeDesktopDropdown();
        }
    }

    function handleScroll() {
        if (scrollFrame) return;
        scrollFrame = requestAnimationFrame(() => {
            isScrolled = window.scrollY > 12;
            scrollFrame = 0;
        });
    }

    async function toggleMenu() {
        if (menuOpen) {
            closeMenu(true);
            return;
        }

        menuOpen = true;
        mobileDropdown = null;
        closeDesktopDropdown();
        await tick();
        mobilePanel.querySelector<HTMLElement>('a, button')?.focus();
    }

    function handleMobileNavigate() {
        closeMenu();
        requestAnimationFrame(() => menuButton?.focus());
    }

    function getHeaderFocusables() {
        return Array.from(
            siteHeader.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => element.getClientRects().length > 0);
    }

    function containMobileFocus(event: KeyboardEvent) {
        const focusables = getHeaderFocusables();
        const first = focusables[0];
        const last = focusables.at(-1);
        const current = document.activeElement;

        if (!first || !last) return;

        if (!siteHeader.contains(current)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && current === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && current === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (menuOpen) {
                closeMenu(true);
                return;
            }

            if (activeDropdown) {
                closeDesktopDropdown();
            }
        }

        if (menuOpen && event.key === 'Tab') {
            containMobileFocus(event);
        }
    }

    function toggleTheme() {
        theme.update((current) => themes[(themes.indexOf(current) + 1) % themes.length]);
    }

    $effect(() => {
        page.url.href;
        menuOpen = false;
        mobileDropdown = null;
        activeDropdown = null;
    });

    $effect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;
        const inertTargets = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
        const previousInert = inertTargets.map((element) => element.inert);

        document.body.style.overflow = 'hidden';
        inertTargets.forEach((element) => {
            element.inert = true;
        });

        return () => {
            document.body.style.overflow = previousOverflow;
            inertTargets.forEach((element, index) => {
                element.inert = previousInert[index];
            });
        };
    });
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} onresize={handleResize} onscroll={handleScroll} />

<header class="site-header" class:scrolled={isScrolled} bind:this={siteHeader}>
    <nav class="container site-nav" aria-label="Navigasi utama">
        <a
            class="brand header-brand"
            href="/"
            aria-label="CryptoSharia — Beranda"
            onclick={() => closeMenu()}
        >
            <img src="/logo.webp" alt="" width="30" height="30" />
            <span class="brand-name">CryptoSharia</span>
        </a>

        <div class="desktop-nav">
            <a
                class="nav-link"
                class:active={isActive('/')}
                href="/"
                aria-current={isActive('/') ? 'page' : undefined}
                onclick={() => closeDesktopDropdown()}>Beranda</a
            >

            <div
                class="nav-dropdown"
                class:open={activeDropdown === 'berita'}
                role="group"
                onmouseenter={() => openDesktopDropdown('berita')}
                onmouseleave={() => closeDesktopDropdownOnLeave('berita')}
            >
                <a
                    class="nav-summary"
                    class:active={isActive('/berita')}
                    href="/berita"
                    aria-current={isActive('/berita') ? 'page' : undefined}
                    onclick={() => closeDesktopDropdown()}
                >
                    <span>Berita</span>
                    <svg class="summary-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </a>
                <div
                    id="desktop-berita-menu"
                    class="nav-dropdown-menu"
                    hidden={activeDropdown !== 'berita'}
                >
                    {#each newsCategories as category (category.slug)}
                        <a
                            href={`/berita?kategori=${category.slug}`}
                            aria-current={isCategoryActive('/berita', category.slug) ? 'page' : undefined}
                            onclick={() => closeDesktopDropdown()}>{category.label}</a
                        >
                    {/each}
                </div>
            </div>

            <div
                class="nav-dropdown"
                class:open={activeDropdown === 'edukasi'}
                role="group"
                onmouseenter={() => openDesktopDropdown('edukasi')}
                onmouseleave={() => closeDesktopDropdownOnLeave('edukasi')}
            >
                <a
                    class="nav-summary"
                    class:active={isActive('/edukasi')}
                    href="/edukasi"
                    aria-current={isActive('/edukasi') ? 'page' : undefined}
                    onclick={() => closeDesktopDropdown()}
                >
                    <span>Edukasi</span>
                    <svg class="summary-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </a>
                <div
                    id="desktop-edukasi-menu"
                    class="nav-dropdown-menu"
                    hidden={activeDropdown !== 'edukasi'}
                >
                    {#each educationCategories as category (category.slug)}
                        <a
                            href={`/edukasi?kategori=${category.slug}`}
                            aria-current={isCategoryActive('/edukasi', category.slug) ? 'page' : undefined}
                            onclick={() => closeDesktopDropdown()}>{category.label}</a
                        >
                    {/each}
                </div>
            </div>

            <a
                class="nav-link screening-link"
                class:active={isActive('/screening')}
                href="/screening"
                aria-current={isActive('/screening') ? 'page' : undefined}
                onclick={() => closeDesktopDropdown()}>Screening Coin</a
            >

            <div
                class="nav-dropdown"
                class:open={activeDropdown === 'tentang'}
                role="group"
                onmouseenter={() => openDesktopDropdown('tentang')}
                onmouseleave={() => closeDesktopDropdownOnLeave('tentang')}
            >
                <a
                    class="nav-summary"
                    class:active={isActive('/tentang-kami')}
                    href="/tentang-kami"
                    aria-current={isActive('/tentang-kami') ? 'page' : undefined}
                    onclick={() => closeDesktopDropdown()}
                >
                    <span>Tentang Kami</span>
                    <svg class="summary-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </a>
                <div
                    id="desktop-tentang-menu"
                    class="nav-dropdown-menu"
                    hidden={activeDropdown !== 'tentang'}
                >
                    <a
                        href="/tentang-kami#visi-misi"
                        aria-current={isAnchorActive('/tentang-kami', '#visi-misi')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Visi, Misi & Tujuan</a
                    >
                    <a
                        href="/tentang-kami#tim"
                        aria-current={isAnchorActive('/tentang-kami', '#tim') ? 'location' : undefined}
                        onclick={() => closeDesktopDropdown()}>Tim Kami</a
                    >
                    <a
                        href="/tentang-kami#aktivitas"
                        aria-current={isAnchorActive('/tentang-kami', '#aktivitas')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Aktivitas Kami</a
                    >
                    <a
                        href="/tentang-kami#hubungi-kami"
                        aria-current={isAnchorActive('/tentang-kami', '#hubungi-kami')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Hubungi Kami</a
                    >
                </div>
            </div>

            <div
                class="nav-dropdown"
                class:open={activeDropdown === 'komunitas'}
                role="group"
                onmouseenter={() => openDesktopDropdown('komunitas')}
                onmouseleave={() => closeDesktopDropdownOnLeave('komunitas')}
            >
                <a
                    class="nav-summary"
                    class:active={isActive('/komunitas')}
                    href="/komunitas"
                    aria-current={isActive('/komunitas') ? 'page' : undefined}
                    onclick={() => closeDesktopDropdown()}
                >
                    <span>Komunitas</span>
                    <svg class="summary-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </a>
                <div
                    id="desktop-komunitas-menu"
                    class="nav-dropdown-menu nav-dropdown-menu-end"
                    hidden={activeDropdown !== 'komunitas'}
                >
                    <a
                        href="/komunitas#gabung"
                        aria-current={isAnchorActive('/komunitas', '#gabung')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Gabung Komunitas</a
                    >
                    <a
                        href="/komunitas#sosial-media"
                        aria-current={isAnchorActive('/komunitas', '#sosial-media')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Sosial Media</a
                    >
                    <a
                        href="/komunitas#premium"
                        aria-current={isAnchorActive('/komunitas', '#premium')
                            ? 'location'
                            : undefined}
                        onclick={() => closeDesktopDropdown()}>Komunitas Premium</a
                    >
                </div>
            </div>
        </div>

        <div class="header-actions">
            <button
                class="icon-button theme-toggle"
                type="button"
                onclick={toggleTheme}
                aria-label={`Ubah tema. Tema saat ini: ${themeLabels[$theme]}`}
                title={`Tema: ${themeLabels[$theme]}`}
            >
                {#if $theme === 'light'}
                    <svg class="theme-icon" viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="10" cy="10" r="3.25" />
                        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" />
                    </svg>
                {:else if $theme === 'dark'}
                    <svg class="theme-icon" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M16.7 12.4A7 7 0 0 1 7.6 3.3 7 7 0 1 0 16.7 12.4Z" />
                    </svg>
                {:else}
                    <svg class="theme-icon" viewBox="0 0 20 20" aria-hidden="true">
                        <circle cx="10" cy="10" r="7" />
                        <path class="theme-system-fill" d="M10 3a7 7 0 0 0 0 14Z" />
                    </svg>
                {/if}
            </button>
            <button
                class="icon-button mobile-toggle"
                type="button"
                aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onclick={toggleMenu}
                bind:this={menuButton}
            >
                {#if menuOpen}
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 4l12 12M16 4 4 16" />
                    </svg>
                {:else}
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M3 5h14M3 10h14M3 15h14" />
                    </svg>
                {/if}
            </button>
        </div>
    </nav>

    <nav
        id="mobile-menu"
        class="mobile-panel"
        aria-label="Navigasi utama versi mobile"
        hidden={!menuOpen}
        bind:this={mobilePanel}
    >
        <div class="mobile-panel-inner">
            <a
                class="mobile-primary-link"
                class:active={isActive('/')}
                href="/"
                aria-current={isActive('/') ? 'page' : undefined}
                onclick={handleMobileNavigate}>Beranda</a
            >

            <div class="mobile-group">
                <button
                    class="mobile-group-trigger"
                    class:active={isActive('/berita')}
                    class:open={mobileDropdown === 'berita'}
                    type="button"
                    aria-expanded={mobileDropdown === 'berita'}
                    aria-controls="mobile-berita-menu"
                    onclick={() => toggleMobileDropdown('berita')}
                >
                    <span>Berita</span>
                    <svg class="mobile-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </button>
                <div
                    id="mobile-berita-menu"
                    class="mobile-submenu"
                    hidden={mobileDropdown !== 'berita'}
                >
                    <a
                        href="/berita"
                        aria-current={isSectionIndex('/berita') ? 'page' : undefined}
                        onclick={handleMobileNavigate}>Semua Berita</a
                    >
                    {#each newsCategories as category (category.slug)}
                        <a
                            href={`/berita?kategori=${category.slug}`}
                            aria-current={isCategoryActive('/berita', category.slug) ? 'page' : undefined}
                            onclick={handleMobileNavigate}>{category.label}</a
                        >
                    {/each}
                </div>
            </div>

            <div class="mobile-group">
                <button
                    class="mobile-group-trigger"
                    class:active={isActive('/edukasi')}
                    class:open={mobileDropdown === 'edukasi'}
                    type="button"
                    aria-expanded={mobileDropdown === 'edukasi'}
                    aria-controls="mobile-edukasi-menu"
                    onclick={() => toggleMobileDropdown('edukasi')}
                >
                    <span>Edukasi</span>
                    <svg class="mobile-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </button>
                <div
                    id="mobile-edukasi-menu"
                    class="mobile-submenu"
                    hidden={mobileDropdown !== 'edukasi'}
                >
                    <a
                        href="/edukasi"
                        aria-current={isSectionIndex('/edukasi') ? 'page' : undefined}
                        onclick={handleMobileNavigate}>Semua Edukasi</a
                    >
                    {#each educationCategories as category (category.slug)}
                        <a
                            href={`/edukasi?kategori=${category.slug}`}
                            aria-current={isCategoryActive('/edukasi', category.slug) ? 'page' : undefined}
                            onclick={handleMobileNavigate}>{category.label}</a
                        >
                    {/each}
                </div>
            </div>

            <a
                class="mobile-primary-link screening-link"
                class:active={isActive('/screening')}
                href="/screening"
                aria-current={isActive('/screening') ? 'page' : undefined}
                onclick={handleMobileNavigate}>Screening Coin</a
            >

            <div class="mobile-group">
                <button
                    class="mobile-group-trigger"
                    class:active={isActive('/tentang-kami')}
                    class:open={mobileDropdown === 'tentang'}
                    type="button"
                    aria-expanded={mobileDropdown === 'tentang'}
                    aria-controls="mobile-tentang-menu"
                    onclick={() => toggleMobileDropdown('tentang')}
                >
                    <span>Tentang Kami</span>
                    <svg class="mobile-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </button>
                <div
                    id="mobile-tentang-menu"
                    class="mobile-submenu"
                    hidden={mobileDropdown !== 'tentang'}
                >
                    <a
                        href="/tentang-kami#visi-misi"
                        aria-current={isAnchorActive('/tentang-kami', '#visi-misi')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Visi, Misi & Tujuan</a
                    >
                    <a
                        href="/tentang-kami#tim"
                        aria-current={isAnchorActive('/tentang-kami', '#tim') ? 'location' : undefined}
                        onclick={handleMobileNavigate}>Tim Kami</a
                    >
                    <a
                        href="/tentang-kami#aktivitas"
                        aria-current={isAnchorActive('/tentang-kami', '#aktivitas')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Aktivitas Kami</a
                    >
                    <a
                        href="/tentang-kami#hubungi-kami"
                        aria-current={isAnchorActive('/tentang-kami', '#hubungi-kami')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Hubungi Kami</a
                    >
                </div>
            </div>

            <div class="mobile-group">
                <button
                    class="mobile-group-trigger"
                    class:active={isActive('/komunitas')}
                    class:open={mobileDropdown === 'komunitas'}
                    type="button"
                    aria-expanded={mobileDropdown === 'komunitas'}
                    aria-controls="mobile-komunitas-menu"
                    onclick={() => toggleMobileDropdown('komunitas')}
                >
                    <span>Komunitas</span>
                    <svg class="mobile-chevron" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="m4 6 4 4 4-4" />
                    </svg>
                </button>
                <div
                    id="mobile-komunitas-menu"
                    class="mobile-submenu"
                    hidden={mobileDropdown !== 'komunitas'}
                >
                    <a
                        href="/komunitas#gabung"
                        aria-current={isAnchorActive('/komunitas', '#gabung')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Gabung Komunitas</a
                    >
                    <a
                        href="/komunitas#sosial-media"
                        aria-current={isAnchorActive('/komunitas', '#sosial-media')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Sosial Media</a
                    >
                    <a
                        href="/komunitas#premium"
                        aria-current={isAnchorActive('/komunitas', '#premium')
                            ? 'location'
                            : undefined}
                        onclick={handleMobileNavigate}>Komunitas Premium</a
                    >
                </div>
            </div>
        </div>
    </nav>
</header>

<style>
    .site-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        height: var(--header-height);
        border-bottom: 1px solid var(--border);
        background: rgb(from var(--canvas) r g b / 94%);
        backdrop-filter: none;
        transition: height var(--motion-ui) var(--ease-standard), background var(--motion-ui) var(--ease-standard), border-color var(--motion-ui) var(--ease-standard), backdrop-filter var(--motion-ui) var(--ease-standard);
        animation: header-enter 460ms var(--ease-out) both;
    }

    .site-header.scrolled {
        height: 60px;
        border-bottom-color: color-mix(in srgb, var(--border-control) 60%, var(--border));
        background: var(--header-bg);
        backdrop-filter: blur(10px) saturate(115%);
    }

    .site-nav {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    }

    .header-brand {
        display: inline-flex;
        min-height: 44px;
        flex: 0 0 auto;
        align-items: center;
        gap: 9px;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: -0.018em;
        white-space: nowrap;
    }

    .header-brand img {
        width: 30px;
        height: 30px;
        object-fit: contain;
    }

    .brand-name {
        display: inline;
    }

    .desktop-nav {
        display: flex;
        min-width: 0;
        flex: 1;
        align-items: stretch;
        align-self: stretch;
        justify-content: flex-end;
        gap: 24px;
    }

    .nav-link,
    .nav-summary {
        position: relative;
        display: inline-flex;
        min-height: 44px;
        align-items: center;
        gap: 5px;
        padding: 0;
        color: var(--muted);
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        font-size: 0.875rem;
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        transition: color var(--motion-micro) var(--ease-standard);
    }

    .nav-link:hover,
    .nav-summary:hover,
    .nav-link:focus-visible,
    .nav-summary:focus-visible,
    .nav-link.active,
    .nav-summary.active {
        color: var(--text);
        background: transparent;
        box-shadow: none;
    }

    .nav-link::after,
    .nav-summary::after {
        position: absolute;
        right: 0;
        bottom: -1px;
        left: 0;
        height: 2px;
        background: var(--accent);
        content: '';
        opacity: 0;
        transform: scaleX(0.65);
        transform-origin: center;
        transition: opacity var(--motion-micro) var(--ease-standard), transform var(--motion-ui) var(--ease-out);
    }

    .nav-link:hover::after,
    .nav-summary:hover::after,
    .nav-link:focus-visible::after,
    .nav-summary:focus-visible::after {
        opacity: 0.42;
    }

    .nav-link.active::after,
    .nav-summary.active::after {
        opacity: 1;
        transform: scaleX(1);
    }

    .screening-link {
        font-weight: 600;
    }

    .summary-chevron,
    .mobile-chevron {
        width: 14px;
        height: 14px;
        flex: 0 0 auto;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.6;
        transition: transform 160ms ease;
    }

    .nav-dropdown {
        position: relative;
        display: flex;
        align-items: stretch;
    }

    .nav-dropdown.open .summary-chevron {
        transform: rotate(180deg);
    }

    .nav-dropdown-menu {
        position: absolute;
        top: calc(100% + 1px);
        left: -12px;
        z-index: 10;
        display: grid;
        width: max-content;
        min-width: 210px;
        max-width: 280px;
        gap: 2px;
        padding: 8px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--surface);
        box-shadow: 0 10px 24px rgb(0 0 0 / 16%);
        animation: dropdown-enter var(--motion-micro) var(--ease-out) both;
    }

    .nav-dropdown-menu[hidden] {
        display: none;
    }

    .nav-dropdown-menu-end {
        right: -12px;
        left: auto;
    }

    .nav-dropdown-menu a {
        display: flex;
        min-height: 40px;
        align-items: center;
        padding: 10px 12px;
        color: var(--muted);
        border-left: 2px solid transparent;
        border-radius: 4px;
        font-size: 0.875rem;
        white-space: nowrap;
        transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .nav-dropdown-menu a:hover,
    .nav-dropdown-menu a:focus-visible,
    .nav-dropdown-menu a[aria-current] {
        color: var(--text);
        border-left-color: var(--accent);
        background: var(--surface-muted);
    }

    .header-actions {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        gap: 8px;
    }

    .icon-button {
        display: inline-grid;
        width: 36px;
        height: 36px;
        place-items: center;
        padding: 0;
        color: var(--text);
        border: 1px solid var(--border);
        border-radius: 7px;
        background: transparent;
        box-shadow: none;
        cursor: pointer;
        transition: border-color 160ms ease, background 160ms ease;
    }

    .icon-button:hover,
    .icon-button:focus-visible {
        border-color: var(--border-control);
        background: var(--surface-muted);
    }

    .theme-icon,
    .mobile-toggle svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.6;
    }

    .theme-system-fill {
        fill: currentColor;
        stroke: none;
    }

    .mobile-toggle {
        display: none;
    }

    .mobile-panel {
        display: none;
    }

    @keyframes header-enter {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes dropdown-enter {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 1020px) {
        .site-header,
        .site-header.scrolled {
            height: var(--header-height);
            backdrop-filter: none;
        }

        .site-nav {
            gap: 12px;
        }

        .desktop-nav {
            display: none;
        }

        .header-brand {
            gap: 8px;
            font-size: 0.9375rem;
        }

        .header-brand img {
            width: 28px;
            height: 28px;
        }

        .mobile-toggle {
            display: inline-grid;
        }

        .mobile-panel {
            position: fixed;
            inset: var(--header-height) 0 0;
            display: block;
            max-height: none;
            gap: 0;
            padding: 0;
            overflow-x: hidden;
            overflow-y: auto;
            overscroll-behavior: contain;
            border-bottom: 1px solid var(--border);
            background: var(--canvas);
            box-shadow: none;
        }

        .mobile-panel[hidden] {
            display: none;
        }

        .mobile-panel-inner {
            width: min(var(--max-width), calc(100% - 48px));
            margin-inline: auto;
            padding: 8px 0 32px;
        }

        .mobile-primary-link,
        .mobile-group-trigger {
            position: relative;
            display: flex;
            width: 100%;
            min-height: 56px;
            align-items: center;
            justify-content: space-between;
            padding: 8px 4px;
            color: var(--text);
            border: 0;
            border-bottom: 1px solid var(--border);
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.35;
            text-align: left;
            cursor: pointer;
        }

        .mobile-primary-link.active,
        .mobile-group-trigger.active {
            color: var(--accent-text);
        }

        .mobile-primary-link.active::before,
        .mobile-group-trigger.active::before {
            position: absolute;
            top: 50%;
            left: 0;
            width: 2px;
            height: 20px;
            background: var(--accent);
            content: '';
            transform: translateY(-50%);
        }

        .mobile-group {
            display: block;
            gap: 0;
            padding: 0;
            border: 0;
        }

        .mobile-group-trigger.open .mobile-chevron {
            transform: rotate(180deg);
        }

        .mobile-submenu {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
            padding: 8px 4px 12px 22px;
            border-bottom: 1px solid var(--border);
            animation: submenu-enter var(--motion-micro) var(--ease-out) both;
        }

        .mobile-submenu[hidden] {
            display: none;
        }

        .mobile-submenu a {
            display: flex;
            min-height: 44px;
            align-items: center;
            padding: 7px 0;
            color: var(--muted);
            border-radius: 0;
            font-size: 0.9rem;
        }

        .mobile-submenu a:hover,
        .mobile-submenu a:focus-visible,
        .mobile-submenu a[aria-current] {
            color: var(--text);
        }
    }

    @media (max-width: 680px) {
        .site-nav {
            width: calc(100% - 32px);
        }

        .brand-name {
            display: inline;
        }

        .mobile-panel-inner {
            width: calc(100% - 32px);
        }
    }

    @media (max-width: 340px) {
        .brand-name {
            display: none;
        }
    }

    @keyframes submenu-enter {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
        .site-header,
        .nav-dropdown-menu,
        .mobile-submenu {
            animation: none;
        }
    }
</style>
