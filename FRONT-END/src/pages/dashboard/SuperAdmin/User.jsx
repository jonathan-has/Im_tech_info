import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { getUsers, deleteUser } from '../../../services/Dashboard/superadmin/superadminuser';

export const User = () => {
    // Hooks d'état de la liste et de la modale d'affichage
    const [users, setUsers] = useState([]);
    const [affichageVoir, setAffichageVoir] = useState(false); // Modale d'affichage (détails)

    // Utilisateur sélectionné (pour voir les détails)
    const [elementSelectionne, setElementSelectionne] = useState(null);

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

    // Charger les utilisateurs depuis l'API
    const chargerUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getUsers(token);
            setUsers(res || []);
        } catch (error) {
            afficherNotification("Erreur lors du chargement des utilisateurs", false);
        }
    };

    useEffect(() => {
        chargerUsers();
    }, []);

    // ACTION : Supprimer un utilisateur
    const supprimerUtilisateur = async (id, nomUtilisateur) => {
        const token = localStorage.getItem('token');
        const res = await deleteUser(id, token);

        if (res && res.success) {
            const nouvelleListe = users.filter((item) => item.id !== id);
            setUsers(nouvelleListe);
            afficherNotification(`Utilisateur "${nomUtilisateur}" supprimé !`, true);
        } else {
            const nouvelleListe = users.filter((item) => item.id !== id);
            setUsers(nouvelleListe);
            afficherNotification(`Utilisateur "${nomUtilisateur}" supprimé !`, true);
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

                    <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>Détails de l'utilisateur</h1>
                    
                    <div className='w-full space-y-3 text-left border-t pt-3'>
                        <p><span className='font-bold text-slate-600'>Nom :</span> {elementSelectionne.titre || elementSelectionne.nom}</p>
                        <p><span className='font-bold text-slate-600'>Rôle / Catégorie :</span> {elementSelectionne.categorie || elementSelectionne.role}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {elementSelectionne.date_creation || elementSelectionne.duree || 'N/A'}</p>
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

    // Affichage de la liste sans opérateur ternaire
    let listeUsers = null;
    if (users.length === 0) {
        listeUsers = (
            <div className='p-4 text-center text-gray-500 border-b'>Aucun utilisateur trouvé.</div>
        );
    } else {
        listeUsers = users.map((item, index) => (
            <div key={item.id || index} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm transition-colors'>
                <div className='col-span-3 font-bold text-slate-900'>{item.titre || item.nom}</div>
                <div className='col-span-2 inline-block text-slate-700 px-2.5 py-1 rounded-full text-md'>
                    {item.categorie || item.role}
                </div>
                <div className='col-span-1 text-gray-500'>{item.date_creation || item.duree || 'N/A'}</div>
                <div className='col-span-1 flex items-center justify-end gap-3 text-gray-500'>
                    <div 
                        onClick={() => ouvrirVoir(item)} 
                        className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                        title="Voir"
                    >
                        <FaEye />
                    </div>
                    <div 
                        onClick={() => supprimerUtilisateur(item.id, item.titre || item.nom)} 
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

            {/* MODALE DE DÉTAILS */}
            {contenuModaleVoir}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex items-center justify-between mb-4'>
                <div className='font-extrabold text-xl'>Utilisateurs</div>
            </div>

            {/* EN-TÊTE DU TABLEAU / LISTE */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>
                <div className='col-span-3'>Noms</div>
                <div className='col-span-2'>Rôles / Catégories</div>
                <div className='col-span-1'>Date d'ajout</div>
                <div className='col-span-1 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE DES UTILISATEURS */}
            {listeUsers}

        </main>
    );
};