import React from 'react';
import Logo from '../assets/images/logo/logo.png';
import { FaFacebook,FaInstagram,FaTwitter,FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FaCheck,FaX } from 'react-icons/fa6';
import { useState } from 'react';
import {Registre} from '../services/authentification'; 
import { useNavigate } from 'react-router';
export const Register = () => {
    // pour pouvoir enregistrer le formulaire
        const [nom,setNom] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [second_pass,setSecond_pass] = useState("");
    // pour savoir si l'email est ajoute avec succes ou erreur == verification visuelle
        const [visible,setVisible] = useState(false); //si c'est false le pop-up ne s'affiche pas
        const[message,setMessage] = useState(""); //message a envoye si erreur 
        const [success,setSuccess] = useState(true);

    // pour la navigation
        const navigate = useNavigate();

     // apparition et suppression du bouton
        const [chargement,setChargement] = useState(false);
        // mise en place du pop-up de succès et echec
        const notification = (text, success) => {
            setMessage(text); //sous forme de text
            setSuccess(success);
            setVisible(true);
            // durée d'apparition du pop-up avec settimeout
            setTimeout(() => {
                setVisible(false)
            }, 3000);
        }
        let icone;
        if (success) {
            icone = <FaCheck size={20} className={`border-2 rounded-2xl text-green-600  border-green-600`}/>;
        } else {
            icone = <FaX size={20} className={`border-2 rounded-2xl text-red-600  border-red-600`}/>;
        }
    
    
        let notification_classe;
        if (visible) {
            notification_classe = 'opacity-100 translate-x-0 transition-all  duration-300 transition-transform absolute w-75 flex p-2 gap-3 items-center  font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400';
        }
        else {
            notification_classe = 'absolute w-75 -translate-x-101 transition-all duration-300 transition-transform flex p-2 gap-3 items-center  font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400';
        }
    
    
        let classe;
        if (chargement) {
            classe =  'opacity-10 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
        } else {
            classe = 'opacity-100 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
        }
        const inscrire = async(e) => {
            e.preventDefault();
            // Validation préalable
            if (!nom || !email || !password ||!second_pass) {
                notification("Veuillez remplir tous les champs", false);
                return; // pour stopper la fonction
            }
            if (password !== second_pass) {
                notification("Les mots de passe ne correspondent pas", false);
                return;
            }
            setChargement(true);
            const resultat = await Registre(nom,email,password); //la fonction qui se trouve dans '../services/authentification';
            if (resultat.success) { 
                navigate("/Dashboard/Etudiants/Dashetu")
            }
            // apparition du pop-up
            notification(resultat.message,resultat.success); //depuis le back
            setChargement(false);
        }
  return (
    <div>
        <div className={notification_classe}>
            {icone} {message}
        </div>
        <div className='flex justify-center items-center h-screen'>
            <div className='md:w-150 xl:w-250 h-screen md:h-150 justify-center items-center lg:h-300 xl:h-130 w-screen flex rounded-2xl shadow-xl shadow-black/50'>
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
                <div className='md:w-[60%] lg:w-full m-3 text-center items-center justify-center'>
                <h1 className='font-extrabold m-4 text-3xl'><span>IM </span>TECH INFO</h1>
                <h2 className='font-extrabold m-2 text-md'>Créer un compte</h2>
                <p className='text-gray-400 m-2 text-[0.9rem]'>Remplissez les informations ci-dessous</p>
                <input type="text" onChange={(e)=> setNom(e.target.value)} placeholder='Nom Complet' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                <input type="email" onChange={(e)=> setEmail(e.target.value)} placeholder='Email' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder='Mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                <input type="password"  onChange={(e)=> setSecond_pass(e.target.value)} placeholder='Confirmer votre mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                <button className={classe} onClick={inscrire}>S'inscrire</button>
                <p className='text-md text-center'>Déja un compte ? <Link to='/Login' className='text-blue-900 font-bold duration-200 active:scale-95'> Se connecter</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}
