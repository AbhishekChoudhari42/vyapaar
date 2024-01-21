"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/store'
const Chat = () => {
 const router = useRouter()
  const leaveRoom = () => {
    localStorage.clear('roomId')
    localStorage.clear('user')
    router.push('/room')
  }

  const {gameroom,user} = useStore();
  return (
    <div className='p-2'>
        <p className='text-white text-sm'>Room : {gameroom}</p>
        <p className='text-white text-sm'>User : {user}</p>
        <button onClick={()=>{leaveRoom()}} className='red-button w-full text-sm'>◀ Leave Room</button>
    </div>
  )
}

export default Chat