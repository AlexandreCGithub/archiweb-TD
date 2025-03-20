export const fetchMyFavorites = async (token: string) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
		headers: {
			Accept: 'application/json, application/xml',
			Authorization: `Bearer ${token}`
		}
	});
	return response;
};

export const addAFavorite = async (userPseudo: string, recipeID: string, token: string) => {
	const response = await fetch(
		`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json, application/xml',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);
	return response;
};

export const deleteAFavorite = async (userPseudo: string, recipeID: string, token: string) => {
	const response = await fetch(
		`https://gourmet.cours.quimerch.com/users/${userPseudo}/favorites?recipeID=${recipeID}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json, application/xml',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
	);
	return response;
};
