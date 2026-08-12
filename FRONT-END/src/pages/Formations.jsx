import React, { useState } from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { getFormations } from '../services/formations';
import { useEffect } from 'react';
import { FaBook,FaFile,FaUserGraduate,FaClock,FaShieldVirus} from 'react-icons/fa';
import { FaDesktop,FaArrowRight,FaCode,FaPlusCircle,FaInfoCircle,FaHeadphones} from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FaChevronRight,FaBellSlash} from 'react-icons/fa6';
import { FaDatabase,FaPython,FaSquare} from 'react-icons/fa6';
import { FaJava,FaBrain } from 'react-icons/fa';
import Card_form from '../components/ui/Card_form';
export const Formations = () => {
  //recuperation 
  const [formations,setFormations] = useState([]);
  const chargerFormations = async () => {
    try {
        const reponse = await getFormations();
        if (reponse) {
          setFormations(reponse);
        }else {
          setFormations([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  // useEffect
  useEffect(() => {
    chargerFormations();
  },[]);
  // liste contenant les formations
  let listeFormation = null;
  if (formations.length === 0) {
    listeFormation = (
      <div className='p-4 text-center text-gray-500 border-b'>Aucune formation trouvée.</div>
    )
  }
  else {
      listeFormation = formations.map((item,index) => {
        let itemKey = index;
        if (item.id) {
            itemKey = item.id;
        }

        let itemTimer = 'N/A';
        if (item.timer) {
            itemTimer = item.timer;
        } else if (item.duree) {
            itemTimer = item.duree;
        }

        let itemDate = 'N/A';
        if (item.date) {
            itemDate = item.date;
        } else if (item.date_creation) {
            itemDate = item.date_creation;
        }

        let sousTitreMobile = item.categorie;
        if (item.timer) {
          sousTitreMobile = item.categorie + ' • ' + item.timer;
        }
        let description = item.description;
        if (item.description){
          description = item.description
        }
        return (
          <Card_form
              title= {item.titre}
              timer={itemTimer}
              description={item.description}
              key={item.key}
            />
        )
      });
  }
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
        <h1 className=' text-2xl  text-center font-bold m-3'>Nos formations disponibles</h1>
        <div className='flex flex-wrap m-2 gap-6 items-center justify-center'>
          {listeFormation}
        {/* Les listes des cards */}
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
          formation_name="Apprentissage pratique"
          description="Des cours conçu avec des projets concrets et des exercices pratiques"
          style_bg="w-35 h-13 bg-amber-400 m-3 rounded-lg flex items-center justify-center"
          photo= {<FaBook size={25} className='text-white cursor-pointer'/>}
          />

        <Card_home
          formation_name="Certificat reconnu"
          description="Obtenez un certificat à la fin de chaque formation pour valorises vos compétences."
          style_bg="w-35 h-13 bg-green-500 m-3 rounded-lg flex items-center justify-center"
          photo= {<FaUserGraduate size={25} className='text-white cursor-pointer'/>}
          />

        <Card_home
          formation_name="Assistance continue"
          description="Des supports disponible pour répondre à toutes vos questions"
          style_bg="w-35 h-13 bg-purple-500 m-3 rounded-lg flex items-center justify-center"
          photo= {<FaHeadphones size={25} className='text-white cursor-pointer'/>}
        />
      </div>
      </section>
  </div>
  )
}
