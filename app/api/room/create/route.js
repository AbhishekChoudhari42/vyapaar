import redis_client from "@/lib/initRedis";

export async function POST(request){
    const ROOMKEY = 'room'

    try{
        const {roomId,user} = await request.json();
        console.log(roomId)
        const initialState = {[user]:{pos:0,bal:1500,prop:[]}}
        const res = await redis_client.json.set(`${ROOMKEY}:${user}_${roomId}`,"$",initialState)

        return new Response(JSON.stringify({message:'room created',success:true,result:res}));
    }
    catch(error){
        return new Response(JSON.stringify({message:error,success:false,result:null}));
    }

}