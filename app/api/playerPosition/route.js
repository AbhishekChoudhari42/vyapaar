import redis_client from "@/lib/initRedis"
import { noOfTiles } from "@/constants/users";

export async function POST(request) {
      try {
            const {currentUser, users, diceRoll1} = await request.json()

            let currentPos = users[currentUser].pos
            currentPos = (currentPos + diceRoll1) % noOfTiles;
            let newUsersState = users
            newUsersState[currentUser].pos = currentPos;
            await redis_client.call("JSON.SET", "game", "$."+currentUser+".pos", currentPos);
            const res = JSON.stringify({newUsersState})
            return new Response(res)

      } catch (error) {
            console.error('Error in playerPosition route:', error);
            return new Response('Internal Server Error', { status: 500 });
      }
}