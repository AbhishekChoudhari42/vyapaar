export async function POST(request){
    try{
        const {currentUser,property,users,BoardData,dice} = await request.json();

        const rentProvider = currentUser;
        const rentReceiver = property.owner;
        
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
        return new Response(JSON.stringify(response));
    }
    catch(error){
        console.error('Error processing buyProp request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}