import redis_client from "@/lib/initRedis";
import { supabaseServer } from "@/lib/supabase/server";
export async function GET(request,{params}){

        const supabase = supabaseServer()
        const roomID = params.id   
        const redis = redis_client()
        
        const res = await redis.call('JSON.GET',`room:${roomID}`,'$')
	    const { data } = await supabase.auth.getUser();
        
        // console.log(data?.user.user_metadata.name,"sadasdasd ... .. as as as")

        const username = data?.user.user_metadata.name.replace(" ","");
        const gamestate = JSON.parse(res)[0].gamestate
        await redis.quit()

        if(Object.keys(gamestate).includes(username)){            
            if(res){
                return new Response(JSON.stringify({res,message:'gamestate received',success:true}));
            }else{
                throw new Error('room does not exist')
            }
        }else{
            throw new Error("room not joined")
        }
        
}