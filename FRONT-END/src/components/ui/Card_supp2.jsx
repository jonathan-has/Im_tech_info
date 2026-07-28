function Card_supp2 ({style_logo,logo,title,description,contact}) {
        return (
            <div className="flex lg:flex-col flex-row items-center justify-center m-2 lg:w-50 w-[75%] p-2 h-60 shadow-lg shadow-gray-300 rounded-2xl duration-200 hover:scale-105">
                <div className={style_logo}>
                    {logo}
                </div>
                <div className="flex items-center justify-center flex-col">
                    <h1 className="font-bold text-md m-2">{title}</h1>
                    <p className="m-2 text-[0.8rem] text-center text-gray-800">{description}</p>
                </div>
                <button className="bg-blue-600 rounded-md w-[75%]">{}</button>
            </div>
        )
    }
export default Card_supp2;
