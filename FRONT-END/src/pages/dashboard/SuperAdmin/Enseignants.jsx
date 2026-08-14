import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark, FaPlus, FaGraduationCap, FaFolderOpen } from 'react-icons/fa6';
import { getEnseignants, postEnseignant, deleteEnseignant } from '../../../services/Dashboard/superadmin/superadminens';
import { getElementsEnseignant } from '../../../services/liste_element';

export const Enseignants = () => {
    // Hooks d'état de la liste et des modales
    const [enseignants, setEnseignants] = useState([]);
    const [affichageVoir, setAffichageVoir] = useState(false); // Modale d'affichage (détails)
    const [affichageAjout, setAffichageAjout] = useState(false); // Modale de création

    // Enseignant sélectionné
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Modales séparées : Élèves et Supports
    const [affichageEleves, setAffichageEleves] = useState(false);
    const [affichageSupports, setAffichageSupports] = useState(false);
    const [chargementElements, setChargementElements] = useState(false);
    const [listeEleves, setListeEleves] = useState([]);
    const [listeSupports, setListeSupports] = useState([]);

    // Formulaire de création
    const [nom, setNom] = useState('');
    const [matiere, setMatiere] = useState('');
    const [cin, setCin] = useState('');
    const [email, setEmail] = useState('');

    // Notification Pop-up (Toast)
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);

    const afficherNotification = (msg, estSucces) => {
        setMessage(msg);
        setSuccess(estSucces);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    const chargerEnseignants = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getEnseignants(token);
            if (res) {
                setEnseignants(res);
            } else {
                setEnseignants([]);
            }
        } catch (error) {
            afficherNotification("Erreur lors du chargement des enseignants", false);
        }
    };

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
    }
    else if (role === "RH") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5';
    }

    useEffect(() => {
        chargerEnseignants();
    }, []);

    const enregistrerEnseignant = async () => {
        if (!nom || !matiere || !cin || !email) {
            afficherNotification("Veuillez remplir tous les champs !", false);
            return;
        }

        const token = localStorage.getItem('token');
        const res = await postEnseignant(nom, matiere, cin, email, token);

        if (res && res.success) {
            let msgSucces = "Enseignant créé avec succès !";
            if (res.message) {
                msgSucces = res.message;
            }
            afficherNotification(msgSucces, true);
            setNom('');
            setMatiere('');
            setCin('');
            setEmail('');
            setAffichageAjout(false);
            chargerEnseignants();
        } else {
            let msgErreur = "Erreur lors de la création";
            if (res && res.message) {
                msgErreur = res.message;
            }
            afficherNotification(msgErreur, false);
        }
    };

    const supprimerEnseignant = async (id, nomEnseignant) => {
        const token = localStorage.getItem('token');
        const res = await deleteEnseignant(id, token);

        if (res && res.success) {
            const nouvelleListe = enseignants.filter((item) => item.id !== id);
            setEnseignants(nouvelleListe);
            afficherNotification(`Enseignant "${nomEnseignant}" supprimé !`, true);
        } else {
            let msgErreur = "Erreur lors de la suppression";
            if (res && res.message) {
                msgErreur = res.message;
            }
            afficherNotification(msgErreur, false);
        }
    };

    const ouvrirVoir = (item) => {
        setElementSelectionne(item);
        setAffichageVoir(true);
    };

    // ACTION : Charger et ouvrir la modale Élèves uniquement
    const ouvrirEleves = async (idEnseignant) => {
        setAffichageEleves(true);
        setChargementElements(true);
        setListeEleves([]);

        const token = localStorage.getItem('token');
        const res = await getElementsEnseignant(idEnseignant, token);

        if (res && res.success) {
            if (res.eleves) {
                setListeEleves(res.eleves);
            } else {
                setListeEleves([]);
            }
        } else {
            let msgErreur = "Erreur lors du chargement des élèves";
            if (res && res.message) {
                msgErreur = res.message;
            }
            afficherNotification(msgErreur, false);
        }

        setChargementElements(false);
    };

    // ACTION : Charger et ouvrir la modale Supports uniquement
    const ouvrirSupports = async (idEnseignant) => {
        setAffichageSupports(true);
        setChargementElements(true);
        setListeSupports([]);

        const token = localStorage.getItem('token');
        const res = await getElementsEnseignant(idEnseignant, token);

        if (res && res.success) {
            if (res.supports) {
                setListeSupports(res.supports);
            } else {
                setListeSupports([]);
            }
        } else {
            let msgErreur = "Erreur lors du chargement des supports";
            if (res && res.message) {
                msgErreur = res.message;
            }
            afficherNotification(msgErreur, false);
        }

        setChargementElements(false);
    };

    // Icône de notification (sans ternaire)
    let icone = null;
    if (success) {
        icone = <FaCheck size={18} className="shrink-0 border-2 rounded-2xl text-green-600 border-green-600 p-0.5" />;
    } else {
        icone = <FaX size={18} className="shrink-0 border-2 rounded-2xl text-red-600 border-red-600 p-0.5" />;
    }

    // Classe CSS de notification (sans ternaire)
    let notification_classe = "";
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-y-0 sm:translate-x-0 transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-sm flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-y-4 sm:translate-y-0 sm:-translate-x-10 transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-sm pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    }

    // Modale de détails (Voir)
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        let dateCreation = "N/A";
        if (elementSelectionne.date_creation) {
            dateCreation = elementSelectionne.date_creation;
        }

        contenuModaleVoir = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                    <button 
                        onClick={() => setAffichageVoir(false)}
                        className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-4 pr-8 text-purple-700'>Détails de l'enseignant</h1>
                    
                    <div className='w-full space-y-3 text-left border-t pt-3 text-sm sm:text-base'>
                        <p><span className='font-bold text-slate-600'>Nom complet :</span> {elementSelectionne.nom}</p>
                        <p><span className='font-bold text-slate-600'>Matière :</span> {elementSelectionne.matiere}</p>
                        <p><span className='font-bold text-slate-600'>CIN :</span> {elementSelectionne.cin}</p>
                        <p><span className='font-bold text-slate-600'>Email :</span> {elementSelectionne.email}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {dateCreation}</p>
                    </div>

                    <div className='w-full flex flex-col gap-2 mt-5'>
                        <button
                            onClick={() => ouvrirEleves(elementSelectionne.id)}
                            className='w-full flex items-center justify-center gap-2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors'
                        >
                            <FaGraduationCap /> Voir les élèves
                        </button>
                        <button
                            onClick={() => ouvrirSupports(elementSelectionne.id)}
                            className='w-full flex items-center justify-center gap-2 p-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors'
                        >
                            <FaFolderOpen /> Voir les supports
                        </button>
                    </div>

                    <button 
                        onClick={() => setAffichageVoir(false)} 
                        className='w-full mt-3 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // Modale ÉLÈVES
    let contenuModaleEleves = null;
    if (affichageEleves) {
        let renduEleves = null;
        if (chargementElements) {
            renduEleves = <p className='text-slate-500 text-sm'>Chargement...</p>;
        } else if (listeEleves.length === 0) {
            renduEleves = <p className='text-slate-500 text-sm'>Aucun élève trouvé pour ce prof.</p>;
        } else {
            renduEleves = listeEleves.map((eleve, index) => {
                let cle = index;
                if (eleve.id) {
                    cle = eleve.id;
                }
                return (
                    <div key={cle} className='py-2 border-b border-gray-100 text-sm'>
                        {eleve.nom}
                    </div>
                );
            });
        }

        contenuModaleEleves = (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                    <button
                        onClick={() => setAffichageEleves(false)}
                        className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-4 pr-8 text-blue-600 flex items-center gap-2'>
                        <FaGraduationCap /> Liste des élèves
                    </h1>

                    <div className='w-full'>
                        {renduEleves}
                    </div>

                    <button
                        onClick={() => setAffichageEleves(false)}
                        className='w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // Modale SUPPORTS
    let contenuModaleSupports = null;
    if (affichageSupports) {
        let renduSupports = null;
        if (chargementElements) {
            renduSupports = <p className='text-slate-500 text-sm'>Chargement...</p>;
        } else if (listeSupports.length === 0) {
            renduSupports = <p className='text-slate-500 text-sm'>Aucun support envoyé pour l'instant.</p>;
        } else {
            renduSupports = listeSupports.map((support, index) => {
                let cle = index;
                if (support.id) {
                    cle = support.id;
                }
                return (
                    <div key={cle} className='py-2 border-b border-gray-100 flex items-center justify-between gap-2 text-sm'>
                        <span className='truncate'>{support.titre}</span>
                        <div className='text-xs text-slate-400 shrink-0'>{support.date_envoi}</div>
                    </div>
                );
            });
        }

        contenuModaleSupports = (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                    <button
                        onClick={() => setAffichageSupports(false)}
                        className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-4 pr-8 text-purple-700 flex items-center gap-2'>
                        <FaFolderOpen /> Supports envoyés
                    </h1>

                    <div className='w-full'>
                        {renduSupports}
                    </div>

                    <button
                        onClick={() => setAffichageSupports(false)}
                        className='w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // Modale d'ajout
    let contenuModaleAjout = null;
    if (affichageAjout) {
        contenuModaleAjout = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center'>
                    <button 
                        onClick={() => setAffichageAjout(false)}
                        className='absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-1 pr-8'>Ajouter un enseignant</h1>
                    <p className='text-gray-400 mb-4 text-[0.85rem] sm:text-[0.9rem]'>Remplissez les informations ci-dessous</p>

                    <div className='w-full flex flex-col items-center'>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom complet"
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            value={matiere}
                            onChange={(e) => setMatiere(e.target.value)}
                            placeholder='Matière enseignée'
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            value={cin}
                            onChange={(e) => setCin(e.target.value)}
                            placeholder='CIN'
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Adresse email'
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />

                        <button 
                            onClick={enregistrerEnseignant} 
                            className='w-full sm:w-auto mt-2 p-2.5 px-6 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md'
                        >
                            Ajouter l'enseignant
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Affichage de la liste
    let listeEnseignants = null;
    if (enseignants.length === 0) {
        listeEnseignants = (
            <div className='p-4 text-center text-gray-500 border-b'>Aucun enseignant trouvé.</div>
        );
    } else {
        listeEnseignants = enseignants.map((item, index) => {
            let cle = index;
            if (item.id) {
                cle = item.id;
            }

            let dateCreationItem = "N/A";
            if (item.date_creation) {
                dateCreationItem = item.date_creation;
            }

            return (
                <div
                    key={cle}
                    className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 flex items-center justify-between gap-2 sm:grid sm:grid-cols-7 text-sm transition-colors'
                >
                    <div className='min-w-0 sm:col-span-3'>
                        <div className='font-bold text-slate-900 truncate'>{item.nom}</div>
                        <div className='text-xs font-normal text-slate-500 truncate sm:hidden'>
                            {item.matiere}
                        </div>
                    </div>
                    <div className='hidden sm:block sm:col-span-2 text-xs font-normal text-slate-500 truncate'>
                        {item.matiere}
                    </div>
                    <div className='hidden sm:block sm:col-span-1 text-gray-500'>{dateCreationItem}</div>
                    <div className='shrink-0 sm:col-span-1 flex items-center justify-end gap-3 sm:gap-3 text-gray-500'>
                        <button
                            type='button'
                            onClick={() => ouvrirVoir(item)} 
                            className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1.5'
                            title="Voir"
                            aria-label="Voir les détails"
                        >
                            <FaEye />
                        </button>
                        <button
                            type='button'
                            onClick={() => supprimerEnseignant(item.id, item.nom)} 
                            className={style}
                            title="Supprimer"
                            aria-label="Supprimer"
                        >
                            <FaTrash className='text-red-600' />
                        </button>
                    </div>
                </div>
            );
        });
    }

    return (
        <main className='relative m-4 sm:m-6 lg:m-7 col-span-6 font-sans text-slate-800'>

            {/* POP-UP DE NOTIFICATION (TOAST) */}
            <div className={notification_classe}>
                {icone}{message}
            </div>

            {/* MODALES D'INTERACTION */}
            {contenuModaleVoir}
            {contenuModaleEleves}
            {contenuModaleSupports}
            {contenuModaleAjout}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
                <div className='font-extrabold text-xl'>Enseignants</div>
                <button 
                    onClick={() => setAffichageAjout(true)}
                    className='flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 w-full sm:w-auto'
                >
                    <FaPlus /> Ajouter un enseignant
                </button>
            </div>

            {/* EN-TÊTE DU TABLEAU */}
            <div className='hidden sm:grid bg-gray-200 p-3 rounded-md mt-2 grid-cols-7 font-bold text-black-700 text-sm'>
                <div className='col-span-3'>Noms</div>
                <div className='col-span-2'>Matières</div>
                <div className='col-span-1'>Date d'ajout</div>
                <div className='col-span-1 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE DES ENSEIGNANTS */}
            <div className='rounded-md sm:mt-0 mt-2 border border-gray-100 sm:border-0 divide-y divide-gray-100 sm:divide-y-0'>
                {listeEnseignants}
            </div>

        </main>
    );
};