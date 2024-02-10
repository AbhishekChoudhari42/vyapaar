"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/store'
import { useParams } from 'next/navigation'
import useUser from '@/hooks/useUser'
import axios from 'axios'

const Chat = () => {

  const router = useRouter()
  const user = useUser();
  const { roomID } = useParams()

  if(user.isError){
    router.push('/auth')
  }

  async function leaveroom(e){
    e.preventDefault()
    const res = await axios.post('/api/room/leave',{roomID:roomID})
    if(res.data.success){
      router.push(`/room`)
    }
  }

  return (
    <div className='p-2'>
      <button className = 'red-button' onClick={(e) => { leaveroom(e) }}>Leave Room</button>
      {roomID && <p className='text-white text-sm'>Room : {roomID}</p>}
      {user && <p className='text-white text-sm'>User : {user?.data?.display_name}</p>}
    </div>
  )
}

export default Chat