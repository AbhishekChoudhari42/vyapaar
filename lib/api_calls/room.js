import axios from "axios";

export async function createRoom(roomID,username){
    const res = await axios.post('/api/room/create',{roomID,username:username})
    return res.data
}