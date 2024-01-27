export async function POST(request){
    try{
        const {currentUser,users} = await request.json();

        const taxPayer = currentUser;
        const taxPercentage = 5;
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
        console.error('Error processing buyProp request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}