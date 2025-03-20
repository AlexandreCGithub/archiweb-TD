export const postLogin = async (username: string, password: string) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/login`, {
		method: 'POST',
		headers: {
			Accept: 'application/json, application/xml',
			'Content-Type': '*/*'
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	});
	return response;
};
