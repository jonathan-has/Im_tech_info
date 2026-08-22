const URL = 'http://localhost:3000/dashboard';
export const getSupport = async (token) => {
    const reponse = await fetch(`${URL}/supports`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!reponse.ok) {
        throw new Error('Erreur HTTP: ' + reponse.status);
    }

    const data = await reponse.json();
    return data;
};

// 2. Supprimer un support par son ID
export const deletSupport = async (id, token) => {
    const reponse = await fetch(`${URL}/support/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!reponse.ok) {
        throw new Error('Erreur HTTP: ' + reponse.status);
    }

    const data = await reponse.json();
    return data;
};

// 3. Télécharger un fichier de support
export const telecharger_fichier = async (fileName, nomFichierFinal) => {
    const token = localStorage.getItem('token');
    
    const reponse = await fetch(`${URL}/supports/${fileName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!reponse.ok) {
        throw new Error('Erreur HTTP lors du téléchargement: ' + reponse.status);
    }

    // Récupération du fichier sous forme de Blob (flux binaire)
    const blob = await reponse.blob();
    
    // Création d'un lien URL temporaire pour déclencher le téléchargement dans le navigateur
    const urlBlob = window.URL.createObjectURL(blob);
    const lien = document.createElement('a');
    lien.href = urlBlob;
    lien.download = nomFichierFinal;
    
    document.body.appendChild(lien);
    lien.click();
    
    // Nettoyage après le téléchargement
    document.body.removeChild(lien);
    window.URL.revokeObjectURL(urlBlob);
};