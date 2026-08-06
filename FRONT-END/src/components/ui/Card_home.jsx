function Card_home({formation_name,description,style_bg,photo}) {
    return(
        <div className="flex items-center bg-gray-300 w-75 h-30 m-3  rounded-2xl shadow-md shadow-gray-500">
            <div className={style_bg}>
                {photo}
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="font-bold ">{formation_name}</div>
                <div className="text-[0.9rem]">{description}</div>
            </div>
        </div>
    )
}
export default Card_home;
