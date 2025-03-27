// get all the favorites of a user (needs token)
export const getMyFavorites = async (token: string) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/favorites`, {
		headers: {
			Accept: 'application/json, application/xml',
			Authorization: `Bearer ${token}`
		}
	});
	return response;
};

// add a recipe as Favorite for a user (needs token)
export const postFavorite = async (username: string, recipeID: string, token: string) => {
	const response = await fetch(
		`https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipeID}`,
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

// remove a recipe as Favorite for a user (needs token)
export const deleteFavorite = async (username: string, recipeID: string, token: string) => {
	const response = await fetch(
		`https://gourmet.cours.quimerch.com/users/${username}/favorites?recipeID=${recipeID}`,
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
