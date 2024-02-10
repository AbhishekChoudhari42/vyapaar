//checks if the current user owns the given property
export async function checkowner(gamestate, currentUser,tileKey){
    if(gamestate[currentUser]?.prop.includes(tileKey)){
        return true; //current user owns the tile
    }
    return false; // current user does not own the tile
}

//finds the owner of a given property
export async function findowner(gamestate, tileKey){

    for (const playerName in gamestate) {
        const playerProps = gamestate[playerName].prop;
            if (playerProps?.includes(tileKey)) {
                return playerName;
            }
    }
    return null;
}

export async function isbuyable(gamestate, tileKey){
    for (const playerName in gamestate) {
        const playerProps = gamestate[playerName].prop;
        if (playerProps?.includes(tileKey)) {
            return false; // Property is owned by someone else, not buyable
        }
    }
    return true; //Buyable
}