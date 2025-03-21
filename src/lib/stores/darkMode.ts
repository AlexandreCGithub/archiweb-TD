import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultValue = 'true';
const initialValue = browser
	? (window.localStorage.getItem('darkMode') ?? defaultValue)
	: defaultValue;

const darkMode = writable<string>(initialValue);

darkMode.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('darkMode', value);
	}
});

export default darkMode;
