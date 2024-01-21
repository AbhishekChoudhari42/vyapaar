"use client"
import React, { useState } from 'react'
import supabase from '../supabase/client'
import useStore from '@/store/store'

const Controls = () => {

    const [ gamecontrol, setGameControl ] = useState({ currentTurn: true , diceRolling:false })
    const {gameroom,user , users , setUsers} = useStore();

    const rollDice = async (setGamecontrol) => {

        const isGamePresent = await supabase.from('game').select('*').match({admin:user,roomid:gameroom})
        if(isGamePresent.data){
            const currentGameState = JSON.parse(isGamePresent?.data[0]?.state)
            const addUserToState = await supabase.from('game').update({state:JSON.stringify({...currentGameState,['aaa']:{pos:Math.floor(Math.random()*20)}})}).eq('admin',user)
            console.log(addUserToState,'addUserToState')
            console.log(currentGameState,'currentGameState')
            setUsers(currentGameState)
        }
        
        // API call with username details
        // returns random number 
        // broadcast the number with message "user __ got {random number}"
        setGameControl({...gamecontrol,diceRolling:true})
        
        setTimeout(()=>{
            setGameControl({...gamecontrol,diceRolling:false})
        },3000)

        console.log('roll dice')
    }
    const endTurn = () => {
        // API call with Transaction details if transaction required
        // changes current user turn to user next username
        // returns success or error status
        console.log('end turn')
    }

    return (
        <div className='h-full flex-grow p-2'>
            <div className='border-[1px] border-white/30 h-full w-full flex justify-center items-center'>
                {/* dice result */}
                <div className='absolute top-6 rounded-md left-1/2 -translate-x-1/2 w-20 h-20 text-white font-semibold text-6xl border-[1px] flex justify-center items-center'>
                    {6}
                </div>
                {
                    gamecontrol?.currentTurn &&
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => { rollDice() }} className={`white-button ${gamecontrol?.diceRolling ? 'fade' :''}`}>Roll dice</button>
                        <button onClick={() => { endTurn() }} className='white-button'>End turn</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Controls