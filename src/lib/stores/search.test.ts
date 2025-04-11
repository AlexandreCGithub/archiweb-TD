import { describe, test, expect, vi, beforeAll } from 'vitest';
import searchValue from './search';

beforeAll(() => {
	vi.stubGlobal('localStorage', {
		getItem: vi.fn(() => ''),
		setItem: vi.fn()
	});
});

describe('searchValue store', () => {
	test('should initialize with the default value', () => {
		const searchValueStore = searchValue;
		searchValueStore.subscribe((value) => {
			expect(value).toBe('');
		});
	});
});
