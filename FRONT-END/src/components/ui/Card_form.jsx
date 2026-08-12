import { FaBell} from "react-icons/fa6";
import { FaClock,FaArrowRight } from "react-icons/fa";
import { FaStairs } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
function Card_form ({title,timer,description}) {
    // mise en place de couleur aleatoire
    const couleuraleatoire = [ 
        'red','blue','purple','cyan','pink','green','gray',
        '#00d4ff','darkcyan','brown','yellow','orange',
        'chocolate','#4f8cff','#b26dff','black'
    ];
    const couleur_aleatoire = Math.floor(Math.random()*couleuraleatoire.length)
    return(
        <div className="m-2 flex flex-col items-center w-screen lg:w-58 h-70 shadow-md shadow-gray-300 rounded-2xl">
            <div className="flex w-full">
                <div className='w-[65%] h-25 rounded-2xl m-5 flex items-center justify-center' style={{backgroundColor:couleuraleatoire[couleur_aleatoire]}}>
                </div>
                <div className="w-[40%] flex justify-end items-start m-3"><FaBell size={20}/></div>
            </div>
            <div className="text-md font-extrabold">{title}</div>
            <div className="text-[0.8rem]">{description}</div>
            <div className="flex justify-around gap-5 m-2">
                <div className="flex items-center gap-1 text-[0.8rem]"><FaClock size={20} className="text-red-400"/>{timer} heures</div>
                <div className="flex items-center gap-1 text-[0.8rem]"><FaStairs size={20} className="text-gray-400"/>Débutant</div>
            </div>
        </div>
    )
}
export default Card_form;