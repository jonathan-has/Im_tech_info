const API_URL = 'http://localhost:3000/Dashboard/Etudiants/Dashetu';

// export const dashetu = async () => {
//         // Recuperation du token lors du login
//         const token = localStorage.getItem('token');   
//         const reponse = await fetch(`${API_URL}`,{
//             method:'GET',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // token securise
//             }
//         });
//         if (!reponse.ok) {
//             throw new Error(`Erreur serveur : ${reponse.status}`);
//         }
//         const data = await reponse.json();
//         return data;
// }


// test
export const dashetu = async () => {
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
                notifications: 20
            });
        }, 500);
    });
};





// recuperation des données du profs
// export const nameetu = async() => {
//     try {
//         const token = localStorage.getItem('token');
//         const reponse = fetch(`${API_URL}`,{
//             method:'GET',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // token securise
//             }
//         });
//         if (!reponse.ok) {
//             throw new Error(`Erreur HTTP: ${reponse.status}`);
//         }
//         const data = await reponse.json();
//         return data;
//     } catch (err) {
//         console.error("Erreur lors de la récupération des données:", err);
//     }
// };

// test
export const nameetu = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nom: "Florian Bernie"
            });
        }, 500);
    });
}