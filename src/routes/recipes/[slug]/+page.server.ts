import type { PageServerLoad,Actions } from './$types';

const TOKEN = ""; // TO BE REPLACED
const USER = "";

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const response = await fetch(`https://gourmet.cours.quimerch.com/recipes/${slug}`, {
		headers: {
			Accept: 'application/json, application/xml'
		}
	});
	const data = await response.json();
	return {
		recipe: data
	};
};

export const actions = {
	// add a favorite
	addFavorite: async ({ request }) => {
	  const formData = await request.formData();
	  const recipeID = formData.get("recipeID");
	  console.log("Adding "+ recipeID + " to favorites ...")
	  const response = await fetch(`https://gourmet.cours.quimerch.com/users/${USER}/favorites?recipeID=${recipeID}`, {
		method: 'POST',
		headers: {
		  'Accept': 'application/json, application/xml',
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${TOKEN}`,
		},
	  });
	  if (response.ok) {
		console.log("Adding "+ recipeID + " to favorites succeded");
		return { status: response.status, action: 'addFavorite' };
	  } else {
		console.log("Adding "+ recipeID + " to favorites failed : " + response.status);
		return { status: response.status, action: 'addFavorite' };
	  }
	},

  // remove a favorite
  deleteFavorite: async ({ request }) => {
    const formData = await request.formData();
    const recipeID = formData.get("recipeID");
    console.log("Removing " + recipeID + " from favorites ...");

    const response = await fetch(`https://gourmet.cours.quimerch.com/users/${USER}/favorites?recipeID=${recipeID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, application/xml',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    if (response.ok) {
      console.log("Removing " + recipeID + " from favorites succeeded");
      return { status: response.status, action: 'deleteFavorite' };
    } else {
      console.log("Removing " + recipeID + " from favorites failed : " + response.status);
      return { status: response.status, action: 'deleteFavorite' };
    }
  },
} satisfies Actions;
  


