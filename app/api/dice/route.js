import { headers } from "@/next.config";

export async function POST(request) {
    // const { data } = await request.json();
    // const diceRoll1 = 2;
    const diceRoll1 = Math.ceil(Math.random() * 6);
    const diceRoll2 = Math.ceil(Math.random() * 6);
    const diceRoll = JSON.stringify({ diceRoll1, diceRoll2 });
    return new Response(diceRoll, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
