import tabledata from "@/lib/constant/tabledata";
import { supabaseRealTime } from "@/lib/supabase/realtime";
import redis_client from "@/lib/initRedis";

export async function POST(request) {
    try {
        const { roomID } = await request.json();
        const redis = redis_client();
        const supabase = supabaseRealTime()
        const channel = supabase.channel(roomID)
        //current user's data
        const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')
        const currentStateParsed =  JSON.parse(currentState)[0];
        const currentPlayerIndex = currentStateParsed?.current;
        const currentPlayer = currentStateParsed?.users[currentPlayerIndex];
        const currentPlayerState = currentStateParsed.gamestate[currentPlayer];
        const currentTile = tabledata[currentPlayerState?.pos]
        const toUpdate = JSON.stringify({
            "bal": currentPlayerState?.bal - currentTile?.cost,
            "pos": currentPlayerState?.pos,
            "prop": [...currentPlayerState?.prop, currentTile?.name]
        })
        console.log(toUpdate)
        const resp = await redis.call("JSON.SET", `room:${roomID}`, "$.gamestate."+currentPlayer, toUpdate);

        await channel.send({
            type: 'broadcast',
            event: 'buyprop',
            payload: { message: "some prop bought" },
        })

        return new Response(JSON.stringify(resp));
    } catch (error) {
        console.error('Error processing buyProp request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
