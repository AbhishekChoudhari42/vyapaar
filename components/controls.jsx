"use client"
import React, { useState } from 'react'
import {supabaseBrowser} from '@/lib/supabase/browser'
import axios from 'axios'

import useStore from '@/store/store'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'

const Controls = ({roomID, gameState}) => {

    const [ gamecontrol, setGameControl ] = useState({ currentTurn: true , diceRolling:false })
    const user = useUser();
    const supabase = supabaseBrowser()

    const rollDice = async (setGamecontrol) => {
        const result = await axios.post("/api/dice",{roomID});
        const {diceRoll} = result.data;
        return diceRoll;
    }

    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn:()=>{rollDice()} ,
        onSuccess: () =>{
            isRolling()
            console.log("sucessful")

        }
    })

    const isRolling = () =>{
        const username = user.data.display_name;
        console.log(username, gameState, "rolling")
    }

    const endTurn = () => {
        // API call with Transaction details if transaction required
        // changes current user turn to user next username
    }

    const buyProperty = () =>{

    }
    
    return (
        <div className='h-full flex-grow p-2'>
            <div className='border-[1px] border-white/30 rounded-md h-full w-full flex justify-center items-center'>
                {/* dice result */}
                <div className='absolute top-6 rounded-md left-1/2 -translate-x-1/2 w-20 h-20 text-white font-semibold text-6xl border-[1px] flex justify-center items-center'>
                    {6}
                </div>
                {
                    gamecontrol?.currentTurn &&
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => { mutateAsync() }} className={`white-button ${gamecontrol?.diceRolling ? 'fade' :''}`}>Roll dice</button>
                        <button onClick={() => { endTurn() }} className='white-button'>End turn</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Controls