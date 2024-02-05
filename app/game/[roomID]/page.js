"use client"
import Gameboard from '@/components/gameboard'
import Chat from '@/components/chat'
import axios from 'axios'
import { supabaseBrowser } from '@/lib/supabase/browser'
import {useParams} from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

// import { useRouter } from 'next/dist/client/router'
const page = () => {
  
  const router = useRouter()
  const supabase = supabaseBrowser();
  const { roomID } = useParams()
  const gameState = useRef({})
  console.log(roomID)
  
  const result = useQuery({
    queryKey: ['game'],
    queryFn: async () => {
      return axios.get(`/api/gamestate/${roomID}`)
    },
    retry: 3,
    staleTime: 10
  })

  if (result?.data?.data?.success) {
      const game_state = JSON.parse(result?.data?.data?.res)[0].gamestate
      gameState.current = game_state
      console.log(gameState.current)
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
      {<Gameboard gameState={gameState}/>}
      </div>
      <div className='flex-1 border-[1px] border-white/30 h-screen'>
      </div>
    </div>
  )
}

export default page