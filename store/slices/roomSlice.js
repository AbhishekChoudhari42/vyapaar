import { userData } from "@/constants/users"

const roomSlice = (set) =>({
    gameroom: null,
    setGameroom:(value) => set(()=> ({gameroom:value})),
    users:userData,
    setUsers:(value) => set(()=> ({users:value}))
})
export default roomSlice