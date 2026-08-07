import React from 'react'
import { Sidebar_etu } from '../../../components/ui_dashboard/Sidebar';
export const Etudiants = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-blue-950 w-75 h-screen fixed rounded-tr-2xl rounded-br-2xl p-3 md:block hiddden'>
        <Sidebar/>
      </div>
      <main>
      </main>
    </div>
  )
}
