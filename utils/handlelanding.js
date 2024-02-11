import tabledata from "@/lib/constant/tabledata"
import redis_client from "@/lib/initRedis"
import rentmanager from "./rent/rentmanager";
import { checkowner, isbuyable, findowner } from "./checkowner";
import specialTiles from "./specialTiles";
 
export async function handleLanding(roomID, u_name, newPosition){
    const redis = redis_client();
    const current = await redis.call('JSON.GET', `room:${roomID}`, '$')
    const currentState = JSON.parse(current)[0]
    const currentPlayerState = currentState.gamestate[u_name];

    const landedTile = tabledata[newPosition]

    //Landedtile position => Landedtile rent => current player balance => deduct current player balance => update player's new balace => broadcast 

    if(landedTile.type === 'property' || landedTile.type === 'utility' || landedTile.type === 'railroad'){
        console.log("RENT LOGIC")
        //cur player shouldn't own(false) the tile and someone else shouldve already owned the tile(false)
        if(await checkowner(currentState.gamestate,u_name, newPosition) == false && await  isbuyable(currentState.gamestate, newPosition) == false)
        {
            const propOwner = await findowner(currentState.gamestate, currentPlayerState?.pos);
            const { newProviderBalance, newReceiverBalance } = await rentmanager(currentPlayerState,currentState, landedTile, propOwner);
            console.log(newReceiverBalance, newProviderBalance);

            const tx = redis.multi()
            tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.bal`, newProviderBalance)
            tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${propOwner}.bal`, newReceiverBalance)
            await tx.exec()
        }
    }
    else if(landedTile.type === 'tax' || landedTile.type === 'luxuryTax'){
        console.log("TAX LOGIC")
        let taxPercentage;
        landedTile.type==='tax'?taxPercentage = 5:taxPercentage = 15;
        const taxIncurred = (currentPlayerState?.bal)*taxPercentage/100;
        const updatedBalanceAfterTax = currentPlayerState?.bal - taxIncurred;
        await redis.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.bal`, updatedBalanceAfterTax)
    }
    else if(landedTile.type === "communityChest" || landedTile.type === "chance"){
        console.log("SPECIAL TILES LOGIC")
        const result = await specialTiles(currentPlayerState,currentState, landedTile?.type, u_name)
        // console.log(result.newGameState)
        if(result?.updateAll){
            await redis.call('JSON.SET', `room:${roomID}`, `$.gamestate`, JSON.stringify(result?.newGameState))
        }
        else if(result?.movePosition){
            const tx = redis.multi()
            tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.bal`, result?.newBalance)
            tx.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.pos`, result?.newPlayerPositon)
            await tx.exec()
        }
        else{
            await redis.call('JSON.SET', `room:${roomID}`, `$.gamestate.${u_name}.bal`,result?.newBalance)
        }

        console.log(result?.title, result?.message)
    }

    await redis.quit()
    // console.log(JSON.parse(currentState)[0].gamestate[u_name])
    // console.log("HANDLING LANDING",print.gamestate[u_name].pos)
}