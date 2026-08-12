// const URL = 'http://localhost:3000/Dashboard/SuperAdmin/Formations';

// export const postformations = async (formation, categorie,timer,description, date, token) => {
//     try {
//         const reponse = await fetch(`${URL}/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ formation, categorie, date })
//         });
//         const data = await reponse.json();
    //     return {
    //         success: data.success,
    //         message: data.message,
    //         data: data
    //     };
    // } catch (err) {
    //     return {
    //         success: false,
    //         message: 'Impossible de se connecter au serveur.'
    //     };
    // }
// };

// export const getFormations = async (token) => {
//     try {
//         const reponse = await fetch(`${URL}/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

    //     if (!reponse.ok) {
    //         throw new Error(`Erreur HTTP: ${reponse.status}`);
    //     }

    //     const data = await reponse.json();
    //     return data;
    // } catch (err) {
    //     console.error("Erreur lors de la récupération des formations :", err);
    //     return [];
    // }
// };


/**
 * 1. CRÉER UNE NOUVELLE FORMATION (POST)
 */
export const postformations = async (formation, categorie,timer,description, date, token) => {
    return Promise.resolve({
        success: true,
        message: "Formation créée avec succès",
        data: {
            id: Date.now(),
            formation,
            categorie,
            timer,
            description,
            date
        }
    });
};

/**
 * 2. RÉCUPÉRER LES FORMATIONS (GET)
 */
export const getFormations = async (token) => {
    return Promise.resolve([
        { id: 1, titre: "Développement Web", categorie: "Informatique",timer:'2 heures',description :'HTML - CSS - React - Nodejs', duree: "2026-05-10" },
    ]);
};