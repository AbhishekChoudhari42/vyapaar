import { data } from "@/constants/users"

const roomSlice = (set) =>({
    gameroom: null,
    setGameroom:(value) => set(()=> ({gameroom:value})),
    users:data,
    setUsers:(value) => set(()=> ({users:value}))
})
export default roomSlice