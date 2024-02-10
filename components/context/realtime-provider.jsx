"use client"
import useStore from '@/store/store'
import { supabaseBrowser } from '../../lib/supabase/browser'
import { useRouter } from 'next/navigation'
import { useState, useEffect, createContext, useRef } from 'react'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import useUser from '@/hooks/useUser'

export const RealtimeContext = createContext()

const displayToast = (text) => {
    toast(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
}

const RealtimeProvider = ({ children }) => {

    const { roomID } = useParams()
    const user = useUser();
    const username = user?.data?.display_name.replace(" ","")

    
    const channelRef = useRef(roomID)

    const supabase = supabaseBrowser()
    const queryClient = useQueryClient();

    useEffect(() => {
        channelRef.current =  roomID ? supabase.channel(roomID) : null
        if (channelRef.current) {

            const sub = channelRef.current.on(
                'broadcast',
                { event: 'joinroom' },
                (payload) => {

                    queryClient.invalidateQueries('game')
                    displayToast(payload.payload.message)
                    
                }
                )
                .on(
                    'broadcast',
                    { event: 'leaveroom' },
                    (payload) => {
                        if(payload.payload?.user != username){
                            queryClient.invalidateQueries(['game'])
                            displayToast(payload.payload.message)
                        }
                    }
                    )
                    .on(
                        'broadcast',
                        { event: 'dice' },
                        (payload) => {
                            queryClient.invalidateQueries(['game'])
                            displayToast(payload.payload.message)
                    }
                )
                .on(
                    'broadcast',
                    { event: 'endturn' },
                    (payload) => {
                        queryClient.invalidateQueries(['game'])
                        console.log("broadcast End Turn: ", payload.payload.message)
                    }
                )
                .on(
                    'broadcast',
                    { event: 'buyprop' },
                    (payload) => {
                        queryClient.invalidateQueries(['game'])
                        console.log("broadcast bought prop: ", payload.payload.message)
                    }
                )
                .subscribe()

            return () => sub.unsubscribe()
        }

    }, [])

    return <RealtimeContext.Provider value={{ channel: channelRef.current}}>
        {children}
    </RealtimeContext.Provider>
}

export default RealtimeProvider