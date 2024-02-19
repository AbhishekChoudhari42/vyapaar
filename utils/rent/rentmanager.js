import propertyRent from "./property";
import utilityRent from "./utility";
import railroadRent from "./railroad";
import { findowner } from "../checkowner";
import tabledata from "@/lib/constant/tabledata";

export default async function rentmanager(currentPlayerState,currentState, landedTile, rentReceiver){

    if (landedTile.type === 'property') {

        const rent = landedTile.rent;
        const newProviderBalance = currentPlayerState?.bal - rent;
        const newReceiverBalance = currentState?.gamestate[rentReceiver]?.bal + rent;
        return { newProviderBalance, newReceiverBalance };
    }
    else if(landedTile.type == 'utility'){
        let len = 1;
        if(currentState?.gamestate[rentReceiver]?.prop?.includes(12) && currentState?.gamestate[rentReceiver]?.prop?.includes(28)){
            let len = 2;
        }

        let rent;
        len==1?rent = dice*4:rent = dice*10
        const newProviderBalance = currentPlayerState?.bal - rent;
        const newReceiverBalance = currentState?.gamestate[rentReceiver]?.bal + rent;
        return { newProviderBalance, newReceiverBalance };
        
    }
    else if(landedTile.type == 'railroad'){
        console.log("hitting railroads")
        let len = 0;
        const receiverProps = currentState?.gamestate[rentReceiver]?.prop;
        
        receiverProps.forEach(element => {
            if(element%5 == 0 && element%10 !=0){
                len++;
            }
        });

        const baserent = 6;
        const rent = baserent * len;
        const newProviderBalance = currentPlayerState?.bal - rent;
        const newReceiverBalance = currentState?.gamestate[rentReceiver]?.bal + rent;
        return { newProviderBalance, newReceiverBalance };
    }

}