import redis_client from "@/lib/initRedis";
import { supabaseRealTime } from "@/lib/supabase/realtime";

export async function POST(request){

    const { roomID } = await request.json();
    const redis = redis_client();
    const supabase = supabaseRealTime()
    const channel = supabase.channel(roomID)
    //current user's data
    const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')

    const currentPlayer =  JSON.parse(currentState)[0].current;
    const newPlayer = (currentPlayer+1)%(JSON.parse(currentState)[0].users?.length);
    await redis.call('JSON.SET', `room:${roomID}`, `$.current`, newPlayer)

    await channel.send({
        type: 'broadcast',
        event: 'endturn',
        payload: { message: "turn ended" },
    })

    await redis.quit()
    return new Response("END TURN")
}