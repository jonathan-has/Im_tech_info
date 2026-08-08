import React from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { FaBook,FaFile,FaUserGraduate,FaClock,FaShieldVirus} from 'react-icons/fa';
import { FaDesktop,FaArrowRight,FaCode,FaPlusCircle,FaInfoCircle} from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FaChevronRight,FaBellSlash} from 'react-icons/fa6';
import { FaDatabase,FaPython,FaSquare} from 'react-icons/fa6';
import { FaJava,FaBrain } from 'react-icons/fa';
import Card_form from '../components/ui/Card_form';
export const Formations = () => {
  let timer = 10;
  let etu= 200;
  return (
    <div className='w-screen'>
      <section className='bg-blue-950 w-screen pt-25'>
        <div className='flex items-center ml-1'>
          <div>
            <button className='ml-5 mb-1 text-[0.85rem] bg-[#122ac7b1] p-1 text-white rounded-2xl w-50 duration-300 animate-pulse'>PLATEFORME DE FORMATIONS</button>
            <div>
              <h1 className='text-white text-5xl font-bold m-5'>Nos formations</h1>
              <p className='m-5 text-gray-400'>Découvrez nos formations professionnelle conçues <br /> pour vous aider à acquérir de nouvelles compétences
                <br />et booster votre carrière</p>
            </div>
            <div className='m-4 flex items-center gap-6'>
              <a href="#formation"><button className='m-3 flex items-center gap-2 bg-[#122ac7b1] p-3 w-60 text-center text-white rounded-md font-bold cursor-pointer hover:-translate-y-1 active:scale-95'><FaCircleDot size={20} className='text-white cursor-pointer'/>Explorer les formations</button></a>
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
      <section id='formation'>
        {/* <div className='flex lg:flex-row md:flex-col  justify-center flex-col items-center gap-x-8 gap-y-4'>
          <div className='flex items-center shadow-md shadow-black xl:w-110 w-[95%]  rounded-md p-1 m-2'>
            <FaSearch size={20} className=''></FaSearch>
            <input type="text" placeholder='Rechercher une formation...' className='outline-none w-full p-1 m-2 rounded-md'/>
          </div> */}
          {/* <div className='w-auto flex items-center shadow-md shadow-black p-2 rounded-md'>
            <p className='m-1'>Niveau</p>
            <FaChevronDown size={20} className='ml-14 text-end cursor-pointer'/>
          </div>
          <div className='w-auto flex items-center shadow-md shadow-black p-2 rounded-md'>
            <p className='m-1'>Catégories</p>
            <FaChevronDown size={20} className='ml-14 text-end cursor-pointer'/>
          </div>
          <div className='w-auto flex items-center shadow-md shadow-black p-2 rounded-md'>
            <p className='m-1'>Trier par</p>
            <FaChevronDown size={20} className='ml-14 text-end cursor-pointer'/>
          </div>
        </div>
        <div className='flex flex-wrap items-center justify-center'>
          <div className='w-auto m-2 p-2.5 font-bold text-[0.9rem] shadow-md shadow-black rounded-xl'>Tout</div>
          <div className='w-auto m-2 p-2.5 font-bold text-[0.9rem] shadow-md shadow-black rounded-xl'>Développement Web</div>
          <div className='w-auto m-2 p-2.5 font-bold text-[0.9rem] shadow-md shadow-black rounded-xl'>Cybersécurité</div>
          <div className='w-auto m-2 p-2.5 font-bold text-[0.9rem] shadow-md shadow-black rounded-xl'>Base de donées</div>
          <div className='w-auto m-2 p-2.5 font-bold text-[0.9rem] shadow-md shadow-black rounded-xl'>Réseaux</div>
          <div className='m-2'><FaChevronRight size={20} className='m-2 text-end cursor-pointer'/></div>
        </div> */}
        <h1 className=' text-2xl  text-center font-bold m-3'>Nos formations</h1>
        <div className='flex flex-wrap m-2 gap-6 items-center justify-center'>
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-blue-800 m-5 flex items-center justify-center"
            logo_form={<FaCode size={40} className='text-white cursor-pointer'/>}
            title= "Développement Web"
            timer={timer}
            description="HTML - CSS - React - Nodejs"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-green-800 m-5 flex items-center justify-center"
            logo_form={<FaDatabase size={40} className='text-white cursor-pointer'/>}
            title="Base de données"
            timer={timer}
            description="SQL - MySQL - Modélisation"
            etu={etu}
          />           <Card_form
            style="w-[65%] h-25 rounded-2xl bg-blue-500 m-5 flex items-center justify-center"
            logo_form={<FaPython size={40} className='text-white cursor-pointer'/>}
            title="Python pour débutants"
            timer={timer}
            description="Python - Algorithmes - Projets"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-purple-800 m-5 flex items-center justify-center"
            logo_form={<FaShieldVirus size={40} className='text-white cursor-pointer'/>}
            title="Cybersécurité essentielle"
            timer={timer}
            description="Sécurité - Réseaux - Pentest"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-yellow-500 m-5 flex items-center justify-center"
            title="UI/UX Design"
            logo_form={<FaSquare size={40} className='text-white cursor-pointer'/>}
            timer={timer}
            description="Figma - WireFarms - Prototyping"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-pink-800 m-5 flex items-center justify-center"
            logo_form={<FaDesktop size={40} className='text-white cursor-pointer'/>}
            title="Bureutique complète"
            timer={timer}
            description="Word - Excel - PowerPoint - Access"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-amber-800 m-5 flex items-center justify-center"
            logo_form={<FaBrain size={40} className='text-white cursor-pointer'/>}
            title="Réseaux informatiques"
            timer={timer}
            description="HTML - CSS - React - Nodejs"
            etu={etu}
          />
          <Card_form
            style="w-[65%] h-25 rounded-2xl bg-orange-500 m-5 flex items-center justify-center"
            logo_form={<FaJava size={40} className='text-white cursor-pointer'/>}
            title="JAVA"
            timer={timer}
            description="Algorithme - Async - Projets"
            etu={etu}
          />
        </div>
      <div className='mt-4 flex flex-col lg:flex-row mb-2 justify-center items-center'>
        <Card_home
          formation_name="Formation de qualité"
          description="Des conteneurs conçu par des experts pour vous donner les
          compétences essentielles"
          style_bg="w-35 h-13 bg-[#4f8cff] m-3 rounded-lg flex items-center justify-center"
          photo= {<FaDesktop size={25} className='text-white cursor-pointer'/>}
        />
        
        <Card_home
          formation_name="Formation de qualité"
          description="Des conteneurs conçu par des experts pour vous donner les
          compétences essentielles"
          style_bg="w-35 h-13 bg-[#606060] m-3 rounded-lg flex items-center justify-center"
          photo= {<FaBook size={25} className='text-white cursor-pointer'/>}
        />

        <Card_home
          formation_name="Formation de qualité"
          description="Des conteneurs conçu par des experts pour vous donner les
          compétences essentielles"
          style_bg="w-35 h-13 bg-purple-400 m-3 rounded-lg flex items-center justify-center"
          photo= {<FaUserGraduate size={25} className='text-white cursor-pointer'/>}
        />

        <Card_home
          formation_name="Formation de qualité"
          description="Des conteneurs conçu par des experts pour vous donner les
          compétences essentielles"
          style_bg="w-35 h-13 bg-amber-500 m-3 rounded-lg flex items-center justify-center"
          photo= {<FaFile size={25} className='text-white cursor-pointer'/>}
        />
      </div>
      </section>
  </div>
  )
}
