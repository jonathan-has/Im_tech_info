import React from 'react'
import { Sidebar_etu } from '../../../components/ui_dashboard/Sidebar';
import { Outlet } from 'react-router';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
export const Etudiants = ({close}) => {
    const [ouvert,setOuvert] = useState(false);
    let classe;
    if (ouvert) {
      classe = 'top-0 z-4 duration-300 translate-transform translate-x-0 bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3';
    }else {
      classe = 'top-0 z-4 duration-300 translate-transform -translate-x-full bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3';
    }
    const afficher = () => {
      setOuvert(true);
    }
    const fermer = () => {
      setOuvert(false);
    }
  
    let notifications= 2;
    return (
        <div className='md:grid grid-cols-8'>
          <div className='md:col-span-2'>
            <div className='md:block hidden bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3'>
              <Sidebar_etu/>
            </div>
            <div className='md:hidden block'>
              <div className={classe}>
                <Sidebar_etu close={fermer}/>
              </div>
            </div>
              <FaBars size={25} className='m-3 md:hidden block' onClick={afficher}/>
            </div>
            <div className='md:col-span-6 col-span-8'>
              <Outlet/>
            </div>
        </div>
    )
}
