<script lang="ts">
    import "../../app.css";

    let darkMode = $state(true);
    let pushNotification = $state(true);
    let newsletter = $state(false);

    const user = {
        name: "Naufal Nabila",
        email: "naufal@cryptosharia.id",
        joinDate: "2024-01-15",
        membershipType: "Premium",
    };

    const settingsLinks = [
        { icon: "🔐", label: "Password", href: "/profile/password" },
        { icon: "❓", label: "Help Center", href: "/help" },
        { icon: "📋", label: "Terms of Use", href: "/terms" },
        { icon: "🔒", label: "Privacy Policy", href: "/privacy" },
    ];
</script>

<svelte:head>
    <title>Profile · CryptoSharia</title>
    <meta
        name="description"
        content="Kelola profil dan pengaturan akun CryptoSharia Anda."
    />
</svelte:head>

<header>
    <nav class="menu">
        <a href="/">News</a>
        <a href="/education">Education</a>
        <a href="/research">Research</a>
        <a href="/community">Premium</a>
        <a href="/profile" class="active">Profile</a>
    </nav>
    <div class="container nav">
        <a href="/" class="brand">
            <div class="logo"></div>
            <span class="title">CryptoSharia</span>
        </a>
    </div>
</header>

<main class="container profile-page">
    <!-- User Info -->
    <section class="user-info">
        <div class="avatar">👤</div>
        <div class="details">
            <h2>Welcome</h2>
            <h3>{user.name}</h3>
            <span class="membership">{user.membershipType}</span>
        </div>
    </section>

    <!-- Settings -->
    <section class="settings-section">
        <h4>Pengaturan</h4>

        <div class="setting-item">
            <div class="setting-label">
                <span class="icon">🔐</span>
                <span>Password</span>
            </div>
            <a href="/profile/password" class="setting-action">Ubah →</a>
        </div>

        <div class="setting-item">
            <div class="setting-label">
                <span class="icon">🔔</span>
                <span>Push Notification</span>
            </div>
            <label class="toggle">
                <input type="checkbox" bind:checked={pushNotification} />
                <span class="slider"></span>
            </label>
        </div>

        <div class="setting-item">
            <div class="setting-label">
                <span class="icon">🌙</span>
                <span>Dark Mode</span>
            </div>
            <label class="toggle">
                <input type="checkbox" bind:checked={darkMode} />
                <span class="slider"></span>
            </label>
        </div>

        <div class="setting-item">
            <div class="setting-label">
                <span class="icon">📧</span>
                <span>Subscribe Newsletter</span>
            </div>
            <label class="toggle">
                <input type="checkbox" bind:checked={newsletter} />
                <span class="slider"></span>
            </label>
        </div>
    </section>

    <!-- Links -->
    <section class="settings-section">
        <h4>Bantuan & Legal</h4>
        {#each settingsLinks as link}
            <a href={link.href} class="setting-item link">
                <div class="setting-label">
                    <span class="icon">{link.icon}</span>
                    <span>{link.label}</span>
                </div>
                <span class="arrow">→</span>
            </a>
        {/each}
    </section>

    <!-- Danger Zone -->
    <section class="settings-section danger">
        <a href="/profile/delete" class="setting-item link danger">
            <div class="setting-label">
                <span class="icon">⚠️</span>
                <span>Delete Account</span>
            </div>
            <span class="arrow">→</span>
        </a>
    </section>

    <footer class="profile-footer">
        <p>Version 2.2.1</p>
        <p>© 2025 CryptoSharia</p>
    </footer>
</main>

<style>
    .profile-page {
        max-width: 600px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .user-info {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: var(--elev);
        border-radius: var(--radius);
        padding: 2rem;
        margin-bottom: 1.5rem;
    }
    .avatar {
        width: 80px;
        height: 80px;
        background: var(--border-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
    }
    .details h2 {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted);
        font-weight: normal;
    }
    .details h3 {
        margin: 0.25rem 0;
        font-size: 1.5rem;
    }
    .membership {
        background: var(--brand);
        color: var(--bg);
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    .settings-section {
        background: var(--elev);
        border-radius: var(--radius);
        margin-bottom: 1rem;
        overflow: hidden;
    }
    .settings-section h4 {
        padding: 1rem 1.5rem 0.5rem;
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-muted);
    }
    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
    .setting-item:last-child {
        border-bottom: none;
    }
    .setting-item.link {
        text-decoration: none;
        color: var(--text);
        cursor: pointer;
        transition: background 0.2s;
    }
    .setting-item.link:hover {
        background: var(--bg);
    }
    .setting-item.danger {
        color: #ef4444;
    }
    .setting-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    .setting-label .icon {
        font-size: 1.25rem;
    }
    .setting-action {
        color: var(--brand);
        text-decoration: none;
        font-size: 0.875rem;
    }
    .toggle {
        position: relative;
        width: 48px;
        height: 28px;
    }
    .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background: var(--border-color);
        border-radius: 28px;
        transition: 0.3s;
    }
    .slider::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        left: 4px;
        bottom: 4px;
        background: white;
        border-radius: 50%;
        transition: 0.3s;
    }
    .toggle input:checked + .slider {
        background: var(--brand);
    }
    .toggle input:checked + .slider::before {
        transform: translateX(20px);
    }
    .profile-footer {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
        font-size: 0.875rem;
    }
    .profile-footer p {
        margin: 0.25rem 0;
    }
</style>
