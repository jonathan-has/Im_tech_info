const URL = 'http://localhost:3000/dashboard';

export const postformations = async (titre, categorie,timer,description,date_creation, token) => {
        const reponse = await fetch(`${URL}/formations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({titre, categorie,timer,description,date_creation})
        });
        const data = await reponse.json();
        return {
            success: data.success,
            message: data.message,
            data: data
        };
};

export const getFormations = async (token) => {
    const reponse = await fetch(`${URL}/getformations`, {
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
return data;
};

export const deleteFormations = async(id,token) => {
    const reponse = await fetch(`${URL}/deleteformations/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!reponse.ok) {
        throw new Error(`Erreur HTTP; ${reponse.status}`);
    }
    const data = await reponse.json();
    return data;
}

export const putFormations = async(id,titre, categorie,timer,description, token) => {
    try {
        const reponse = await fetch(`${URL}/putformations/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({titre, categorie,timer,description})
        })
            const data = await reponse.json();
            return {
                success: data.success,
                message: data.message,
                data: data
            };
    } catch (err) {
        return {
            success: false,
            message: 'Impossible de se connecter au serveur.'
        };
    }
}