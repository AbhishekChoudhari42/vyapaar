const roomSlice = (set) =>({
    gameroom:null,
    setGameroom:(value) => set(()=> ({gameroom:value})),
})
export default roomSlice