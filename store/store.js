import { create } from 'zustand'
import messageSlice from './slices/messageSlice'
import roomSlice from './slices/roomSlice'
const useStore = create((...a) => ({
    ...messageSlice(...a),
    ...roomSlice(...a),
}))

export default useStore