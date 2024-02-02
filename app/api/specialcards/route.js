import communityChestCards from "@/constants/communityChest";

export async function POST(request){
    const randomCard = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
    console.log(randomCard.message);
    console.log("Action:", randomCard.action);
    if (randomCard.amount) {
        console.log("Amount:", randomCard.amount);
    }
    console.log('-------------------------------')

    

    return new Response("running")
}