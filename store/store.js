import { create } from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import messageSlice from './slices/messageSlice'
import gameStateSlice from './slices/gameStateSlice'
import userSlice from './slices/userSlice'
const useStore = create((...a) => ({
    ...messageSlice(...a),
    ...gameStateSlice(...a),
    ...userSlice(...a),
}))

export default useStore