const LeaderBoard = ({players}) =>{
    return (
        // <div className='bg-[#222831] w-1/5 min-h-full items-center flex flex-col justify-evenly '>
        <div className="bg-gray-800 h-[400px] w-[300px] absolute top-20 right-7 overflow-hidden">       
            LeaderBoard:
            <br/><br/>  
            <h1>Player 1: {players[0].balance}</h1>
            <h2>Player 1 Props: {players[0].properties}</h2>
            <br/>
            <h1>Player 2: {players[1].balance}</h1>
            <h2>Player 2 Props: {players[1].properties}</h2>
            <br/>
            <h1>Player 3: {players[2].balance}</h1>
            <h2>Player 1 Props: {players[2].properties}</h2>
            <br/>
            <h1>Player 4: {players[3].balance}</h1>
            <h2>Player 1 Props: {players[3].properties}</h2>
        </div>
)
}

export default LeaderBoard;