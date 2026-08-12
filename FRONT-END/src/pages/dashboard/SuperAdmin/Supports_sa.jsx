import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark } from 'react-icons/fa6';
import { telecharger_fichier, getSupport, deletSupport } from '../../../services/Dashboard/superadmin/superadminsupports';

export const Supports_sa = () => {

    // Liste des supports
    const [support, setSupport] = useState([]);

    // Modale d'affichage
    const [affichageVoir, setAffichageVoir] = useState(false);

    // Support sélectionné
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Loading téléchargement
    const [loading, setLoading] = useState(false);

    // Notification Pop-up
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);

    // Fonction pour afficher une notification
    const afficherNotification = (msg, estSucces) => {
        setMessage(msg);
        setSuccess(estSucces);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    // Charger les supports depuis l'API
    const chargerSupport = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await getSupport(token);
            let data = [];

            if (res) {
                data = res;
            }

            setSupport(data);
        } catch (error) {
            afficherNotification(
                "Erreur lors du chargement des supports",
                false
            );
        }
    };

    useEffect(() => {
        chargerSupport();
    }, []);

    // ACTION : Supprimer un support
    const supprimerSupports = async (id, nomSupport) => {
        const token = localStorage.getItem('token');
        try {
            const res = await deletSupport(id, token);
            if (res && res.success) {
                const nouvelleListe = support.filter(
                    (item) => item.id !== id
                );
                setSupport(nouvelleListe);
                afficherNotification(
                    `Support "${nomSupport}" supprimé !`,
                    true
                );
            } else {
                afficherNotification(
                    "Erreur lors de la suppression !",
                    false
                );
            }
        } catch (error) {
            console.error(
                "Erreur suppression :",
                error
            );
            afficherNotification(
                "Erreur lors de la suppression !",
                false
            );
        }
    };

    // ACTION : Ouvrir les détails
    const ouvrirVoir = (item) => {
        setElementSelectionne(item);
        setAffichageVoir(true);
    };

    // ACTION : Télécharger le fichier
    const download_file = async () => {
        if (!elementSelectionne) {
            return;
        }

        setLoading(true);
        try {
            let fileName;
            if (elementSelectionne.titre) {
                fileName = elementSelectionne.titre + ".pdf";
            } else {
                fileName = "support.pdf";
            }
            await telecharger_fichier(
                elementSelectionne.fichier,
                fileName
            );
            afficherNotification(
                `Support "${fileName}" téléchargé !`,
                true
            );
        } catch (error) {
            afficherNotification(
                "Erreur du téléchargement !",
                false
            );
        } finally {
            setLoading(false);
        }
    };

    // Icône de notification
    const icone = success ? (
        <FaCheck size={18} className="border-2 rounded-full text-green-600 border-green-600 p-0.5 shrink-0" />
    ) : (
        <FaX size={18} className="border-2 rounded-full text-red-600 border-red-600 p-0.5 shrink-0" />
    );

    // Classe de notification responsive
    const notification_classe = `z-50 transition-all duration-300 fixed top-4 right-4 sm:right-auto sm:left-4 max-w-[90vw] sm:max-w-md flex p-3 gap-3 items-center font-semibold text-sm sm:text-base rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    }`;

    // Texte du bouton
    const textbouton = loading ? "Téléchargement..." : "Télécharger le fichier";

    // Modale de détails
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        contenuModaleVoir = (
            <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
                <div className='relative w-full max-w-lg bg-white text-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-start'>
                    <button 
                        onClick={() => setAffichageVoir(false)} 
                        className='absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors'
                        aria-label="Fermer"
                    >
                        <FaXmark className='text-lg sm:text-xl' />
                    </button>

                    <h1 className='font-extrabold text-xl sm:text-2xl mb-4 text-purple-700 pr-8'>
                        Détail du support
                    </h1>

                    <div className='w-full space-y-3 text-left border-t border-slate-100 pt-4 text-sm sm:text-base'>
                        <p>
                            <span className='font-bold text-slate-600'>Nom du support : </span>
                            {elementSelectionne.titre || elementSelectionne.nom}
                        </p>

                        <p>
                            <span className='font-bold text-slate-600'>Type : </span>
                            {elementSelectionne.categorie || elementSelectionne.role}
                        </p>

                        <p>
                            <span className='font-bold text-slate-600'>Date d'ajout : </span>
                            {elementSelectionne.date_creation || elementSelectionne.duree || 'N/A'}
                        </p>
                    </div>

                    <button 
                        onClick={download_file} 
                        disabled={loading} 
                        className='w-full mt-6 py-3 px-4 bg-slate-800 cursor-pointer active:scale-95 text-white font-bold rounded-lg hover:bg-slate-900 transition-all disabled:opacity-50 text-sm sm:text-base'
                    >
                        {textbouton}
                    </button>
                </div>
            </div>
        );
    }

    // Affichage de la liste
    let listeSupports = null;
    if (support.length === 0) {
        listeSupports = (
            <div className='p-6 text-center text-gray-500 bg-white rounded-b-md border border-t-0 border-gray-100'>
                Aucun support trouvé.
            </div>
        );
    } else {
        listeSupports = (
            <div className="divide-y divide-gray-100 bg-white rounded-b-md border border-t-0 border-gray-100 shadow-sm">
                {support.map((item, index) => (
                    <div 
                        key={item.id || index} 
                        className='p-4 hover:bg-slate-50 flex flex-col md:grid md:grid-cols-7 items-start md:items-center gap-3 md:gap-0 text-sm transition-colors'
                    >
                        {/* Titre */}
                        <div className='md:col-span-3 font-bold text-slate-900 w-full pr-2'>
                            {item.titre || item.nom}
                        </div>

                        {/* Catégorie / Type */}
                        <div className='md:col-span-2 w-full md:w-auto text-xs sm:text-sm text-slate-700'>
                            {item.categorie || item.role}
                        </div>

                        {/* Date */}
                        <div className='md:col-span-1 w-full md:w-auto flex items-center justify-between md:justify-start text-xs sm:text-sm text-gray-500'>
                            {item.date_creation || item.duree || 'N/A'}
                        </div>

                        {/* Actions */}
                        <div className='md:col-span-1 w-full md:w-auto flex items-center justify-end gap-4 text-gray-500 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100'>
                            <button 
                                onClick={() => ouvrirVoir(item)} 
                                className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1.5 rounded-lg hover:bg-blue-50' 
                                title="Voir"
                                aria-label="Voir le support"
                            >
                                <FaEye className="text-base" />
                            </button>

                            <button
                                onClick={() =>
                                    supprimerSupports(
                                        item.id,
                                        item.titre || item.nom
                                    )
                                }
                                className='cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5 rounded-lg hover:bg-red-50'
                                title="Supprimer"
                                aria-label="Supprimer le support"
                            >
                                <FaTrash className='text-red-600 text-base' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <main className='relative m-3 sm:m-7 col-span-6 font-sans text-slate-800 max-w-7xl mx-auto'>

            {/* NOTIFICATION */}
            <div className={notification_classe}>
                {icone}
                <div className="truncate">{message}</div>
            </div>

            {/* MODALE */}
            {contenuModaleVoir}

            {/* EN-TÊTE */}
            <div className='w-full flex items-center justify-between mb-4'>
                <h1 className='font-extrabold text-lg sm:text-xl md:text-2xl text-slate-900'>
                     Supports
                </h1>
            </div>

            {/* EN-TÊTE DU TABLEAU */}
            <div className='hidden md:grid bg-gray-200 p-3 rounded-t-md grid-cols-7 font-bold text-slate-700 text-sm'>
                <div className='col-span-3'>
                    Noms du support
                </div>
                <div className='col-span-2'>
                    Types de formations
                </div>
                <div className='col-span-1'>
                    Date d'ajout
                </div>
                <div className='col-span-1 text-right pr-2'>
                    Actions
                </div>
            </div>

            {/* LISTE */}
            {listeSupports}

        </main>
    );
};