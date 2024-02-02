export default function checkBuyable(array, propId) {
    const arr = [...array];
    return !arr.includes(propId);
}