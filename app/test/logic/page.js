"use client"
import React, { useEffect, useState, useContext } from 'react'
import Tile from './tile'
import { v4 as uuid } from 'uuid'
import Dice from './dice'
import tableData from './tableData'
import LeaderBoard from './leaderboard'
import supabase from '@/supabase/client'
import axios from 'axios'
import { RealtimeContext } from '../../../components/test_components/RealtimeProvider'
import { data, noOfTiles } from '@/constants/users'
import { Averia_Gruesa_Libre } from 'next/font/google'
import properties from '@/components/properties'
import checkBuyable from '@/utils/unbuyable'


// if(process.env.HOST == 'DEV'){
//     console.log("DEVV")
// }else{
//     console.log("uhsudh")
// }

const page = () => {
    const { channel } = useContext(RealtimeContext)

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
                if (timeoutActive) {
                    return;
                }

                try {
                    console.log(checkBuyable(users[currentUser].pos))
                    const res = await axios.post('/api/dice',{})
                    const { diceRoll1 } = await res.data;
    
                    const res1 = await axios.post('/api/playerPosition',{currentUser, users, diceRoll1});
                    const { newUsersState } =  res1.data
    
                    setUsers(newUsersState);
                    setDice(diceRoll1);
                    setDiceShow(true);
                    
                    //To hide the dice block
                    setTimeout(() => {
                        setDiceShow(false);
                        setTimeoutActive(false);
                    }, 500);
            
                    setTimeoutActive(true);
                    setEndTurn(true);
                    broadcastDice(diceRoll1);
                    broadcastState(newUsersState);

                } catch (error) {
                    console.error('Error fetching dice roll:', error);
                    setTimeoutActive(false);
                    setEndTurn(true);
                }
        };
    }

    //Stores and changes the boarddata
    const [BoardData,setBoardData] = useState(tableData);
    //Handles the buying of properties
    const handleTransaction = async () =>{

        const res = await axios.post('/api/transaction/buyprop',{users, currentUser, BoardData})
        const {currPlayerPos,currentUser:updatedCurrentUser,currPlayerBalance,propBought } = await res.data;

        setBoardData((prevBoardData)=>({
            ...prevBoardData, [currPlayerPos]:{
                ...prevBoardData[currPlayerPos],
                buyable: false,
                owner: updatedCurrentUser
            }
        }))

        setUsers((prevUsers) => ({
            ...prevUsers,
            [updatedCurrentUser]: {
                ...prevUsers[updatedCurrentUser],
                balance: currPlayerBalance,
                properties: [...prevUsers[updatedCurrentUser].properties, propBought],
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

    //To handle rent(property,utility and railroads) AND also Community Chest,Chance,Free Parking,Tax and Luxary Tax
    const [transanactionPaymentExecuted, setTransactionPaymentExecuted] = useState(false);
    useEffect(() => {

        const handleTransactionPayment = async () => {
            setTransactionPaymentExecuted(async (prevTransactionPaymentExecuted) => {

                const res = await axios.post('/api/transaction',{prevTransactionPaymentExecuted,BoardData,currentUser,users,dice})

                const { property } = await res.data;
                if (!prevTransactionPaymentExecuted) {

                    if (property.owner !== null && property.owner !== currentUser) {

                        if(property.type === 'property' || property.type === 'utility' || property.type === 'railroad'){
                            const res = await axios.post('http://localhost:3000/api/transaction/rent',{currentUser, property,users,BoardData,dice})

                            const {rent, rentReceiver, rentProvider, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await res.data

                            setUsers((prevUsers) => ({
                                ...prevUsers,
                                [rentProvider]: {
                                    ...prevUsers[rentProvider],
                                    balance: updatedBalanceOfProvider,
                                },
                                [rentReceiver]:{
                                    ...prevUsers[rentReceiver],
                                    balance: updatedBalanceOfReceiver
                                }
                            }));

                            console.log(`Player ${rentProvider} has to PAY RENT of ${rent} to Player ${rentReceiver}`);
                            console.log("Of provider: ",users[rentProvider].balance," to ", updatedBalanceOfProvider)
                            console.log("Of receiver: ",users[rentReceiver].balance," to ", updatedBalanceOfReceiver)

                        }
                        else if(property.type === 'tax' || property.type === 'luxuryTax'){
                            const res = await axios.post('/api/transaction/tax',{currentUser,users,property});
                            const {taxPayer, taxIncurred, currPlayerBalance, updatedBalanceAfterTax} = await res.data;

                            setUsers((prevUsers) => ({
                                ...prevUsers,
                                [taxPayer]: {
                                    ...prevUsers[taxPayer],
                                    balance: updatedBalanceAfterTax,
                                }
                            }));

                            console.log(`Player ${taxPayer} has to PAY TAX of ${taxIncurred}`);
                            console.log("Before tax: ",currPlayerBalance," and After tax ", updatedBalanceAfterTax)
                        }
                        else if(property.type === 'communityChest' || property.type === 'chance'){
                            console.log("Community chest or chance logic")
                            const res = await axios.post('/api/specialcards')
                            //Will impliment later
                        }
                        return true;
                    }
                    return prevTransactionPaymentExecuted; 
                }
                return prevTransactionPaymentExecuted; 
            });
        };

        handleTransactionPayment();
    }, [users]);

    useEffect(() => {
        setTransactionPaymentExecuted(false);
    }, [currentUser]);    

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

//todo: add redis set in api routes, community chest and chance routes, house logic and api