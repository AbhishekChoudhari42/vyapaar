"use client"
import Gameboard from '@/components/test_components/Gameboard'
import Chat from '@/components/test_components/Chat'
import Leaderboard from '@/components/test_components/Leaderboard'
import Properties from '@/components/test_components/Properties'
const page = () => {

    return (
        <div className='w-screen h-screen flex'>
            <Chat/>
            <Gameboard/>
            <div className='flex flex-col w-[25%] bg-blue-950'>
                <Leaderboard/>
                <Properties/>
            </div>
        </div>
    )
}
export default page