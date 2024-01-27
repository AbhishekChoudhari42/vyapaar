export async function POST(request){
    try{
        const {currentUser,property,users,BoardData} = await request.json()

        const rentProvider = currentUser;
        const rentReceiver = property.owner;
        
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
        return new Response(JSON.stringify(response));
    }
    catch(error){
        console.error('Error processing buyProp request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}