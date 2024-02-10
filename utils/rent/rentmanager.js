import propertyRent from "./property";
import utilityRent from "./utility";
import railroadRent from "./railroad";
import { findowner } from "../checkowner";

export default async function rentmanager(currentPlayerState,currentState, landedTile, rentReceiver){

    if (landedTile.type === 'property') {

        const rent = landedTile.rent;
        const newProviderBalance = currentPlayerState?.bal - rent;
        const newReceiverBalance = currentState?.gamestate[rentReceiver]?.bal + rent;
        return { newProviderBalance, newReceiverBalance };
    }
    // else if(property.type == 'utility'){
        // const {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await utilityRent(currentUser,property,users,BoardData,dice);
        // return {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver};
    // }
    // else if(property.type == 'railroad'){
    //     // const {rent, rentReceiver, rentProvider, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await railroadRent(currentUser,property,users,BoardData);
    //     // return {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver};
    // }

}