// // URL de base de votre API backend (à ajuster selon votre serveur)
// const BASE_URL = 'http://localhost:3000/api/superadmin/users';

// /**
//  * 1. Récupérer tous les utilisateurs (GET)
//  */
// export const getUsers = async (token) => {
//     try {
//         const response = await fetch(BASE_URL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Erreur HTTP: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Erreur dans getUsers :", error);
//         return [];
//     }
// };

// /**
//  * 2. Ajouter un nouvel utilisateur (POST)
//  */
// export const postUser = async (nom, role, dateCreation, token) => {
//     try {
//         const response = await fetch(BASE_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 nom: nom,
//                 role: role,
//                 date_creation: dateCreation
//             })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return { success: true, message: data.message || "Utilisateur créé avec succès", data };
//         } else {
//             return { success: false, message: data.message || "Impossible de créer l'utilisateur" };
//         }
//     } catch (error) {
//         console.error("Erreur dans postUser :", error);
//         return { success: false, message: "Erreur réseau lors de la création" };
//     }
// };



// /**
//  * 3. Supprimer un utilisateur (DELETE)
//  */
// export const deleteUser = async (id, token) => {
//     try {
//         const response = await fetch(`${BASE_URL}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             return { success: true, message: "Utilisateur supprimé avec succès" };
//         } else {
//             const data = await response.json().catch(() => ({}));
//             return { success: false, message: data.message || "Impossible de supprimer l'utilisateur" };
//         }
//     } catch (error) {
//         console.error("Erreur dans deleteUser :", error);
//         return { success: false, message: "Erreur réseau lors de la suppression" };
//     }
// };




/**
 * 1. Récupérer tous les utilisateurs (GET)
 */
export const getUsers = async (token) => {
    return Promise.resolve([
        { id: 1, nom: 'Alice Dupont', titre: 'Alice Dupont', role: 'SuperAdmin', categorie: 'SuperAdmin', date_creation: '2026-01-15' },
        { id: 2, nom: 'Bertrand Martin', titre: 'Bertrand Martin', role: 'Editeur', categorie: 'Editeur', date_creation: '2026-02-10' }
    ]);
};

/**
 * 2. Ajouter un nouvel utilisateur (POST)
 */
export const postUser = async (nom, role, dateCreation, token) => {
    return Promise.resolve({
        success: true,
        message: "Utilisateur créé avec succès",
        data: {
            id: Date.now(),
            nom: nom,
            role: role,
            date_creation: dateCreation
        }
    });
};

/**
 * 3. Supprimer un utilisateur (DELETE)
 */
export const deleteUser = async (id, token) => {
    return Promise.resolve({
        success: true,
        message: "Utilisateur supprimé avec succès"
    });
};