// export const getFormation = async() => {
//     try {
//         const reponse = await fetch('http://localhost:3000/',{
//             method:'GET',
//             headers:{
//                 'Content-Type': 'application/json',
//             }
//         }); //pour la recuperation des formation
//         const data = await reponse.json();
//         if (!reponse.ok) {
//             throw new Error(`Erreur HTTP: ${reponse.status}`);
//         }
//         const data = await reponse.json();
//         return data;
//     } catch (err) {
//         console.error("Erreur lors de la récupération des formations :", err);
//         return [];
//     }
// }

// test
export const getFormations = async (token) => {
    return Promise.resolve([
        { id: 1, titre: "Développement Web", categorie: "Informatique",timer:'2 heures',description :'HTML - CSS - React - Nodejs', duree: "2026-05-10" },
        { id: 2, titre: "Développement Web", categorie: "Informatique",timer:'2 heures',description :'HTML - CSS - React - Nodejs', duree: "2026-05-10" },
        { id: 3, titre: "Développement Web", categorie: "Informatique",timer:'2 heures',description :'HTML - CSS - React - Nodejs', duree: "2026-05-10" },
        { id: 4, titre: "Développement Web", categorie: "Informatique",timer:'2 heures',description :'HTML - CSS - React - Nodejs', duree: "2026-05-10" },
    ]);
};