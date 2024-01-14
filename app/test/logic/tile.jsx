const Tile = ({players}) =>{
    console.log(players)
    return <div className='w-full h-full bg-black border text-white'>
        {/* 
        <div className={` ${players?.includes('1') ? 'bg-red-500':''} w-[10px] h-[10px]`}></div>
        <div className={` ${players?.includes('2') ? 'bg-green-500':''} w-[10px] h-[10px]`}></div>
        <div className={` ${players?.includes('3') ? 'bg-blue-500':''} w-[10px] h-[10px]`}></div> */}
        {players?.includes('0') && <div className='bg-violet-500 p-[0.1rem] flex justify-center'>0</div>}
        {players?.includes('1') && <div className='bg-red-500 p-[0.1rem] flex justify-center'>1</div>}
        {players?.includes('2') && <div className='bg-blue-500 p-[0.1rem] flex justify-center'>2</div>}
        {players?.includes('3') && <div className='bg-green-500 p-[0.1rem] flex justify-center'>3</div>}
    </div>
}

export default Tile