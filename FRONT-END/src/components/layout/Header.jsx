import React from 'react'
import logo from '../../assets/images/logo/logo.png';
import { Link } from 'react-router';
import { useState } from 'react';
import { FaSearch, FaMoon} from 'react-icons/fa';
export const Header = () => {
  const [apparition,Setapparition] = useState(false);
  function afficher() {
    if (apparition == false) {
      Setapparition(true);
    }else {
      Setapparition(false);
    }

  }
  let classe = 'hidden border m-2 rounded-2xl text-white border-white p-1 focus:text-white';
  if (apparition == true) {
    classe = 'block border m-2 rounded-2xl text-white border-white p-1 focus:text-white';
  }
  return (
    <div className='top-0 fixed z-50 lg:flex h-20 w-screen items-center justify-around bg-blue-950'>
        <Link to='/'><div className='flex items-center m-1'>
          <img src={logo} alt="" className='w-30 h-25 cursor-pointer active:scale-95'/>
          <div className='font-extrabold text-white'><span>IM </span>TECH INFO</div>  
        </div></Link>
        <div className='flex gap-4 m-8'>
            <Link to='/' className='md:block hidden text-white font-bold duration-100 pb-1 hover:border-b-2 border-b-green-500 hover:scale-105'>Home</Link>
            <Link to='/Formations' className='md:block hidden text-white font-bold duration-100 pb-1 hover:border-b-2 border-b-green-500 hover:scale-105'>Formations</Link>
            <Link to='/Supports' className='md:block hidden text-white font-bold duration-100 pb-1 hover:border-b-2 border-b-green-500 hover:scale-105'>Supports</Link>
            <Link to='/Propos' className='md:block hidden text-white font-bold duration-100 pb-1 hover:border-b-2 border-b-green-500 hover:scale-105'>A propos</Link>
            <Link to='/Contact' className='md:block hidden text-white font-bold duration-100 pb-1 hover:border-b-2 border-b-green-500 hover:scale-105'>Contact</Link>
        </div>
        <div className='flex items-center'>
          <input type="text" placeholder='Recherche' className={classe}/>
          <div className='flex items-center gap-3'>
            <FaSearch size={20} className='md:block hidden text-white cursor-pointer' onClick={afficher}/>
            <FaMoon size={20} className='md:block hidden text-white cursor-pointer'/>
          </div>
        </div>
        <div>
          <Link to='/Login'><button className='md:block hidden border border-white text-white rounded-md p-2 transition-colors duration-300 cursor-pointer hover:bg-gray-200 hover:text-blue-800 active:scale-95'>Se connecter</button></Link>
        </div>
        <div>
          <Link to='/Register'><button className='md:block hidden -ml-3 w-30 text-white rounded-md m-2 p-2 transition-colors duration-300 cursor-pointer bg-blue-600 active:scale-95'>S'inscrire</button></Link>
        </div>
    </div>
  )
}
