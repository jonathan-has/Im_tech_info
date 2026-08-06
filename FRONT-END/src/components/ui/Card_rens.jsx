function Card_rens ({style_logo,logo,title,description,lien}) {
    return (
          <div className="flex lg:flex-col flex-col items-center justify-center m-2 xl:w-65 w-screen p-2 h-60 shadow-lg shadow-gray-300 rounded-2xl duration-200 hover:scale-105">
        <div className={style_logo}>
            {logo}
        </div>
        <div className="flex items-center justify-center flex-col">
            <h1 className="font-bold text-md m-2">{title}</h1>
            <p className="m-2  text-center text-blue-600 font-bold">{lien}</p>
        </div>
        <button className="w-[75%] text-[0.8rem] text-gray-800 ">{description}</button>
    </div>
    )
}
export default Card_rens;