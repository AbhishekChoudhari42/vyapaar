import { create } from 'zustand'
import { messageSlice } from './slices/messageSlice'
const useStore = create((...a) => ({
    ...messageSlice(...a),
}))

export default useStore