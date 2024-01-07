"use client"
import React, { useEffect, useRef, useState } from 'react'
import supabase from '@/supabase/client'
import { v4 as uuid } from 'uuid'
import useStore from '@/store/store'

const Page = () => {
    const {messages,addMessage,currentMessage,setCurrentMessage} = useStore()    
    const channel = supabase.channel('room1')

    function messageReceived(message) {
        addMessage(message)
    }

    function broadcast(message, channel) {
        channel.send({
            type: 'broadcast',
            event: 'test',
            payload: {message},
        })
    }


    useEffect(() => {

        const channel = supabase.channel('room1')

        // Subscribe to the Channel
        const sub = channel
            .on(
                'broadcast',
                { event: 'test' },
                (data) => messageReceived(data.payload.message)
            )
            .subscribe()

        return () => sub.unsubscribe();

    }, [supabase])

    return (
        <div className='w-[100vh] h-screen bg-red-500'>

            <input className='bg-black' type="text" onChange={(e) => setCurrentMessage(e.target.value)} />

            <button onClick={() => broadcast(currentMessage, channel)} className='bg-black border '>
                broadcast event
            </button>

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