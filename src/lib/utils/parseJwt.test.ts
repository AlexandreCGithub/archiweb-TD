import { describe, test, expect } from 'vitest';
import { parseJwt } from './parseJwt';
// Fake JWT for testing purposes
const createTestJwt = (payload: object) => {
	const base64UrlEncode = (obj: object) =>
		btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

	const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
	const body = base64UrlEncode(payload);
	const signature = 'signature';

	return `${header}.${body}.${signature}`;
};

describe('parseJwt', () => {
	test('return null if token null', () => {
		expect(parseJwt(null)).toBeNull();
	});

	test('return null if token undefined', () => {
		expect(parseJwt(undefined)).toBeNull();
	});

	test('return decoded object if valid token', () => {
		const payload = { userId: 123, name: 'John' };
		const token = createTestJwt(payload);
		expect(parseJwt(token)).toEqual(payload);
	});

	test('return error for invalid token', () => {
		const malformedToken = 'invalid.token.string';
		const result = parseJwt(malformedToken);
		expect(result).toBeInstanceOf(Error);
	});
});
