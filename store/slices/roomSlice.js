"use client"
const roomSlice = (set) =>({
    gameroom:localStorage.getItem('room'),
    setGameroom:(value) => set(()=> ({gameroom:value})),
})
export default roomSlice