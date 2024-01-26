import redis_client from "@/lib/initRedis";

export async function POST(request){

    const ROOMKEY = 'room'
    
    try{
        const {roomId,user,admin} = await request.json();
        const initialState = {pos:0,bal:1500,prop:[]}

        const roomExists = await redis_client.json.get(`${ROOMKEY}:${admin}_${roomId}`)
        
        if(roomExists){
            const res = await redis_client.json.set(`${ROOMKEY}:${admin}_${roomId}`,`$.${user}`,initialState)
            return new Response(JSON.stringify({message:'room joined',success:false,result:res}));
        }else{
            throw Error("Room does not exist")
        }
    }
    catch(error){
        return new Response(JSON.stringify({message:error.message,success:false,result:null}));
    }

}