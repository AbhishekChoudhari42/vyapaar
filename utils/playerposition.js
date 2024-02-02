// import redis_client from "@/lib/initRedis"
import { noOfTiles } from "@/constants/users";

export default async function playerPosition(currentUser, users, diceRoll1){

    let currentPos = users[currentUser].pos
    currentPos = (currentPos + diceRoll1) % noOfTiles;
    let newUsersState = users
    newUsersState[currentUser].pos = currentPos;

    return newUsersState
    
}