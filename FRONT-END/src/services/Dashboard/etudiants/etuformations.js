// const url = 'http://localhost:3000/Dashboard/etudiants/formations'


// // 1 - Recuperer les données (GET)
// export const getetuformation = async() => {
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




// test
//  *2. RÉCUPÉRER LES FORMATIONS (GET)
export const getFormations = async (token) => {
    return Promise.resolve([
        { id: 1, titre: "Développement React", categorie: "Informatique", duree: "2026-05-10" },
        { id: 2, titre: "UI/UX Design", categorie: "Design", duree: "2026-06-15" }
    ]);
};