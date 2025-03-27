import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// store for the search feature
const defaultValue = '';
const initialValue = browser
	? (window.localStorage.getItem('searchValue') ?? defaultValue)
	: defaultValue;

const searchValue = writable<string>(initialValue);

searchValue.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('searchValue', value);
	}
});

export default searchValue;
