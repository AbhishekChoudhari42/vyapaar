//checks if the current user owns the given property
export async function checkowner(users, currentUser,property){
    if(users[currentUser]?.properties.includes(property.name)){
        return true;
    }
    return false;
}

//finds the owner of a given property
export async function findowner(gamestate, propertyname){

    for (const player in gamestate) {
        if (gamestate.hasOwnProperty(player)) {
            if (gamestate[player].prop.includes(propertyname)) {
                return player;
            }
        }
    }
    return null;
}