export async function taxmanager(currentUser,users,property){
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

    return response
}