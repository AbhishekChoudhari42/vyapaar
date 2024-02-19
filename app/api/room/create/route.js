import redis_client from "@/lib/initRedis";
import { NextResponse } from "next/server";

export async function POST(request){
	const { origin } = new URL(request.url);
    
    try{
        const {roomID,username} = await request.json();
        const redis = redis_client();
        let u_name = username.replace(" ","")
        let val = {pos:0,bal:1500,prop:[]}

        const gameExists = await redis.exists(`room:${roomID}`)
        console.log(gameExists,"gameExists")
        if(gameExists){
            await redis.quit()
            return new Response(JSON.stringify({message:'Room exists already',success:false}));
        }

        const tx = redis.multi();
        tx.call('JSON.SET',`room:${roomID}`,'$',JSON.stringify({current:0,gamestate:{[u_name]:val},users:[u_name],injail:[]}))
        tx.set(`gamestart:${roomID}`,0)
        const res = await tx.exec()

        await redis.quit()
        return new Response(JSON.stringify({res,message:'room created',success:true}));
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify({message:'Internal Server Error',success:false}));
    }
}