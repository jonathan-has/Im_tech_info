import React from 'react'
import { Sidebar_ens } from '../../../components/ui_dashboard/Sidebar';
export const Teacher = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3 md:block hiddden'>
        <Sidebar_ens/>
      </div>
      <main>
      </main>
    </div>
  )
}
