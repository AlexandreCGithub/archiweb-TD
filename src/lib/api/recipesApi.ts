export const getRecipe = async (slug: string) => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes/${slug}`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	return response;
};

export const getRecipes = async () => {
	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	return response;
};
