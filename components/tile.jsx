const Tile = ({players}) =>{
    return <div className='relative w-[50px] h-[50px] bg-black/80 border border-violet-950/80  text-white'>
        <div className="absolute top-[0px] left-[0px] ">
            {players?.includes('0') && <div className='bg-pink-500 player'></div>}
        </div>
        <div className="absolute top-[0px] right-[0px]">
            {players?.includes('1') && <div className='bg-red-500 player'></div>}
        </div>
        <div className="absolute bottom-[0px] left-[0px]">
            {players?.includes('2') && <div className='bg-blue-500 player'></div>}
        </div>
        <div className="absolute bottom-[0px] right-[0px]">
            {players?.includes('3') && <div className='bg-green-500 player'></div>}
        </div>
    </div>
}

export default Tile