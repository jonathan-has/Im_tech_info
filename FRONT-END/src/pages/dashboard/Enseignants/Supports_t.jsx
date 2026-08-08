import React, { useState, useEffect } from "react";
import {FaEye,FaTrash,FaCheck,FaX,FaXmark} from "react-icons/fa6";
import {telecharger_fichier,getSupport,postfile,deletSupport} from "../../../services/Dashboard/teacher/teachersupports";
export const Supports_t = () => {
    // Liste des supports
    const [support, setSupport] = useState([]);

    // Modales
    const [affichageVoir, setAffichageVoir] = useState(false);
    const [affichageInserer, setAffichageInserer] = useState(false);

    // Support sélectionné
    const [elementSelectionne, setElementSelectionne] = useState(null);

    // Fichier sélectionné
    const [fichierSelectionne, setFichierSelectionne] = useState(null);

    // Loading téléchargement
    const [loading, setLoading] = useState(false);

    // Notification
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);

    // Formulaire
    const [support_name, setSupport_name] = useState("");
    const [categorie, setCategories] = useState("");

    // NOTIFICATION
    const afficherNotification = (msg, estSucces) => {
        setMessage(msg);
        setSuccess(estSucces);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    // CHARGER LES SUPPORTS

    const chargerSupport = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await getSupport(token);
            setSupport(res || []);
        } catch (error) {

            console.error("Erreur chargement :", error);

            afficherNotification(
                "Erreur lors du chargement des supports",
                false
            );
        }
    };
    useEffect(() => {
        chargerSupport();
    }, []);

    // SUPPRIMER  
    const supprimerSupports = async (id, nomSupport) => {
        const token = localStorage.getItem("token");
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
            console.error("Erreur suppression :", error);
            afficherNotification(
                "Erreur lors de la suppression !",
                false
            );
        }
    };

    // OUVRIR LES DÉTAILS
    const ouvrirVoir = (item) => {

        setElementSelectionne(item);
        setAffichageVoir(true);
    };

    // OUVRIR LA MODALE D'INSERTION

    const ouvrirInserer = () => {

        setFichierSelectionne(null);
        setSupport_name("");
        setCategories("");

        setAffichageInserer(true);
    };

    // CHOISIR LE FICHIER

    const choisirFichier = (event) => {

        const fichier = event.target.files[0];

        if (fichier) {
            setFichierSelectionne(fichier);
        }
    };

    // INSÉRER LE SUPPORT
    const insererFichier = async () => {
        if (!fichierSelectionne) {
            afficherNotification(
                "Veuillez sélectionner un fichier !",
                false
            );

            return;
        }

        if (!support_name.trim()) {
            afficherNotification(
                "Veuillez entrer le nom du support !",
                false
            );

            return;
        }
        const token = localStorage.getItem("token");
        try {
            const res = await postfile(
                support_name,
                categorie,
                fichierSelectionne,
                token
            );

            if (res.success) {
                afficherNotification(
                    "Support ajouté avec succès !",
                    true
                );
                setAffichageInserer(false);
                setFichierSelectionne(null);
                setSupport_name("");
                setCategories("");
                chargerSupport();
            } else {
                afficherNotification(
                    res.message || "Erreur lors de l'ajout !",
                    false
                );
            }
        } catch (error) {
            console.error("Erreur insertion :", error);
            afficherNotification(
                "Erreur lors de l'ajout du support !",
                false
            );
        }
    };

    // TÉLÉCHARGER
    const download_file = async () => {
        if (!elementSelectionne) {
            return;
        }
        setLoading(true);
        try {
            let fileName;
            if (elementSelectionne.titre) {
                fileName =
                    elementSelectionne.titre + ".pdf";
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
            console.error("Erreur téléchargement :", error);
            afficherNotification(
                "Erreur du téléchargement !",
                false
            );
        } finally {

            setLoading(false);
        }
    };
    // BOUTON TÉLÉCHARGEMENT
    let classeTelechargement;
    let textbouton;
    if (loading) {
        classeTelechargement =
            "opacity-50 pointer-events-none w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg";

        textbouton = "Téléchargement...";
    } else {
        classeTelechargement =
            "w-full mt-6 p-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors cursor-pointer active:scale-95";

        textbouton = "Télécharger le fichier";
    }
    // ICÔNE NOTIFICATION
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

    // NOTIFICATION
    let notification_classe;
    if (visible) {
        notification_classe =
            "z-50 opacity-100 translate-x-0 transition-all duration-300 fixed top-4 left-4 flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200";
    } else {
        notification_classe =
            "z-50 opacity-0 -translate-x-10 transition-all duration-300 fixed top-4 left-4 pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200";
    }

    // MODALE VOIR
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        contenuModaleVoir = (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                <div className="relative w-full max-w-md bg-white text-slate-800 p-6 rounded-2xl shadow-2xl">
                    <button
                        onClick={() => setAffichageVoir(false)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                    >
                        <FaXmark className="text-xl" />
                    </button>
                    <h1 className="font-extrabold text-2xl mb-4 text-purple-700">
                        Détails du support
                    </h1>
                    <div className="w-full space-y-3 text-left border-t pt-3">
                        <p>
                            <span className="font-bold text-slate-600">
                                Nom du support :
                            </span>{" "}
                            {elementSelectionne.titre ||
                                elementSelectionne.nom}
                        </p>
                        <p>
                            <span className="font-bold text-slate-600">
                                Type :
                            </span>{" "}
                            {elementSelectionne.categorie ||
                                elementSelectionne.role}
                        </p>

                        <p>
                            <span className="font-bold text-slate-600">
                                Date d'ajout :
                            </span>{" "}
                            {elementSelectionne.date_creation ||
                                elementSelectionne.duree ||
                                "N/A"}
                        </p>
                    </div>
                    <button
                        onClick={download_file}
                        disabled={loading}
                        className={classeTelechargement}
                    >
                        {textbouton}
                    </button>
                </div>
            </div>
        );
    }

    // MODALE INSERTION
    let contenuModaleInserer = null;
    if (affichageInserer) {
        contenuModaleInserer = (

            <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blu-sm p-4">

                <div className="relative w-full max-w-lg bg-slate-800 text-white p-6 rounded-2xl shadow-2xl">

                    <button
                        onClick={() => setAffichageInserer(false)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-700"
                    >
                        <FaXmark className="text-xl" />
                    </button>

                    <h1 className="font-extrabold text-2xl mb-1 text-center">
                        Insérer un support
                    </h1>

                    <p className="text-gray-400 mb-4 text-center text-[0.9rem]">
                        Ajouter un nouveau support
                    </p>

                    <div className="w-full flex flex-col items-center">

                        {/* NOM */}
                        <input
                            type="text"
                            placeholder="Nom du support"
                            value={support_name}
                            onChange={(e) =>
                                setSupport_name(e.target.value)
                            }
                            className="border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white"
                        />
                        {/* CATÉGORIE */}
                        <input
                            type="text"
                            placeholder="Catégorie"
                            value={categorie}
                            onChange={(e) =>
                                setCategories(e.target.value)
                            }
                            className="border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white"
                        />
                        {/* FICHIER */}
                        <input
                            type="file"
                            onChange={choisirFichier}
                            className="border border-slate-600 bg-slate-900 w-full md:w-[80%] p-2.5 m-2 rounded-lg text-white"
                        />

                        {/* FICHIER SÉLECTIONNÉ */}
                        {fichierSelectionne && (
                            <div className="border border-slate-600 bg-slate-900 w-full md:w-[80%] p-3 m-2 rounded-lg text-left">
                                <p className="font-bold">
                                    Fichier sélectionné :
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    {fichierSelectionne.name}
                                </p>

                            </div>
                        )}
                        {/* BOUTON */}
                        <button
                            onClick={insererFichier}
                            className="md:w-[80%] w-full m-3 p-3 bg-blue-900 font-bold text-white rounded-md active:scale-95"
                        >
                            Insérer le support
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // LISTE DES SUPPORTS
    let listeSupports = null;
    if (support.length === 0) {
        listeSupports = (
            <div className="p-4 text-center text-gray-500 border-b">
                Aucun support trouvé.
            </div>
        );

    } else {
        listeSupports = support.map((item, index) => (

            <div
                key={item.id || index}
                className="p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 grid grid-cols-7 items-center text-sm"
            >

                <div className="col-span-3 font-bold text-slate-900">
                    {item.titre || item.nom}
                </div>

                <div className="col-span-2 text-slate-700">
                    {item.categorie || item.role}
                </div>

                <div className="col-span-1 text-gray-500">
                    {item.date_creation ||
                        item.duree ||
                        "N/A"}
                </div>

                <div className="col-span-1 flex items-center justify-end gap-3">

                    {/* VOIR */}

                    <div
                        onClick={() => ouvrirVoir(item)}
                        className="cursor-pointer hover:text-blue-600 active:scale-95 p-1"
                        title="Voir"
                    >
                        <FaEye />
                    </div>

                    {/* SUPPRIMER */}

                    <div
                        onClick={() =>
                            supprimerSupports(
                                item.id,
                                item.titre || item.nom
                            )
                        }
                        className="cursor-pointer hover:text-red-600 active:scale-95 p-1"
                        title="Supprimer"
                    >
                        <FaTrash className="text-red-600" />
                    </div>

                </div>

            </div>
        ));
    }

    // RETURN
    return (

        <main className="relative m-7 col-span-6 font-sans text-slate-800">
            {/* NOTIFICATION */}

            <div className={notification_classe}>
                {icone}
                {message}
            </div>

            {/* MODALES */}
            {contenuModaleVoir}
            {contenuModaleInserer}

            {/* EN-TÊTE */}
            <div className="w-full flex items-center justify-between mb-4">
                <div className="font-extrabold text-xl">
                    Mes Supports
                </div>
                <div
                    className="p-2.5 bg-purple-600 hover:bg-purple-700 rounded-md text-white cursor-pointer font-medium shadow-md"
                    onClick={ouvrirInserer}
                >
                    + Insérer un support
                </div>
            </div>
            {/* TABLEAU */}
            <div className="bg-gray-200 p-3 rounded-md mt-2 grid grid-cols-7 font-bold text-sm">
                <div className="col-span-3">
                    Noms du supports
                </div>
                <div className="col-span-2">
                    Types de formations
                </div>
                <div className="col-span-1">
                    Date d'ajout
                </div>
                <div className="col-span-1 text-right pr-2">
                    Actions
                </div>
            </div>
            {/* LISTE */}
            {listeSupports}
        </main>
    );
};