const url = 'http://localhost:3000/dashboard/'

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
