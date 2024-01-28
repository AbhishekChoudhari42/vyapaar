import redis_client from "@/lib/initRedis";

export async function POST(request) {
    try {
        const { users, currentUser, BoardData } = await request.json();
        // console.log(currentUser);
        const currPlayerPos = users[currentUser].pos;
        const currPlayerBalance = users[currentUser].balance - BoardData[currPlayerPos].cost;
        const propBought = BoardData[currPlayerPos].name;
        const existingProp = users[currentUser].properties
        const updatedJSON = JSON.stringify({
            "balance": currPlayerBalance,
            "pos": currPlayerPos,
            "properties": [...existingProp, propBought]
        })


        await redis_client.call("JSON.SET", "game",  "$."+currentUser, updatedJSON);

        const response = {
            users,
            currentUser,
            BoardData,
            currPlayerBalance,
            propBought,
            currPlayerPos
        };

        return new Response(JSON.stringify(response));
    } catch (error) {
        console.error('Error processing buyProp request:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
