import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/logo/logo.png';
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaCheck, FaX } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { Registre } from '../services/authentification'; 
import { getFormations } from '../services/formations';

export const Register = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [cin, setCin] = useState("");
    const [password, setPassword] = useState("");
    const [second_pass, setSecond_pass] = useState("");

    const [formations, setFormations] = useState([]);
    const [selectedFormationSelect, setSelectedFormationSelect] = useState("");
    const [selectedFormationsCheckbox, setSelectedFormationsCheckbox] = useState([]);
    const [showFormationModal, setShowFormationModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(true);
    const navigate = useNavigate();
    const [chargement, setChargement] = useState(false);

    useEffect(() => {
        getFormations().then(res => {
            if (res && res.data) {
                setFormations(res.data);
            } else if (res) {
                setFormations(res);
            } else {
                setFormations([]);
            }
        });
    }, []);

    const handleCheckboxChange = (id) => {
        if (selectedFormationsCheckbox.includes(id)) {
            setSelectedFormationsCheckbox(prev => prev.filter(item => item !== id));
        } else {
            setSelectedFormationsCheckbox(prev => [...prev, id]);
        }
    };

    const notification = (text, isSuccess) => {
        setMessage(text);
        setSuccess(isSuccess);
        setVisible(true);
        setTimeout(() => setVisible(false), 3000);
    };

    const inscrire = async (e) => {
        e.preventDefault();
        if (!nom || !prenom || !email || !password || !second_pass || !cin) {
            return notification("Veuillez remplir tous les champs", false);
        }
        if (password.length < 8) {
            return notification("Le mot de passe est trop court",false);
        } 
        if (password !== second_pass) {
            return notification("Les mots de passe ne correspondent pas", false);
        }
        if (cin) {
            let ciN = Number(cin);
            if (!ciN){
                return notification("Erreur dans le CIN !",false);
            }
        } 
        setChargement(true);
        const resultat = await Registre(nom, prenom, cin, email, password, {
            formationSelect: selectedFormationSelect,
            formationsCheckbox: selectedFormationsCheckbox
        });
        setTimeout(() => {
            notification(resultat.message, resultat.success);
        },3000);
        setChargement(false);
        if (resultat.success) {
            navigate("/Dashboard/Etudiants/formations");
        }
    };

    let texteBoutonFormation = "Sélectionner vos formations";
    if (selectedFormationsCheckbox.length > 0) {
        texteBoutonFormation = selectedFormationsCheckbox.length + " formation(s) sélectionnée(s)";
    }

    let modalDisplayClass = "fixed inset-0 bg-black/50 z-50 justify-center items-center p-4 ";
    if (showFormationModal) {
        modalDisplayClass = modalDisplayClass + "flex";
    } else {
        modalDisplayClass = modalDisplayClass + "hidden";
    }

    let alertClasses = "absolute w-75 transition-all duration-300 flex p-2 gap-3 items-center font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md z-50 ";
    if (visible) {
        alertClasses = alertClasses + "opacity-100 translate-x-0";
    } else {
        alertClasses = alertClasses + "opacity-0 -translate-x-full";
    }

    let submitButtonClasses = "md:w-[58%] w-full m-2 p-2 bg-blue-900 font-bold text-white rounded-lg cursor-pointer";
    if (chargement) {
        submitButtonClasses = submitButtonClasses + "opacity-50";
    }

    return (
        <div>
            <div className={alertClasses}>
                {success && <FaCheck size={20} className="text-green-600 border-2 rounded-2xl border-green-600" />}
                {!success && <FaX size={20} className="text-red-600 border-2 rounded-2xl border-red-600" />}
                {message}
            </div>

            <div className={modalDisplayClass}>
                <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl relative text-left">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="font-extrabold text-lg text-blue-900">Choisir vos formations</h3>
                        <button onClick={() => setShowFormationModal(false)} className="text-gray-400 hover:text-red-600 font-bold text-xl">✕</button>
                    </div>
                    <div className="my-3">
                        <label className="text-xs font-bold text-blue-900 block mb-1">Choix rapide :</label>
                        <select value={selectedFormationSelect} onChange={(e) => setSelectedFormationSelect(e.target.value)} className="border w-full p-2 rounded-lg text-sm">
                            <option value="">-- Choisir une formation unique --</option>
                            {formations.map((item, i) => {
                                let optionValue = item.id;
                                let optionLabel = item.titre;
                                if (!optionLabel) {
                                    optionLabel = item.nom;
                                }
                                let optionKey = item.id;
                                if (!optionKey) {
                                    optionKey = i;
                                }
                                return <option key={optionKey} value={optionValue}>{optionLabel}</option>;
                            })}
                        </select>
                    </div>
                    <div className="my-3">
                        <label className="text-xs font-bold text-blue-900 block mb-1">Choix multiples :</label>
                        <div className="border rounded-lg p-2 max-h-40 overflow-y-auto bg-gray-50">
                            {formations.map((item, i) => {
                                let itemKey = item.id;
                                if (!itemKey) {
                                    itemKey = i;
                                }
                                let itemLabel = item.titre;
                                if (!itemLabel) {
                                    itemLabel = item.nom;
                                }
                                return (
                                    <div key={itemKey} className="flex items-center gap-2 my-1">
                                        <input type="checkbox" checked={selectedFormationsCheckbox.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} className="accent-green-600" />
                                        <label className="text-[0.85rem]">{itemLabel}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button onClick={() => setShowFormationModal(false)} className="w-full mt-4 bg-green-600 text-white font-bold p-2 rounded-lg">Valider</button>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen'>
                <div className='md:w-150 xl:w-250 h-screen md:h-150 lg:h-300 xl:h-130 w-screen flex rounded-2xl shadow-xl shadow-black/50'>
                    <div className='bg-blue-900 lg:block hidden w-[50%] h-full rounded-2xl'>
                        <div className='flex items-center m-4'>
                            <div className='flex items-center flex-col'>
                                <img src={Logo} alt="" className='w-155 h-75 cursor-pointer active:scale-95'/>
                                <p className='-mt-10 mb-3 text-white text-[0.8rem]'>PLateforme de gestion de formation <br /> et de support pedagogique en ligne</p>
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
                    <form onSubmit={inscrire} className='md:w-[60%] lg:w-full m-2 text-center items-center justify-center flex flex-col'>
                        <h1 className='font-extrabold m-2 text-3xl'>IM TECH INFO</h1>
                        <h2 className='font-extrabold m-1 text-md'>Créer un compte</h2>
                        <input type="text" onChange={(e) => setNom(e.target.value)} placeholder='Nom' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        <input type="text" onChange={(e) => setPrenom(e.target.value)} placeholder='Prénom' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        <input type="text" onChange={(e) => setCin(e.target.value)} placeholder='CIN' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        
                        <button type="button" onClick={() => setShowFormationModal(true)} className='border-2 bg-green-600 text-white font-bold w-full md:w-[58%] p-1 m-1 rounded-lg'>
                            {texteBoutonFormation}
                        </button>

                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        <input type="password" onChange={(e) => setSecond_pass(e.target.value)} placeholder='Confirmer mot de passe' className='border w-full md:w-[58%] p-1 m-1 rounded-lg'/>
                        
                        <button type="submit" className={submitButtonClasses}>S'inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
};