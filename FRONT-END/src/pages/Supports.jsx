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
            <div className='m-13 p-8 rounded-3xl  flex flex-col md:flex-row gap-1 duration-200 animate-pulse'>
                 <svg width="600" height="250" className='rounded' viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#070B2E"/>
                        <stop offset="100%" stop-color="#0B1448"/>
                      </linearGradient>
                      <linearGradient id="blue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#6D5BFF"/>
                        <stop offset="100%" stop-color="#2E42FF"/>
                      </linearGradient>
                      <radialGradient id="bubble">
                        <stop offset="0%" stop-color="#FFFFFF"/>
                        <stop offset="100%" stop-color="#E4E7FF"/>
                      </radialGradient>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="8" stdDeviation="10"
                        flood-color="#00000066"/>
                      </filter>
                    </defs>
                    <rect width="800" height="500" fill="url(#bg)"/>
                    {/* <!-- petits points --> */}
                    <circle cx="80" cy="120" r="5" fill="#4C68FF"/>
                    <circle cx="690" cy="90" r="6" fill="#29A9FF"/>
                    <circle cx="720" cy="350" r="5" fill="#4C68FF"/>
                    {/* <!-- lignes décoratives --> */}
                    <path d="M120 260 C170 180 250 180 300 250"
                          stroke="#3558FF"
                          stroke-width="2"
                          stroke-dasharray="8 8"
                          fill="none"/>
                    <path d="M500 250 C550 180 630 180 680 260"
                          stroke="#3558FF"
                          stroke-width="2"
                          stroke-dasharray="8 8"
                          fill="none"/>
                    {/* <!-- boîte email --> */}
                    <g transform="translate(70 200)">
                      <rect width="90" height="90" rx="12"
                            fill="none"
                            stroke="#5867FF"
                            stroke-width="3"/>
                      <path d="M20 30 L45 50 L70 30"
                            stroke="#FFFFFF"
                            stroke-width="4"
                            fill="none"/>
                      <rect x="20" y="30"
                            width="50"
                            height="35"
                            rx="2"
                            fill="none"
                            stroke="#FFFFFF"
                            stroke-width="4"/>
                    </g>
                    {/* <!-- boîte ? --> */}
                    <g transform="translate(640 190)">
                      <rect width="90" height="90"
                            rx="12"
                            fill="none"
                            stroke="#5867FF"
                            stroke-width="3"/>
                      <text x="45"
                            y="58"
                            font-size="48"
                            text-anchor="middle"
                            fill="white"
                            font-family="Arial"
                            font-weight="bold">?</text>
                    </g>
                    {/* <!-- casque --> */}
                    <g filter="url(#shadow)">
                      {/* <!-- arceau --> */}
                      <path d="M280 220
                              A120 120 0 0 1 520 220"
                            fill="none"
                            stroke="url(#blue)"
                            stroke-width="20"
                            stroke-linecap="round"/>
                      {/* <!-- écouteurs --> */}
                      <rect x="250" y="200"
                            width="40"
                            height="110"
                            rx="20"
                            fill="url(#blue)"/>
                      <rect x="510" y="200"
                            width="40"
                            height="110"
                            rx="20"
                            fill="url(#blue)"/>
                      {/* <!-- microphone --> */}
                      <path d="M520 300
                              Q560 320 560 360"
                            stroke="url(#blue)"
                            stroke-width="10"
                            fill="none"
                            stroke-linecap="round"/>
                      <circle cx="560" cy="360"
                              r="9"
                              fill="#4F5DFF"/>
                    </g>
                    {/* <!-- bulle --> */}
                    <g filter="url(#shadow)">
                      <rect x="315"
                            y="180"
                            width="170"
                            height="110"
                            rx="55"
                            fill="url(#bubble)"/>
                      <polygon points="375,290 405,290 390,320"
                              fill="#EEF1FF"/>
                      <circle cx="365" cy="235" r="8" fill="#555"/>
                      <circle cx="400" cy="235" r="8" fill="#555"/>
                      <circle cx="435" cy="235" r="8" fill="#555"/>
                    </g>
                  </svg>
            </div>
          </div>    
          </div>
      </section>
      <section className='flex gap-2 flex-col'>
        <h1 className='m-2 font-bold text-2xl text-center'>Comment pouvons-nous vous aider ?</h1>
        <p className='text-gray-600 text-center text-md'>Choisissez un sujet pour retrouver une solution à votre problème.</p>
        <div className='flex lg:flex-row flex-col items-center justify-center'>
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
      <section>
        <h1 className='m-2 font-bold text-2xl text-center'>Ressources utiles</h1>
        <p className='text-gray-600 text-center text-md'>Accéder à nos guides et documents pour vous aider.</p>
        <div className='mt-4 flex flex-col lg:flex-row mb-2 items-center justify-center'>
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
