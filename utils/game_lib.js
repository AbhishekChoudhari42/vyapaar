export const getPlayersArrayAtPosition = (pos,users) => {
    let arr = []
    Object.keys(users).forEach(key => {
        if (users[key].pos == pos) {
            arr.push(key)
        }
    })
    return arr
}