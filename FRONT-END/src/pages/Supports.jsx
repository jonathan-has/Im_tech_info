import React from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaBook,FaFile,FaUserGraduate,FaClock} from 'react-icons/fa';
import { FaDesktop,FaArrowRight,FaCode,FaPlusCircle,FaInfoCircle,FaGraduationCap} from 'react-icons/fa';
import Card from '../components/ui/Card';
import logo from '../assets/images/logo/logo.png';
import HeroImage from '../components/ui/Hero'
import { Link } from 'react-router';
import { FaHeadphones } from 'react-icons/fa';
import Card_supp from '../components/ui/Card_supp';
import Card_contact from '../components/ui/Card_contact'
export const Supports = () => {
  
  return (
    <div>
      <section className='bg-blue-950 w-screen pt-25'>
        <div className='flex items-center ml-1'>
          <div>
            <button className='ml-5 mb-1 text-[0.85rem] bg-[#122ac7b1] p-1 text-white rounded-2xl w-50 duration-300 animate-pulse'>SUPPORT & AIDE</button>
            <div>
              <h1 className='text-white text-5xl font-bold m-5'>Nous sommes là <br />pour vous <span>aider</span></h1>
              <p className='m-5 text-gray-400'>Notre équipe de support est disponible pour répondre <br />à toutes vos questions et vous accompagner</p>
            </div>
            <div className='m-4 flex items-center gap-6'>
              <button className='m-3 flex items-center gap-2 bg-[#122ac7b1] p-3 w-60 text-center text-white rounded-md font-bold cursor-pointer hover:-translate-y-1 active:scale-95'><FaHeadphones size={20} className='text-white cursor-pointer'/>Nous contacter</button>
            </div>
          </div>
          <div className='md:block hidden'>
            <div className='m-13 p-8 border border-blue-600 rounded-3xl  flex flex-col md:flex-row gap-1 duration-200 animate-pulse'>
              <div className='flex flex-col justify-center items-center gap-2 m-3'>
                <div>
                  <FaBook size={25} className='text-blue-500 cursor-pointer'/>
                </div>
                <div className='flex flex-col'>
                  <div className='font-bold text-white ml-1 text-center'>+50</div>
                  <div className='font-bold text-white text-center'>Formations</div>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center gap-2 m-3'>
                <div>
                  <FaFile size={25} className='text-blue-500 cursor-pointer'/>
                </div>
                <div className='flex flex-col'>
                  <div className='font-bold text-white ml-1 text-center'>+200</div>
                  <div className='font-bold text-white text-center'>Supports disponibles</div>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center gap-2 m-3'>
                <div>
                  <FaUserGraduate size={25} className='cursor-pointer text-amber-400'/>
                </div>
                <div className='flex flex-col'>
                  <div className='font-bold text-white ml-1 text-center'>+1000</div>
                  <div className='font-bold text-white text-center'>Apprenants</div>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center gap-2 m-3'>
                <div>
                  <FaClock size={25} className='text-blue-500 cursor-pointer'/>
                </div>
                <div className='flex flex-col'>
                  <div className='font-bold text-white ml-1s text-center'>24/7</div>
                  <div className='font-bold text-white text-center'>Accès illimités</div>
              </div>
            </div>
            </div>
          </div>    
          </div>
      </section>
      <section className='flex gap-2 flex-col'>
        <h1 className='m-2 font-bold text-2xl text-center'>Comment pouvons-nous vous aider ?</h1>
        <p className='text-gray-600 text-center text-md'>Choisissez un sujet pour retrouver une solution à votre problème.</p>
        <div className='flex lg:flex-row flex-col items-center'>
          <Card_supp
          style_logo="bg-blue-200 p-4 rounded-[50%]"
          logo={<FaGraduationCap size={35} className="m-1 text-blue-700 font-bold"/>}
          title="Formations"
          description="Questions sur les cours, inscriptions, contenus et certificats."
          />
          <Card_supp
          style_logo="bg-green-200 p-4 rounded-[50%]"
          logo={<FaDesktop size={35} className="m-1 text-green-700 font-bold"/>}
          title="Compte & Profil"
          description="Gestion de votre, connexion, profil et sécurité."
          />
          <Card_supp
          style_logo="bg-pink-200 p-4 rounded-[50%]"
          logo={<FaDesktop size={35} className="m-1 text-pink-700 font-bold"/>}
          title="Paiements"
          description="Informations sur les paiements, factures."
          />
          <Card_supp
          style_logo="bg-purple-200 p-4 rounded-[50%]"
          logo={<FaDesktop size={35} className="m-1 text-purple-700 font-bold"/>}
          title="Compte & Profil"
          description="Gestion de votre, connexion, profil et sécurité."
          />
          <Card_supp
          style_logo="bg-yellow-200 p-4 rounded-[50%]"
          logo={<FaDesktop size={35} className="m-1 text-yellow-700 font-bold"/>}
          title="Compte & Profil"
          description="Gestion de votre, connexion, profil et sécurité."
          />
          <Card_supp
          style_logo="bg-amber-200 p-4 rounded-[50%]"
          logo={<FaDesktop size={35} className="m-1 text-amber-700 font-bold"/>}
          title="Compte & Profil"
          description="Gestion de votre, connexion, profil et sécurité."
          />
        </div>
        <div className='flex lg:flex-row flex-col items-center'>
          <Card_contact
            style_logo="bg-blue-200 p-4 rounded-[50%]"
            logo={<FaGraduationCap size={35} className="m-1 text-blue-700 font-bold"/>}
            title="Formations"
            description="Questions sur les cours, inscriptions, contenus et certificats."
            lien="facebook.com"
          />
        </div>
      </section>
      <section className='m-3 bg-gray-200 rounded-md shadow-md shadow-gray-400'>
        <h1 className='m-2 font-bold text-2xl text-center'>Contactez notre équipe </h1>
        <p className='text-gray-600 text-center text-md'>Nous vous répondrons dans le plus brefs détails</p>
        <div className='font-extrabold text-xl flex items-center justify-center text-center m-3'><button className='m-2 bg-blue-700 text-white duration-300 animate-bounce rounded-lg p-3'><Link to="/Contact">CONTACT</Link></button></div>
      </section>
      <section>
        <h1 className='m-2 font-bold text-2xl text-center'>Ressources utiles</h1>
        <p className='text-gray-600 text-center text-md'>Accéder à nos guides et documents pour vous aider.</p>
         <div className='mt-4 flex flex-col lg:flex-row mb-2'>
        <Card
          style_card="w-30 h-17 bg-blue-800 m-3 rounded-lg flex items-center justify-center"
          icone={<FaCode size={25} className='text-white cursor-pointer'/>}
          formation="Développement Web"
          description="HTML, CSS, JavaScript, React et plus encore"
          fleche={<FaArrowRight size={12} className='text-blue-800 cursor-pointer'/>}
        />
        <Card
          style_card="w-30 h-17 bg-green-800 m-3 rounded-lg flex items-center justify-center"
          icone={<FaCode size={25} className='text-white cursor-pointer'/>}
          formation="Développement Web"
          description="HTML, CSS, JavaScript, React et plus encore"
          fleche={<FaArrowRight size={12} className='text-blue-800 cursor-pointer'/>}
        />
        <Card
          style_card="w-30 h-17 bg-yellow-800 m-3 rounded-lg flex items-center justify-center"
          icone={<FaCode size={25} className='text-white cursor-pointer'/>}
          formation="Développement Web"
          description="HTML, CSS, JavaScript, React et plus encore"
          fleche={<FaArrowRight size={12} className='text-blue-800 cursor-pointer'/>}
        />
        <Card
          style_card="w-30 h-17 bg-pink-800 m-3 rounded-lg flex items-center justify-center"
          icone={<FaCode size={25} className='text-white cursor-pointer'/>}
          formation="Développement Web"
          description="HTML, CSS, JavaScript, React et plus encore"
          fleche={<FaArrowRight size={12} className='text-blue-800 cursor-pointer'/>}
        />
      </div>
      </section>
    </div>
  )
}
