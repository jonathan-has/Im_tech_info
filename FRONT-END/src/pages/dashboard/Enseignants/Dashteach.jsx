import { useState,useEffect } from "react";
import { Card_propos } from '../../../components/ui_dashboard/Card_propos'
import { FaBook,FaUser,FaEnvelope,FaFile } from 'react-icons/fa6'
import { FaBell } from 'react-icons/fa6';
import { dashteach,nameteach } from '../../../services/Dashboard/teacher/dashteacher';
import FormationGraph from '../../../components/ui_dashboard/FormationGraph';
export const Dashteach = () => {
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
      const [teacher_name,setTeacher_name] = useState("");
      useEffect(() => {
        const chargDash = async () => {
          try {
              setChargement(true);
              
              // 1. Récupération des stats
              const statsData = await dashteach();
              setStats(statsData);

              // 2. Récupération du nom du prof
              const teacherData = await nameteach();
              if (teacherData) {
                  setTeacher_name(teacherData.nom || teacherData.name || "");
              }
          } catch (err) {
              setError('Impossible de charger les données');
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
        <h1 className='font-extrabold text-xl'>Tableau de bord</h1>
        <div className='flex items-center gap-2'>
          <div className='border-2 w-7 h-7 rounded-2xl p-2 bg-amber-300'></div>
          <div className='font-bold text-md'>{teacher_name}</div> 
          <div className='relative flex'>
            <FaBell size={25}/>
            <div className='-m-1 w-4 h-4 p-1 text-[8px] flex justify-center items-center text-white rounded-2xl text-center bg-red-400'>{stats.notifications}</div>
          </div>
        </div>
      </div>
      <div className='m-10 flex gap-5'>
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
