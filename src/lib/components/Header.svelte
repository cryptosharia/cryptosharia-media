<script lang="ts">
    import { page } from '$app/state';
    import { EDUCATION_CATEGORIES, NEWS_CATEGORIES } from '$lib/config';
    import { theme, type Theme } from '$lib/stores/theme';
    import { tick } from 'svelte';

    let menuOpen = $state(false);
    let activeDropdown = $state<string | null>(null);
    let menuButton: HTMLButtonElement;
    let mobilePanel: HTMLElement;
    const themes: Theme[] = ['light', 'dark', 'system'];

    const isActive = (path: string) =>
        path === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(path);

    function closeMenu() {
        menuOpen = false;
    }

    function closeDesktopDropdown() {
        activeDropdown = null;
    }

    function handleDropdownToggle(event: Event, dropdown: string) {
        const details = event.currentTarget as HTMLDetailsElement;
        if (details.open) {
            activeDropdown = dropdown;
        } else if (activeDropdown === dropdown) {
            activeDropdown = null;
        }
    }

    function handleWindowClick(event: MouseEvent) {
        const target = event.target;
        if (target instanceof Element && !target.closest('.nav-dropdown')) {
            closeDesktopDropdown();
        }
    }

    async function toggleMenu() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            await tick();
            mobilePanel.querySelector<HTMLAnchorElement>('a')?.focus();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (activeDropdown && event.key === 'Escape') {
            closeDesktopDropdown();
        }
        if (menuOpen && event.key === 'Escape') {
            closeMenu();
            menuButton.focus();
        }
    }

    function toggleTheme() {
        theme.update((current) => themes[(themes.indexOf(current) + 1) % themes.length]);
    }
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<header class="site-header">
    <nav class="container site-nav" aria-label="Navigasi utama">
        <a class="brand" href="/" aria-label="CryptoSharia — Beranda" onclick={closeMenu}>
            <img src="/logo.png" alt="" width="38" height="38" />
            <span>CryptoSharia</span>
        </a>

        <div class="desktop-nav">
            <a class="nav-link" class:active={isActive('/')} href="/" aria-current={isActive('/') ? 'page' : undefined} onclick={closeDesktopDropdown}>Beranda</a>

            <details class="nav-dropdown" open={activeDropdown === 'berita'} ontoggle={(event) => handleDropdownToggle(event, 'berita')}>
                <summary class="nav-summary" class:active={isActive('/berita')}>Berita <span aria-hidden="true">⌄</span></summary>
                <div class="nav-dropdown-menu">
                    <a href="/berita" onclick={closeDesktopDropdown}>Semua Berita</a>
                    {#each NEWS_CATEGORIES as category (category.slug)}
                        <a href={`/berita?kategori=${category.slug}`} onclick={closeDesktopDropdown}>{category.label}</a>
                    {/each}
                </div>
            </details>

            <details class="nav-dropdown" open={activeDropdown === 'edukasi'} ontoggle={(event) => handleDropdownToggle(event, 'edukasi')}>
                <summary class="nav-summary" class:active={isActive('/edukasi')}>Edukasi <span aria-hidden="true">⌄</span></summary>
                <div class="nav-dropdown-menu">
                    <a href="/edukasi" onclick={closeDesktopDropdown}>Semua Edukasi</a>
                    {#each EDUCATION_CATEGORIES as category (category.slug)}
                        <a href={`/edukasi?kategori=${category.slug}`} onclick={closeDesktopDropdown}>{category.label}</a>
                    {/each}
                </div>
            </details>

            <a class="nav-link" class:active={isActive('/screening')} href="/screening" onclick={closeDesktopDropdown}>Screening Coin</a>

            <details class="nav-dropdown" open={activeDropdown === 'tentang'} ontoggle={(event) => handleDropdownToggle(event, 'tentang')}>
                <summary class="nav-summary" class:active={isActive('/tentang-kami')}>Tentang Kami <span aria-hidden="true">⌄</span></summary>
                <div class="nav-dropdown-menu">
                    <a href="/tentang-kami#visi-misi" onclick={closeDesktopDropdown}>Visi, Misi & Tujuan</a>
                    <a href="/tentang-kami#tim" onclick={closeDesktopDropdown}>Tim Kami</a>
                    <a href="/tentang-kami#aktivitas" onclick={closeDesktopDropdown}>Aktivitas Kami</a>
                    <a href="/tentang-kami#hubungi-kami" onclick={closeDesktopDropdown}>Hubungi Kami</a>
                </div>
            </details>

            <details class="nav-dropdown" open={activeDropdown === 'komunitas'} ontoggle={(event) => handleDropdownToggle(event, 'komunitas')}>
                <summary class="nav-summary" class:active={isActive('/komunitas')}>Komunitas <span aria-hidden="true">⌄</span></summary>
                <div class="nav-dropdown-menu">
                    <a href="/komunitas#gabung" onclick={closeDesktopDropdown}>Gabung Komunitas</a>
                    <a href="/komunitas#sosial-media" onclick={closeDesktopDropdown}>Sosial Media</a>
                    <a href="/komunitas#premium" onclick={closeDesktopDropdown}>Komunitas Premium</a>
                </div>
            </details>
        </div>

        <div class="header-actions">
            <button class="icon-button" type="button" onclick={toggleTheme} aria-label={`Tema saat ini: ${$theme}. Ganti tema`} title={`Tema: ${$theme}`}>
                {#if $theme === 'light'}☀{:else if $theme === 'dark'}☾{:else}◐{/if}
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
                {menuOpen ? '×' : '☰'}
            </button>
        </div>
    </nav>

    <nav id="mobile-menu" class="mobile-panel" aria-label="Navigasi utama versi mobile" hidden={!menuOpen} bind:this={mobilePanel}>
        <a href="/" onclick={closeMenu}>Beranda</a>
        <div class="mobile-group">
            <strong>Berita</strong>
            <a href="/berita" onclick={closeMenu}>Semua Berita</a>
            {#each NEWS_CATEGORIES as category (category.slug)}
                <a href={`/berita?kategori=${category.slug}`} onclick={closeMenu}>{category.label}</a>
            {/each}
        </div>
        <div class="mobile-group">
            <strong>Edukasi</strong>
            <a href="/edukasi" onclick={closeMenu}>Semua Edukasi</a>
            {#each EDUCATION_CATEGORIES as category (category.slug)}
                <a href={`/edukasi?kategori=${category.slug}`} onclick={closeMenu}>{category.label}</a>
            {/each}
        </div>
        <a href="/screening" onclick={closeMenu}>Screening Coin</a>
        <div class="mobile-group">
            <strong>Tentang Kami</strong>
            <a href="/tentang-kami#visi-misi" onclick={closeMenu}>Visi, Misi & Tujuan</a>
            <a href="/tentang-kami#tim" onclick={closeMenu}>Tim Kami</a>
            <a href="/tentang-kami#aktivitas" onclick={closeMenu}>Aktivitas Kami</a>
            <a href="/tentang-kami#hubungi-kami" onclick={closeMenu}>Hubungi Kami</a>
        </div>
        <div class="mobile-group">
            <strong>Komunitas</strong>
            <a href="/komunitas#gabung" onclick={closeMenu}>Gabung Komunitas</a>
            <a href="/komunitas#sosial-media" onclick={closeMenu}>Sosial Media</a>
            <a href="/komunitas#premium" onclick={closeMenu}>Komunitas Premium</a>
        </div>
    </nav>
</header>
