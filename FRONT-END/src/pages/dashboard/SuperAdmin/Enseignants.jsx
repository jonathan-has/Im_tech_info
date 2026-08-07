import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark, FaPlus } from 'react-icons/fa6';
import { getEnseignants, postEnseignant, deleteEnseignant } from '../../../services/Dashboard/superadmin/superadminens';

export const Enseignants = () => {
    // Hooks d'état de la liste et des modales
    const [enseignants, setEnseignants] = useState([]);
    const [affichageVoir, setAffichageVoir] = useState(false); // Modale d'affichage (détails)
    const [affichageAjout, setAffichageAjout] = useState(false); // Modale de création

    // Enseignant sélectionné (pour voir les détails)
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Formulaire de création
    const [nom, setNom] = useState('');
    const [matiere, setMatiere] = useState('');
    const [email, setEmail] = useState('');

    // Notification Pop-up (Toast)
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);

    // Fonction pour déclencher la notification
    const afficherNotification = (msg, estSucces) => {
        setMessage(msg);
        setSuccess(estSucces);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    // Charger les enseignants depuis l'API
    const chargerEnseignants = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getEnseignants(token);
            setEnseignants(res || []);
        } catch (error) {
            afficherNotification("Erreur lors du chargement des enseignants", false);
        }
    };

    useEffect(() => {
        chargerEnseignants();
    }, []);

    // ACTION : Créer un nouvel enseignant
    const enregistrerEnseignant = async () => {
        if (!nom || !matiere || !email) {
            afficherNotification("Veuillez remplir tous les champs !", false);
            return;
        }

        const token = localStorage.getItem('token');
        const res = await postEnseignant(nom, matiere, email, token);

        if (res && res.success) {
            afficherNotification(res.message || "Enseignant créé avec succès !", true);
            setNom('');
            setMatiere('');
            setEmail('');
            setAffichageAjout(false);
            chargerEnseignants();
        } else {
            afficherNotification(res.message || "Erreur lors de la création", false);
        }
    };

    // ACTION : Supprimer un enseignant
    const supprimerEnseignant = async (id, nomEnseignant) => {
        const token = localStorage.getItem('token');
        const res = await deleteEnseignant(id, token);

        if (res && res.success) {
            const nouvelleListe = enseignants.filter((item) => item.id !== id);
            setEnseignants(nouvelleListe);
            afficherNotification(`Enseignant "${nomEnseignant}" supprimé !`, true);
        } else {
            afficherNotification(res.message || "Erreur lors de la suppression", false);
        }
    };

    // ACTION : Ouvrir les détails
    const ouvrirVoir = (item) => {
        setElementSelectionne(item);
        setAffichageVoir(true);
    };

    // Icône de notification
    let icone;
    if (success) {
        icone = <FaCheck size={20} className="border-2 rounded-2xl text-green-600 border-green-600 p-0.5" />;
    } else {
        icone = <FaX size={20} className="border-2 rounded-2xl text-red-600 border-red-600 p-0.5" />;
    }

    // Classe de transition de la notification (Positionnée à GAUCHE)
    let notification_classe;
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
    }

    // Modale de détails (Voir)
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        contenuModaleVoir = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md bg-white text-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                    <button 
                        onClick={() => setAffichageVoir(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>Détails de l'enseignant</h1>
                    
                    <div className='w-full space-y-3 text-left border-t pt-3'>
                        <p><span className='font-bold text-slate-600'>Nom complet :</span> {elementSelectionne.nom}</p>
                        <p><span className='font-bold text-slate-600'>Matière :</span> {elementSelectionne.matiere}</p>
                        <p><span className='font-bold text-slate-600'>Email :</span> {elementSelectionne.email}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {elementSelectionne.date_creation || 'N/A'}</p>
                    </div>

                    <button 
                        onClick={() => setAffichageVoir(false)} 
                        className='w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // Modale d'ajout (Créer un enseignant)
    let contenuModaleAjout = null;
    if (affichageAjout) {
        contenuModaleAjout = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center'>
                    <button 
                        onClick={() => setAffichageAjout(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-2xl mb-1'>Ajouter un enseignant</h1>
                    <p className='text-gray-400 mb-4 text-[0.9rem]'>Remplissez les informations ci-dessous</p>

                    <div className='w-full flex flex-col items-center'>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom complet"
                            className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            value={matiere}
                            onChange={(e) => setMatiere(e.target.value)}
                            placeholder='Matière enseignée'
                            className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Adresse email'
                            className='border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />

                        <button 
                            onClick={enregistrerEnseignant} 
                            className='p-2.5 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md'
                        >
                            Ajouter l'enseignant
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Affichage de la liste sans opérateur ternaire
    let listeEnseignants = null;
    if (enseignants.length === 0) {
        listeEnseignants = (
            <div className='p-4 text-center text-gray-500 border-b'>Aucun enseignant trouvé.</div>
        );
    } else {
        listeEnseignants = enseignants.map((item, index) => (
            <div key={item.id || index} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm transition-colors'>
                <div className='col-span-3 font-bold text-slate-900'>{item.nom}</div>
                <div className='col-span-2 inline-block text-slate-700 px-2.5 py-1 rounded-full text-md'>
                    {item.matiere}
                </div>
                <div className='col-span-1 text-gray-500'>{item.date_creation || 'N/A'}</div>
                <div className='col-span-1 flex items-center justify-end gap-3 text-gray-500'>
                    <div 
                        onClick={() => ouvrirVoir(item)} 
                        className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                        title="Voir"
                    >
                        <FaEye />
                    </div>
                    <div 
                        onClick={() => supprimerEnseignant(item.id, item.nom)} 
                        className='cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1'
                        title="Supprimer"
                    >
                        <FaTrash className='text-red-600' />
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <main className='relative m-7 col-span-6 font-sans text-slate-800'>

            {/* POP-UP DE NOTIFICATION (TOAST À GAUCHE) */}
            <div className={notification_classe}>
                {icone} {message}
            </div>

            {/* MODALES D'INTERACTION */}
            {contenuModaleVoir}
            {contenuModaleAjout}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex items-center justify-between mb-4'>
                <div className='font-extrabold text-xl'>Enseignants</div>
                <button 
                    onClick={() => setAffichageAjout(true)}
                    className='flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95'
                >
                    <FaPlus /> Ajouter un enseignant
                </button>
            </div>

            {/* EN-TÊTE DU TABLEAU / LISTE */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>
                <div className='col-span-3'>Noms</div>
                <div className='col-span-2'>Matières</div>
                <div className='col-span-1'>Date d'ajout</div>
                <div className='col-span-1 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE DES ENSEIGNANTS */}
            {listeEnseignants}

        </main>
    );
};