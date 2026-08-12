import React from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaBook,FaFile,FaUserGraduate,FaClock} from 'react-icons/fa';
import { FaUserFriends,FaLightbulb,FaPlusCircle,FaInfoCircle,FaGraduationCap,FaBullseye,FaCheckCircle} from 'react-icons/fa';
import { FaHeart,FaFacebook } from 'react-icons/fa6';
import { FaUser,FaEnvelope,FaLocationDot } from "react-icons/fa6";
import { FaGem,FaPhone } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa6';
import Card_rens from '../components/ui/Card_rens';
import Operating from '../assets/contact/Operating.gif';
export const Contact = () => {
  return (
    <div>
       <section className='bg-blue-950 w-screen pt-25'>
          <div className='flex items-center ml-1'>
            <div>
              <button className='ml-5 mb-1 text-[0.85rem] bg-[#122ac7b1] p-1 text-white rounded-2xl w-50 duration-300 animate-pulse'>SUPPORT & AIDE</button>
              <div>
                <h1 className='text-white text-5xl font-bold m-5'>Nous sommes à <br /><span>votre écoute</span></h1>
                <p className='m-5 text-gray-400'>Notre mission est d'accompagner les apprenants, enseignants <br />et institutions à travers des formations de qualité et des outils<br />pédagogiques performants.</p>
              </div>
              <div className='m-4 flex items-center gap-6'>
                <a href="#contact"><button className='m-3 flex items-center gap-2 bg-[#122ac7b1] p-3 w-60 text-center text-white rounded-md font-bold cursor-pointer hover:-translate-y-1 active:scale-95'><FaBullseye size={20} className='text-white cursor-pointer'/>Nous contacter</button></a>
              </div>
            </div>
            <div className='md:block hidden'>
              <div className='m-13 p-8 border border-blue-600 rounded-3xl  flex flex-col md:flex-row gap-1 duration-200 animate-pulse'>
                <div className='flex flex-col justify-center items-center gap-2 m-3'>
                  <div>
                    <FaEnvelope size={25} className='text-blue-500 cursor-pointer'/>
                  </div>
                  <div className='flex flex-col'>
                    <div className='font-bold text-white ml-1 text-center'>Email</div>
                    <div className='font-bold text-white text-[0.8rem] text-center'>formation@imtechinfo.com</div>
                  </div>
                </div>
  
                <div className='flex flex-col justify-center items-center gap-2 m-3'>
                  <div>
                    <FaPhone size={25} className='text-blue-500 cursor-pointer'/>
                  </div>
                  <div className='flex flex-col'>
                    <div className='font-bold text-white ml-1 text-center'>Téléphone</div>
                    <div className='font-bold text-white text-center'>+261 33 37 342 21</div>
                  </div>
                </div>
  
                <div className='flex flex-col justify-center items-center gap-2 m-3'>
                  <div>
                    <FaLocationDot size={25} className='cursor-pointer text-amber-400'/>
                  </div>
                  <div className='flex flex-col'>
                    <div className='font-bold text-white ml-1 text-center'>Adresse</div>
                    <div className='font-bold text-white text-center'>Antananarivo, <br />Madagascar</div>
                  </div>
                </div>
  
                <div className='flex flex-col justify-center items-center gap-2 m-3'>
                  <div>
                    <FaClock size={25} className='text-blue-500 cursor-pointer'/>
                  </div>
                  <div className='flex flex-col'>
                    <div className='font-bold text-white ml-1s text-center'>Horaires</div>
                    <div className='font-bold text-white text-center'>Lun - Sam <br />08h00 - 09h00</div>
                </div>
              </div>
              </div>
            </div>    
            </div>
        </section>
        <section className='m-4' id='contact'>
          <div className='flex items-center justify-center lg:flex-row flex-col'>
            <div>
              <h1 className='m-4 text-center font-bold text-xl'>Nos informations de contact</h1>
                <div className='flex items-center justify-center gap-5 xl:flex-row flex-col'>
                  <a href="mailto:formation@imtechformation.com">
                    <Card_rens
                      style_logo="bg-blue-200 p-4 rounded-[50%]"
                      logo={<FaEnvelope size={35} className='text-blue-500 cursor-pointer'/>}
                      title="Email"
                      lien= "formation@imtechformation.com"
                      description="Nous vous répondrons dans les brefs détails"
                    />
                  </a>
                  <a href="tel:+261333734221">
                    <Card_rens
                      style_logo="bg-green-200 p-4 rounded-[50%]"
                      logo={<FaPhone size={35} className='text-green-700 cursor-pointer'/>}
                      title="Téléphone"
                      lien="033 37 342 21"
                      description="Nous vous répondrons dans les brefs détails"
                    />
                  </a>
                <a href="https://facebook.com">
                  <Card_rens
                    style_logo="bg-blue-200 p-4 rounded-[50%]"
                    logo={<FaFacebook size={35} className='text-blue-500 cursor-pointer'/>}
                    title="Facebook"
                    lien="IM TECH FORMATION"
                    description="Nous vous répondrons dans les brefs détails"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className='flex items-center md:flew-col flex-row m-4 p-1 bg-gray-200 rounded-md shadow-md shadow-gray-400'>
          <div className='md:block hidden m-3 w-90 h-70  rounded-md flex items-center justify-center'>
            <div className=' w-[80%] h-[80%] text-center'>
              <img src={Operating} className='w-full h-full rounded-2xl' alt="" />
            </div>
          </div>
          <div>
             <section className='m-3 p-5 md:none'>
                <h1 className='m-4 p-2 font-bold text-2xl text-center'>Pourquoi nous contacter ?</h1>
                <p className='text-gray-600 text-center text-md'>Notre équipe est dédiée à vous offrir la meilleure expérience d'apprentissage possible.</p>
                <div className='flex md:flex-row flex-col items-center justify-center gap-20 text-center m-4'>
                  <div className='text-md'>
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Réponse rapide</p>
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Assistance personalisée </p>
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Formations disponibles </p>
                  </div>
                  <div>
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Supports technique </p>
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Accompagnement pédagogiques</p> 
                    <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Satisfaction garantie </p>
                  </div>
                </div>
              </section>
          </div>
          
        </section>
    </div>
  )
}
