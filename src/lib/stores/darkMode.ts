import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// this store manages the dark mode of the app
const defaultValue = 'true'; // by default, darkmode
const initialValue = browser
	? (window.localStorage.getItem('darkMode') ?? defaultValue)
	: defaultValue; // initial value from browser

const darkMode = writable<string>(initialValue);

darkMode.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('darkMode', value);
	}
});

export default darkMode;
