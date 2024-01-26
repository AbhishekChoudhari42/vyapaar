import redis_client from "@/lib/initRedis"
import { noOfTiles } from "@/constants/users";

export async function POST(request) {
      const {currentUser, users, diceRoll1} = await request.json()

      let currentPos = users[currentUser].pos
      currentPos = (currentPos + diceRoll1) % noOfTiles;
      let newUsersState = users
      newUsersState[currentUser].pos = currentPos;
      const update = redis_client.json.set('game', "$."+currentUser+".pos", currentPos);
      const res = JSON.stringify({newUsersState})
      return new Response(res)
}