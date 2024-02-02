"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import supabase from '@/supabase/browserClient'
import { v4 as uuid } from 'uuid'
import useStore from '@/store/store'
import { RealtimeContext } from './RealtimeProvider'

const Chat = () => {

    const { messages,currentMessage, setCurrentMessage} = useStore()
    
    const {channel} = useContext(RealtimeContext)

    function broadcast(message, channel) {
        const s = channel.send({
            type: 'broadcast',
            event: 'message',
            payload: { message },
        })
    }
    
    return (
        <div className='h-full w-[20%]'>

            <input className='bg-blue-500' type="text" onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={() => broadcast(currentMessage, channel)} className='bg-black border '>broadcast event</button>
            <div>
                {
                    messages?.map((data) => {
                        return <p key={uuid()}>{data?.payload?.message}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Chat