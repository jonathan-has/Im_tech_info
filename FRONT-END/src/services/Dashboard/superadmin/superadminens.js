// // -------------- ENSEIGNANTS ------------------
// const URL = 'http://localhost:3000/Dashboard/SuperAdmin/Enseignants';

// /**
//  * 1. CRÉER UN NOUVEL ENSEIGNANT (POST)
//  */
// export const postEnseignant = async (nom, matiere, email, token) => {
//     try {
//         const reponse = await fetch(`${URL}/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ nom, matiere, email })
//         });

//         const data = await reponse.json();

//         return {
//             success: data.success,
//             message: data.message,
//             data: data
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: 'Impossible de se connecter au serveur.'
//         };
//     }
// };

// /**
//  * 2. RÉCUPÉRER LES ENSEIGNANTS (GET)
//  */
// export const getEnseignants = async (token) => {
//     try {
//         const reponse = await fetch(`${URL}/`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (!reponse.ok) {
//             throw new Error(`Erreur HTTP: ${reponse.status}`);
//         }

//         const data = await reponse.json();
//         return data;
//     } catch (err) {
//         console.error("Erreur lors de la récupération des enseignants :", err);
//         return [];
//     }
// };

// /**
//  * 3. SUPPRIMER UN ENSEIGNANT (DELETE)
//  */
// export const deleteEnseignant = async (id, token) => {
//     try {
//         const reponse = await fetch(`${URL}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         const data = await reponse.json();

//         return {
//             success: data.success,
//             message: data.message
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: 'Impossible de supprimer l\'enseignant.'
//         };
//     }
// };



// Données de simulation conservées en mémoire globale
let enseignantsSimulation = [
    { id: 1, nom: 'Jean Dupont', matiere: 'Mathématiques', email: 'jean.dupont@test.com', date_creation: '2026-01-10' },
    { id: 2, nom: 'Marie Curie', matiere: 'Physique-Chimie', email: 'marie.curie@test.com', date_creation: '2026-02-04' }
];

/**
 * 1. RÉCUPÉRER TOUS LES ENSEIGNANTS (GET)
 */
export const getEnseignants = async (token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...enseignantsSimulation]);
        }, 500);
    });
};

/**
 * 2. CRÉER UN ENSEIGNANT (POST)
 */
export const postEnseignant = async (nom, matiere, email, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newEnseignant = {
                id: Date.now(),
                nom: nom,
                matiere: matiere,
                email: email,
                date_creation: new Date().toISOString().split('T')[0]
            };
            enseignantsSimulation.push(newEnseignant);

            resolve({
                success: true,
                message: "Enseignant ajouté avec succès !",
                data: newEnseignant
            });
        }, 500);
    });
};

/**
 * 3. SUPPRIMER UN ENSEIGNANT (DELETE)
 */
export const deleteEnseignant = async (id, token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            enseignantsSimulation = enseignantsSimulation.filter(item => item.id !== id);
            resolve({
                success: true,
                message: "Enseignant supprimé avec succès !"
            });
        }, 500);
    });
};