export const submitLogin = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch('https://gourmet.cours.quimerch.com/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, application/xml',
              'Content-Type': '*/*',
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          });
      if (response.ok) {
        console.log("Connexion réussie");
        const responseData = await response.json();
        console.log(responseData)



        return true;
      } else {
        console.log("Erreur de connexion");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);

      return false;
    }
  };
  