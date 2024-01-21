"use client"
import React, { useEffect, useState, useContext } from 'react'
import Tile from './tile'
import { v4 as uuid } from 'uuid'
import Dice from './dice'
import tableData from './tableData'
import LeaderBoard from './leaderboard'
import supabase from '@/supabase/client'
import axios from 'axios'
import { RealtimeContext } from '../test_components/RealtimeProvider'
import { data, noOfTiles } from '@/constants/users'

// if(process.env.HOST == 'DEV'){
//     console.log("DEVV")
// }else{
//     console.log("uhsudh")
// }

const page = () => {
    const { channel } = useContext(RealtimeContext)
    // const data = {
    //     0: { 
    //         pos: 0,
    //         balance:1500,
    //         properties:[]
    //     },
    //     1: { 
    //         pos: 0,
    //         balance:1500,
    //         properties:[]
    //     },
    //     2: { 
    //         pos: 0,
    //         balance:1500,
    //         properties:[]
    //     },
    //     3: { 
    //         pos: 0,
    //         balance:1500,
    //         properties:[] 
    //     },
    // }

    const [users,setUsers] = useState(data);

    const getPlayersArrayAtPosition = (pos) => {
        let arr = []
        Object.keys(users).forEach(key => {
            if (users[key].pos == pos) {
                arr.push(key)
            }
        })

        return arr
    }
    const noOfTiles = 40
    const tiles = new Array(noOfTiles).fill(0);
    const [currentUser, setCurrentUser] = useState(0)
    const [dice,setDice] = useState(Math.ceil(0))
    const [diceShow,setDiceShow] = useState(false)
    
    //Added timeoutActive to hide the button during timeout
    const [timeoutActive, setTimeoutActive] = useState(false)
    //End Turn
    const [endTurn, setEndTurn] = useState(false)
    
    const broadcastDice = async (dice) =>{

        channel.send({
            type: 'broadcast',
            event: 'dice',
            payload: { message: dice },
        })

    }

    const broadcastState = async (state) =>{

        channel.send({
            type: 'broadcast',
            event: 'state',
            payload: { message: state },
        })

    }
    
    const rollDice = async () => {
        if(endTurn){
            setCurrentUser((currentUser + 1)%4)
            setEndTurn(false)
        }
        else{
            {
                if (timeoutActive) {
                return;
            }
        
            try {
                const res = await axios.post('/api/dice',{})
                const { diceRoll1 } = await res.data;
                console.log(diceRoll1)
                let increment = diceRoll1;
                currentPos = (currentPos + increment) % noOfTiles;

                const res2 = await axios.post('/api/playerPosition',{users,currentUser})
                // let newUsersState = users
                // let currentPos = users[currentUser].pos

                // newUsersState[currentUser].pos = currentPos;

                setDice(diceRoll1);
                setDiceShow(true);
                setTimeout(() => {
                    setDiceShow(false);
                    setUsers(newUsersState);
                    setTimeoutActive(false);
                }, 2000);
        
                setTimeoutActive(true);
                setEndTurn(true);
                broadcastDice(diceRoll1);
                broadcastState(newUsersState);

            } catch (error) {
                console.error('Error fetching dice roll:', error);
                setTimeoutActive(false);
                setEndTurn(true);
            }}
        };
    }

    //Stores and changes the boarddata
    const [BoardData,setBoardData] = useState(tableData);
    //Handles the buying of properties
    const handleTransaction = async () =>{
        const currPlayerPos = users[currentUser].pos
        const currPlayerBalance = users[currentUser].balance - BoardData[currPlayerPos].cost
        const propBought = BoardData[currPlayerPos].name
        setBoardData((prevBoardData)=>({
            ...prevBoardData, [currPlayerPos]:{
                ...prevBoardData[currPlayerPos],
                buyable: false,
                owner: currentUser
            }
        }))

        setUsers((prevUsers) => ({
            ...prevUsers,
            [currentUser]: {
                ...prevUsers[currentUser],
                balance: currPlayerBalance,
                properties: [...prevUsers[currentUser].properties, propBought],
            },
        }));

        setEndTurn(true);
    }

    useEffect(()=>{
        const updateState = async () =>{
            const res1 = await axios.post('/api/setUsers',{users, admin:"player1"})
        }
        updateState();
    },[users])

    const tiles1 = tiles.slice(0,11)
    const tiles2 = tiles.slice(11,20)
    const tiles3 = tiles.slice(20,31)
    const tiles4 = tiles.slice(31,40)

    return (
        <div className='w-screen h-screen bg-violet-950 flex justify-center items-center'>

        <div className='w-[550px] h-[550px] flex flex-col'>
            <div className='w-full bg-blue-950 flex justify-between'>    
                {
                    tiles1.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index)} />
                    })
                }
            </div>
            <div className='flex justify-between flex-grow items-center relative'>
            <div className='flex  flex-col-reverse '>
                {
                    tiles4.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 31)} />
                    })
                }
            </div>
            <div>
                <button className={`bg-white text-black rounded-md px-2 absolute top-2 left-[50%] translate-x-[-50%] ${timeoutActive ? 'hidden' : ''}`} onClick={()=>{rollDice()}}>
                {endTurn?"End Turn":"Roll Dice"}</button>

                <div className='absolute top-12 left-[50%] translate-x-[-50%]'>
                    Current Player : {currentUser} <br/> Your balance: {users[currentUser].balance}
                    <br/>
                    Player {currentUser} Landed on : {BoardData[users[currentUser].pos].id} at {BoardData[users[currentUser].pos].name}
                    <br/>
                    Cost: {BoardData[users[currentUser].pos]?.cost} 
                    <br/>
                    {endTurn?
                        BoardData[users[currentUser].pos].buyable?
                        <button className={`bg-white text-black rounded-md px-2 absolute left-[50%] translate-x-[-50%] ${timeoutActive ? 'hidden' : ''}`} onClick={()=>{handleTransaction()}}>
                        Buy Property</button>
                        :"Not Buyable"
                    : ""}
                </div>
                {diceShow && <Dice dice={dice}/>} 
            </div>
                <div className='flex flex-col '>
                    {
                        tiles2.map((el, index) => {
                            return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 11)} />
                        })
                    }
                </div>
            </div>
            <div className='w-full bg-blue-950 flex flex-row-reverse justify-between'>    
                {
                    tiles3.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 20)} />
                    })
                }
            </div>
        </div>
        <LeaderBoard players={users}/>
    </div>
    )
}

export default page

//positon and broadcast using axios