const URL = 'http://localhost:3000/dashboard';

export const postEnseignant = async (nom,prenom,formation_id,cin,email,password,date_creation,token) => {
    try {
        const reponse = await fetch(`${URL}/enseignants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({nom,prenom,formation_id,cin,email,password,date_creation,token})
        });

        const data = await reponse.json();
        
        return {
            success: data.success,
            message: data.message,
            // data: data
        };
    } catch (err) {
        return {
            success: false,
            message: 'Impossible de se connecter au serveur.'
        };
    }
};

export const getEnseignants = async (token) => {
    try {
        const reponse = await fetch(`${URL}/enseignants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!reponse.ok) {
            throw new Error(`Erreur HTTP: ${reponse.status}`);
        }

        const data = await reponse.json();
        console.log(data);
        
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des enseignants :", err);
        return [];
    }
};


export const deleteEnseignant = async (id, token) => {
    try {
        const reponse = await fetch(`${URL}/enseignants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await reponse.json();
        return {
            success: data.success,
            message: data.message
        };
    } catch (err) {
        return {
            success: false,
            message: "Impossible de supprimer l'enseignant"
        };
    }
};