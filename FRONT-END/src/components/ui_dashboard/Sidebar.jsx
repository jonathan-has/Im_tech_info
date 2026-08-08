import React from 'react'
import { FaHome,FaLayerGroup,FaUserFriends,FaBook} from 'react-icons/fa'
import { FaGear,FaArrowRightFromBracket } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { deconnexion } from '../../services/deconnection'
export const Sidebar = () => {
    const navigate = useNavigate();
    const Deconnexion = () => {
        deconnexion();
        navigate('/');
    }
  return (
    <div >
        <h1 className='m-3 p-8 text-center text-white font-extrabold text-xl'><span>IM </span>TECH INFO</h1>
        <div className='m-5 flex flex-col gap-5'>
            <Link to='/Dashboard/Superadmin/Dashsuperadmin'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaHome size={25} className='text-white'/>Tableau de bord</div></Link>
            <Link to='/Dashboard/Superadmin/Formations'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaLayerGroup size={25} className='text-white'/>Formations</div></Link>
            <Link to='/Dashboard/Superadmin/Utilisateurs'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaUserFriends size={25} className='text-white'/>Utilisateurs</div></Link>
            <Link to='/Dashboard/Superadmin/Supports'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaBook size={25} className='text-white'/>Supports</div></Link>
            <Link to='/Dashboard/Superadmin/Enseignants'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaUserFriends size={25} className='text-white'/>Enseignants</div></Link>
            <div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95' onClick={Deconnexion}><FaArrowRightFromBracket size={25} className='text-white'/>Déconnexion</div>
        </div>
    </div>
  )
}
export const Sidebar_ens = () => {
    const navigate = useNavigate();
    const Deconnexion = () => {
        deconnexion();
        navigate('/');
    }
    return (
    <div >
        <h1 className='m-3 p-8 text-center text-white font-extrabold text-xl'><span>IM </span>TECH INFO</h1>
        <div className='m-5 flex flex-col gap-5'>
            <Link to='Dashteach'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaHome size={25} className='text-white'/>Tableau de bord</div></Link>
            <Link to='formations'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaLayerGroup size={25} className='text-white'/>Mes Formations</div></Link>
            <Link to='Supports'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaBook size={25} className='text-white'/>Supports</div></Link>
            <div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95' onClick={Deconnexion}><FaArrowRightFromBracket size={25} className='text-white'/>Déconnexion</div>
        </div>
    </div>
  )
}


export const Sidebar_etu = () => {
    const navigate = useNavigate();
    const Deconnexion = () => {
        deconnexion();
        navigate('/');
    }
    return (
    <div >
        <h1 className='m-3 p-8 text-center text-white font-extrabold text-xl'><span>IM </span>TECH INFO</h1>
        <div className='m-5 flex flex-col gap-5'>
            <Link to='Dashetu'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaHome size={25} className='text-white'/>Tableau de bord</div></Link>
            <Link to='formations'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaLayerGroup size={25} className='text-white'/>Mes Formations</div></Link>
            <Link to='Supports'><div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95'><FaBook size={25} className='text-white'/>Supports</div></Link>
            <div className='m-1 flex gap-2 text-bold text-white duration-300 p-2 rounded-2xl hover:bg-blue-600 active:scale-95' onClick={Deconnexion}><FaArrowRightFromBracket size={25} className='text-white'/>Déconnexion</div>
        </div>
    </div>
  )
}
