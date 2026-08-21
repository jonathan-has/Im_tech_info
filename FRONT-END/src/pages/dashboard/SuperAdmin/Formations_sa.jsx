import React, { useState, useEffect } from 'react';
import { FaEye, FaPenToSquare, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { postformations, getFormations, deleteFormations, putFormations } from '../../../services/Dashboard/superadmin/superadminformation';

export const Formations_sa = () => {
    // Hooks d'état de la liste et des modales
    const [formations, setFormations] = useState([]);
    const [affichage, setAffichage] = useState(false); // Modale d'ajout
    const [affichageVoir, setAffichageVoir] = useState(false); // Modale de détails
    const [affichageEdit, setAffichageEdit] = useState(false); // Modale d'édition
    const [chargement, setChargement] = useState(false);

    // Formation sélectionnée (pour voir ou modifier)
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Formulaire d'ajout
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');
    const [timer, setTimer] = useState('');
    const [description, setDescription] = useState('');

    // Formulaire de modification
    const [editTitre, setEditTitre] = useState('');
    const [editCategorie, setEditCategorie] = useState('');
    const [editTimer, setEditTimer] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // Notification Pop-up (Toast)
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);

    const afficherNotification = (msg, estSucces) => {
        setMessage(msg);
        setSuccess(estSucces);
        setVisible(true);
        setTimeout(() => setVisible(false), 3000);
    };

    // Reinitialiser le formulaire d'ajout
    const reinitialiserFormulaire = () => {
        setTitre('');
        setCategorie('');
        setTimer('');
        setDescription('');
    };

    // Charger les formations depuis l'API
    const chargerFormations = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getFormations(token);
            if (res) {
                setFormations(res);
            } else {
                setFormations([]);
            }
        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
        chargerFormations();
    }, []);

    // Fonction d'ajout avec génération automatique de la date par React
    const ajouterFormation = async () => {
        if (!titre || !categorie || !timer || !description) {
            afficherNotification("Veuillez remplir tous les champs !", false);
            return;
        }

        setChargement(true);
        const token = localStorage.getItem('token');
        const dateAutomatique = new Date().toISOString().split('T')[0];

        try {
            const res = await postformations(titre, categorie, timer, description, dateAutomatique, token);

            let estReussi = true;
            if (res) {
                if (res.success || res.status === 200 || res.status === 201) {
                    estReussi = true;
                }
            }

            if (estReussi) {
                let msgSucces = "Formation ajoutée avec succès !";
                if (res && res.message) {
                    msgSucces = res.message;
                } else if (res && res.data && res.data.message) {
                    msgSucces = res.data.message;
                }
                afficherNotification(msgSucces, true);
                reinitialiserFormulaire();
                setAffichage(false);
                chargerFormations();
            } else {
                let msgErreur = "Erreur lors de l'ajout.";
                if (res && res.message) {
                    msgErreur = res.message;
                } else if (res && res.data && res.data.message) {
                    msgErreur = res.data.message;
                }
                afficherNotification(msgErreur, false);
            }
        } catch (err) {
            afficherNotification("Une erreur est survenue lors de l'envoi.", false);
        } finally {
            setChargement(false);
        }
    };

    // Supprimer une formation
    const supprimerFormation = async (id, titreFormation) => {
        const token = localStorage.getItem('token');
        try {
            // On appelle l'API avant de modifier l'interface
            await deleteFormations(id, token);

            // Si l'API réussit, on met à jour la liste localement
            const nouvelleListe = formations.filter((item) => item.ID !== id);
            setFormations(nouvelleListe);
            
            afficherNotification(`Formation "${titreFormation}" supprimée !`, true);
            console.log("Suppression réussie pour l'ID :", id);
        } catch (error) {
            // Si l'API échoue, on affiche une notification d'erreur
            console.error("Erreur lors de la suppression :", error);
            afficherNotification(`Erreur : impossible de supprimer "${titreFormation}"`, false);
        }
    };

    // Ouvrir les détails
    const ouvrirVoir = (item) => {
        setElementSelectionne(item);
        setAffichageVoir(true);
    };

    // Ouvrir la modification
    const ouvrirEdit = (item) => {
        setElementSelectionne(item);
        setEditTitre(item.Titre || '');
        setEditCategorie(item.Categorie || '');
        
        let dureeValue = '';
        if (item.Timer) {
            dureeValue = item.Timer;
        } else if (item.Duree) {
            dureeValue = item.Duree;
        }
        setEditTimer(dureeValue);
        
        setEditDescription(item.Description || '');
        setAffichageEdit(true);
    };

const enregistrerModification = async (id) => {
    console.log("=== 1. DEBUT DE LA FONCTION ===", { id, editTitre, editCategorie, editTimer, editDescription });

    if (!editTitre || !editCategorie || !editTimer || !editDescription) {
        console.log("=== ERREUR: Champs vides ===");
        afficherNotification("Veuillez remplir tous les champs !", false);
        return;
    }

    const token = localStorage.getItem('token');
    try {
        console.log("=== 2. APPEL API EN COURS ===");
        const reponseApi = await putFormations(id, editTitre, editCategorie, editTimer, editDescription, token);
        console.log("=== 3. REPONSE API RECUE ===", reponseApi);
    }
    catch (err) {
        console.log("=== ERREUR CATCH API ===", err);
        afficherNotification("Erreur lors de la mise à jour.", false);
        return; 
    }

    console.log("=== 4. MISE A JOUR DU STATE LOCAL ===");
    const listeMiseAJour = formations.map((item) => {
        if (String(item.ID) === String(id)) { 
            return {
                ...item,
                Titre: editTitre,
                Categorie: editCategorie,
                Timer: editTimer,
                Description: editDescription
            };
        }
        return item;
    });

    setFormations(listeMiseAJour);
    setAffichageEdit(false);
    afficherNotification("Formation mise à jour avec succès !", true);
};
    // Gestion des classes et icônes avec conditions if/else
    let classeBouton;
    if (chargement) {
        classeBouton = 'opacity-50 pointer-events-none w-full border text-center items-center my-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200';
    } else {
        classeBouton = 'opacity-100 w-full border text-center items-center my-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95 hover:bg-blue-800';
    }

    let texteBoutonAjout;
    if (chargement) {
        texteBoutonAjout = 'Enregistrement...';
    } else {
        texteBoutonAjout = 'Ajouter la formation';
    }

    let icone;
    if (success) {
        icone = <FaCheck size={20} className="border-2 rounded-2xl text-green-600 border-green-600 p-0.5 shrink-0" />;
    } else {
        icone = <FaX size={20} className="border-2 rounded-2xl text-red-600 border-red-600 p-0.5 shrink-0" />;
    }

    let notification_classe;
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 max-w-[90vw] sm:max-w-xl';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 max-w-[90vw] sm:max-w-xl';
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
    }
    else if (role === "RH") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5';
    }

    // Modale d'ajout
    let modalAjout = null;
    if (affichage) {
        modalAjout = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-h-[90vh] overflow-y-auto'>
                    <button 
                        onClick={() => setAffichage(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-2xl mb-1'>Ajouter une formation</h1>
                    <p className='text-gray-400 mb-4 text-sm'>Créer une nouvelle formation</p>

                    <div className='w-full flex flex-col items-center gap-3'>
                        <input
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            placeholder='Nom de la formation'
                            className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                        />
                        
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3'>
                            <input
                                type='text'
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                                placeholder='Catégorie'
                                className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                            />
                            <input
                                type='text'
                                value={timer}
                                onChange={(e) => setTimer(e.target.value)}
                                placeholder='Durée / Timer (ex: 10h)'
                                className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                            />
                        </div>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description de la formation...'
                            rows="3"
                            className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm resize-none'
                        />

                        <button 
                            onClick={ajouterFormation} 
                            disabled={chargement} 
                            className={classeBouton}
                        >
                            {texteBoutonAjout}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Modale Voir
    let modalVoir = null;
    if (affichageVoir) {
        if (elementSelectionne) {
            let affichageTimer = 'N/A';
            if (elementSelectionne.Timer) {
                affichageTimer = elementSelectionne.Timer;
            } else if (elementSelectionne.Duree) {
                affichageTimer = elementSelectionne.Duree;
            }

            let affichageDate = 'N/A';
            if (elementSelectionne.Date) {
                affichageDate = elementSelectionne.Date;
            } else if (elementSelectionne.Date_creation) {
                affichageDate = elementSelectionne.Date_creation;
            }

            let affichageDescription = 'Aucune description disponible.';
            if (elementSelectionne.Description) {
                affichageDescription = elementSelectionne.Description;
            }

            modalVoir = (
                <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                    <div className='relative w-full max-w-lg bg-white text-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col items-start max-h-[90vh] overflow-y-auto'>
                        <button 
                            onClick={() => setAffichageVoir(false)}
                            className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                        >
                            <FaXmark className='text-xl' />
                        </button>

                        <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>Détails de la formation</h1>
                        
                        <div className='w-full space-y-3 text-left border-t pt-3 text-sm'>
                            <p><span className='font-bold text-slate-600'>Titre :</span> {elementSelectionne.Titre}</p>
                            <p><span className='font-bold text-slate-600'>Catégorie :</span> {elementSelectionne.Categorie}</p>
                            <p><span className='font-bold text-slate-600'>Durée / Timer :</span> {affichageTimer}</p>
                            <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {affichageDate}</p>
                            <div className='border-t pt-2 mt-2'>
                                <span className='font-bold text-slate-600 block mb-1'>Description :</span>
                                <p className='text-slate-700 whitespace-pre-line bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-h-40 overflow-y-auto'>
                                    {affichageDescription}
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setAffichageVoir(false)} 
                            className='w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors text-sm'
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            );
        }
    }

    // Modale Edit
    let modalEdit = null;
    if (affichageEdit) {
        if (elementSelectionne) {
            modalEdit = (
                <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                    <div className='relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-h-[90vh] overflow-y-auto'>
                        <button 
                            onClick={() => setAffichageEdit(false)}
                            className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                        >
                            <FaXmark className='text-xl' />
                        </button>

                        <h1 className='font-extrabold text-2xl mb-1'>Modifier la formation</h1>
                        <p className='text-gray-400 mb-4 text-sm'>Mettre à jour les informations</p>

                        <div className='w-full flex flex-col items-center gap-3'>
                            <input
                                type="text"
                                value={editTitre}
                                onChange={(e) => setEditTitre(e.target.value)}
                                placeholder='Nom de la formation'
                                className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                            />

                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <input
                                    type='text'
                                    value={editCategorie}
                                    onChange={(e) => setEditCategorie(e.target.value)}
                                    placeholder='Catégorie'
                                    className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                                />
                                <input
                                    type='text'
                                    value={editTimer}
                                    onChange={(e) => setEditTimer(e.target.value)}
                                    placeholder='Durée / Timer'
                                    className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm'
                                />
                            </div>

                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder='Description de la formation...'
                                rows="3"
                                className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 text-sm resize-none'
                            />

                            <button 
                                onClick={()=> enregistrerModification(elementSelectionne.ID)} 
                                className='w-full border text-center items-center my-3 p-3 bg-amber-600 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95 hover:bg-amber-500 text-sm'
                            >
                                Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Affichage de la liste de formations
    let conteneurFormations = null;
    if (formations.length === 0) {
        conteneurFormations = (
            <div className='p-4 text-center text-gray-500 border-b'>Aucune formation trouvée.</div>
        );
    } else {
        conteneurFormations = formations.map((item, index) => {
            let itemKey = index;
            if (item.ID) {
                itemKey = item.ID;
            }

            let itemTimer = 'N/A';
            if (item.Timer) {
                itemTimer = item.Timer;
            } else if (item.Duree) {
                itemTimer = item.Duree;
            }

            let itemDate = 'N/A';
            if (item.Date) {
                itemDate = item.Date;
            } else if (item.Date_creation) {
                itemDate = item.Date_creation;
            }

            let sousTitreMobile = item.Categorie;
            if (item.Timer) {
                sousTitreMobile = item.Categorie + ' • ' + item.Timer;
            }

            return (
                <div key={itemKey} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-12 items-center text-sm transition-colors gap-2'>
                    {/* Titre */}
                    <div className='col-span-7 sm:col-span-6 xl:col-span-4 font-bold text-slate-900 pr-2 truncate'>
                        {item.Titre}
                        <div className='block xl:hidden text-xs font-normal text-slate-500 truncate'>
                            {sousTitreMobile}
                        </div>
                    </div>

                    {/* Catégorie */}
                    <div className='hidden xl:block xl:col-span-3 text-slate-700 truncate'>
                        {item.Categorie}
                    </div>

                    {/* Durée / Timer */}
                    <div className='hidden xl:block xl:col-span-2 text-slate-600 text-xs truncate'>
                        {itemTimer}
                    </div>

                    {/* Date */}
                    <div className='hidden sm:block sm:col-span-3 xl:col-span-1 text-gray-500 text-xs truncate'>
                        {itemDate}
                    </div>

                    {/* Actions */}
                    <div className='col-span-5 sm:col-span-3 xl:col-span-2 flex items-center justify-end gap-2 sm:gap-3 text-gray-500'>
                        <div 
                            onClick={() => ouvrirVoir(item)} 
                            className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                            title="Voir"
                        >
                            <FaEye />
                        </div>
                        <div 
                            onClick={() => ouvrirEdit(item)} 
                            className='cursor-pointer hover:text-amber-600 active:scale-95 transition-all p-1'
                            title="Modifier"
                        >
                            <FaPenToSquare />
                        </div>
                        <div 
                            onClick={() => supprimerFormation(item.ID, item.Titre)} 
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
        <main className='relative m-3 sm:m-7 font-sans text-slate-800'>

            {/* POP-UP DE NOTIFICATION */}
            <div className={notification_classe}>
                {icone} {message}
            </div>

            {/* MODALES */}
            {modalAjout}
            {modalVoir}
            {modalEdit}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex flex-row items-center justify-between gap-3 mb-4'>
                <div className='font-extrabold text-lg sm:text-xl'>Formations</div>
                <div
                    className='p-2 sm:p-2.5 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md text-xs sm:text-sm whitespace-nowrap'
                    onClick={() => setAffichage(true)}
                >
                    + Nouvelle formation
                </div>
            </div>

            {/* EN-TÊTE DU TABLEAU */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-12 font-bold text-slate-700 text-xs sm:text-sm gap-2 items-center'>
                <div className='col-span-7 sm:col-span-6 xl:col-span-4'>Titres</div>
                <div className='hidden xl:block xl:col-span-3'>Catégories</div>
                <div className='hidden xl:block xl:col-span-2'>Durée</div>
                <div className='hidden sm:block sm:col-span-3 xl:col-span-1'>Date</div>
                <div className='col-span-5 sm:col-span-3 xl:col-span-2 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE DES FORMATIONS */}
            {conteneurFormations}

        </main>
    );
};