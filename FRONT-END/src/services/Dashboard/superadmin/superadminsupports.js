// export const telecharger_fichier = async (id, fileName = 'fichier') => {
    //     try {
        //         const token = localStorage.getItem('token');
        
        //         const reponse = await fetch(
            //             `http://localhost:3000/supports/${id}/download`,
            //             {
                //                 method: 'GET',
                //                 headers: {
                    //                     Authorization: `Bearer ${token}`,
                    //                 },
                    //             }
                    //         );
                    
                    //         if (!reponse.ok) {
                        //             throw new Error(
                            //                 `Erreur lors du téléchargement (${reponse.status})`
                            //             );
//         }

//         const blob = await reponse.blob();

//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');

//         link.href = url;
//         link.download = fileName;

//         document.body.appendChild(link);
//         link.click();
//         link.remove();

//         URL.revokeObjectURL(url);

//     } catch (error) {
    //         console.error('Erreur téléchargement :', error);
    //         throw error;
    //     }
    // };
    // export const deletSupport = async (id, token) => {
        //     const token = localStorage.getItem('token');
        //     const reponse = await fetch(
            //         `http://localhost:3000/supports/${id}`,
            //         {
                //             method: 'DELETE',
                //             headers: {
                    //                 Authorization: `Bearer ${token}`
//             }
//         }
//     );

//     if (!reponse.ok) {
    //         throw new Error(
        //             `Erreur lors de la suppression (${reponse.status})`
        //         );
        //     }
        
        //     const data = await reponse.json();
        
        //     return data;
        // };
        
        // test
export const getSupport = async (token) => {
        const teacher = localStorage.getItem('nom');
        return Promise.resolve([
        {
            id: 1,
            titre: "Cours Pandas (Python)",
            enseignant : teacher,
            categorie: "Informatique",
            date_creation: "2026-05-10",
            fichier: "/file/pandas.pdf"
        }
    ]);
};


// Téléchargement pour le test
export const telecharger_fichier = async (
    fichier,
    fileName = "pandas.pdf"
) => {
    try {
        const reponse = await fetch(fichier);

        if (!reponse.ok) {
            throw new Error(
                `Erreur lors du téléchargement (${reponse.status})`
            );
        }

        const blob = await reponse.blob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Erreur téléchargement :", error);
        throw error;
    }
};
// API DELETE TEST
export const deletSupport = async (id, token) => {
    return Promise.resolve({
        success: true,
        message: `Support ${id} supprimé avec succès`
    });
};