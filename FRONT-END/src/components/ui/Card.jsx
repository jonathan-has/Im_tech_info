import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
function Card({formation,description}) {
    // mise en place de couleur aleatoire
    const couleuraleatoire = [ 
        'red','blue','purple','cyan','pink','green','gray',
        '#00d4ff','darkcyan','brown','yellow','orange',
        'chocolate','#4f8cff','#b26dff','black'
    ];
    const couleur_aleatoire = Math.floor(Math.random()*couleuraleatoire.length)
    return (
        <div className="m-2 flex items-center border-gray-400 w-75 h-35 rounded-2xl bg-gray-100 shadow-md shadow-gray-500">
            <div className="w-30 h-17 m-3 rounded-lg flex items-center justify-center" style={{backgroundColor:couleuraleatoire[couleur_aleatoire]}}>
            </div>
            <div className="flex flex-col m-2">
                <div className="font-bold">{formation}</div>
                <div className="text-[0.8rem]">{description}</div>
                <Link to='/Formations'><div className="m-3 flex items-center gap-2 text-[0.71rem] text-blue-800 font-bold duration-200 hover:scale-105 cursor-pointer active:scale-95">
                    Voir les formations
                    <FaArrowRight size={12} className='text-blue-800 cursor-pointer'/>
                </div></Link>
            </div>
        </div>
    )
}
export default Card;