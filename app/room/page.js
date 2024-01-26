"use client"
import React, { useEffect, useState } from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const page = () => {

    const {gameroom, setGameroom , user,setUser} = useStore()

    const [room, setRoom] = useState('')
    const router = useRouter();

    useEffect(() => {

        if(!user){
            router.push('/homepage',{shallow:true})
        }
        if (localStorage.getItem('roomId')) {
            setGameroom(localStorage.getItem('roomId'))
            router.push('/game',{shallow:true})
        }

    },[])

    const joinroom = async (e) => {
        e.preventDefault();
    
    }
    
    const createRoom = async (e,roomId,user) =>{
        e.preventDefault();
        let res = await axios.post('/room/create',{roomId,user})
        console.log(res)
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>            
            <form className='flex flex-col gap-2 w-[350px] mb-8'>
                <h2 className='text-lg font-semibold'>Create room</h2>
                <input className = "input-style" type='text'  value={room} onChange={(e) => setRoom(e.target.value)} />
                <button className = 'white-button' onClick={(e) => { createRoom(e,room,user) }}>Create Room</button>
            </form>

            <form className='flex flex-col gap-2 w-[350px]'>
                <h2 className='text-lg font-semibold'>Join room</h2>
                <input className = "input-style" type='text'  value={room} onChange={(e) => setRoom(e.target.value)} />
                <button className = 'white-button' onClick={(e) => { joinroom(e) }}>Join Room</button>
            </form>
        </div>
    )
}

export default page