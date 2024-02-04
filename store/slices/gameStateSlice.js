import { data } from "../../lib/constant/users"

const gameStateSlice = (set) =>({
    roomID: null,
    setRoomID:(value) => set(()=> ({setRoomID:value})),
    gameState:data,
    setGameState:(value) => set(()=> ({gameState:value}))
})
export default gameStateSlice