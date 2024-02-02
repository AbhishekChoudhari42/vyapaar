export async function POST(request){
    try{
        const {currentUser,users,property} = await request.json();

        let taxPercentage;
        property.type==='tax'?taxPercentage = 5:taxPercentage = 15;

        const taxPayer = currentUser;
        const currPlayerBalance = users[currentUser].balance
        const taxIncurred = currPlayerBalance*taxPercentage/100
        const updatedBalanceAfterTax = currPlayerBalance - taxIncurred;

        const response = {
            taxPayer,
            taxIncurred,
            currPlayerBalance,
            updatedBalanceAfterTax
        }

        return new Response(JSON.stringify(response));
    }
    catch(error){
        console.error('Error processing tax request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}