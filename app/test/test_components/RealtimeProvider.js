"use client"

import useStore from '@/store/store'
import supabase from '@/supabase/client'
import { useRouter } from 'next/navigation'
import { useState , useEffect, createContext } from 'react'

export const RealtimeContext = createContext({users:{},error:false})

const RealtimeProvider = ({children}) => {
    
    
    const {user,gameroom,setGameroom,addMessage} = useStore()
    const router = useRouter()
    
    const channel = supabase.channel(gameroom)
    
    const [users,setUsers] = useState({})
    const [error,setError] = useState(false)
    
    const messageReceived = (data) => {
        addMessage(data)
    }
    
    useEffect(() => {
        
        const channel = supabase.channel(gameroom)
        
        if(gameroom && channel){

        const userStatus = {
            user,
            position: 0
        }

        channel.on('presence', { event: 'sync' }, () => {
            const newState = channel.presenceState()
            let usersObject = {}
            Object.keys(newState).forEach(id => {
                usersObject = { ...usersObject, [id]: { ...newState[id][0] } }
            })
            // console.log(usersObject)
            setUsers(usersObject)
        })
        .on('presence', { event: 'join' },

                ({ key, newPresences }) =>
                {
                    // console.log('join', key, newPresences)
                }
            )
        .on('presence', { event: 'leave' },

                ({ key, leftPresences }) => {
                    // console.log('leave', key, leftPresences)
                }
        )
        .on('broadcast',
            { event: 'message' },
            (data) => messageReceived(data)
        )
        
        const sub = channel.subscribe(async (status) => {
            if (status != 'SUBSCRIBED') { return }
            const presenceTrackStatus = await channel.track(userStatus)
        })


        const untrack = async () => {
            const presenceUntrack = await channel.untrack()

        }
        return () => {sub.unsubscribe()}
    }else{
        setError(true)
    }

    }, [])
    
    return <RealtimeContext.Provider value={{users,error,channel}}>
            {children}
           </RealtimeContext.Provider>
}


export default RealtimeProvider