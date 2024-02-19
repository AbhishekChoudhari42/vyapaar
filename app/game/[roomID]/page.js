"use client"
import Gameboard from '@/components/gameboard'
import Chat from '@/components/chat'
import axios from 'axios'
import { supabaseBrowser } from '@/lib/supabase/browser'
import {useParams} from 'next/navigation'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import LeaderBoard from '@/components/leaderboard'
import Properties from '@/components/properties'

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
      return axios.get(`/api/gamestate/${roomID}`)
    },
    retry: 3,
    staleTime: 0
  })

  if (result?.data?.data?.success) {
      game_state = JSON.parse(result?.data?.data?.res)[0]
      gameState.current = game_state.gamestate
  }
  if(result.isError && roomID){
      router.push('/room')
  }

  // console.log(game_state?.current,"ihefuhew")
  // console.log(gameState?.current[game_state?.users[game_state?.current]],"RESULT")

return (   
    <div className=' max-w-[1300px] w-screen h-screen flex justify-between items-center'>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
        {result?.data?.data?.success && <Chat/>}
      </div>
      <div className='flex flex-[3] justify-center items-center'>
      {result?.data?.data?.success && <Gameboard gameState={gameState} roomID={roomID} game_state={game_state}/>}
      </div>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
        {result?.data?.data?.success && <LeaderBoard game_state={game_state}/>}
        <br/> <br/>
        {result?.data?.data?.success && <Properties currentState={gameState?.current}/>}
      </div>
    </div>
  )
}

export default page