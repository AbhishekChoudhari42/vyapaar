"use client"
import React, { useEffect, useState } from 'react'
import Tile from './tile'
import { v4 as uuid } from 'uuid'
import LeaderBoard from './leaderboard'
import supabase from '@/supabase/client'
import { userData } from '@/constants/users'
import { getPlayersArrayAtPosition } from '@/utils/game_lib'

const page = () => {

    const [users,setUsers] = useState(userData);
    const noOfTiles = 40
    const tiles = new Array(noOfTiles).fill(0);
    const tiles1 = tiles.slice(0,11)
    const tiles2 = tiles.slice(11,20)
    const tiles3 = tiles.slice(20,31)
    const tiles4 = tiles.slice(31,40)

    return (
        <div className='w-[550px] h-[550px] flex flex-col'>
            {/* tiles 1 */}
            <div className='w-full flex justify-between'>    
                {
                  tiles1.map((el, index) => {
                    return <Tile key={uuid()} players={getPlayersArrayAtPosition(index,users)} />
                  })
                }
            </div>

            {/* tiles 1 */}
            <div className='flex justify-between flex-grow relative'>
            <div className='flex  flex-col-reverse justify-between'>
                {
                    tiles4.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 31,users)} />
                    })
                }
            </div>
            <div>
               dice
            </div>
                <div className='flex flex-col justify-between'>
                    {
                        tiles2.map((el, index) => {
                            return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 11,users)} />
                        })
                    }
                </div>
            </div>
            <div className='w-full flex flex-row-reverse justify-between'>    
                {
                    tiles3.map((el, index) => {
                        return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 20,users)} />
                    })
                }
            </div>
        </div>
    )
}

export default page