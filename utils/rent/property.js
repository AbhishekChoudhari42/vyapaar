import { findowner } from "../checkowner";

export default async function propertyRent(currentUser, property,users){
    const rentProvider = currentUser;
    const rentReceiver = await findowner(users, property.name);
    
    const rent = property.rent;
    const updatedBalanceOfProvider = users[rentProvider].balance - rent;
    const updatedBalanceOfReceiver = users[rentReceiver].balance + rent;

    const response = {
        rent,
        rentProvider,
        rentReceiver,
        updatedBalanceOfProvider,
        updatedBalanceOfReceiver
    }

    return response;
}