import Gameboard from '@/components/gameboard'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex justify-between items-center'>
      <div className='flex-1 bg-red-950 h-screen'>

      </div>
      <div className='flex flex-[3] justify-center items-center'>
      <Gameboard/>
      </div>
      <div className='flex-1 bg-red-950 h-screen'>

      </div>

    </div>
  )
}

export default page