import redis_client from "@/lib/initRedis";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseRealTime } from "@/lib/supabase/realtime";

export async function POST(request) {

    const supaRealTime = supabaseRealTime()
    const { roomID } = await request.json();
    const channel = supaRealTime.channel(roomID)

    try {
        // init
        const redis = redis_client();
        const supaServer = supabaseServer()

        // user data from session
        const { data } = await supaServer.auth.getUser();
        const u_name = data?.user.user_metadata.name.replace(" ", "");

        // gamestate
        const gameStateJSON = await redis.call('JSON.GET', `room:${roomID}`, '$')
        const gameState = JSON.parse(gameStateJSON)[0]

        //  check if game is present
        if (!gameState) {
            return new Response(JSON.stringify({ message: 'game not present', success: false }));
        }

        // delete game if last user is leaving else delete user
        if (gameState.users.length == 1) {
            const tx = redis.multi()
            tx.call('JSON.DEL', `room:${roomID}`, `$`)
            tx.del(`gamestart:${roomID}`)
            await tx.exec()

        } else {

            let updatedUsers = gameState.users.filter((val) => val != u_name)
            if (gameState?.gamestate[u_name]) {

                const tx = redis.multi()
                tx.call('JSON.DEL', `room:${roomID}`, `$.gamestate.${u_name}`)
                tx.call('JSON.SET', `room:${roomID}`, '$.users', JSON.stringify(updatedUsers))
                const res = await tx.exec()
            }
        }
        await redis.quit()
        await channel.send({
            type: 'broadcast',
            event: 'leaveroom',
            payload: { message: `${u_name} left the game` },
        })

        return new Response(JSON.stringify({ message: 'room left', success: true }));

    }
    catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error', success: false }));
    }
}