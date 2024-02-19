import { create } from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import messageSlice from './slices/messageSlice'
import gameStateSlice from './slices/gameStateSlice'
import userSlice from './slices/userSlice'
import gamecontrol from './slices/gamecontrolSlice'
const useStore = create((...a) => ({
    ...persist(gamecontrol, {partialize: (state)=>({diceRolled: state.diceRolled}), storage: createJSONStorage(() => sessionStorage)})(...a),
    ...messageSlice(...a),
    ...gameStateSlice(...a),
    ...userSlice(...a),
}))

export default useStore