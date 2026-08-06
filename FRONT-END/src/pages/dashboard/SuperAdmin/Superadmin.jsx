import React from 'react'
import { Sidebar } from '../../../components/ui_dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
export const Superadmin = () => {
  let notifications= 2;
  return (
    <div className='grid grid-cols-8'>
      <div className='col-span-2'>
        <div className='bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3 md:block hiddden'>
          <Sidebar/>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}
