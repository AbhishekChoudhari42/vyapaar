import { headers } from "@/next.config";

export async function GET(Request){
    
    const diceRoll1 = Math.ceil(Math.random()*6);
    const diceRoll2 = Math.ceil(Math.random()*6);
    const diceRoll = JSON.stringify({diceRoll1, diceRoll2})
    
    return new Response(diceRoll, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}