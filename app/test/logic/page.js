"use client"
import React, { useEffect, useState } from 'react'
import Tile from './tile'
import { v4 as uuid } from 'uuid'
import Dice from './dice'

const page = () => {

    const data = {
        0: { pos: 0 },
        1: { pos: 1 },
        2: { pos: 2 },
        3: { pos: 3 },
    }

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
    useEffect(()=>{
        setDice(Math.ceil(Math.random()*6))
    },[])
    const rollDice = () =>{
        let newUsersState = users
        let currentPos = users[currentUser].pos
        let increment = Math.ceil(Math.random()*6)

        currentPos = (currentPos + dice)%noOfTiles
        newUsersState[currentUser].pos = currentPos

        setDiceShow(true)
        setTimeout(() => {
            setDiceShow(false)
            setDice(increment)
            setUsers(newUsersState)
            setCurrentUser((currentUser + 1)%4)
        }, 2000);

    }
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
            <button className='bg-white text-black rounded-md px-2 absolute top-2 left-[50%] translate-x-[-50%]' onClick={()=>{rollDice()}}>roll dice</button>
            <div className='absolute top-12 left-[50%] translate-x-[-50%]'>
               Current Player : {currentUser} 
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
    </div>
    )
}

export default page