"use client"
import React, { useEffect, useState } from 'react'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'
import supabase from '../../supabase/client'

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

    const joinroom = async (e) => {
        e.preventDefault();

        const room_id = room.split('/')[1];
        const admin_id = room.split('/')[0];

        const isGamePresent = await supabase.from('game').select('*').match({admin:admin_id,roomid:room_id})
        
        if(isGamePresent?.data?.length > 0){
            const currentGameState = JSON.parse(isGamePresent?.data[0]?.state)

            console.log(currentGameState,'isGamePresent')
            
            if(Object.keys(currentGameState).length > 2){
                alert("Error");
                return    
            }
            
            const newGameState = {...currentGameState,[user]:{position:0}}

            const addUserToState = await supabase.from('game').update({state:JSON.stringify(newGameState)}).eq('admin',admin_id)
            console.log(addUserToState)
            
            setGameroom(room)
            localStorage.setItem('roomId', room)
            router.push('/game',{shallow:true})
        
        }

    
    }
    
    const createRoom = async (e) =>{
        e.preventDefault();
        // from global room state
        const room_id = room

        // check if user with admin = user (global state) is present
        const isUserPresent = await supabase.from('game').select('*').match({admin:user})
        
        if(isUserPresent?.data?.length > 0){
            const initiateRoom = await supabase.from('game').update({state:JSON.stringify({[user]:{position:0}}),roomid:room_id}).eq('admin',user)
            setGameroom(room)
            localStorage.setItem('roomId', room_id)
            router.push('/game')
        }else{
            const insertUser = await supabase.from('game').insert({state:JSON.stringify({user:user,position:0}),admin:user,roomid:room_id})
            setGameroom(room)
            localStorage.setItem('roomId', room_id)
            router.push('/game')
        }

    }


    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            
            <form className='flex flex-col gap-2 w-[350px] mb-8'>
                <h2 className='text-lg font-semibold'>Create room</h2>
                <input className = "input-style" type='text'  value={room} onChange={(e) => setRoom(e.target.value)} />
                <button className = 'white-button' onClick={(e) => { createRoom(e) }}>Create Room</button>
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