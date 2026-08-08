import React, { useState, useEffect } from 'react';
import {FaEye,FaTrash,FaCheck,FaX,FaXmark} from 'react-icons/fa6';
import {telecharger_fichier,getSupport,deletSupport} from '../../../services/Dashboard/etudiants/etusupports';

export const Supports_etu = () => {

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
    let icone;

    if (success) {

        icone = (
            <FaCheck
                size={20}
                className="border-2 rounded-2xl text-green-600 border-green-600 p-0.5"
            />
        );

    } else {

        icone = (
            <FaX
                size={20}
                className="border-2 rounded-2xl text-red-600 border-red-600 p-0.5"
            />
        );
    }


    // Classe de notification
    let notification_classe;

    if (visible) {

        notification_classe =
            'z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';

    } else {

        notification_classe =
            'z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200';
    }


    // Texte du bouton
    let textbouton;

    if (loading) {
        textbouton = "Téléchargement...";
    } else {
        textbouton = "Télécharger le fichier";
    }


    // Modale de détails
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


                    <h1 className='font-extrabold text-2xl mb-4 text-purple-700'>
                        Détail du support
                    </h1>


                    <div className='w-full space-y-3 text-left border-t pt-3'>

                        <p>
                            <span className='font-bold text-slate-600'>
                                Nom du support :
                            </span>{' '}
                            {elementSelectionne.titre || elementSelectionne.nom}
                        </p>


                        <p>
                            <span className='font-bold text-slate-600'>
                                Type :
                            </span>{' '}
                            {elementSelectionne.categorie || elementSelectionne.role}
                        </p>


                        <p>
                            <span className='font-bold text-slate-600'>
                                Date d'ajout :
                            </span>{' '}
                            {elementSelectionne.date_creation ||
                                elementSelectionne.duree ||
                                'N/A'}
                        </p>

                    </div>


                    <button
                        onClick={download_file}
                        disabled={loading}
                        className='w-full mt-6 p-2.5 bg-slate-800 cursor-pointer duration-200 active:scale-95 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors disabled:opacity-50'
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
            <div className='p-4 text-center text-gray-500 border-b'>
                Aucun support trouvé.
            </div>
        );

    } else {

        listeSupports = support.map((item, index) => (

            <div
                key={item.id || index}
                className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm transition-colors'
            >

                <div className='col-span-3 font-bold text-slate-900'>
                    {item.titre || item.nom}
                </div>


                <div className='col-span-2 inline-block text-slate-700 px-2.5 py-1 rounded-full text-md'>
                    {item.categorie || item.role}
                </div>


                <div className='col-span-1 text-gray-500'>
                    {item.date_creation || item.duree || 'N/A'}
                </div>


                <div className='col-span-1 flex items-center justify-end gap-3 text-gray-500'>

                    <div
                        onClick={() => ouvrirVoir(item)}
                        className='cursor-pointer hover:text-blue-600 active:scale-95 transition-all p-1'
                        title="Voir"
                    >
                        <FaEye />
                    </div>
                </div>

            </div>
        ));
    }


    return (

        <main className='relative m-7 col-span-6 font-sans text-slate-800'>

            {/* NOTIFICATION */}
            <div className={notification_classe}>
                {icone}
                {message}
            </div>


            {/* MODALE */}
            {contenuModaleVoir}


            {/* EN-TÊTE */}
            <div className='w-full flex items-center justify-between mb-4'>

                <div className='font-extrabold text-xl'>
                    Mes Supports
                </div>

            </div>


            {/* EN-TÊTE DU TABLEAU */}
            <div className='bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-black-700 text-sm'>

                <div className='col-span-3'>
                    Noms du supports
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