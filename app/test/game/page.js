"use client"
import Gameboard from '../test_components/Gameboard'
import Chat from '../test_components/Chat'
import Leaderboard from '../test_components/Leaderboard'
import Properties from '../test_components/Properties'
const Page = () => {

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
export default Page