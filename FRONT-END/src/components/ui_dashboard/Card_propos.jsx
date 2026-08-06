import React from 'react'

export const Card_propos = ({logo,tittle,nombres,update}) => {
  return (
    <div className='w-50 rounded-md shadow-md shadow-gray-300 p-2 flex flex-col cursor-pointer'>
        <div className='gap-2 flex items-center font-bold'>
            {logo}
            <h1>{tittle}</h1>
            </div>
        <div className='font-extrabold text-xl'>{nombres}</div>
        <div>+{update} nouveautés</div>
    </div>
  )
}
