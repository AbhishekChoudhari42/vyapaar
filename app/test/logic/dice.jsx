import React from 'react'

const Dice = ({dice}) => {
  return (
    <div className='w-[200px] h-[200px] bg-blue-950 absolute top-2 left-1/2 translate-x-[-50%] p-4 flex justify-center items-center'>
        <h1 className='text-white text-[4rem] '>{dice}</h1>
    </div>
  )
}

export default Dice