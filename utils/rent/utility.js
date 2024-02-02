import { findowner } from "../checkowner";

export default async function utilityRent(currentUser,property,users,BoardData,dice){
    const rentProvider = currentUser;
    const rentReceiver = await findowner(users, property.name);
    
    const propertiesArray = Object.values(BoardData);
    const len = propertiesArray.filter(property =>property.type === 'utility' && property.owner == rentReceiver).length;
    
    let rent;
    len==1?rent = dice*4:rent = dice*10

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