"use client"
import useStore from '@/store/store'
import supabase from '@/supabase/browserClient'
import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext } from 'react'
export const RealtimeContext = createContext({ users: {}, error: false })

const RealtimeProvider = ({ children }) => {

    const { user, gameroom, setGameroom, addMessage } = useStore()
    const router = useRouter()

    const channel = supabase.channel(gameroom)

    const [users, setUsers] = useState({})
    const [error, setError] = useState(false)

    const messageReceived = (data) => {
        addMessage(data)
    }

    useEffect(() => {
        const roomId = gameroom || localStorage.getItem('roomId')
        const channel = supabase.channel(roomId)
        console.log("rtime",roomId)
        if (roomId && channel) {

            const userStatus = {
                user,
                position: 0
            }

            const sub = channel.on('postgres_changes',
                {
                    event: "*",
                    schema: 'public',
                    table:'game'
                }, 
                (payload) => {
                    if(payload?.new?.state){
                        let newState = payload?.new?.state;
                        console.log(newState)
                        console.log(users)
                        setUsers((users)=>{{}})
                    }
                }).subscribe()


            const untrack = async () => {
                const presenceUntrack = await channel.untrack()

            }
            return () => { sub.unsubscribe() }

        } else {
            setError(true)
        }

    }, [])

    return <RealtimeContext.Provider value={{ users, error, channel }}>
        {children}
    </RealtimeContext.Provider>
}


export default RealtimeProvider