// const url = 'http://localhost:3000/Dashboard/teacher/formations'


// // 1 - Recuperer les données (GET)
// export const getteachformation = async() => {
//     const token = localStorage.getItem('token'),
//     const reponse = fetch(`${url}`,{
//         method:'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}` // token securise            
//         }
//     });
//     if (!reponse.ok) {
//         throw new Error(`Erreur serveur : ${reponse.status}`);
//     }
//     const data = await reponse.json();
//     return data;
// };

// // 2 - Ajout des données (POST)
// export const posteachformation = async (formation,catégorie,token) => {
//     try {
//         const token = localStorage.getItem('token');
//         const reponse = fetch(url,{
//             method:'POST',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // token securise     
//             },
//             body: JSON.stringify({formation,catégorie}),
//         })
//         const data = await reponse.json();
//         return {
//             success: data.success,
//             message:data.message,
//             data:data
//         }
//     }catch(err) {
//         return {
//             success: false,
//             message: 'Impossible de se connecter au serveur.'
//         };
//     }
// }

// // 3 - Supprimer des données (DELETE)
// export const deleteteachformation = async() => {
//     try {
//         const token = localStorage.getItem('token');
//         const reponse = fetch(url, {
//             method:'DELETE',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}` // token securise 
//             }
//         });
//         return {
//             success: data.success,
//             message: data.message
//         };
//     } catch (err) {
//         return {
//             success: false,
//             message: 'Impossible de supprimer la formation.'
//         };
//     }
// };




// test

//  * 1. CRÉER UNE NOUVELLE FORMATION (POST)
export const postformations = async (formation, categorie, date, token) => {
    return Promise.resolve({
        success: true,
        message: "Formation créée avec succès",
        data: {
            id: Date.now(),
            formation,
            categorie,
            date
        }
    });
};

//  *2. RÉCUPÉRER LES FORMATIONS (GET)

export const getFormations = async (token) => {
    return Promise.resolve([
        { id: 1, titre: "Développement React", categorie: "Informatique", duree: "2026-05-10" },
        { id: 2, titre: "UI/UX Design", categorie: "Design", duree: "2026-06-15" }
    ]);
};