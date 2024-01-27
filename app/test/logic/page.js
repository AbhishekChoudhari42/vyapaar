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

                    const res = await axios.post('/api/dice',{})
                    const { diceRoll1 } = await res.data;
                    // console.log(diceRoll1)
    
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

        const res = await axios.post('/api/buyProp',{users, currentUser, BoardData})
        const {currPlayerPos,currentUser:updatedCurrentUser,currPlayerBalance,propBought } = await res.data;
        // console.log("Updated curr user", updatedCurrentUser)
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

    //To handle rent(property,utility and railroads) AND also Community Chest,Tax,Chance,Free Parking and Luxary Tax
    const [rentPaymentExecuted, setRentPaymentExecuted] = useState(false);
    useEffect(() => {
        const handleRentPayment = async () => {
            setRentPaymentExecuted((prevRentPaymentExecuted) => {

                // const res = await axios.post('/api/rent',{prevRentPaymentExecuted,})

                if (!prevRentPaymentExecuted) {
                    const property = BoardData[users[currentUser].pos];
                    if (property.owner !== null && property.owner !== currentUser) {
                        
                        if (property.type === 'property') {
                            const rentProvider = currentUser;
                            const rentReceiver = property.owner;
                            const rent = property.rent;
                            const updatedBalanceOfProvider = users[rentProvider].balance - rent;
                            const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;

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
                        else if (property.type === 'utility') {
                            // console.log("inside utility prop")
                            const rentProvider = currentUser;
                            const rentReceiver = property.owner;
                            if (property.owner === BoardData[12].owner && property.owner === BoardData[28].owner) {
                                const rent = dice*10
                                const updatedBalanceOfProvider = users[rentProvider].balance - rent;
                                const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;
                                
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
                            else if (property.owner === BoardData[12].owner || property.owner === BoardData[28].owner) {
                                const rent = dice*4
                                const updatedBalanceOfProvider = users[rentProvider].balance - rent;
                                const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;
                                
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
                        }
                        else if (property.type === 'railroad') {
                            console.log("railroad logic");
                            
                            const rentProvider = currentUser;
                            const rentReceiver = property.owner;
                            
                            const propertiesArray = Object.values(BoardData);
                            const len = propertiesArray.filter(property =>property.type === 'railroad' && property.owner == rentReceiver).length;

                            const baserent = 6;
                            const rent = baserent * len;
                            const updatedBalanceOfProvider = users[rentProvider].balance - rent;
                            const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;

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
                        else if (property.type === 'tax'){
                            const taxPayer = currentUser;
                            const taxPercentage = 5;
                            const currPlayerBalance = users[currentUser].balance
                            const taxIncurred = currPlayerBalance*taxPercentage/100
                            const updatedBalanceAfterTax = currPlayerBalance - taxIncurred;
                            console.log(taxIncurred)

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
                        else if (property.type === 'luxuryTax'){
                            const taxPayer = currentUser;
                            const taxPercentage = 15;
                            const currPlayerBalance = users[currentUser].balance
                            const taxIncurred = currPlayerBalance*taxPercentage/100
                            const updatedBalanceAfterTax = currPlayerBalance - taxIncurred;
                            console.log(taxIncurred)

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

                        return true;
                    }

                    return prevRentPaymentExecuted; 
                }
                
                return prevRentPaymentExecuted; 
            });
        };

        handleRentPayment();
    }, [users]);

    useEffect(() => {
        setRentPaymentExecuted(false);
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


//To do: search check, add rent and other transaction based routes, 