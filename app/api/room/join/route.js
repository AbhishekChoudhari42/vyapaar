import redis_client from "@/lib/initRedis";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseRealTime } from "@/lib/supabase/realtime";

export async function POST(request) {

    const supaRealTime = supabaseRealTime()
    
    const { roomID } = await request.json();
    const channel = supaRealTime.channel(roomID)
    
    try {
        const supaServer = supabaseServer()
        
        const redis = redis_client();

        // user data from session
        const { data } = await supaServer.auth.getUser();
        const u_name = data?.user.user_metadata.name.replace(" ", "");
        // initial gamestate of user
        let val = { pos: 0, bal: 1500, prop: [] }
        const gameStarted = await redis.get(`gamestart:${roomID}`)

        // current state
        const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')

        // if game has started user cannot join
        if (parseInt(gameStarted)) {
            return new Response(JSON.stringify({ message: 'game already started', success: false }));
        }

        // if game exists
        if (currentState) {
            let game = JSON.parse(currentState)[0]

            if (!game[u_name] && !game?.users.includes(u_name) && game?.users.length <= 4) {
                const tx = redis.multi()
                tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}`, JSON.stringify(val))
                tx.call('JSON.ARRAPPEND', `room:${roomID}`, '$.users', `"${u_name}"`)
                const res = await tx.exec()
                await redis.quit()
            }
            console.log("room broadcast")
            await channel.send({
                type: 'broadcast',
                event: 'joinroom',
                payload: { message: `${u_name} joined the game` },
            })
            // channel.unsubscribe() 
            return new Response(JSON.stringify({ message: 'room joined',user:u_name, success: true }));
        }
    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error', success: false }));
    }
}