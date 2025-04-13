/**
 * Parses a JSON Web Token (JWT) and extracts its payload.
 *
 * @param token - The JWT string to parse. Can be `null` or `undefined`.
 * @returns The parsed payload as an object if the token is valid, or `null` if the token is not provided.
 *          If an error occurs during parsing, the error object is returned.
 */
export const parseJwt = (token: string | null | undefined) => {
	if (!token) return null;
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return e;
	}
};
