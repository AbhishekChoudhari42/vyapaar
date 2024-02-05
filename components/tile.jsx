import { v4 } from "uuid"

const colors = [
    'bg-pink-500',
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500'
]

const Tile = ({players}) =>{
    return <div className='relative w-[50px] h-[50px] bg-black/80 border-[1px] border-white/20 flex justify-between  text-white'>
        
        <div className="flex flex-col justify-between h-full"> 
        {
            players.map((el,index)=>{
                {/* if(index%2 == 1) */}
                return <div key={v4()} className={`player ${colors[index]}`}></div>
            }
            )
        }
        </div>
        {/* <div className="flex flex-col justify-between h-full"> 
        {
            players.map((el,index)=>{
                if(index%2 == 0)
                return <div key={v4()} className={`player ${colors[1]}`}></div>
            })
        }
        </div> */}
    </div>
}

export default Tile