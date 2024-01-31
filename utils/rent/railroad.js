import { findowner } from "../checkowner";

export default async function railroadRent(currentUser,property,users,BoardData){

    const rentProvider = currentUser;
    const rentReceiver = await findowner(users, property.name);
    
    const propertiesArray = Object.values(BoardData);
    const len = propertiesArray.filter(property =>property.type === 'railroad' && property.owner == rentReceiver).length;

    const baserent = 6;
    const rent = baserent * len;
    const updatedBalanceOfProvider = users[rentProvider].balance - rent;
    const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;

    const response = {
        rent, 
        rentReceiver,
        rentProvider, 
        updatedBalanceOfProvider, 
        updatedBalanceOfReceiver
    }

    return response;
}