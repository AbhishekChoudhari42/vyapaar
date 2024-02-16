"use client"
import React, { useEffect, useState } from 'react'
import {supabaseBrowser} from '@/lib/supabase/browser'
import axios from 'axios'

import useStore from '@/store/store'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import tabledata from '@/lib/constant/tabledata'
import userSlice from '@/store/slices/userSlice'
import checkBuyable from '@/utils/checkBuyable'

const Controls = ({roomID, gameState, game_state}) => {
    const { diceRolled,setDiceRolled,currentTurn } = useStore();
    

    // const [ gamecontrol, setGameControl ] = useState({ diceRolled:false})
    const [dice, setDice] = useState();

    const user = useUser();
    const username = user.data.display_name.replace(" ","");
    const supabase = supabaseBrowser()
    

    const rollDice = async (setGamecontrol) => {
        // setDiceRolled();
        // console.log(diceRolled, "DICEEEEEE")
        const result = await axios.post("/api/dice",{roomID});
        const {diceRoll} = result.data;
        setDiceRolled();
        //setting diceRolled to true here
        // setGameControl(prevGameControl=>({
        //     ...prevGameControl, diceRolled: true
        // }))

        setDice(diceRoll?.diceRoll1+diceRoll?.diceRoll2);
        console.log("player rolled")
        return diceRoll;
    }

    //
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation({
        mutationFn:()=>{handleButtons()} ,
        onSuccess: () =>{
            // console.log(game_state.gamestate[user.data.display_name.replace(" ","")].pos,"CURRENT GAME STATE")
        }
    })

    const handleButtons = () =>{
        //checking if dircRolled true here
        if(diceRolled){
            endTurn()
        }
        else{
            rollDice();
        }
    }

    const hasRolled = () =>{
        
        if(username.replace(" ","") == game_state.users[game_state.current]){
            return true;
        }
        return false;
    }

    const endTurn = async () => {
        const result = await axios.post("/api/endturn",{roomID});
        //setting diceRolled false here
        // setGameControl(prevGameControl=>({
        //     ...prevGameControl, diceRolled: false
        // }))
        setDiceRolled();
        // API call with Transaction details if transaction required
        // changes current user turn to user next username
    }

    function isTileBuyable(tileKey, playerState) {
        const nonBuyableTileKeys = [0, 2, 4, 7, 10, 17, 20, 22, 30, 33, 36, 38];
        const isNonBuyableTile = nonBuyableTileKeys.includes(tileKey); //if true, not buyable
    
        for (const playerName in playerState) {
            const playerProps = playerState[playerName].prop;
            if (playerProps?.includes(tileKey) || isNonBuyableTile) {
                // console.log(`${playerName} owns ${tileName}`);
                return false; // Property is owned, not buyable
            }
        }
        return true; // Tile is buyable
    }

    let playerPosition = (game_state?.gamestate[user.data.display_name.replace(" ","")].pos);

    const buyProperty = async () =>{
        await axios.post("/api/transaction/buyprop",{roomID});
    }

    const jailRelase = async () =>{
        await axios.post("/api/transaction/jailrelease", {roomID})
        //setting diceRolled to false here
        // setGameControl(prevGameControl=>({
        //     ...prevGameControl, diceRolled: false
        // }))
        setDiceRolled();
    }
    
    return (
        <div className='h-full flex-grow p-2'>
            <div className='border-[1px] border-white/30 rounded-md h-full w-full flex justify-center items-center'>
                {/* dice result */}
                <div className='absolute top-6 rounded-md left-1/2 -translate-x-1/2 w-20 h-20 text-white font-semibold text-6xl border-[1px] flex justify-center items-center'>
                    {6}
                </div>
                {   //checking gamecontrol on currentTurn, diceRolled bellow
                    currentTurn == true && game_state?.injail.includes(username) == true ?
                    <div>
                        IN JAIL
                        <button onClick={() => { mutateAsync() }} className={`white-button`}>{diceRolled?"End turn":"Roll dice"}</button>
                        {/* <br></br> */}
                        <button onClick={()=>{ jailRelase()} } className={`white-button`}>{diceRolled?null:"Pay fine of 50"}</button>
                    </div>
                    :
                    <div className='flex flex-col gap-2'>
                        
                        <button onClick={() => { mutateAsync() }} className={`white-button`}>{diceRolled?"End turn":"Roll dice"}</button>

                        {isTileBuyable(playerPosition, game_state?.gamestate) ? (
                            <button onClick={() => buyProperty()} className='white-button'>Buy Property</button>
                        ) : null}

                    </div>
                }
            </div>
        </div>
    )
}

export default Controls
