
import { FaFacebook, FaInstagram,FaMailchimp } from "react-icons/fa6";
function Card_pers ({profil,teacher, description}) {
    return (
        <div className="m-4 flex flex-col shadow-lg shadow-gray-400 w-75 p-2 rounded-md items-center justify-center mb-2">
            <div className="bg-gray-400 p-2 rounded-2xl m-3">
                {profil}
            </div>
            <div>
                <h1 className="font-bold">{teacher}</h1>
                <p className="m-1 text-[0.9rem]">{description}</p>
                <div className="flex gap-5 items-center justify-center m-2">
                    <FaFacebook size={15} className="text-black-600"/>
                    <FaInstagram size={15} className="text-black-600"/>
                    <FaMailchimp size={15} className="text-black-600"/>
                </div>
            </div>
        </div>
    )
}
export default Card_pers;