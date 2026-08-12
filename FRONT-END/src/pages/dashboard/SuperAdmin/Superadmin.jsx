import React, { useState } from 'react'
import { Sidebar } from '../../../components/ui_dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
export const Superadmin = ({close}) => {
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
      <div className='lg:grid grid-cols-8'>
        <div className='lg:col-span-2'>
          <div className='lg:block hidden bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3'>
            <Sidebar/>
          </div>
          <div className='lg:hidden block'>
            <div className={classe}>
              <Sidebar close={fermer}/>
            </div>
          </div>
            <FaBars size={25} className='m-3 lg:hidden block' onClick={afficher}/>
          </div>
          <div className='lg:col-span-6 col-span-8'>
            <Outlet/>
          </div>
      </div>
  )
}
