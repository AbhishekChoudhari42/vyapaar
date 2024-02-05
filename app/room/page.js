"use client"
import React, { useEffect, useState } from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify';

import { createRoom } from '@/lib/api_calls/room'
import useUser from '@/hooks/useUser'

const page = () => {

    const {setRoomID} = useStore()

    const [createRoomVal, setCreateRoomVal] = useState('')
    const [joinRoomVal, setJoinRoomVal] = useState('')
    const user = useUser()
    console.log(user)
    const router = useRouter();

    useEffect(() => {
        if(!user){
            router.push('/')
        }    
    },[])

    const joinroom = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/room/join',{roomID:joinRoomVal,username:user?.data?.display_name})
        console.log(res)
    }
    const roomCreation = async (e) => {
        e.preventDefault();
        const data = await createRoom(createRoomVal,user?.data?.display_name)
        if(data.success){
            router.push(`/game/${createRoomVal}`)
        }
    }
    
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>            
            <div className='flex flex-col gap-2 w-[350px] mb-8'>
                <h2 className='text-lg font-semibold'>Create room</h2>
                <input className = "input-style" type='text'  value={createRoomVal} onChange={(e) => setCreateRoomVal(e.target.value)} />
                <button className = 'white-button' onClick={roomCreation}>Create Room</button>
            </div>

            <div className='flex flex-col gap-2 w-[350px]'>
                <h2 className='text-lg font-semibold'>Join room</h2>
                <input className = "input-style" type='text'  value={joinRoomVal} onChange={(e) => setJoinRoomVal(e.target.value)} />
                <button className = 'white-button' onClick={(e) => { joinroom(e) }}>Join Room</button>
            </div>
        </div>
    )
}

export default page