"use client"
import useStore from '@/store/store'
import { supabaseBrowser } from '../../lib/supabase/browser'
import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext } from 'react'

export const RealtimeContext = createContext({ users: {}, error: false })

const RealtimeProvider = ({ children }) => {

    const [roomID, setRoomID] = useState('room')
    // const { roomID } = useStore()
    const supabase = supabaseBrowser(roomID)
    const channel = roomID ? supabase.channel(roomID) : null

    useEffect(() => {

        if (channel) {
            const sub = channel.on(
                'broadcast',
                { event: 'joinroom' },
                (payload) => {
                    // refresh room entry queue
                    alert(JSON.stringify(payload))
                }
            ).subscribe()

            return () => sub.unsubscribe()
        }

    }, [])

    return <RealtimeContext.Provider value={{ channel }}>
                {children}
           </RealtimeContext.Provider>
}

export default RealtimeProvider