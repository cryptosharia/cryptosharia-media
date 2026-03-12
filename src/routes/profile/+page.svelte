<script lang="ts">
    import { theme } from "$lib/stores/theme";
    import "../../app.css";
    import type { PageData, ActionData } from './$types';

    interface Props {
        data: PageData;
        form?: ActionData;
    }

    let { data, form }: Props = $props();
    let user = $derived(data.user);

    // Use the store directly for darkMode
    let pushNotification = $state(true);
    let newsletter = $state(false);
</script>

<svelte:head>
    <title>Profile - CryptoSharia News</title>
    <meta
        name="description"
        content="Portal news seputar crypto & syariah: fatwa, teknologi, dan pasar."
    />
</svelte:head>

<main class="container">
    <div class="profile-page">
        <div class="profile-header">
            <img src={form?.avatarUrl || user.avatar || 'https://images.squarespace-cdn.com/content/v1/5d016c1ba9f2e7000120c08c/1560579210527-7LDCZH62S91OLOJIKAE9/AdobeStock_87517185.jpeg?format=1500w'} alt="Avatar" class="avatar" />
            <div class="info">
                <span class="welcome">Welcome</span>
                <span class="name">{user.name}</span>
            </div>
        </div>

        <div class="avatar-upload-section">
            <form method="POST" action="?/uploadAvatar" enctype="multipart/form-data" class="upload-form">
                <label for="avatarFile" class="btn secondary btn-sm">Ganti Avatar</label>
                <input type="file" id="avatarFile" name="avatar" accept="image/*" class="sr-only" onchange={(e) => e.currentTarget.form?.submit()} />
            </form>
            {#if form?.error}
                <p class="text-sm error-text mt-1">{form.error}</p>
            {/if}
            {#if form?.uploadSuccess}
                <p class="text-sm success-text mt-1">Avatar berhasil diperbarui!</p>
            {/if}
        </div>

        <div class="profile-section">
            <ul class="profile-list">
                <li>
                    <a href="#">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>Password</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chevron"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </li>
                <li class="item-toggle">
                    <div class="label">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                            ></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <span>Push Notification</span>
                    </div>
                    <label class="switch">
                        <input
                            type="checkbox"
                            bind:checked={pushNotification}
                        />
                        <span class="slider"></span>
                    </label>
                </li>
                <li class="item-toggle">
                    <div class="label">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                            ></path>
                        </svg>
                        <span>Dark Mode</span>
                    </div>
                    <label class="switch">
                        <input
                            type="checkbox"
                            id="darkModeToggle"
                            checked={$theme}
                            onchange={(e) => theme.set(e.currentTarget.checked)}
                        />
                        <span class="slider"></span>
                    </label>
                </li>
                <li class="item-toggle">
                    <div class="label">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            ></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>Subscribe Newsletter</span>
                    </div>
                    <label class="switch">
                        <input type="checkbox" bind:checked={newsletter} />
                        <span class="slider"></span>
                    </label>
                </li>
            </ul>
        </div>

        <div class="profile-section">
            <ul class="profile-list">
                <li>
                    <a href="#">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                            ></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span>Help Center</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chevron"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                            ></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                        <span>Terms of Use</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chevron"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            ></path>
                        </svg>
                        <span>Privacy Policy</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chevron"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>

        <div class="profile-section">
            <ul class="profile-list">
                <li class="danger-zone">
                    <a href="#">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                        </svg>
                        <span>Delete Account</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="chevron"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>

        <div class="logout-section">
            <form method="POST" action="?/logout">
                <button type="submit" class="btn-logout">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Log Out</span>
                </button>
            </form>
        </div>

        <div class="version-footer">
            <p>Version 2.2.1, © 2025 CryptoSharia</p>
            <p>Portal Berita & Edukasi Kripto Syariah</p>
        </div>
    </div>
</main>

<style>
    /* Profile Page */
    .profile-page {
        max-width: 600px;
        margin: 0 auto;
        padding: 1rem 0 6rem;
    }

    .profile-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--elev);
        border-radius: var(--radius);
        border: 1px solid var(--border-color);
        margin-bottom: 1.5rem;
        transition:
            transform 0.2s,
            background 0.2s;
    }

    .profile-header:hover {
        transform: translateY(-2px);
        background: rgba(255, 248, 248, 0.03);
    }

    :global(body.light-mode) .profile-header:hover {
        background: rgba(0, 0, 0, 0.03);
    }

    .profile-header .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--brand);
    }

    .profile-header .info {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .avatar-upload-section {
        margin-top: -1rem;
        margin-bottom: 2rem;
        text-align: center;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .btn-sm {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
        cursor: pointer;
        display: inline-block;
    }

    .error-text { color: #ef4444; }
    .success-text { color: #10b981; }
    .text-sm { font-size: 0.875rem; }
    .mt-1 { margin-top: 0.5rem; }

    .profile-header .welcome {
        font-size: 0.85rem;
        color: var(--muted);
    }

    .profile-header .name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text);
    }

    .profile-section {
        margin-bottom: 1.5rem;
        background: var(--elev);
        border-radius: var(--radius);
        border: 1px solid var(--border-color);
        overflow: hidden;
    }

    .profile-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .profile-list li {
        border-bottom: 1px solid var(--border-color);
    }

    .profile-list li:last-child {
        border-bottom: none;
    }

    .profile-list li a,
    .profile-list li.item-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        color: var(--text);
        gap: 1rem;
        transition: background 0.2s;
        cursor: pointer;
    }

    .profile-list li a:hover {
        background: rgba(255, 248, 248, 0.03);
    }

    :global(body.light-mode) .profile-list li a:hover {
        background: rgba(0, 0, 0, 0.03);
    }

    .profile-list li a span,
    .profile-list li .label span {
        flex: 1;
        font-weight: 500;
    }

    .profile-list li svg {
        color: var(--muted);
    }

    .profile-list li a .chevron {
        color: var(--muted);
        opacity: 0.5;
    }

    .profile-list li.danger-zone a {
        color: var(--danger);
    }

    .profile-list li.danger-zone svg {
        color: var(--danger);
    }

    .profile-list .label {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }

    /* Switch Toggle */
    .switch {
        position: relative;
        display: inline-block;
        width: 46px;
        height: 26px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--border-color);
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--brand);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--brand);
    }

    input:checked + .slider:before {
        transform: translateX(20px);
    }

    /* Logout & Footer */
    .logout-section {
        margin-top: 2rem;
    }

    .btn-logout {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: var(--radius);
        background: rgba(255, 39, 39, 0.1);
        color: #ff2727;
        border: 1px solid rgba(255, 39, 39, 0.2);
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-logout:hover {
        background: rgba(255, 39, 39, 0.15);
        transform: translateY(-1px);
    }

    .version-footer {
        text-align: center;
        margin-top: 2rem;
        color: var(--muted);
        font-size: 0.85rem;
    }

    .version-footer p {
        margin: 0.25rem 0;
    }
</style>
