import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const initialValue: Theme = browser
    ? (localStorage.getItem('theme-preference') as Theme) || 'system'
    : 'system';

export const theme = writable<Theme>(initialValue);

if (browser) {
    const applyTheme = (value: Theme) => {
        let actualTheme: 'light' | 'dark' = 'light';
        
        if (value === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } else {
            actualTheme = value;
        }

        document.documentElement.dataset.theme = actualTheme;
        
        localStorage.setItem('theme-preference', value);
    };

    theme.subscribe(applyTheme);

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme-preference') as Theme || 'system';
        if (currentTheme === 'system') {
            document.documentElement.dataset.theme = e.matches ? 'light' : 'dark';
        }
    });
}
