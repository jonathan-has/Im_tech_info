import React from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaBook,FaFile,FaUserGraduate,FaClock} from 'react-icons/fa';
import { FaUserFriends,FaLightbulb,FaPlusCircle,FaInfoCircle,FaGraduationCap,FaBullseye,FaCheckCircle} from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { FaUser } from "react-icons/fa6";
import Card from '../components/ui/Card';
import logo from '../assets/images/logo/logo.png';
import HeroImage from '../components/ui/Hero'
import { Link } from 'react-router';
import { FaGem } from 'react-icons/fa';
import Card_supp from '../components/ui/Card_supp';
import Card_contact from '../components/ui/Card_contact';
import Card_propos from '../components/ui/Card_propos';
import Card_pers from '../components/ui/Card_pers';
export const Propos = () => {
  return (
    <div>
      <section className='bg-blue-950 w-screen pt-25'>
        <div className='flex items-center ml-1'>
          <div>
            <button className='ml-5 mb-1 text-[0.85rem] bg-[#122ac7b1] p-1 text-white rounded-2xl w-50 duration-300 animate-pulse'>SUPPORT & AIDE</button>
            <div>
              <h1 className='text-white text-5xl font-bold m-5'>A propos de <br /><span>IM TECH INFO</span></h1>
              <p className='m-5 text-gray-400'>Notre mission est d'accompagner les apprenants, enseignants <br />et institutions à travers des formations de qualité et des outils<br />pédagogiques performants.</p>
            </div>
            <div className='m-4 flex items-center gap-6'>
              <a href="#propos"><button className='m-3 flex items-center gap-2 bg-[#122ac7b1] p-3 w-60 text-center text-white rounded-md font-bold cursor-pointer hover:-translate-y-1 active:scale-95'><FaBullseye size={20} className='text-white cursor-pointer'/>Notre mission</button></a>
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
      <section className='flex gap-2 flex-col' id='propos'>
        <h1 className='m-2 font-bold text-2xl text-center'>Qui sommes-nous ?</h1>
        <div className='flex gap-5 lg:flex-row flex-col m-4 items-center'>
          <div className='w-[50%] shadow-md shadow-gray-400 p-4 rounded-md'>
            <p className='text-justify'><span className='font-bold'>IM TECH INFO </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores est provident iste in. Illo odio voluptates cum iusto, <br /><br /> accusantium iste tenetur, laborum sit quae officiis dolor pariatur rerum sequi? Molestiae eius repellendus officia tempore eaque, laboriosam fuga nisi eligendi iste corporis laudantium sed quae numquam ad voluptate provident aliquam qui facilis officiis.</p>
          </div>
          <div className='w-[50%] shadow-md shadow-gray-400 rounded-lg flex items-center p-4'>
            <FaBullseye size={80} className='w-40 m-2 bg-blue-600 rounded-md p-3 text-white cursor-pointer'/>
            <div className='text-md'>
              <h1 className='font-bold'>Notre vision</h1>
              <p className='text-[0.9rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quisquam necessitatibus deleniti praesentium animi beatae, possimus placeat ducimus eligendi ullam.</p>
            </div>
          </div>
        </div>
        <h1 className='m-2 font-bold text-2xl text-center'>Nos valeurs</h1>
        <div className='m-3 flex gap-4 items-center justify-center'>
          <Card_propos
            style_logo="bg-purple-200 p-4 rounded-[50%]"
            logo={<FaGem size={35} className="m-1 text-purple-700 font-bold"/>}
            title="Qualité"
            description="Nous nous engageons à fournir des contenus fiables, à jour et rigoureusement séléctionnés."
          />
          <Card_propos
            style_logo="bg-blue-200 p-4 rounded-[50%]"
            logo={<FaUserFriends size={35} className="m-1 text-blue-700 font-bold"/>}
            title="Accesibilité"
            description="Nous nous engageons à fournir des contenus fiables, à jour et rigoureusement séléctionnés."
          />
          <Card_propos
            style_logo="bg-green-200 p-4 rounded-[50%]"
            logo={<FaGem size={35} className="m-1 text-green-700 font-bold"/>}
            title="Innovation"
            description="Nous nous engageons à fournir des contenus fiables, à jour et rigoureusement séléctionnés."
          />
          <Card_propos
            style_logo="bg-red-200 p-4 rounded-[50%]"
            logo={<FaGem size={35} className="m-1 text-red-700 font-bold"/>}
            title="Accoompagnement"
            description="Nous nous engageons à fournir des contenus fiables, à jour et rigoureusement séléctionnés."
          />
        </div>
      </section>
      <section className='m-3 p-5 bg-gray-200 rounded-md shadow-md shadow-gray-400'>
        <h1 className='m-4 p-2 font-bold text-2xl text-center'>Pourquoi choisir <span>IM TECH INFO </span>?</h1>
        <p className='text-gray-600 text-center text-md'>Nous vous répondrons dans le plus brefs détails</p>
        <div className='flex items-center justify-center gap-20 text-center m-4'>
          <div className='text-md'>
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Des formations conçues par des professionnelles </p>
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Des supports pédagogiques de qualité </p>
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Un accès illimités 24/7 </p>
          </div>
          <div>
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Une plateforme sécurisé et fiable </p>
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Un suivi et un accoompagnement </p> 
            <p className='flex items-center gap-1'><FaCheckCircle size={25} className="m-1 text-blue-700 font-bold"/>Des certificats reconnues </p>
          </div>
        </div>
      </section>
       <section className='flex gap-2 flex-col'>
        <h1 className='m-2 font-bold text-2xl text-center'>Notre équipe</h1>
          <p className='text-gray-600 text-center text-md'>Une équipe passionée, engagée à vous offrir la meilleure expérience d'apprentissage.</p>
          <div className='flex lg:flex-row flex-col items-center'>
            <Card_pers
            profil={<FaUser size={100} className="text-blue-600"/>}
              teacher="Jonathan Junior"
              description="Fondateur & CEO"
            />  
            <Card_pers
              profil={<FaUser size={100} className="text-red-600"/>}
              teacher="Jonathan Junior"
              description="Fondateur & CEO"
            />  
            <Card_pers
              profil={<FaUser size={100} className="text-green-600"/>}
              teacher="Jonathan Junior"
              description="Fondateur & CEO"
            />  
            <Card_pers
              profil={<FaUser size={100} className="text-pink-600"/>}
              teacher="Jonathan Junior"
              description="Fondateur & CEO"
            />  
          </div>
       </section>
    </div>
  )
}
