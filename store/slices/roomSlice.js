"use client"
const roomSlice = (set) =>({
    gameroom: window ?? window.localStorage.getItem('room'),
    setGameroom:(value) => set(()=> ({gameroom:value})),
})
export default roomSlice