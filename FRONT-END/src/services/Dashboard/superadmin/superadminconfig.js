// const API_URL = "http://localhost:3000/Dashboard/Superadmin";

// export const dashsuperadmin = async () => {
//     // Récupération du token enregistré lors du login
//     const token = localStorage.getItem('token'); 

//     const reponse = await fetch(`${API_URL}/Dashsuperadmin`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}` // Transmission du token sécurisé
//         }
//     });

//     if (!reponse.ok) {
//         throw new Error(`Erreur serveur: ${reponse.status}`);
//     }

//     const data = await reponse.json();
//     return data;
// };

// src/services/Dashboard/superadminconfig.js

// test 
export const dashsuperadmin = async () => {
    // Simulation d'un délai de réseau de 0.5s
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nombre_formation: 15,
                update_formation: 4,
                nombre_user: 120,
                update_user: 10,
                nombre_support: 35,
                update_support: 2,
                nombre_ens: 25,
                update_ens: 1,
                notifications: 5
            });
        }, 500);
    });
};


