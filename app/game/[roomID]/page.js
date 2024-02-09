"use client"
import Gameboard from '@/components/gameboard'
import Chat from '@/components/chat'
import axios from 'axios'
import { supabaseBrowser } from '@/lib/supabase/browser'
import {useParams} from 'next/navigation'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

// import { useRouter } from 'next/dist/client/router'
const page = () => {
  
  const router = useRouter()
  const supabase = supabaseBrowser();
  const { roomID } = useParams()
  const gameState = useRef({})
  // console.log(roomID)
  let game_state;
  
  const result = useQuery({
    queryKey: ['game'],
    queryFn: async () => {
      console.log("Fetching again")
      return axios.get(`/api/gamestate/${roomID}`)
    },
    retry: 3,
    staleTime: 0
  })


  if (result?.data?.data?.success) {
      game_state = JSON.parse(result?.data?.data?.res)[0]
      // console.log(game_state.users[game_state.current]," is current player")
      gameState.current = game_state.gamestate
      // console.log(gameState.current,"gameState")
  }
  if(result.isError){
    router.push('/room')
  }

return (   
    <div className=' max-w-[1300px] w-screen h-screen flex justify-between items-center'>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
        <Chat/>
      </div>
      <div className='flex flex-[3] justify-center items-center'>
      {<Gameboard gameState={gameState} roomID={roomID} game_state={game_state}/>}
      </div>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
      </div>
    </div>
  )
}

export default page