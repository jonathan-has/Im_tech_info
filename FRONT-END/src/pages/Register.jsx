import React from 'react';
import Logo from '../assets/images/logo/logo.png';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FaCheck, FaX } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { Registre } from '../services/authentification'; 
import { getFormations } from '../services/formations';
import { useNavigate } from 'react-router';

export const Register = () => {
    // pour pouvoir enregistrer le formulaire
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [cin, setCin] = useState("");
    const [password, setPassword] = useState("");
    const [second_pass, setSecond_pass] = useState("");

    // Formations
    const [formations, setFormations] = useState([]);
    const [selectedFormationSelect, setSelectedFormationSelect] = useState("");
    const [selectedFormationsCheckbox, setSelectedFormationsCheckbox] = useState([]);

    // État pour afficher/masquer le pop-up de choix des formations
    const [showFormationModal, setShowFormationModal] = useState(false);

    // pour savoir si l'email est ajoute avec succes ou erreur == verification visuelle
    const [visible, setVisible] = useState(false); // si c'est false le pop-up ne s'affiche pas
    const [message, setMessage] = useState(""); // message a envoye si erreur 
    const [success, setSuccess] = useState(true);

    // pour la navigation
    const navigate = useNavigate();

    // apparition et suppression du bouton
    const [chargement, setChargement] = useState(false);

    // Chargement des formations via useEffect sans ternaires
    useEffect(() => {
        const chargerFormations = async () => {
            try {
                const res = await getFormations();
                let data = res;
                if (res && res.data) {
                    data = res.data;
                }
                if (!Array.isArray(data)) {
                    data = [];
                }
                setFormations(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des formations:", error);
            }
        };
        chargerFormations();
    }, []);

    // Gestion du choix checkbox sans ternaire
    const handleCheckboxChange = (id) => {
        if (selectedFormationsCheckbox.includes(id)) {
            setSelectedFormationsCheckbox(selectedFormationsCheckbox.filter(item => item !== id));
        } else {
            setSelectedFormationsCheckbox([...selectedFormationsCheckbox, id]);
        }
    };

    // mise en place du pop-up de succès et echec
    const notification = (text, isSuccess) => {
        setMessage(text); // sous forme de text
        setSuccess(isSuccess);
        setVisible(true);
        // durée d'apparition du pop-up avec settimeout
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    let icone = <FaX size={20} className="border-2 rounded-2xl text-red-600 border-red-600" />;
    if (success) {
        icone = <FaCheck size={20} className="border-2 rounded-2xl text-green-600 border-green-600" />;
    }

    let notification_classe = 'absolute w-75 -translate-x-101 transition-all duration-300 transition-transform flex p-2 gap-3 items-center font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400 z-50';
    if (visible) {
        notification_classe = 'opacity-100 translate-x-0 transition-all duration-300 transition-transform absolute w-75 flex p-2 gap-3 items-center font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400 z-50';
    }

    let classe = 'opacity-100 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
    if (chargement) {
        classe = 'opacity-10 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
    }

    const inscrire = async (e) => {
        e.preventDefault();
        // Validation préalable
        if (!nom || !email || !password || !second_pass || !cin) {
            notification("Veuillez remplir tous les champs", false);
            return; // pour stopper la fonction
        }
        if (password !== second_pass) {
            notification("Les mots de passe ne correspondent pas", false);
            return;
        }
        setChargement(true);

        // Envoi des données avec la formation choisie
        const resultat = await Registre(nom, cin, email, password, {
            formationSelect: selectedFormationSelect,
            formationsCheckbox: selectedFormationsCheckbox
        }); // la fonction qui se trouve dans '../services/authentification';

        if (resultat.success) { 
            navigate("/Dashboard/Etudiants/Dashetu");
        }
        // apparition du pop-up
        notification(resultat.message, resultat.success); // depuis le back
        setChargement(false);
    };

    // Génération des options du select sans ternaire
    const optionsFormations = [];
    optionsFormations.push(<option key="default" value="">-- Choisir une formation unique --</option>);
    formations.forEach((item, index) => {
        let itemId = item.id;
        if (item._id) {
            itemId = item._id;
        }
        if (!itemId) {
            itemId = index;
        }

        let itemTitle = item.titre;
        if (!itemTitle) {
            itemTitle = item.nom;
        }
        if (!itemTitle) {
            itemTitle = item.title;
        }

        optionsFormations.push(
            <option key={itemId} value={itemId}>
                {itemTitle}
            </option>
        );
    });

    // Génération des items du checkbox sans ternaire
    const checkboxesFormations = [];
    if (formations.length === 0) {
        checkboxesFormations.push(
            <p key="none" className="text-[0.8rem] text-gray-400">Aucune formation disponible</p>
        );
    } else {
        formations.forEach((item, index) => {
            let itemId = item.id;
            if (item._id) {
                itemId = item._id;
            }
            if (!itemId) {
                itemId = index;
            }

            let itemTitle = item.titre;
            if (!itemTitle) {
                itemTitle = item.nom;
            }
            if (!itemTitle) {
                itemTitle = item.title;
            }

            checkboxesFormations.push(
                <div key={itemId} className="flex items-center gap-2 my-2 p-1 hover:bg-gray-100 rounded">
                    <input
                        type="checkbox"
                        id={'reg-form-' + itemId}
                        checked={selectedFormationsCheckbox.includes(itemId)}
                        onChange={() => handleCheckboxChange(itemId)}
                        className="cursor-pointer accent-green-600"
                    />
                    <label htmlFor={'reg-form-' + itemId} className="text-[0.85rem] text-black cursor-pointer w-full text-left">
                        {itemTitle}
                    </label>
                </div>
            );
        });
    }

    // Texte indicatif pour le bouton du pop-up
    let texteBoutonFormation = "Sélectionner vos formations";
    if (selectedFormationsCheckbox.length > 0) {
        texteBoutonFormation = selectedFormationsCheckbox.length + " formation(s) sélectionnée(s)";
    }

    // Classe pour afficher/masquer le pop-up centré
    let modalClasse = "fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 hidden";
    if (showFormationModal) {
        modalClasse = "fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4";
    }

    return (
        <div>
            <div className={notification_classe}>
                {icone} {message}
            </div>

            {/* POP-UP / MODALE DE SÉLECTION (CENTRÉE AU MILIEU) */}
            <div className={modalClasse}>
                <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative text-left">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="font-extrabold text-lg text-blue-900">Choisir vos formations</h3>
                        <button 
                            type="button"
                            onClick={() => setShowFormationModal(false)}
                            className="text-gray-400 hover:text-red-600 font-bold text-xl p-1"
                        >
                            ✕
                        </button>
                    </div>
                    
                    {/* Option 1: Select Unique */}
                    <div className="my-3">
                        <label className="text-xs font-bold text-blue-900 block mb-1">Choix rapide :</label>
                        <select
                            value={selectedFormationSelect}
                            onChange={(e) => setSelectedFormationSelect(e.target.value)}
                            className="border border-gray-300 focus:border-blue-900 w-full p-2 rounded-lg text-black bg-white focus:outline-none text-sm"
                        >
                            {optionsFormations}
                        </select>
                    </div>

                    {/* Option 2: Checkboxes Multiples */}
                    <div className="my-3">
                        <label className="text-xs font-bold text-blue-900 block mb-1">Choix multiples :</label>
                        <div className="border border-gray-300 rounded-lg p-2 max-h-48 overflow-y-auto bg-gray-50">
                            {checkboxesFormations}
                        </div>
                    </div>

                    {/* Bouton de confirmation Vert */}
                    <button 
                        type="button" 
                        onClick={() => setShowFormationModal(false)}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold p-2.5 rounded-lg duration-200 active:scale-95"
                    >
                        Valider la sélection
                    </button>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen'>
                <div className='md:w-150 xl:w-250 h-screen md:h-150 justify-center items-center lg:h-300 xl:h-130 w-screen flex rounded-2xl shadow-xl shadow-black/50'>
                    
                    {/* Section Bleue Gauche (Vos Couleurs d'Origine) */}
                    <div className='bg-blue-900 lg:block hidden w-[50%] h-full rounded-2xl'>
                        <div className='flex items-center m-4'>
                            <div className='flex items-center flex-col'>
                                <img src={Logo} alt="" className='w-150 h-75 cursor-pointer active:scale-95'/>
                                <p className='-mt-10 mb-3 text-white text-[0.8rem]'>Plateforme de gestion de formation <br /> et de support pedagogique en ligne</p>
                                <div className='flex gap-2'>
                                    <FaFacebook size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                                    <FaInstagram size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                                    <FaTwitter size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                                    <FaTiktok size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                                </div>
                            </div>
                        </div>
                        <div className='font-extrabold text-white m-10 text-center duration-200 animate-bounce'>INSCRIVEZ-VOUS !</div>
                    </div>

                    {/* Formulaire Droite */}
                    <div className='md:w-[60%] lg:w-full m-2 text-center items-center justify-center'>
                        <h1 className='font-extrabold m-3 text-3xl'>IM TECH INFO</h1>
                        <h2 className='font-extrabold m-2 text-md'>Créer un compte</h2>
                        <p className='text-gray-400 m-2 text-[0.9rem]'>Remplissez les informations ci-dessous</p>
                        <input type="text" onChange={(e) => setNom(e.target.value)} placeholder='Nom Complet' className='border w-full md:w-[58%] p-1 m-1 rounded-lg text-black focus:text-black'/><br />
                        <input type="text" onChange={(e) => setCin(e.target.value)} placeholder='CIN' className='border w-full md:w-[58%] p-1 m-1 rounded-lg text-black focus:text-black'/><br />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border w-full md:w-[58%] p-1 m-1 rounded-lg text-black focus:text-black'/><br />
                        
                        {/* Bouton avec Bleu et Vert utilisés séparément, SANS SPAN */}
                        <button 
                            type="button" 
                            onClick={() => setShowFormationModal(true)}
                            className='border-2 bg-green-600 text-white font-bold w-full md:w-[58%] p-1 m-1 rounded-lg text-center duration-200 cursor-pointer active:scale-95'
                        >
                            {texteBoutonFormation}
                        </button><br />

                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                        <input type="password" onChange={(e) => setSecond_pass(e.target.value)} placeholder='Confirmer votre mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                        
                        <button className={classe} onClick={inscrire}>S'inscrire</button>
                        <p className='text-md text-center'>Déja un compte ? <Link to='/Login' className='text-blue-900 font-bold duration-200 active:scale-95'> Se connecter</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};