import React, { useContext, useEffect, useState } from 'react'

import useStore from '@/store/store'
import { v4 as uuid } from 'uuid'
import { RealtimeContext } from './RealtimeProvider'
import { useRouter } from 'next/navigation'
const Gameboard = () => {

    const {users} = useContext(RealtimeContext)

    const { gameroom,user } = useStore()
    const router = useRouter()
    if(!gameroom){
        router.push('./joinroom')
    }

    return (
        <div className='w-[60%] bg-red-950'>
            <input type="text" onChange={(e)=>{setGameState(e.target.value)}} />
            <div className='bg-red-500 p-2 text-white'>
                {
                    Object.entries(users).map(data=>{
                        console.log(data,"==dsf")
                        return <p key={uuid()}>u : {data[1].user}</p>
                    })
                }
            </div>
        </div>
    )
}

export default Gameboard