import redis_client from "@/lib/initRedis";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request) {
    const { origin } = new URL(request.url);
    console.log(origin, "ogn")
    const supabase = supabaseServer()
    const channel = supabase.channel('room')

    try {
        const redis = redis_client();

        const { roomID, username } = await request.json();

        let u_name = username.replace(" ", "")
        let val = { pos: 0, bal: 1500, prop: [] }
        const gameStarted = await redis.get(`gamestart:${roomID}`)
        console.log(gameStarted, "===> gameStarted")
        
        if (!parseInt(gameStarted)) {

            const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')
            
            if (currentState) {
                console.log(currentState, "===> currentState")

                if (!JSON.parse(currentState)[0][u_name] && !JSON.parse(currentState)[0].users.includes(u_name) && JSON.parse(currentState)[0].users.length <= 4) {
                    console.log("adding usser")
                    const tx = redis.multi()
                    tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}`, JSON.stringify(val))
                    tx.call('JSON.ARRAPPEND',`room:${roomID}`,'$.users',`"${u_name}"`)
                    const res = tx.exec()
                    // const res = await redis.call('JSON.SET', `room:${roomID}`, `$.${u_name}`, JSON.stringify(val))
                    redis.disconnect()
                    channel.send({
                        type: 'broadcast',
                        event: 'joinroom',
                        payload: { message: 'update state' },
                    })
                    return new Response(JSON.stringify({ res, message: 'room created', success: true }));
                }
            }

        } else {
            return new Response(JSON.stringify({ message: 'game already started', success: false }));
        }
        return new Response(JSON.stringify({ message: 'error', success: false }));
    }
    catch (error) {
        console.log(error,"error == > ")
        return new Response(JSON.stringify({ message: 'Internal Server Error', success: false }));
    }
}