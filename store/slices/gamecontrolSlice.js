//const [ gamecontrol, setGameControl ] = useState({ currentTurn: true , diceRolled:false, buyable: false})

const gamecontrol = (set) =>({
    currentTurn: true,
    setCurrentTurn:() => set((state)=>({setCurrentTurn: !state.currentTurn})),
    diceRolled: false,
    setDiceRolled:() => set((state)=>({diceRolled: !state.diceRolled})),
})

export default gamecontrol