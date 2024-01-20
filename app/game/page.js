"use client"
import Gameboard from '@/components/gameboard'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useStore from '@/store/store'
import Chat from '@/components/chat'

const page = () => {

  const router = useRouter();
  const { gameroom , setUser } = useStore()
  
  useEffect(()=>{
    
    if(localStorage.getItem('user')){
      setUser(localStorage.getItem('user'))
    }

    if(!gameroom || !localStorage.getItem('roomId')){
      router.push('/room',{shallow:true})
    }
  },[])
  
  
  return (
    <div className=' max-w-[1300px] w-screen h-screen flex justify-between items-center'>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
        <Chat/>
      </div>
      <div className='flex flex-[3] justify-center items-center'>
      <Gameboard/>
      </div>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>

      </div>

    </div>
  )
}

export default page