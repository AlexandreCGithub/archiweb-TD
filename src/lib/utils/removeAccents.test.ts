import { describe, it, expect } from 'vitest';
import { removeAccents } from './removeAccents';

describe('removeAccents', () => {
	it('should remove accents from a string', () => {
		const input = 'éèêà';
		const output = 'eeea';
		expect(removeAccents(input)).toBe(output);
	});

	it('should handle an empty string', () => {
		const input = '';
		const output = '';
		expect(removeAccents(input)).toBe(output);
	});

	it('should return the same string if there are no accents', () => {
		const input = 'abc';
		const output = 'abc';
		expect(removeAccents(input)).toBe(output);
	});
});
