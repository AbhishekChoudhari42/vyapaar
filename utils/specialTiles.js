import communityChestCards from "@/lib/constant/communityChest";
import chanceCards from "@/lib/constant/chanceCards";
import axios from 'axios'

export default async function specialTiles(currentPlayerState,currentState, landedTileType, u_name){
    const randomCardNumber = Math.ceil(Math.random() * 7)
    // const randomCardNumber = 5
    if(landedTileType === "communityChest"){

        const prevBalance = currentPlayerState?.bal;
        const randomCard = communityChestCards[randomCardNumber];
        const newBalance = prevBalance + randomCard?.amount;
        const title = randomCard?.title
        const message = randomCard?.message

        if(randomCardNumber == 4 || randomCardNumber == 7){
            currentState?.users.forEach((user) => {
                if(user != u_name){
                    currentState.gamestate[user].bal -= randomCard?.amount;
                }
            });
            currentState.gamestate[u_name].bal += randomCard?.amount * (currentState?.users?.length - 1);
            const newGameState = currentState.gamestate;
            return {title, message, newGameState, updateAll: true, movePosition: false, updateBalance: true}
        }
        if(randomCardNumber == 5){
            const newPlayerPositon = currentPlayerState?.pos+(Math.ceil(Math.random() * 6));
            return {newBalance, title, message, newPlayerPositon, updateAll: false, movePosition: true, updateBalance: true}
        }

        return {newBalance, title, message, updateAll: false, movePosition: false, updateBalance: true}
    }
    else{
        const prevBalance = currentPlayerState?.bal;
        const randomCard = chanceCards[randomCardNumber]
        const newBalance = prevBalance + randomCard?.amount;
        const title = randomCard?.title
        const message = randomCard?.message

        if(randomCardNumber == 2 || randomCardNumber == 3){
            const newPlayerPositon = currentPlayerState?.pos+(Math.ceil(Math.random() * 12));
            // const newPlayerPositon = await axios.post("/api/dice",{roomID});
            return {title, message, newPlayerPositon, updateAll: false, movePosition: true, updateBalance: false};
        }
        if(randomCardNumber == 7){
            const newPlayerPositon = 10;  
            return {title, message, newPlayerPositon, updateAll: false, movePosition: true, updateBalance: false} 
        }
        if(randomCardNumber == 5){
            currentState?.users.forEach((user) => {
                if(user != u_name){
                    currentState.gamestate[user].bal -= randomCard?.amount;
                }
            });
            currentState.gamestate[u_name].bal += randomCard?.amount * (currentState?.users?.length - 1);
            const newGameState = currentState.gamestate;
            return {title, message, newGameState, updateAll: true, movePosition: false, updateBalance: true}
        }

        return {newBalance, title, message, updateAll: false, movePosition: false, updateBalance: true}
    }
}