export default function checkBuyable(tileKey) {
    return ![0,2,4,7,10,17,20,22,30,33,36,38].includes(tileKey);
}