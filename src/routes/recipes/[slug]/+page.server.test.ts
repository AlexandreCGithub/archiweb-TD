import { expect, test } from 'vitest';

test('Multiplier', () => {
	let double = 0;

	expect(double).toEqual(0);

	double = 4;

	expect(double).toEqual(10);
});