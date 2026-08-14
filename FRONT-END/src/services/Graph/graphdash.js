const URL = 'http://localhost:3000/Dashboard/SuperAdmin/Formations';

/**
 * RÉCUPÉRER LES STATISTIQUES DES FORMATIONS (GET)
 */
export const getStatsFormations = async (token) => {
    try {
        const reponse = await fetch(`${URL}/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await reponse.json();

        let estSucces = false;
        if (reponse.ok) {
            if (Array.isArray(data)) {
                estSucces = true;
            } else if (data && data.success) {
                estSucces = true;
            }
        }

        let messageRetour = "Données récupérées avec succès";
        if (data && !Array.isArray(data) && data.message) {
            messageRetour = data.message;
        }

        return {
            success: estSucces,
            message: messageRetour,
            data: data
        };
    } catch (err) {
        return {
            success: false,
            message: 'Impossible de se connecter au serveur.'
        };
    }
};



// test
// Données de simulation conservées en mémoire globale (Mois et Formations)
// let statsFormationsSimulation = [
//     { mois: "Jan", formations: 2 },
//     { mois: "Fév", formations: 7 },
//     { mois: "Mar", formations: 3 },
//     { mois: "Avr", formations: 6 },
//     { mois: "Mai", formations: 4 },
//     { mois: "Juin", formations: 4 },
//     { mois: "Juil", formations: 7 },
//     { mois: "Août", formations: 10 },
//     { mois: "Sep", formations: 4 },
//     { mois: "Oct", formations: 5 },
//     { mois: "Nov", formations: 8 },
//     { mois: "Déc", formations: 12 }
// ];

/**
 * RÉCUPÉRER LES STATISTIQUES DES FORMATIONS (GET)
 */
// export const getStatsFormations = async (token) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve([...statsFormationsSimulation]);
//         }, 500);
//     });
// };