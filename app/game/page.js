"use client"
import Gameboard from '@/components/gameboard'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useStore from '@/store/store'

const page = () => {

  const router = useRouter();
  const { gameroom } = useStore()
  
  useEffect(()=>{
    if(!gameroom || !localStorage.getItem('roomId')){
      router.push('./room')
    }
  },[])
  
  
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