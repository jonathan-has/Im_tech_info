import React from 'react'
import { Card_propos } from '../../../components/ui_dashboard/Card_propos'
import { FaBook,FaUser,FaEnvelope,FaFile } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa6';
import FormationGraph from '../../../components/ui_dashboard/FormationGraph';
import { useState,useEffect } from 'react';
import { dashsuperadmin } from '../../../services/Dashboard/superadmin/superadminconfig';
export const Dashsuperadmin = () => {
  // objet d'état regroupant toutes les données du dashboard
    const [stats, setStats] = useState({
        nombre_formation: 0,
        update_formation: 0,
        nombre_user: 0,
        update_user: 0,
        nombre_support: 0,
        update_support: 0,
        nombre_ens: 0,
        update_ens: 0,
        notifications: 0
    });
    
    const [chargement, setChargement] = useState(true);
    const [error, setError] = useState(null);

    // RECUPERARION DE L'USER
    // 1. Récupération des données du localStorage
    const userData = localStorage.getItem('user');
    const roleDirect = localStorage.getItem('role');

    let user_role = "";

    // 2. Extraire le rôle (soit depuis l'objet 'user', soit depuis la clé 'role')
    if (userData) {
        const user = JSON.parse(userData);
        if (user && user.role) {
            user_role = user.role;
        }
    } else if (roleDirect) {
        user_role = roleDirect;
    }

    // 3. Attribution de la valeur finale
    let role = "";

    if (user_role === "RH" || user_role === "rh") {
        role = "RH";
    } else if (user_role === "Superadmin" || user_role === "superadmin") {
        role = "Superadmin";
    }
    useEffect(() => {
        const chargDash = async () => {
            try {
                setChargement(true);
                const data = await dashsuperadmin();
                setStats(data);
            } catch (err) {
                console.error("Erreur de chargement :", err);
                setError("Impossible de charger les données du tableau de bord");
            } finally {
                setChargement(false);
            }
        };

        chargDash();
    }, []);

    if (chargement) {
        return <div className="opacity-100 translate-x-0 transition-all w-140 text-center duration-3000 flex p-2 gap-3 items-center text-black justify-center font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400">Chargement du tableau de bord...</div>;
    }

    if (error) {
        return <div className="opacity-100 translate-x-0 transition-all w-140 text-center duration-3000 flex p-2 gap-3 items-center text-red-700 justify-center font-bold rounded-2xl h-10 m-4 bg-gray-300 shadow-md shadow-gray-400">{error}</div>;
    }
  return (
     <main className='m-7 col-span-6'>
        <div className='flex justify-between w-full'>
            <h1 className='font-extrabold md:text-xl text-md'>Tableau de bord</h1>
            <div className='flex items-center gap-2'>
            <div className='border-2 w-7 h-7 rounded-2xl p-2 bg-amber-300'></div>
            <div className='font-bold text-md lg:block hidden'>{role}</div> 
            <div className='relative flex'>
              <FaBell size={25}/>
              <div className='-m-1 w-4 h-4 p-1 text-[8px] flex justify-center items-center text-white rounded-2xl text-center bg-red-400'>{stats.notifications}</div>
            </div>
          </div>
        </div>
        <div className='m-10 flex md:flex-row flex-wrap flex-col items-center justify-center gap-6'>
            <Card_propos
                logo = {<FaBook size={20} className='text-blue-500'/>}
                tittle = "Formations"
                nombres = {stats.nombre_formation}
                update = {stats.update_formation}
            />
            <Card_propos
                logo = {<FaUser size={20} className='text-green-500'/>}
                tittle = "Utilisateurs"
                nombres = {stats.nombre_user}
                update = {stats.update_user}
            />
            <Card_propos
                logo={<FaEnvelope size={20} className='text-amber-500'/>}
                tittle="Supports"
                nombres={stats.nombre_support}
                update={stats.update_support}
            />
            <Card_propos
                logo={<FaFile size={20} className='text-purple-500'/>}
                tittle="Enseignants"
                nombres={stats.nombre_ens}
                update={stats.update_ens}
            />
        </div>
        <div className="mt-6">
         <FormationGraph />
        </div>
      </main>
   
  )
}
