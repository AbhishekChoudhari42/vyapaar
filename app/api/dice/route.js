import { supabaseServer } from "@/lib/supabase/server";
import { supabaseRealTime } from "@/lib/supabase/realtime";
import { headers } from "@/next.config";
import redis_client from "@/lib/initRedis";
import { handleLanding } from "@/utils/handlelanding";

export async function POST(request) {
    const { roomID } = await request.json();
    // const diceRoll1 = 0;
    // const diceRoll2 = 0;
    const diceRoll1 = Math.ceil(Math.random() * 6);
    const diceRoll2 = Math.ceil(Math.random() * 6);
    const diceRollSum = (diceRoll1+diceRoll2);
    
    const supabase = supabaseRealTime()
    const channel = supabase.channel(roomID)
    const supabaseServerHandler = supabaseServer();
    const { data } = await supabaseServerHandler.auth.getUser();
    // console.log(data.user.user_metadata.name.replace(" ",""));
    const u_name = data.user.user_metadata.name.replace(" ","");

    const redis = redis_client();
    //current user's data
    const currentState = await redis.call('JSON.GET', `room:${roomID}`, '$')

    // console.log(prevPosition)

    const currentPlayer =  JSON.parse(currentState)[0].current;
    const newPlayer = (currentPlayer+1)%(JSON.parse(currentState)[0].users?.length);


    if(JSON.parse(currentState)[0].users[currentPlayer] == u_name){

        if(JSON.parse(currentState)[0].injail?.includes(u_name)){

            if(diceRoll1 == diceRoll2){
                console.log("Same dice rolls")
                const index = JSON.parse(currentState)[0].injail?.findIndex(ele => ele === u_name);
                const prevPosition = JSON.parse(currentState)[0].gamestate[u_name].pos
                const newPosition = (prevPosition + diceRollSum)%40;
                // setting new position
                const tx = redis.multi()
                tx.call('JSON.ARRPOP', `room:${roomID}`, "$.injail", index) 
                tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.pos`, newPosition)
                await tx.exec()
        
                await redis.quit()
                await channel.send({
                    type: 'broadcast',
                    event: 'jailrelease',
                    payload: { message: `${u_name} released out of jail through luck`},
                })
            }
            else{
                console.log("better luck next time")
            }
        }
        else{
            console.log("OUT OF JAIL")
            const prevPosition = JSON.parse(currentState)[0].gamestate[u_name].pos
            const newPosition = (prevPosition + diceRollSum)%40;
            // setting new position
            
            await redis.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.pos`, newPosition)
            // tx.call('JSON.SET', `room:${roomID}`, `$.current`, newPlayer)
    
            await redis.quit()
            
            await channel.send({
                type: 'broadcast',
                event: 'dice',
                payload: { message: diceRollSum ,user:u_name},
            })
    
            handleLanding(roomID, u_name,newPosition)
    
        }
    }
    else{
        return new Response({message:"Wait for your turn",success:false});
    }

    return new Response(JSON.stringify({message:"player position changed",success:true,diceRoll:{ diceRoll1, diceRoll2 }}));

}

//Add non-action action