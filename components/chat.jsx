"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/store'
import { useParams } from 'next/navigation'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useContext } from 'react'
import { RealtimeContext } from './context/realtime-provider'

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


  const {channel} = useContext(RealtimeContext)

  const { messages, currentMessage, setCurrentMessage} = useStore()

  function broadcast(currentMessage, channel) {
    console.log(currentMessage);
      channel.send({
          type: 'broadcast',
          event: 'message',
          payload: { message:currentMessage },
      })
  }

  return (
    <div className='p-2'>
      <button className = 'red-button' onClick={(e) => { leaveroom(e) }}>Leave Room</button>
      {roomID && <p className='text-white text-sm'>Room : {roomID}</p>}
      {user && <p className='text-white text-sm'>User : {user?.data?.display_name}</p>}
      <br/> <br/>

      <input value={currentMessage} className='bg-blue-500' type="text" onChange={(e) => setCurrentMessage(e.target.value)} />
      <button onClick={() => broadcast(currentMessage, channel)} className='bg-black border '>broadcast event</button>
            <div>
                {
                    messages?.map((data) => {
                        return <p className='text-sky-400' key={uuid()}>{data}</p>
                    })
                }
            </div>
    </div>
  )
}

export default Chat