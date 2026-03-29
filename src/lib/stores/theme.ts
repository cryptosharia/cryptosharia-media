import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

// Default value should be 'system' or 'dark'
const initialValue: Theme = browser
    ? (localStorage.getItem('theme-preference') as Theme) || 'system'
    : 'dark';

export const theme = writable<Theme>(initialValue);

if (browser) {
    const applyTheme = (value: Theme) => {
        let actualTheme: 'light' | 'dark' = 'dark';
        
        if (value === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } else {
            actualTheme = value;
        }

        if (actualTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        
        localStorage.setItem('theme-preference', value);
    };

    theme.subscribe(applyTheme);

    // Watch for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme-preference') as Theme || 'system';
        if (currentTheme === 'system') {
            if (e.matches) {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        }
    });
}
