import { FaBell} from "react-icons/fa6";
import { FaClock,FaArrowRight } from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
function Card_form ({style,logo_form,title,timer,description,etu}) {
    return(
        <div className="m-2 flex flex-col items-center w-screen lg:w-58 h-80 shadow-md shadow-gray-300 rounded-2xl">
            <div className="flex w-full">
                <div className={style}>
                    {logo_form}
                </div>
                <div className="w-[40%] flex justify-end items-start m-3"><FaBell size={20}/></div>
            </div>
            <div className="text-md font-extrabold">{title}</div>
            <div className="text-[0.8rem]">{description}</div>
            <div className="flex justify-around gap-5 m-2">
                <div className="flex items-center gap-1 text-[0.8rem]"><FaClock size={20} className="text-red-400"/>{timer} heures</div>
                <div className="flex items-center gap-1 text-[0.8rem]"><FaStairs size={20} className="text-gray-400"/>Débutant</div>
            </div>
            <div className="flex justify-start items-center text-[0.8rem] gap-1"><FaUserFriends size={20}/>{etu} Etudiants</div>
            <div className="flex w-[75%] justify-center shadow-md cursor-pointer duration-300 hover:scale-105 active:scale-95 shadow-gray-300 rounded-md p-1 items-center m-3 gap-2 text-blue-700 font-bold text-[0.9rem]">
                <p>Voir la formation</p>
                <FaArrowRight size={15}/>
            </div>
        </div>
    )
}
export default Card_form;