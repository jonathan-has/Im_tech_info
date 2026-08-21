import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaCheck, FaX, FaXmark, FaPlus, FaGraduationCap, FaFolderOpen, FaChevronDown } from 'react-icons/fa6';
import { postEnseignant, deleteEnseignant, getEnseignants } from '../../../services/Dashboard/superadmin/superadminens';
import { getElementsEnseignant } from '../../../services/liste_element';
import { getFormations } from '../../../services/formations';

export const Enseignants = () => {
    // Hooks d'état de la liste et des modales
    const [enseignants, setEnseignants] = useState([]);
    const [affichageVoir, setAffichageVoir] = useState(false);
    const [affichageAjout, setAffichageAjout] = useState(false);
    const [chargement, setChargement] = useState(false);

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
    const [prenom, setPrenom] = useState('');
    const [matiere, setMatiere] = useState('');
    const [formations, setFormations] = useState([]);
    const [cin, setCin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [montrerMotDePasse, setMontrerMotDePasse] = useState(false);

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

    const reinitialiserFormulaire = () => {
        setNom('');
        setPrenom('');
        setMatiere('');
        setCin('');
        setEmail('');
        setPassword('');
        setMontrerMotDePasse(false);
    };

    const chargerFormations = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getFormations(token);
            if (res) {
                let data = [];
                if (Array.isArray(res)) {
                    data = res;
                } else if (res.formations) {
                    data = res.formations;
                } else if (res.data) {
                    data = res.data;
                }
                setFormations(data);
            } else {
                setFormations([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des formations", error);
        }
    };

    // CHARGEMENT DE LA LISTE DES ENSEIGNANTS
    const chargerEnseignants = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await getEnseignants(token);
            if (res) {
                let data = [];
                if (Array.isArray(res)) {
                    data = res;
                } else if (res.enseignants) {
                    data = res.enseignants;
                } else if (res.data) {
                    data = res.data;
                }
                setEnseignants(data);
            } else {
                setEnseignants([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des enseignants", error);
            afficherNotification("Erreur lors du chargement de la liste", false);
        }
    };

    // RECUPERATION DE L'USER ET DU ROLE
    const userData = localStorage.getItem('user');
    const roleDirect = localStorage.getItem('role');

    let user_role = "";
    if (userData) {
        try {
            const user = JSON.parse(userData);
            if (user && user.role) {
                user_role = user.role;
            }
        } catch (e) {
            console.error("Erreur parsing user", e);
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

    let style = {};
    if (role === "Superadmin") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5 hidden';
    } else if (role === "RH") {
        style = 'cursor-pointer hover:text-red-600 active:scale-95 transition-all p-1.5';
    }

    useEffect(() => {
        chargerFormations();
        chargerEnseignants();
    }, []);

    const enregistrerEnseignant = async () => {
        if (!nom || !matiere || !cin || !email) {
            afficherNotification("Veuillez remplir tous les champs !", false);
            return;
        }

        setChargement(true);
        const token = localStorage.getItem('token');
        const dateAutomatique = new Date().toISOString().split('T')[0];

        try {
            const res = await postEnseignant(nom, prenom, matiere, cin, email, password, dateAutomatique, token);

            let estReussi = false;
            if (res) {
                if (res.success || res.status === 200 || res.status === 201 || res.id || res.nom || res.ID) {
                    estReussi = true;
                }
            }

            if (estReussi || !res) {
                let msgSucces = "Enseignant ajouté avec succès !";
                if (res && res.message) {
                    msgSucces = res.message;
                } else if (res && res.data && res.data.message) {
                    msgSucces = res.data.message;
                }
                
                afficherNotification(msgSucces, true);
                reinitialiserFormulaire();
                setAffichageAjout(false);
                chargerEnseignants();
            } else {
                let msgErreur = "Erreur lors de la création.";
                if (res && res.message) {
                    msgErreur = res.message;
                } else if (res && res.data && res.data.message) {
                    msgErreur = res.data.message;
                }
                afficherNotification(msgErreur, false);
            }
        } catch (err) {
            console.error("Erreur catch :", err);
            afficherNotification("Une erreur est survenue lors de l'envoi.", false);
        } finally {
            setChargement(false);
        }
    };

    const supprimerEnseignant = async (id, nomEnseignant) => {
        const token = localStorage.getItem('token');
        const res = await deleteEnseignant(id, token);

        if (res && res.success) {
            const nouvelleListe = enseignants.filter((item) => {
                let currentId = item.ID;
                if (!currentId) {
                    currentId = item.id;
                }
                if (!currentId) {
                    currentId = item.Enseignant_id;
                }
                return currentId !== id;
            });
            setEnseignants(nouvelleListe);
            afficherNotification(res.message, true);
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

    // Icône de notification
    let icone = null;
    if (success) {
        icone = <FaCheck size={18} className="shrink-0 border-2 rounded-2xl text-green-600 border-green-600 p-0.5" />;
    } else {
        icone = <FaX size={18} className="shrink-0 border-2 rounded-2xl text-red-600 border-red-600 p-0.5" />;
    }

    // Classe CSS de notification
    let notification_classe = "";
    if (visible) {
        notification_classe = 'z-50 opacity-100 translate-y-0 sm:translate-x-0 transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-sm flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    } else {
        notification_classe = 'z-50 opacity-0 -translate-y-4 sm:translate-y-0 sm:-translate-x-10 transition-all duration-300 fixed top-4 left-4 right-4 sm:right-auto sm:max-w-sm pointer-events-none flex p-3 gap-3 items-center font-bold rounded-xl bg-white text-slate-800 shadow-xl border border-slate-200 text-sm';
    }

    // Modale de détails (Voir)
    let contenuModaleVoir = null;
    if (affichageVoir && elementSelectionne) {
        let dateCreation = elementSelectionne.Date_creation;
        if (!dateCreation) {
            dateCreation = elementSelectionne.date_creation;
        }
        if (!dateCreation) {
            dateCreation = "N/A";
        }

        let nomEnseignant = elementSelectionne.NOM;
        if (!nomEnseignant) {
            nomEnseignant = elementSelectionne.NOM;
        }
        if (!nomEnseignant) {
            nomEnseignant = 'N/A';
        }

        let titreFormation = elementSelectionne.Titre;
        if (!titreFormation) {
            titreFormation = elementSelectionne.Titre;
        }
        if (!titreFormation) {
            titreFormation = elementSelectionne.matiere;
        }
        if (!titreFormation) {
            titreFormation = 'N/A';
        }
        let emailEnseignant = elementSelectionne.Email;
        if (!emailEnseignant) {
            emailEnseignant = elementSelectionne.email;
        }
        if (!emailEnseignant) {
            emailEnseignant = 'N/A';
        }

        let idEnseignant = elementSelectionne.Enseignant_id;
        if (!idEnseignant) {
            idEnseignant = elementSelectionne.ID;
        }
        if (!idEnseignant) {
            idEnseignant = elementSelectionne.id;
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
                        <p><span className='font-bold text-slate-600'>Nom complet :</span> {nomEnseignant}</p>
                        <p><span className='font-bold text-slate-600'>Formation :</span> {titreFormation}</p>
                        <p><span className='font-bold text-slate-600'>Email :</span> {emailEnseignant}</p>
                        <p><span className='font-bold text-slate-600'>Date d'ajout :</span> {dateCreation}</p>
                    </div>

                    <div className='w-full flex flex-col gap-2 mt-5'>
                        <button
                            onClick={() => ouvrirEleves(idEnseignant)}
                            className='w-full flex items-center justify-center gap-2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors'
                        >
                            <FaGraduationCap /> Voir les élèves
                        </button>
                        <button
                            onClick={() => ouvrirSupports(idEnseignant)}
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
                let cle = eleve.id;
                if (!cle) {
                    cle = eleve.ID;
                }
                if (!cle) {
                    cle = index;
                }

                let nomEleve = eleve.nom;
                if (!nomEleve) {
                    nomEleve = eleve.Nom;
                }

                return (
                    <div key={cle} className='py-2 border-b border-gray-100 text-sm'>
                        {nomEleve}
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
                let cle = support.id;
                if (!cle) {
                    cle = support.ID;
                }
                if (!cle) {
                    cle = index;
                }

                let titreSupport = support.titre;
                if (!titreSupport) {
                    titreSupport = support.Titre;
                }

                let dateEnvoi = support.date_envoi;
                if (!dateEnvoi) {
                    dateEnvoi = support.Date_envoi;
                }

                return (
                    <div key={cle} className='py-2 border-b border-gray-100 flex items-center justify-between gap-2 text-sm'>
                        <span className='truncate'>{titreSupport}</span>
                        <div className='text-xs text-slate-400 shrink-0'>{dateEnvoi}</div>
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
        let texteBoutonAjout = "Ajouter l'enseignant";
        if (chargement) {
            texteBoutonAjout = "Chargement en cours...";
        }

        let typeMotDePasse = 'password';
        if (montrerMotDePasse) {
            typeMotDePasse = 'text';
        }

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
                            placeholder="Nom"
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                         <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            placeholder="Prenom"
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        <div className='relative w-full sm:w-[85%] m-2'>
                            <select
                                value={matiere}
                                onChange={(e) => setMatiere(e.target.value)}
                                className='border border-slate-600 bg-slate-900 w-full p-2.5 rounded-lg text-white appearance-none focus:outline-none focus:border-blue-500 pr-10 cursor-pointer'
                            >
                                <option value="" disabled>Sélectionner une formation</option>
                                {formations.map((form, index) => {
                                    let idForm = form.ID;
                                    if (!idForm) {
                                        idForm = form.id;
                                    }
                                    if (!idForm) {
                                        idForm = form._id;
                                    }
                                    if (!idForm) {
                                        idForm = index;
                                    }

                                    let nomForm = form.Titre;
                                    if (!nomForm) {
                                        nomForm = form.titre;
                                    }
                                    if (!nomForm) {
                                        nomForm = form.name;
                                    }
                                    if (!nomForm) {
                                        nomForm = form.nom;
                                    }
                                    if (!nomForm) {
                                        nomForm = 'Formation sans nom';
                                    }

                                    return (
                                        <option key={idForm} value={idForm}>
                                            {nomForm}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400'>
                                <FaChevronDown className='text-xs' />
                            </div>
                        </div>
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
                        <input
                            type={typeMotDePasse}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Mot de passe'
                            className='border border-slate-600 bg-slate-900 w-full sm:w-[85%] p-2.5 m-2 rounded-lg text-white focus:outline-none focus:border-blue-500'
                        />
                        
                        <div className='w-full sm:w-[85%] m-2 flex items-center gap-2 text-left text-sm text-gray-300'>
                            <input
                                type='checkbox'
                                id='voir-mdp'
                                checked={montrerMotDePasse}
                                onChange={(e) => setMontrerMotDePasse(e.target.checked)}
                                className='rounded border-slate-600 bg-slate-900 text-purple-600 focus:ring-purple-500 cursor-pointer'
                            />
                            <label htmlFor='voir-mdp' className='cursor-pointer select-none'>
                                Afficher le mot de passe
                            </label>
                        </div>

                        <button 
                            onClick={enregistrerEnseignant} 
                            disabled={chargement}
                            className='w-full sm:w-auto mt-2 p-2.5 px-6 bg-purple-600 hover:bg-purple-700 rounded-md text-white duration-200 active:scale-95 cursor-pointer font-medium shadow-md disabled:opacity-50'
                        >
                            {texteBoutonAjout}
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
            let cle = item.Enseignant_id;
            if (!cle) {
                cle = item.ID;
            }
            if (!cle) {
                cle = item.id;
            }
            if (!cle) {
                cle = index;
            }

            let dateCreationItem = item.Date_creation;
            if (!dateCreationItem) {
                dateCreationItem = item.date_creation;
            }
            if (!dateCreationItem) {
                dateCreationItem = "N/A";
            }

            let nomEnseignant = item.NOM;
            if (!nomEnseignant) {
                nomEnseignant = item.NOM;
            }
            if (!nomEnseignant) {
                nomEnseignant = 'N/A';
            }

            let titreFormation = item.Titre;
            if (!titreFormation) {
                titreFormation = item.titre;
            }
            if (!titreFormation) {
                titreFormation = item.matiere;
            }
            if (!titreFormation) {
                titreFormation = 'N/A';
            }

            let idEnseignant = item.Enseignant_id;
            if (!idEnseignant) {
                idEnseignant = item.ID;
            }
            if (!idEnseignant) {
                idEnseignant = item.id;
            }

            return (
                <div
                    key={cle}
                    className='p-3 rounded-md border-b border-gray-100 hover:bg-slate-50 flex items-center justify-between gap-2 sm:grid sm:grid-cols-7 text-sm transition-colors'
                >
                    <div className='min-w-0 sm:col-span-3'>
                        <div className='font-bold text-slate-900 truncate'>{nomEnseignant}</div>
                        <div className='text-xs font-normal text-slate-500 truncate sm:hidden'>
                            {titreFormation}
                        </div>
                    </div>
                    <div className='hidden sm:block sm:col-span-2 text-xs font-normal text-slate-500 truncate'>
                        {titreFormation}
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
                            onClick={() => supprimerEnseignant(idEnseignant, nomEnseignant)} 
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
                <div className='col-span-3'>Nom</div>
                <div className='col-span-2'>Formations</div>
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