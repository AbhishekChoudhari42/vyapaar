"use client"
import React, { useEffect, useState } from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'

const page = () => {

    const { setGameroom , user,setUser} = useStore()
    const [room, setRoom] = useState('')
    const router = useRouter();


    useEffect(() => {
        console.log("user=>",user)
        if(!user){
            router.push('/homepage',{shallow:true})
        }
        if (localStorage.getItem('roomId')) {
            setGameroom(localStorage.getItem('roomId'))
            router.push('/game',{shallow:true})
        }
    }, [])

    const joinroom = (room) => {
        setGameroom(room)
        setUser('user') 
        localStorage.setItem('roomId', room)
        router.push('/game',{shallow:true})
    }

    const createRoom = () =>{
        // insert gameadmin in db and return a room Id
    }


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            
            <form className='flex flex-col gap-2 w-[350px] mb-8'>
                <h2 className='text-lg font-semibold'>Create room</h2>
                <button className = 'white-button' onClick={() => { createRoom() }}>Create Room</button>
            </form>
            <form className='flex flex-col gap-2 w-[350px]'>
                <h2 className='text-lg font-semibold'>Join room</h2>
                <input className = "input-style" type='text'  value={room} onChange={(e) => setRoom(e.target.value)} />
                <button className = 'white-button' onClick={() => { joinroom(room) }}>Join Room</button>
            </form>
        </div>
    )
}

export default page