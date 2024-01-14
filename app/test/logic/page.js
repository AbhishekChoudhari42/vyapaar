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
    const noOfTiles = 20
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
        }, 2000);

        setCurrentUser((currentUser + 1)%4)
    }
    return (
        <div>
            <button className='bg-white text-black' onClick={()=>{rollDice()}}>roll dice</button>
            current player is :- {currentUser}
            dice : {dice}
            {diceShow && <Dice dice={dice}/>} 
            <div className='w-screen bg-blue-950 h-[200px] flex justify-between'>
                {
                    tiles.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index)} />
                    })
                }
            </div>
        </div>
    )
}

export default page