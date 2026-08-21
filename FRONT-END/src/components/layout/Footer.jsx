import React, { useState, useEffect } from 'react'
import Logo from '../../assets/images/logo/logo.png'
import { FaFacebook, FaEnvelope, FaTwitter, FaTiktok } from 'react-icons/fa6'
import { FaWeebly } from 'react-icons/fa'
import { Link } from 'react-router'
import { getFormations } from '../../services/formations' //pour recuperer rapidement les donnees

export const Footer = () => {
  const [formations, setFormations] = useState([])

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const res = await getFormations()
        // Ajuste la récupération de la donnée selon la réponse de ton API (res.data ou res)
        let data = res?.data;
        if (!data) {
          data = res;
        }
        if (!data) {
          data = [];
        }

        let finalFormations = [];
        if (Array.isArray(data)) {
          finalFormations = data;
        }
        setFormations(finalFormations)
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error)
      }
    }

    fetchFormations()
  }, [])

  // Remplacement du ternaire pour l'affichage des formations
  let renduFormations = null;
  if (formations.length > 0) {
    renduFormations = formations.map((item, index) => (
      <Link key={item.ID} to="/Formations">
        <div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>
          {item.Titre}
        </div>
      </Link>
    ));
  } else {
    renduFormations = (
      <div className='text-[0.8rem] text-gray-300 my-2'>Aucune formation</div>
    );
  }

  return (
    <footer className='xl:block hidden h-75 w-screen bg-blue-950 '>
      <div className='flex items-center m-4'>
        <div className='flex items-center flex-col'>
            <img src={Logo} alt="" className='w-75 h-55 cursor-pointer active:scale-95'/>
            <p className='-mt-10 mb-3 text-white text-[0.8rem]'>PLateforme de gestion de formation <br /> et de support pedagogique en ligne</p>
            <div className='flex gap-2'>
                <a href="https://facebook.com/" target='_blank'><FaFacebook size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/></a>
                <a href="mailto:formation@imtechinfo.com">
                  <FaEnvelope size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                </a>
                <a href="https://imtechinfo.com">
                  <FaWeebly size={25} className='duration-200 hover:bg-blue-600 active:scale-95 hover:scale-105 text-gray-300 border border-gray-100 p-1 rounded-2xl'/>
                </a>
            </div>
        </div>
        <div className='flex gap-20'>
          <div>
            <h1  className='text-white font-bold m-3'>Liens rapides</h1>
            <div className='m-2 '>
              <Link to="/"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Accueil</div></Link>
              <Link to="/Formations"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Formations</div></Link>
              <Link to="/Supports"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Supports</div></Link>
              <Link to="/Propos"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>A propos</div></Link>
              <Link to="/Contact"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Contact</div></Link>
            </div>
          </div>
          <div>
            <h1  className='text-white font-bold m-3'>Formations</h1>
            <div className='m-2 '>
              {renduFormations}
            </div>
          </div>
          <div>
            <h1 className='text-white font-bold m-3'> Contact</h1>
            <div className='m-2'>
              <a href="mailto:formation@imtechinfo.com"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Email: imtechinfo@gmail.com</div></a>
              <a href="tel:+261331234583"><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Téléphone: +261 33 12 345 83</div></a>
              <a href=""><div className='text-[0.8rem] text-gray-300 my-2 duration-300 active:scale-95 hover:scale-105 hover:translate-x-5 cursor-pointer hover:text-green-200'>Adresse: Antananarivo, Madagascar</div></a>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blue-950 text-[0.7rem] w-screen h-10 text-center text-white'>
        <h1 className='text-center'>©️ 2026 IM TECH INFO. Tout droits réservés.</h1>
      </div>
    </footer>
  )
}