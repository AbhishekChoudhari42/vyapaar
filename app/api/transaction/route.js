export async function POST(request){

    try{
        console.log("Hitting Tranaction")
        const {BoardData,currentUser,users} = await request.json()
        const property = BoardData[users[currentUser].pos];
        
        const response = {property}
        console.log(property)
        return new Response(JSON.stringify(response))
        
    }
    catch (error) {
        console.error('Error processing transaction request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}

//Action: BuyProperty(not a function) 
//Non-action: Rent(property, utility, railroad), Tax, 