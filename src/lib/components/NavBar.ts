export const submitLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (response.ok) {
        console.log("Connexion réussie");
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
  