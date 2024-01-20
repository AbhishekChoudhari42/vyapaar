"use client"
import React,{useEffect, useState} from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'

const page = () => {
    const { setGameroom } = useStore()
    const [room,setRoom] = useState('')
    const router = useRouter();

    useEffect(()=>{
        if(localStorage.getItem('roomId')){
          setGameroom(localStorage.getItem('roomId'))
          router.push('./game')
        }
      },[])

    function joinroom(room){
        console.log(room)
        setGameroom(room)
        localStorage.setItem('roomId',room)
        router.push('./game')
    }
    return (
        <div>
            <input type='text' className='bg-black border' value={room} onChange={(e)=>setRoom(e.target.value)} />
            <button onClick={()=>{joinroom(room)}}>Join Room</button>
        </div>
    )
}

export default page