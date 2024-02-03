"use client"
import Gameboard from '@/components/gameboard'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import useStore from '@/store/store'
import Chat from '@/components/chat'
import {supabaseBrowser} from '@/lib/supabase/browser'
import axios from 'axios'

const page = () => {

  const router = useRouter();
  const { gameroom , setUser , users, setUsers} = useStore()
  const supabase = supabaseBrowser()
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUser(localStorage.getItem('user'))
    }
  },[])

  useEffect(()=>{
    const getInitialState = async () => {
      const res = await axios.get(`/api/room/fetch/${'aaa_room1'}`)
      console.log(res) 
      if(res?.data){
        return res.data.data
      }else{
        return {}
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