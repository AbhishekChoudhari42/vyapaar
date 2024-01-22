import redis_client from "@/lib/initRedis";

export async function POST(request){
    console.log("resttt")
    const {key,value} = await request.json();
    const res = await redis_client.json.set(key,value)
    return new Response(JSON.stringify(res));
}