"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Tile from './tile'
import Controls from './controls'
import { useParams } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { getPlayersArrayAtPosition } from '@/utils/game_lib'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { data } from '@/lib/constant/users'
import axios from 'axios'
import useUser from '@/hooks/useUser'

const GameBoard = ({gameState, roomID,game_state}) => {

  //show controls logic:
  const user = useUser();
  const username = user?.data?.display_name.replace(" ","");
  const currentPlayer = game_state?.users[game_state.current];
  // console.log("USERNAME",username," curr player: ", currentPlayer)

  const noOfTiles = 40
  const [tiles, setTiles] = useState(new Array(noOfTiles).fill(0))
  // console.log(game_state.current,"all players")
  const tiles1 = tiles.slice(0, 11)
  const tiles2 = tiles.slice(11, 20)
  const tiles3 = tiles.slice(20, 31)
  const tiles4 = tiles.slice(31, 40)

  return (
    <div className='w-[550px] h-[550px] flex flex-col'>
      <div className='w-full flex justify-between'>
        {
          tiles1.map((el, index) => {
            return <Tile key={uuid()} players={getPlayersArrayAtPosition(index, gameState.current)} />
          })
        }
      </div>
      <div className='flex justify-between flex-grow relative'>
        <div className='flex  flex-col-reverse justify-between'>
          {
            tiles4.map((el, index) => {
              return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 31, gameState.current)} />
            })
          }
        </div>

        {currentPlayer==username?<Controls roomID={roomID} gameState={gameState} game_state={game_state}/>:""}

        <div className='flex flex-col justify-between'>
          {
            tiles2.map((el, index) => {
              return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 11, gameState.current)} />
            })
          }
        </div>
      </div>

      <div className='w-full flex flex-row-reverse justify-between'>
        {
          tiles3.map((el, index) => {
            return <Tile key={uuid()} players={getPlayersArrayAtPosition(index + 20, gameState.current)} />
          })
        }
      </div>
    </div>
  )
}

export default GameBoard