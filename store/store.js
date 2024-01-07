import { create } from 'zustand'
import messageSlice from './slices/messageSlice'
import roomSlice from './slices/roomSlice'
import userSlice from './slices/userSlice'
const useStore = create((...a) => ({
    ...messageSlice(...a),
    ...roomSlice(...a),
    ...userSlice(...a),
}))

export default useStore