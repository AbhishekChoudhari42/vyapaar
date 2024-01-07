"use client"
import React, { useEffect, useRef, useState } from 'react'
import supabase from '@/supabase/client'
import { v4 as uuid } from 'uuid'
import useStore from '@/store/store'
import { useRouter } from 'next/navigation'
const Page = () => {

    const { messages, addMessage, currentMessage, setCurrentMessage, gameroom } = useStore()
    const channel = supabase.channel(gameroom)
    const router = useRouter()
    
    function messageReceived(message) {
        addMessage(message)
    }
    function broadcast(message, channel) {
        const s = channel.send({
            type: 'broadcast',
            event: 'message',
            payload: { message },
        })
    }
    
    useEffect(() => {

        const channel = gameroom ? supabase.channel(gameroom) : null
        
        if(channel){
            
            // Subscribe to the Channel
            const sub = channel.on('broadcast',
            { event: 'message' },
            (data) => messageReceived(data.payload.message)
            )
            .subscribe()
            
            return () => sub.unsubscribe();

        }else if(!gameroom){
            router.push('./joinroom')
        }
        
    }, [])

    return (
        <div className='w-[100vh] h-screen bg-red-500'>

            <input className='bg-black' type="text" onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={() => broadcast(currentMessage, channel)} className='bg-black border '>broadcast event</button>
            <div>
                {
                    messages?.map((el) => {
                        return <p key={uuid()}>{el}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Page