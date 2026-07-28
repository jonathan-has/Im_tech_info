import React from 'react'
import Logo from '../../assets/images/logo/logo.png'
import { FaFacebook,FaInstagram,FaTwitter,FaTiktok } from 'react-icons/fa6'
export const Footer = () => {
  return (
    <div className='xl:block hidden h-75 w-screen bg-blue-950 '>
      <div className='flex items-center m-4'>
        <div className='flex items-center flex-col'>
            <img src={Logo} alt="" className='w-75 h-55 cursor-pointer active:scale-95'/>
            <p className='-mt-10 mb-3 text-white text-[0.8rem]'>PLateforme de gestion de formation <br /> et de support pedagogique en ligne</p>
            <div className='flex gap-2'>
                <FaFacebook size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                <FaInstagram size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                <FaTwitter size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                <FaTiktok size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
            </div>
        </div>
        <div className='flex gap-20'>
          <div>
            <h1  className='text-white font-bold m-3'>Liens rapides</h1>
            <div className='m-2 '>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Accueil</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Formations</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Supports</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>A propos</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Contact</div>
            </div>
          </div>
          <div>
            <h1  className='text-white font-bold m-3'>Ressources</h1>
            <div className='m-2 '>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>FAQ</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Guide d'utilisation</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Conditions d'utilisation</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Politique de confidualité</div>
            </div>
          </div>
          <div>
            <h1  className='text-white font-bold m-3'>Formations</h1>
            <div className='m-2 '>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Dévelopement Web</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>CyberSécurité</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Anglais-Français-Espagnol</div>
            </div>
          </div>
          <div>
            <h1 className='text-white font-bold m-3'> Contact</h1>
            <div className='m-2'>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Email: imtechinfo@gmail.com</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Téléphone: +261 33 12 345 83</div>
              <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Adresse: Antananarivo, Madagascar</div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-950 text-[0.7rem] w-screen h-10 text-center text-white'>
        <h1 className='text-center'>©️ 2024 IM TECH INFO. Tout droits réservés.</h1>
      </div>
    </div>
  )
}
