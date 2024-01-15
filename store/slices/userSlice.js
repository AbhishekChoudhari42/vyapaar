"use client"
import { v4 as uuid } from "uuid"
const userSlice = (set) =>({
    user:uuid().split('-')[0],
})
export default userSlice