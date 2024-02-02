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
    const jsonString = JSON.stringify(value);

    try {
        const res = await redis_client.call("JSON.SET", "game", "$", jsonString);
        return new Response(JSON.stringify(res));
    } catch (error) {
        console.error('Error setting JSON in Redis:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}