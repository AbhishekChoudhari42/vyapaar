const roomSlice = (set) =>({
    gameroom: 'sfsdafds',
    setGameroom:(value) => set(()=> ({gameroom:value})),
})
export default roomSlice