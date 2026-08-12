import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaX, FaXmark, FaGraduationCap, FaFolderOpen } from 'react-icons/fa6';
import { postformations, getFormations } from '../../../services/Dashboard/superadmin/superadminformation';
import { getElementsEnseignant } from '../../../services/liste_element';

export const Formations_t = () => {
    // Hooks d'état de la liste et des modales
    const [formations, setFormations] = useState([]);
    const [affichage, setAffichage] = useState(false); // Contrôle la modale d'ajout
    const [affichageVoir, setAffichageVoir] = useState(false); // Contrôle la modale principale "Détails"
    const [chargement, setChargement] = useState(false);
    const [chargementElements, setChargementElements] = useState(false);

    // Contrôle des pop-ups secondaires (Détails Élèves / Détails Supports)
    const [affichageEleves, setAffichageEleves] = useState(false);
    const [affichageSupports, setAffichageSupports] = useState(false);

    // Formation sélectionnée et ses données dynamiques
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Formulaire d'ajout
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');

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

    // Charger les formations depuis l'API
    const chargerFormations = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getFormations(token);
            setFormations(res || []);
        } catch (error) {
            afficherNotification("Erreur lors du chargement des formations", false);
        }
    };

    useEffect(() => {
        chargerFormations();
    }, []);

    // Fonction d'ajout avec génération automatique de la date
    const ajouterFormation = async () => {
        if (!titre || !categorie) {
            afficherNotification("Veuillez remplir le titre et la catégorie !", false);
        } else {
            setChargement(true);
            const token = localStorage.getItem('token');
            
            const dateAutomatique = new Date().toISOString().split('T')[0];
            const res = await postformations(titre, categorie, dateAutomatique, token);

            if (res && res.success) {
                afficherNotification(res.message || "Formation créée avec succès !", true);
                setTitre('');
                setCategorie('');
                setAffichage(false);
                chargerFormations();
            } else {
                afficherNotification((res && res.message) || "Erreur lors de la création.", false);
            }

            setChargement(false);
        }
    };

    // ACTION : Ouvrir les détails et récupérer dynamiquement les élèves & supports via API
    const ouvrirVoir = async (item) => {
        setElementSelectionne(item);
        setAffichageVoir(true);
        setChargementElements(true);

        const token = localStorage.getItem('token');
        try {
            const elements = await getElementsEnseignant(item.id, token);
            if (elements) {
                setElementSelectionne({
                    ...item,
                    eleves: elements.eleves || elements.students || [],
                    supports: elements.supports || elements.cours || elements.files || []
                });
            }
        } catch (error) {
            afficherNotification("Erreur lors de la récupération des détails.", false);
        } finally {
            setChargementElements(false);
        }
    };

    // Style dynamique du bouton d'ajout
    let classe;
    if (chargement) {
        classe = 'opacity-50 pointer-events-none w-full border text-center items-center my-3 p-3 bg-blue-900 font-bold text-white rounded-lg duration-200';
    } else {
        classe = 'opacity-100 w-full border text-center items-center my-3 p-3 bg-blue-900 font-bold text-white rounded-lg duration-200 cursor-pointer active:scale-95 hover:bg-blue-800';
    }

    // Icône de notification
    let icone;
    if (success) {
        icone = <FaCheck size={18} className="border-2 rounded-full text-green-600 border-green-600 p-0.5 shrink-0" />;
    } else {
        icone = <FaX size={18} className="border-2 rounded-full text-red-600 border-red-600 p-0.5 shrink-0" />;
    }

    // Classe de transition de la notification
    let notification_classe;
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-y-0 transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-md flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-y-10 pointer-events-none transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-md flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    }

    // Modale d'ajout
    let contenuModale = null;
    if (affichage) {
        contenuModale = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md bg-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center max-h-[90vh] overflow-y-auto'>
                    <button 
                        onClick={() => setAffichage(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-1 mt-2'>Ajouter une formation</h1>
                    <p className='text-gray-400 mb-4 text-xs sm:text-sm'>Créer une nouvelle formation</p>

                    <div className='w-full flex flex-col items-center gap-2'>
                        <input
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            placeholder='Nom de la formation (ex: Développement Web)'
                            className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            value={categorie}
                            onChange={(e) => setCategorie(e.target.value)}
                            placeholder='Catégorie (ex: Informatique)'
                            className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500'
                        />

                        <button 
                            onClick={ajouterFormation} 
                            disabled={chargement} 
                            className={classe}
                        >
                            {chargement ? 'Enregistrement...' : 'Ajouter la formation'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Modale principale : Détails de la formation
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        contenuModaleVoir = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-start max-h-[85vh] overflow-y-auto'>
                    <button 
                        onClick={() => setAffichageVoir(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-3 pr-8 text-purple-700'>Détails de la formation</h1>

                    {/* INFOS GENERALES */}
                    <div className='w-full space-y-1.5 text-xs sm:text-sm text-left border-t pt-3 mb-5'>
                        <p><span className='font-bold text-slate-600'>Titre :</span> {elementSelectionne.titre}</p>
                        <p><span className='font-bold text-slate-600'>Catégorie :</span> {elementSelectionne.categorie}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {elementSelectionne.date_creation || elementSelectionne.duree || 'N/A'}</p>
                    </div>

                    {/* BOUTONS DÉCLENCHEURS DE POP-UP */}
                    <div className='w-full flex flex-col gap-3 mb-2'>
                        <button 
                            onClick={() => setAffichageEleves(true)} 
                            className='w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
                        >
                            <FaGraduationCap className='text-lg' />
                            Voir les Élèves
                        </button>

                        <button 
                            onClick={() => setAffichageSupports(true)} 
                            className='w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95'
                        >
                            <FaFolderOpen className='text-lg' />
                            Voir les Supports
                        </button>
                    </div>

                    <button 
                        onClick={() => setAffichageVoir(false)} 
                        className='w-full mt-4 p-2.5 bg-slate-800 text-white font-bold rounded-lg text-sm hover:bg-slate-900 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // POP-UP 1 : Modale Liste des Élèves (UNIQUEMENT LE NOM)
    let contenuModaleEleves = null;
    if (affichageEleves && elementSelectionne) {
        let listeEleves = null;
        if (chargementElements) {
            listeEleves = <p className='text-xs text-blue-600 font-bold py-6 text-center animate-pulse'>Chargement des élèves...</p>;
        } else if (elementSelectionne.eleves && elementSelectionne.eleves.length > 0) {
            listeEleves = elementSelectionne.eleves.map((eleve, index) => (
                <div key={eleve.id || index} className='p-2.5 border-b border-slate-100 flex items-center text-xs sm:text-sm hover:bg-slate-50 rounded-md transition-colors font-medium text-slate-800 truncate'>
                    {eleve.nom || eleve.name || eleve.prenom || `Élève #${index + 1}`}
                </div>
            ));
        } else {
            listeEleves = <p className='text-xs text-gray-400 py-6 text-center'>Aucun élève inscrit pour le moment.</p>;
        }

        contenuModaleEleves = (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-y-auto'>
                    <button 
                        onClick={() => setAffichageEleves(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <div className='flex items-center gap-2 text-blue-600 font-extrabold text-lg sm:text-xl mb-1'>
                        <FaGraduationCap className='text-2xl' />
                        <h2>Liste des Élèves</h2>
                    </div>
                    <p className='text-xs text-slate-500 mb-4 truncate'>Formation : {elementSelectionne.titre}</p>

                    <div className='w-full max-h-60 overflow-y-auto bg-slate-50 rounded-xl p-2 border border-slate-100 space-y-1 mb-4'>
                        {listeEleves}
                    </div>

                    <button 
                        onClick={() => setAffichageEleves(false)} 
                        className='w-full p-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // POP-UP 2 : Modale Liste des Supports
    let contenuModaleSupports = null;
    if (affichageSupports && elementSelectionne) {
        let listeSupports = null;
        if (chargementElements) {
            listeSupports = <p className='text-xs text-emerald-600 font-bold py-6 text-center animate-pulse'>Chargement des supports...</p>;
        } else if (elementSelectionne.supports && elementSelectionne.supports.length > 0) {
            listeSupports = elementSelectionne.supports.map((sup, index) => (
                <a 
                    key={sup.id || index} 
                    href={sup.lien || sup.url || '#'} 
                    target='_blank' 
                    rel='noreferrer'
                    className='p-2.5 border-b border-slate-100 flex items-center text-xs sm:text-sm font-medium text-slate-800 hover:text-emerald-600 hover:bg-slate-50 rounded-md transition-colors truncate'
                >
                    {sup.titre || sup.nom || sup.libelle || `Support #${index + 1}`}
                </a>
            ));
        } else {
            listeSupports = <p className='text-xs text-gray-400 py-6 text-center'>Aucun support disponible.</p>;
        }

        contenuModaleSupports = (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-md bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-y-auto'>
                    <button 
                        onClick={() => setAffichageSupports(false)}
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                    >
                        <FaXmark className='text-xl' />
                    </button>

                    <div className='flex items-center gap-2 text-emerald-600 font-extrabold text-lg sm:text-xl mb-1'>
                        <FaFolderOpen className='text-2xl' />
                        <h2>Supports de cours</h2>
                    </div>
                    <p className='text-xs text-slate-500 mb-4 truncate'>Formation : {elementSelectionne.titre}</p>

                    <div className='w-full max-h-60 overflow-y-auto bg-slate-50 rounded-xl p-2 border border-slate-100 space-y-1 mb-4'>
                        {listeSupports}
                    </div>

                    <button 
                        onClick={() => setAffichageSupports(false)} 
                        className='w-full p-2.5 bg-emerald-600 text-white font-bold rounded-lg text-sm hover:bg-emerald-700 transition-colors'
                    >
                        Fermer
                    </button>
                </div>
            </div>
        );
    }

    // Gestion de l'affichage de la liste des formations
    let listeFormations = null;
    if (formations.length === 0) {
        listeFormations = (
            <div className='p-4 text-center text-gray-500 border-b text-xs sm:text-sm'>Aucune formation trouvée.</div>
        );
    } else {
        listeFormations = formations.map((item, index) => (
            <div key={item.id || index} className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-12 items-center text-xs sm:text-sm transition-colors gap-2'>
                <div className='col-span-8 sm:col-span-5 md:col-span-4 font-bold text-slate-900 truncate'>{item.titre}</div>
                
                <div className='hidden sm:block sm:col-span-4 md:col-span-4 text-slate-700 truncate'>
                    {item.categorie}
                </div>
                
                <div className='hidden md:block md:col-span-3 text-gray-500 truncate'>{item.date_creation || item.duree || 'N/A'}</div>
                
                <div className='col-span-4 sm:col-span-3 md:col-span-1 flex items-center justify-end text-gray-500 pr-1'>
                    <button 
                        onClick={() => ouvrirVoir(item)} 
                        className='cursor-pointer text-slate-900 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all p-2 rounded-full flex items-center gap-1 font-medium'
                        title="Voir tout"
                    >
                        <FaEye className='text-base sm:text-lg' />
                        <span className='sm:hidden text-xs font-semibold'>Voir</span>
                    </button>
                </div>
            </div>
        ));
    }

    return (
        <main className='relative m-3 sm:m-7 font-sans text-slate-800'>
            {/* POP-UP DE NOTIFICATION */}
            <div className={notification_classe}>
                {icone} <span>{message}</span>
            </div>

            {/* MODALES D'INTERACTION ET POP-UPS */}
            {contenuModale}
            {contenuModaleVoir}
            {contenuModaleEleves}
            {contenuModaleSupports}

            {/* EN-TÊTE DE LA PAGE */}
            <div className='w-full flex flex-row items-center justify-between mb-4 gap-2'>
                <h1 className='font-extrabold text-lg sm:text-xl text-slate-900 truncate'>Mes Formations</h1>
                <button
                    className='p-2 sm:p-2.5 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md text-xs sm:text-sm shrink-0'
                    onClick={() => setAffichage(true)}
                >
                    + Nouvelle formation
                </button>
            </div>

            {/* EN-TÊTE DU TABLEAU */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-12 font-bold text-slate-700 text-xs sm:text-sm gap-2'>
                <div className='col-span-8 sm:col-span-5 md:col-span-4'>Titres</div>
                <div className='hidden sm:block sm:col-span-4 md:col-span-4'>Catégories</div>
                <div className='hidden md:block md:col-span-3'>Date d'ajout</div>
                <div className='col-span-4 sm:col-span-3 md:col-span-1 text-right pr-2'>Actions</div>
            </div>

            {/* LISTE DYNAMIQUE DES FORMATIONS */}
            {listeFormations}

        </main>
    );
};