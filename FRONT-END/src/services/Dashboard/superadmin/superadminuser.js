const URL = 'http://localhost:3000/dashboard';

export const getUsers = async (token) => {
    try {
        const response = await fetch(`${URL}/etudiants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des etudiants :", error);
        return [];
    }
};


export const deleteUser = async (id, token) => {
    try {
            const response = await fetch(`${URL}/etudiants/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return {
                success: data.success,
                message: data.message
            }
        } catch(err) {
            return {
                success: false,
                message:"Impossible de supprimer l'etudiant"
            }
        } 
};
