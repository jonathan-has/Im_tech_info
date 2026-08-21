import React from 'react'
import Card_home from "../components/ui/Card_home"; //reutilisable
import { FaCircleDot, FaCirclePlay } from 'react-icons/fa6';
import { FaBook,FaFile,FaUserGraduate,FaClock} from 'react-icons/fa';
import { FaDesktop,FaArrowRight,FaCode,FaPlusCircle,FaInfoCircle,FaHeadphones} from 'react-icons/fa';
import Card from '../components/ui/Card';
import logo from '../assets/images/logo/logo.png';
import HeroImage from '../components/ui/Hero'
import { getFormations } from '../services/formations';
import { Link } from 'react-router';
import { useState,useEffect } from 'react';
export const Home = () => {
  // nombres des membres du groupe
  let nbrExp = 5;
  let nbrEtu = 50;
  let Ens = 10;
  let nbrForm = 6;
    //recuperation 
  const [formations,setFormations] = useState([]);
  const chargerFormations = async () => {
    const res = await getFormations();
    try {
      if (res) {
          setFormations(res);
      } else {
          setFormations([]);
      }
    } catch (error) {
        console.log(error);
        
    }
    };
  // useEffect
  useEffect(() => {
    chargerFormations();
  },[]);
  // liste contenant les formations
  let listeFormation = null;
  console.log(formations);
  
  if (formations.length === 0) {
    listeFormation = (
      <div className='p-4 text-center text-gray-500 border-b'>Aucune formation trouvée.</div>
    )
  }
  else if (formations.length <= 4){
      listeFormation = formations.map((item,index) => {
        let itemKey = index;
        if (item.ID) {
            itemKey = item.ID;
        }

        let itemTimer = 'N/A';
        if (item.Timer) {
            itemTimer = item.Timer;
        } else if (item.Duree) {
            itemTimer = item.Duree;
        }

        let itemDate = 'N/A';
        if (item.Date) {
            itemDate = item.Date;
        } else if (item.Date_creation) {
            itemDate = item.Date_creation;
        }

        let sousTitreMobile = item.Categorie;
        if (item.Timer) {
            sousTitreMobile = item.Categorie + ' • ' + item.Timer;
        }
        let description = item.Description;
        if (item.Description){
          description = item.Description
        }
        return (
          <Card
          key={item.ID}                                                                                                                                                                                                        
          formation={item.Titre}
          description={item.Description}  
        />
        )
      });
  }
  return (
  <div>
    <section className='h-145 bg-blue-950 w-screen pt-25'>
      <div className='flex ml-1 flex-row'>
        <div>
          <button className='ml-5 mb-1 text-[0.85rem] bg-[#122ac7b1] p-1 text-white rounded-2xl w-50 duration-300 animate-pulse'>PLATEFORME DE FORMATIONS</button>
          <div>
            <h1 className='text-white text-5xl font-bold m-5'>Apprenez. Progressez.</h1>
            <span className='m-5 font-bold text-5xl'>Réussissez.</span>
            <p className='m-5 text-gray-400'>IM TECH INFO est une plateforme complète pour gérer vos formations
              <br />et accéder à des supports pédagogiques de qualité.</p>
          </div>
          <div className='m-4 flex md:flex-row flex-col items-center gap-6'>
            <Link to='/Formations'><button className='flex items-center gap-2 bg-[#122ac7b1] p-3 w-60 text-center text-white rounded-md font-bold cursor-pointer hover:-translate-y-1 active:scale-95'><FaCircleDot size={20} className='text-white cursor-pointer'/>Découvrir les formations</button></Link>
            <Link to='/Supports'><button className='flex items-center gap-2 bg-white p-3 rounded-md  cursor-pointer font-bold hover:text-blue-800 hover:-translate-y-1 active:scale-95'><FaCirclePlay size={20} className='text-blue-600 cursor-pointer'/>Voir les supports</button></Link>
          </div>
          <div className='flex'>
            <div className='md:block hidden'>
              <div className='flex flex-col md:flex-row gap-1'>
                <div className='flex items-center gap-2 m-3'>
                    <div>
                      <FaBook size={25} className='text-blue-500 cursor-pointer md:block hidden'/>
                    </div>
                    <div className='flex flex-col '>
                      <div className='font-bold text-white ml-1 md:block hidden'>+50</div>
                      <div className='font-bold text-white md:block hidden'>Formations</div>
                    </div>
              </div>
            </div>

            </div>
            <div className='md:block hidden'>
              <div className='flex items-center gap-2 m-3'>
                <div>
                  <FaFile size={25} className='text-blue-500 cursor-pointer md:block hidden'/>
                </div>
                <div className='flex flex-col '>
                  <div className='font-bold text-white ml-1'>+200</div>
                  <div className='font-bold text-white'>Supports disponibles</div>
                </div>
              
              </div>
            </div>

          <div className='md:block hidden'>
            <div className='flex items-center gap-2 m-3'>
              <div>
                <FaUserGraduate size={25} className='cursor-pointer text-amber-400 md:block hidden'/>
              </div>
              <div className='flex flex-col '>
                <div className='font-bold text-white ml-1'>+1000</div>
                <div className='font-bold text-white'>Apprenants</div>
              </div> 
            </div>
          </div>

          <div className='md:block hidden'>
            <div className='flex items-center gap-2 m-3'>
              <div>
                <FaClock size={25} className='text-blue-500 cursor-pointer md:block hidden'/>
              </div>
              <div className='flex flex-col'>
                <div className='font-bold text-white ml-1s'>24/7</div>
                <div className='font-bold text-white'>Accès illimités</div>
              </div>
            </div>
          </div>
      </div>
        </div>
      <HeroImage/>
      </div>
    </section>
    <section>
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
      <div>
        <div className='text-3xl font-extrabold text-center m-2'>Nos catégories de formations</div>
        <p className='text-center text-gray-600'>Explorer nos domaines de formation et développez vos compétences</p>
      </div>
      <div className='mt-4 flex flex-col lg:flex-row mb-2 justify-center items-center'>
        {/* card */}
        {listeFormation}
      </div>
      <div className='m-5 flex items-center justify-center'>
        <div className='flex items-center gap-2 text-center border px-10 border-blue-800 text-blue-800 rounded-md p-2 transition-colors duration-300 cursor-pointer hover:bg-gray-200 hover:text-blue-800 active:scale-95'>
            <FaPlusCircle size={25} className='text-blue-500 cursor-pointer'/>
            <Link to='/Formations' className='font-bold text-[0.9rem]'>Voir toutes les formations</Link>
        </div>
      </div>
      <div className='md:block hidden mx-20 my-5 bg-gray-300 rounded-3xl'> 
        <div className='flex gap-4 items-center'>
          <div className='flex'>
            <img src={logo} alt="" className='w-45 h-35 cursor-pointer active:scale-95'/>
            <div className='flex flex-col'>
              <div className='m-3 font-bold'>A propos de <span>IM TECH INFO</span></div>
              <p className='text-[0.9rem]'>Notre mission est de former la future main-d'oeuvre technologique 
              et professionnelle de Madagascar<br />avec des compétences pratiques
              ,innovantes et adaptés au marché.</p>
              <div className='flex items-center gap-2 text-center border text-[0.8rem] w-50 font-bold px-10 border-blue-800 text-blue-800 rounded-md p-1 m-2 transition-colors duration-300 cursor-pointer hover:bg-blue-900 hover:text-white active:scale-95'>
                <FaInfoCircle size={25} className='text-blue-500 cursor-pointer'/>
                <Link to='/Propos'>En Savoir Plus</Link>
              </div>
            </div>
            </div>
            <div className='w-30 flex flex-col items-center justify-center border-l border-gray-400 p-2'>
              <div className='font-bold text-3xl text-blue-900'>{nbrExp}+</div>
              <div className='font-bold text-[0.65rem] text-blue-900'>Année d'expérience</div>
            </div>
            <div className='w-30 flex flex-col items-center justify-center border-l border-gray-400 p-2'>
              <div className='font-bold text-3xl text-blue-900'>{nbrEtu}+</div>
              <div className='font-bold text-[0.65rem] text-blue-900'>Etudiants</div>
            </div>
            <div className='w-30 flex flex-col items-center justify-center border-l border-gray-400 p-2'>
              <div className='font-bold text-3xl text-blue-900'>{Ens}+</div>
              <div className='font-bold text-[0.65rem] text-blue-900'>Enseignants</div>
            </div>
            <div className='w-30 flex flex-col items-center justify-center border-l border-gray-400 p-2'>
              <div className='font-bold text-3xl text-blue-900'>{nbrForm}+</div>
              <div className='font-bold text-[0.65rem] text-blue-900'>Formations</div>
            </div>
          </div>
      </div>
    </section>
  </div>
  )
}
