import React from 'react'
import { Sidebar_ens } from '../../../components/ui_dashboard/Sidebar';
import { Outlet } from 'react-router';
export const Teacher = () => {
  return (
    <div className='grid grid-cols-8'>
      <div className='col-span-2'>
        <div className='bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3 md:block hiddden'>
          <Sidebar_ens/>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}
