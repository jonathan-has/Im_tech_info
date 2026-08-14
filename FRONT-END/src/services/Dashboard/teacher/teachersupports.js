const URL_BASE = 'http://localhost:3000'; // Remplacez par votre URL de base (ex: http://localhost:8000)
const teacher = localStorage.getItem('nom');

// 1. POST FILE (Production)
export const postfile = async (support_name, categorie, fichier, teacher, token) => {
    try {
        const formData = new FormData();
        formData.append('support_name', support_name);
        formData.append('categorie', categorie);
        formData.append('fichier', fichier);
        formData.append('enseignant', teacher);

        const reponse = await fetch(`${URL_BASE}/Dashboard/Teacher/Supports`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await reponse.json();

        if (!reponse.ok) {
            return {
                success: false,
                message: data.message || `Erreur serveur (${reponse.status})`,
                data: null
            };
        }

        return {
            success: data.success ?? true,
            message: data.message || 'Fichier envoyé avec succès',
            data: data
        };
    } catch (err) {
        return {
            success: false,
            message: 'Impossible de se connecter au serveur.'
        };
    }
};

// 2. GET SUPPORTS (Mock Test)
export const getSupport = async (token) => {
    return Promise.resolve([
        {
            id: 1,
            titre: "Cours Pandas (Python)",
            categorie: "Informatique",
            date_creation: "2026-05-10",
            fichier: "/file/pandas.pdf",
        }
    ]);
};

// 3. DOWNLOAD (Mock Test)
export const telecharger_fichier = async (fichier, fileName = "pandas.pdf") => {
    try {
        const reponse = await fetch(fichier);

        if (!reponse.ok) {
            throw new Error(`Erreur lors du téléchargement (${reponse.status})`);
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
        console.error('Erreur téléchargement :', error);
        throw error;
    }
};

// 4. DELETE (Mock Test)
export const deletSupport = async (id, token) => {
    return Promise.resolve({
        success: true,
        message: `Support ${id} supprimé avec succès`
    });
};