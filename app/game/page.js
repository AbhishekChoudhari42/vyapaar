"use client"
import Gameboard from '@/components/gameboard'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useStore from '@/store/store'
import Chat from '@/components/chat'
import supabase from '@/supabase/client'

const page = () => {

  const router = useRouter();
  const { gameroom , setUser , users, setUsers} = useStore()
  
  useEffect(()=>{
    
    if(localStorage.getItem('user')){
      setUser(localStorage.getItem('user'))
    }

    if(!gameroom || !localStorage.getItem('roomId')){
      router.push('/room',{shallow:true})
    }
  },[])

  useEffect(()=>{
    const getInitialState = async () => {
      const res = await supabase.from('game').select('*').match({roomid:'room1',admin:'aaa'})
      if(res?.data?.length > 0){
        console.log(JSON.parse(res.data[0].state))
        return JSON.parse(res.data[0].state)
      }
    }
    setUsers(getInitialState())
  },[])
  
  
  return (
   
    <div className=' max-w-[1300px] w-screen h-screen flex justify-between items-center'>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
        <Chat/>
      </div>
      <div className='flex flex-[3] justify-center items-center'>
      {users && <Gameboard/>}
      </div>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
      </div>
    </div>
    
  )
}

export default page