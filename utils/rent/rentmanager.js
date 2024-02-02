import propertyRent from "./property";
import utilityRent from "./utility";
import railroadRent from "./railroad";

export default async function rentmanager(currentUser, property,users,BoardData,dice){

    if (property.type === 'property') {
        const {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await propertyRent(currentUser, property,users);
        return {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver};
    }
    else if(property.type == 'utility'){
        const {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await utilityRent(currentUser,property,users,BoardData,dice);
        return {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver};
    }
    else if(property.type == 'railroad'){
        const {rent, rentReceiver, rentProvider, updatedBalanceOfProvider, updatedBalanceOfReceiver} = await railroadRent(currentUser,property,users,BoardData);
        return {rent, rentProvider, rentReceiver, updatedBalanceOfProvider, updatedBalanceOfReceiver};
    }

}