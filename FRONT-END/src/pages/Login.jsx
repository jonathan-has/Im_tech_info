import React from 'react';
import Logo from '../assets/images/logo/logo.png';
import { FaFacebook,FaInstagram,FaTwitter,FaTiktok } from 'react-icons/fa6';
import { FaCheck,FaX } from 'react-icons/fa6';
import { Link } from 'react-router';
import { useState } from 'react';
import {login} from '../services/authentification';
export const Login = () => {
     // pour pouvoir enregistrer le formulaire
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
    // pour savoir si l'email est ajoute avec succes ou erreur == verification visuelle
        const [visible,setVisible] = useState(false); //si c'est false le pop-up ne s'affiche pas
        const[message,setMessage] = useState(""); //message a envoye si erreur 
        const [success,setSuccess] = useState(true);

        // apparition et suppression du bouton
        const [chargement,setChargement] = useState(false);
        // mise en place du pop-up de succès et echec

        // mot de passe afficher/masquer
        const [voir_password,setVoir_password] = useState(false);
        let inputType;
        if (voir_password) {
            inputType = "text";
        }
        else {
            inputType =  "password";
        }
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
            notification_classe = 'opacity-10 absolute w-75 -translate-x-101 transition-all duration-300 transition-transform flex p-2 gap-3 items-center  font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400';
        }
    
    
        let classe;
        if (chargement) {
            classe =  'opacity-10 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
        } else {
            classe = 'opacity-100 md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95';
        }
        const se_connecter = async(e) => {
            e.preventDefault();
            if (!email || !password) {
                notification("Veuillez remplir tous les champs", false);
                return; // pour stopper la fonction
            }
            setChargement(true);
            const resultat = await login(email,password); //la fonction qui se trouve dans '../services/authentification';
    
            // apparition du pop-up
            notification(resultat.message,resultat.success); //depuis le back
            setChargement(false);
            // Validation préalable

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
                    <div className='font-extrabold text-white m-10 text-center duration-200 animate-bounce'>RECONNECTEZ-VOUS !</div>
                </div>
                <div className='md:w-[60%] lg:w-full m-3 text-center items-center justify-center'>
                    <h1 className='font-extrabold m-2 text-2xl'>Connexion</h1>
                    <p className='text-gray-400 m-2 text-[0.9rem]'>Accéder à votre espace</p>
                    <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                    <input type={inputType} placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
                    <p><input type="checkbox" checked={voir_password} onChange={(e) =>setVoir_password(e.target.checked)} className='mr-5'/>Se rappeler de moi <button className='mx-5 text-blue-900 font-bold duration-200 active:scale-95 cursor-pointer'>Mot de passe oublié ?</button></p>
                    <button className={classe} onClick={se_connecter}>Se connecter</button>
                    <p className='text-md text-center'>Pas encore de compte ? <Link to='/Register' className='text-blue-900 font-bold duration-200 active:scale-95' >S'inscrire</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}
