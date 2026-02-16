import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default to dark mode (false = light mode, true = dark mode)
// The toggle is "Dark Mode", so checked = true = dark.
const defaultValue = true;

// This initial value is used if not in browser or if localStorage is not yet processed by init()
const initialThemeValue = browser
    ? localStorage.getItem('theme-preference') === 'dark' || localStorage.getItem('theme-preference') === null
    : defaultValue;

function createThemeStore() {
    const { subscribe, set, update } = writable<boolean>(initialThemeValue);

    return {
        subscribe,
        set: (value: boolean) => {
            if (browser) {
                localStorage.setItem('theme-preference', value ? 'dark' : 'light');
                // If true (dark), REMOVE light-mode class. If false (light), ADD light-mode class.
                // Global CSS default is dark.
                document.body.classList.toggle('light-mode', !value);
            }
            set(value);
        },
        toggle: () => update(v => {
            const newValue = !v;
            if (browser) {
                localStorage.setItem('theme-preference', newValue ? 'dark' : 'light');
                document.body.classList.toggle('light-mode', !newValue);
            }
            return newValue;
        }),
        init: () => {
            if (browser) {
                // If stored is 'light', set to false. If 'dark' or null, set to true.
                const stored = localStorage.getItem('theme-preference');
                const isDark = stored !== 'light'; // Default to dark if not explicitly 'light'
                set(isDark);
                document.body.classList.toggle('light-mode', !isDark);
            }
        }
    };
}

export const theme = createThemeStore();

// Initialize the theme on page load
if (browser) {
    theme.init();
}
