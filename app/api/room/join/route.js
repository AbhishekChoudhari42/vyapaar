import redis_client from "@/lib/initRedis";
import { NextResponse } from "next/server";

export async function POST(request){
	const { origin } = new URL(request.url);
    console.log(origin,"ogn")
    
    try{
        const redis = redis_client();
        const {roomID,username} = await request.json();
        console.log(username)
        let u_name = username.replace(" ","")
        let val = {pos:0,bal:1500,prop:[]}
        const res = await redis.call('JSON.SET',`room:${roomID}`,'$',JSON.stringify({current:0,gamestate:{[u_name]:val},users:[u_name]}))
        redis.disconnect()
        return new Response(JSON.stringify({res,message:'room created',success:true}));
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify({message:'Internal Server Error',success:false}));
    }
}