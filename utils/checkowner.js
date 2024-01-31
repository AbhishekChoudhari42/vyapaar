export async function checkowner(users, currentUser,property){
    if(users[currentUser]?.properties.includes(property.name)){
        return true;
    }
    return false;
}

export async function findowner(users, propertyname){

    for (const player in users) {
        if (users.hasOwnProperty(player)) {
            if (users[player].properties.includes(propertyname)) {
                return player;
            }
        }
    }
    return null;
}