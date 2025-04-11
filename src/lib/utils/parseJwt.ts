export const parseJwt = (token: string | null | undefined) => {
	if (!token) return null;
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return e;
	}
};
