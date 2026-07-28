import React from 'react';
import Logo from '../assets/images/logo/logo.png';
import { FaFacebook,FaInstagram,FaTwitter,FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router';
export const Register = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='md:w-150 xl:w-250 h-screen md:h-150 justify-center items-center lg:h-300 xl:h-130 w-screen flex rounded-2xl shadow-xl shadow-black/50'>
            <div className='bg-blue-900 lg:block hidden w-[50%] h-full rounded-2xl'>
                <div className='flex items-center m-4'>
                    <div className='flex items-center flex-col'>
                        <img src={Logo} alt="" className='w-150 h-75 cursor-pointer active:scale-95'/>
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
            <div className='md:w-[60%] lg:w-full m-3 text-center items-center justify-center'>
            <h1 className='font-extrabold m-4 text-3xl'><span>IM </span>TECH INFO</h1>
            <h2 className='font-extrabold m-2 text-md'>Créer un compte</h2>
            <p className='text-gray-400 m-2 text-[0.9rem]'>Remplissez les informations ci-dessous</p>
            <input type="text" placeholder='Nom Complet' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
            <input type="email" placeholder='Email' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
            <input type="password" placeholder='Mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
            <input type="password" placeholder='Confirmer votre mot de passe' className='border w-full md:w-[58%] p-2 m-2 rounded-lg text-black focus:text-black'/><br />
            <button className='md:w-[80%] w-full border text-center items-center m-3 p-3 bg-blue-900 font-bold text-white rounded-md duration-200 cursor-pointer active:scale-95'>S'inscrire</button>
            <p className='text-md text-center'>Déja un compte ? <Link to='/Login' className='text-blue-900 font-bold duration-200 active:scale-95'> Se connecter</Link></p>
            </div>
        </div>
    </div>
  )
}
