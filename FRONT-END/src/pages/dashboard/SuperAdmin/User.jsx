import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { getUsers, deleteUser } from '../../../services/Dashboard/superadmin/superadminuser';

export const User = () => {
    // Hooks d'état de la liste et de la modale d'affichage
    const [users, setUsers] = useState([]);
    const [affichageVoir, setAffichageVoir] = useState(false);

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
            if (res) {
                let data = [];
                if (Array.isArray(res)) {
                    data = res;
                } else if (res.etudiants) {
                    data = res.etudiants;
                } else if (res.data) {
                    data = res.data;
                }
                setUsers(data);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs", error);
            afficherNotification("Erreur lors du chargement de la liste", false);
        }
    };

    useEffect(() => {
        chargerUsers();
    }, []);

    // ACTION : Supprimer un utilisateur (CORRIGÉ : utilisation correcte de filter et des IDs)
    const supprimerUtilisateur = async (id) => {
        const token = localStorage.getItem('token');
        const res = await deleteUser(id, token);

        if (res && res.success) {
            // Filtrer la liste en vérifiant les différentes variantes possibles de l'ID
            const nouvelleListe = users.filter((item) => {
                const currentId = item.Etudiant_id || item.id || item.ID;
                return currentId !== id;
            });
            setUsers(nouvelleListe);
            afficherNotification(res.message, true);
        } else {
            let msgErreur = "Erreur lors de la suppression";
            if (res && res.message) {
                msgErreur = res.message;
            }
            afficherNotification(msgErreur, false);
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

    // Classe de transition de la notification
    let notification_classe;
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
    }

    // RECUPERATION DE L'USER ET DU ROLE
    const userData = localStorage.getItem('user');
    const roleDirect = localStorage.getItem('role');

    let user_role = "";
    if (userData) {
        const user = JSON.parse(userData);
        if (user && user.role) {
            user_role = user.role;
        }
    } else if (roleDirect) {
        user_role = roleDirect;
    }

    let role = "";
    if (user_role === "RH" || user_role === "rh") {
        role = "RH";
    } else if (user_role === "Superadmin" || user_role === "superadmin") {
        role = "Superadmin";
    }

    // Gestion de l'affichage du bouton de suppression selon le rôle
    let style = {};
    if (role === "Superadmin") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5 hidden';
    } else if (role === "RH") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5';
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

                    <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>Détails de l'étudiant</h1>
                    
                    <div className='w-full space-y-3 text-left border-t pt-3'>
                        <p><span className='font-bold text-slate-600'>Nom :</span> {elementSelectionne.NOM || elementSelectionne.nom || elementSelectionne.Nom || 'N/A'}</p>
                        <p><span className='font-bold text-slate-600'>Prénom :</span> {elementSelectionne.PRENOM || elementSelectionne.prenom || elementSelectionne.Prenom || 'N/A'}</p>
                        <p><span className='font-bold text-slate-600'>Email :</span> {elementSelectionne.EMAIL || elementSelectionne.email || elementSelectionne.Email || 'N/A'}</p>
                        <p><span className='font-bold text-slate-600'>Formation :</span> {elementSelectionne.Titre || elementSelectionne.formation || elementSelectionne.Formation || elementSelectionne.Categorie || 'N/A'}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {elementSelectionne.Date_creation || elementSelectionne.date_creation || 'N/A'}</p>
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

    // Affichage de la liste des utilisateurs
    let listeUsers = null;
    if (users.length === 0) {
        listeUsers = (
            <div className='p-4 text-center text-gray-500 border-b'>Aucun etudiant trouvé.</div>
        );
    } else {
        listeUsers = users.map((item, index) => {
            const userId = item.Etudiant_id || item.id || item.ID;
            const userName = item.NOM || item.nom || item.Nom || item.titre || 'Inconnu';
            const userCategory = item.Titre || item.formation || item.Formation || item.Categorie || 'N/A';
            const userDate = item.Date_creation || item.date_creation || 'N/A';

            return (
                <div key={userId || index} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm transition-colors'>
                    <div className='lg:col-span-3 col-span-5 font-bold text-slate-900'>{userName}</div>
                    
                    <div className='hidden lg:block lg:col-span-2 text-xs font-normal text-slate-500 truncate'>
                        {userCategory}
                    </div>
                    
                    <div className='lg:col-span-1 hidden lg:block text-gray-500 text-xs'>{userDate}</div>
                    
                    <div className='col-span-2 lg:col-span-1 flex items-center justify-end gap-3 text-gray-500'>
                        <div 
                            onClick={() => ouvrirVoir(item)} 
                            className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                            title="Voir"
                        >
                            <FaEye />
                        </div>
                        <div 
                            onClick={() => supprimerUtilisateur(userId)} 
                            className={style}
                            title="Supprimer"
                        >
                            <FaTrash className='text-red-600' />
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <main className='relative m-7 col-span-6 font-sans text-slate-800'>
            {/* POP-UP DE NOTIFICATION */}
            <div className={notification_classe}>
                {icone} {message}
            </div>

            {/* MODALE DE DÉTAILS */}
            {contenuModaleVoir}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex items-center justify-between mb-4'>
                <div className='font-extrabold text-xl'>Etudiants</div>
            </div>

            {/* EN-TÊTE DU TABLEAU */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>
                <div className='lg:col-span-3 col-span-5'>Noms</div>
                <div className='lg:col-span-2 hidden lg:block'>Formations</div>
                <div className='lg:col-span-1 hidden lg:block'>Date d'ajout</div>
                <div className='col-span-2 lg:col-span-1 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE */}
            {listeUsers}
        </main>
    );
};