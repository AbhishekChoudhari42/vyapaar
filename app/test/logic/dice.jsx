import React from 'react'

const Dice = ({dice}) => {
  return (
    <div className='w-[200px] h-[200px] bg-black/70 p-4 flex justify-center items-center'>
        <h1 className='text-white text-[4rem]'>{dice}</h1>
    </div>
  )
}

export default Dice