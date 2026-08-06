import React from 'react'
import { Card_propos } from '../../../components/ui_dashboard/Card_propos'
import { FaBook,FaUser,FaEnvelope,FaFile } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa6';
import FormationGraph from '../../../components/ui_dashboard/FormationGraph';
export const Dashsuperadmin = () => {
    // nombres des cards actifs
    let nombre_formation= 2;
    let nombre_user= 1;
    let nombre_support =2;
    let nombre_ens = 3;

    // nombres des cards mis à jours
    let update_formation = 2;
    let update_user = 1;
    let update_support = 2;
    let update_ens = 3;

    let notifications = 2;

  return (
     <main className='m-7 col-span-6'>
        <div className='flex justify-between w-full'>
          <h1 className='font-extrabold text-xl'>Tableau de bord</h1>
          <div className='flex items-center gap-2'>
            <div className='border-2 w-7 h-7 rounded-2xl p-2 bg-amber-300'></div>
            <div className='font-bold text-md'>SuperAdmin</div> 
            <div className='relative flex'>
              <FaBell size={25}/>
              <div className='-m-1 w-4 h-4 p-1 text-[8px] flex justify-center items-center text-white rounded-2xl text-center bg-red-400'>{notifications}</div>
            </div>
          </div>
        </div>
        <div className='m-10 flex gap-5'>
            <Card_propos
                logo = {<FaBook size={20} className='text-blue-500'/>}
                tittle = "Formations"
                nombres = {nombre_formation}
                update = {update_formation}
            />
            <Card_propos
                logo = {<FaUser size={20} className='text-green-500'/>}
                tittle = "Utilisateurs"
                nombres = {nombre_user}
                update = {update_user}
            />
            <Card_propos
                logo={<FaEnvelope size={20} className='text-amber-500'/>}
                tittle="Supports"
                nombres={nombre_support}
                update={update_support}
            />
            <Card_propos
                logo={<FaFile size={20} className='text-purple-500'/>}
                tittle="Enseignants"
                nombres={nombre_ens}
                update={update_ens}
            />
        </div>
        <div className="mt-6">
         <FormationGraph />
        </div>
      </main>
   
  )
}
