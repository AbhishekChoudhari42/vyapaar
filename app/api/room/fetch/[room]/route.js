import redis_client from "@/lib/initRedis";

export async function GET(request,{params}){

    const ROOMKEY = 'room'
    const ROOM_ID = params?.room
    console.log(ROOM_ID,'id')
    try{
        const res = await redis_client.json.get(`${ROOMKEY}:${ROOM_ID}`)
        return new Response(JSON.stringify({message:'room fetched',success:true,data:res}));
    }
    catch(error){
        return new Response(JSON.stringify({message:error,success:false,result:null}));
    }

}