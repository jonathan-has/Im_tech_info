// // ============================================================
// // Service : liste_element.js
// // Rôle : récupérer (GET) la liste des élèves et des supports
// // (documents/cours) envoyés par un enseignant précis.
// // ============================================================

// // Adresse de base de l'API (à adapter si une variable d'environnement existe déjà ailleurs)
// const API_URL = "http://localhost:5000/api";
// export const getElementsEnseignant = async (idEnseignant, token) => {
//     try {
//         // Appel GET vers l'API, avec le token dans l'en-tête d'autorisation
//         const reponse = await fetch(`${API_URL}/enseignants/${idEnseignant}/elements`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//             },
//         });

//         // On transforme la réponse en JSON
//         const donnees = await reponse.json();

//         // Si la requête a échoué côté serveur (statut HTTP différent de 200)
//         if (!reponse.ok) {
//             return {
//                 success: false,
//                 message: donnees.message || "Erreur lors de la récupération des données",
//                 eleves: [],
//                 supports: [],
//             };
//         }

//         // On renvoie les données au composant qui a appelé cette fonction
//         return {
//             success: true,
//             eleves: donnees.eleves || [],
//             supports: donnees.supports || [],
//         };
//     } catch (erreur) {
//         // En cas d'erreur réseau (serveur injoignable, etc.)
//         console.error("Erreur getElementsEnseignant :", erreur);
//         return {
//             success: false,
//             message: "Impossible de contacter le serveur",
//             eleves: [],
//             supports: [],
//         };
//     }
// };


// test
// ============================================================
// Service : liste_element.js
// Rôle : récupérer (GET) la liste des élèves et des supports
// (documents/cours) envoyés par un enseignant précis.
// ============================================================

const API_URL = "http://localhost:5000/api";

// Activer / désactiver le mode de simulation locale
const MODE_TEST = true;

// Données de test (Mocks)
const DONNEES_TEST = {
    eleves: [
        { id: 1, nom: "Rasoa Marie", email: "rasoa@gmail.com", classe: "L1 Informatique" },
        { id: 2, nom: "Rakoto Jean", email: "rakoto@gmail.com", classe: "L1 Informatique" },
        { id: 3, nom: "Andry Nirina", email: "andry@gmail.com", classe: "L1 Informatique" },
        { id: 4, nom: "Fitiavana Jonathan", email: "fitiavana@gmail.com", classe: "L1 Informatique" }
    ],
    supports: [
        {
            id: 101,
            titre: "Introduction à Pandas et Data Science.pdf",
            fichier: "/file/pandas/cours_pandas.pdf",
            date_envoi: "2026-08-10"
        },
        {
            id: 102,
            titre: "Exercices Pratiques - Manipulations de DataFrames.pdf",
            fichier: "/file/pandas/exercices_pandas.pdf",
            date_envoi: "2026-08-11"
        }
    ]
};

export const getElementsEnseignant = async (idEnseignant, token) => {
    // Si le mode de test est activé, renvoyer immédiatement les faux élèves et le fichier pandas
    if (MODE_TEST) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    eleves: DONNEES_TEST.eleves,
                    supports: DONNEES_TEST.supports,
                });
            }, 500); // Simulation d'un délai réseau léger (500ms)
        });
    }

    try {
        // Appel réel GET vers l'API
        const reponse = await fetch(`${API_URL}/enseignants/${idEnseignant}/elements`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const donnees = await reponse.json();

        if (!reponse.ok) {
            return {
                success: false,
                message: donnees.message || "Erreur lors de la récupération des données",
                eleves: [],
                supports: [],
            };
        }

        return {
            success: true,
            eleves: donnees.eleves || [],
            supports: donnees.supports || [],
        };
    } catch (erreur) {
        console.error("Erreur getElementsEnseignant :", erreur);
        return {
            success: false,
            message: "Impossible de contacter le serveur",
            eleves: [],
            supports: [],
        };
    }
};