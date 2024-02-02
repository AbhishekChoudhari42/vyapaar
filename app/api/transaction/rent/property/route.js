export async function POST(request){
    try{

        const {currentUser, property,users} = await request.json()
        
        const rentProvider = currentUser;
        const rentReceiver = property.owner;
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

        return new Response(JSON.stringify(response));

    }catch (error) {
        console.error('Error processing property request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}