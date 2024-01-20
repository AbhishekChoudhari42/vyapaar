"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/store'
const Chat = () => {
 const router = useRouter()
  const leaveRoom = () => {
    localStorage.clear('roomId')
    router.push('/room')
  }

  const {gameroom,user} = useStore();
  return (
    <div className='p-2'>
        <p className='text-white'>Room : {gameroom}</p>
        <p className='text-white'>User : {user}</p>
        <button onClick={()=>{leaveRoom()}} className='red-button w-full'>◀ Leave Room</button>
    </div>
  )
}

export default Chat