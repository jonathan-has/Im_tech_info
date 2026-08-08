import { Link } from "react-router";
function Card({style_card,icone,formation,description,fleche}) {
    return (
        <div className="m-2 flex items-center border-gray-400 w-75 h-35 rounded-2xl bg-gray-100 shadow-md shadow-gray-500">
            <div className={style_card}>
                {icone}
            </div>
            <div className="flex flex-col m-2">
                <div className="font-bold">{formation}</div>
                <div className="text-[0.8rem]">{description}</div>
                <Link to='/Formations'><div className="m-3 flex items-center gap-2 text-[0.8rem] text-blue-800 font-bold duration-200 hover:scale-105 cursor-pointer active:scale-95">
                    Voir les formations
                    {fleche}
                </div></Link>
            </div>
        </div>
    )
}
export default Card;