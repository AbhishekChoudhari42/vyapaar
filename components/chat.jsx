"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/store'
import { useParams } from 'next/navigation'
import useUser from '@/hooks/useUser'

const Chat = () => {

  const router = useRouter()
  const user = useUser();
  const { roomID } = useParams()

  if(user.isError){
    router.push('/auth')
  }
  return (
    <div className='p-2'>
      {roomID && <p className='text-white text-sm'>Room : {roomID}</p>}
      {user && <p className='text-white text-sm'>User : {user?.data?.display_name}</p>}
      {/* <button onClick={} className='red-button w-full text-sm'>◀ Leave Room</button> */}
    </div>
  )
}

export default Chat