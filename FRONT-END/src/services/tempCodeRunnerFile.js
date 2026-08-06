
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message || "Connexion réussie !"
            };
        } else {
            return {
                success: false,
                message: data.message || "Identifiants incorrects"
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Erreur de connexion au serveur"
        };
    }
};