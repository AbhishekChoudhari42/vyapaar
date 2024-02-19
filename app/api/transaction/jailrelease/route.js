import redis_client from "@/lib/initRedis";
import { supabaseRealTime } from "@/lib/supabase/realtime";

export async function POST(request){
    try{
        const { roomID } = await request.json();
        const redis = redis_client();
        const supabase = supabaseRealTime()
        const channel = supabase.channel(roomID)
        //current user's data
        const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')
        const currentStateParsed =  JSON.parse(currentState)[0];
        const currentPlayerIndex = currentStateParsed?.current;
        const currentPlayerName = currentStateParsed?.users[currentPlayerIndex];
        const newPlayer = (currentPlayerIndex+1)%(currentStateParsed?.users?.length);
        const newBalance = currentStateParsed?.gamestate[currentPlayerName]?.bal - 50;

        const injail = currentStateParsed.injail;
        console.log(injail, "INJAIL")
        const index = injail.findIndex(ele => ele === currentPlayerName);
        console.log(index, "INDEX")

        const tx = redis.multi()
        tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${currentPlayerName}.bal`, newBalance)
        tx.call('JSON.ARRPOP', `room:${roomID}`, "$.injail", index)
        tx.call('JSON.SET', `room:${roomID}`, `$.current`, newPlayer)
        await tx.exec()

        await channel.send({
            type: 'broadcast',
            event: 'jailrelease',
            payload: { message: `${currentPlayerName} released out of jail through money`},
        })

        redis.quit();

        return new Response(JSON.stringify("resp"));
    }
    catch(error){
        console.error('Error processing jail release request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}