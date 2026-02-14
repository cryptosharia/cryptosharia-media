import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default to dark mode (false = light mode, true = dark mode)
// The toggle is "Dark Mode", so checked = true = dark.
const defaultValue = true;

const initialValue = browser
    ? localStorage.getItem('theme-preference') === 'dark' || localStorage.getItem('theme-preference') === null
    : defaultValue;

export const theme = writable<boolean>(initialValue);

if (browser) {
    theme.subscribe((value) => {
        // value = true -> Dark Mode -> Remove 'light-mode' class
        // value = false -> Light Mode -> Add 'light-mode' class
        if (value) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme-preference', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme-preference', 'light');
        }
    });
}
