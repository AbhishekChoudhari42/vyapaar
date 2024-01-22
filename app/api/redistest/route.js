import redis_client from "@/lib/initRedis";

export async function POST(request){
    console.log("resttt")
    const value = {
        0: { 
            pos: 0,
            balance:1500,
            properties:[]    
        },
        1: { 
            pos: 0,
            balance:1500,
            properties:[]
        },
        2: { 
            pos: 0,
            balance:1500,
            properties:[]
        },
        3: {
            pos: 0,
            balance:1500,   
            properties:[] 
        },
    }
    const res = await redis_client.json.get('game', "$."+1);
    // const res = redis_client.json.set('game', "$", value);
    // const {key,value} = await request.json();
    // const res = await redis_client.json.set(key,value)
    return new Response(JSON.stringify(res));
}