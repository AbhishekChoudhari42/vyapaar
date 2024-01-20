import { create } from 'zustand'
import {persist,createJSONStorage} from 'zustand/middleware'
import messageSlice from './slices/messageSlice'
import roomSlice from './slices/roomSlice'
import userSlice from './slices/userSlice'
const useStore = create((...a) => ({
    ...messageSlice(...a),
    ...roomSlice(...a),
    ...userSlice(...a),
}))

export default useStore