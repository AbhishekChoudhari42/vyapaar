const tabledata = {
    0: {
      type: "start",
      name: "Space Gate"
    },
    1: {
      type: "property",
      name: "Mercury Station",
      cost: 60,
      rent: 2,
      colorGroup: "red"
    },
    2: {
      type: "communityChest",
      name: "Meteor Shower"
    },
    3: {
      type: "property",
      name: "Venus Habitat",
      cost: 60,
      rent: 4,
      colorGroup: "red"
    },
    4: {
      type: "tax",
      name: "Black Hole Tax"
    },
    5: {
      type: "railroad",
      name: "Galaxy Express",
      cost: 200
    },
    6: {
      type: "property",
      name: "Mars Outpost",
      cost: 100,
      rent: 6,
      colorGroup: "yellow"
    },
    7: {
      type: "chance",
      name: "Space Debris"
    },
    8: {
      type: "property",
      name: "Jupiter Base",
      cost: 100,
      rent: 6,
      colorGroup: "yellow"
    },
    9: {
      type: "property",
      name: "Saturn Rings",
      cost: 120,
      rent: 8,
      colorGroup: "yellow"
    },
    10: {
      type: "jail",
      name: "Asteroid Jail"
    },
    11: {
      type: "property",
      name: "Uranus Colony",
      cost: 140,
      rent: 10,
      colorGroup: "green"
    },
    12: {
      type: "utility",
      name: "Solar Power Station",
      cost: 150
    },
    13: {
      type: "property",
      name: "Neptune Outpost",
      cost: 140,
      rent: 10,
      colorGroup: "green"
    },
    14: {
      type: "property",
      name: "Pluto Settlement",
      cost: 160,
      rent: 12,
      colorGroup: "green"
    },
    15: {
      type: "railroad",
      name: "Interstellar Railway",
      cost: 200
    },
    16: {
      type: "property",
      name: "Milky Way Resort",
      cost: 180,
      rent: 14,
      colorGroup: "blue"
    },
    17: {
      type: "communityChest",
      name: "Space Exploration Fund"
    },
    18: {
      type: "property",
      name: "Andromeda Oasis",
      cost: 180,
      rent: 14,
      colorGroup: "blue"
    },
    19: {
      type: "property",
      name: "Orion Outpost",
      cost: 200,
      rent: 16,
      colorGroup: "blue"
    },
    20: {
      type: "freeParking",
      name: "Space Nebula"
    },
    21: {
      type: "property",
      name: "Comet Fields",
      cost: 220,
      rent: 18,
      colorGroup: "purple"
    },
    22: {
      type: "chance",
      name: "Wormhole Encounter"
    },
    23: {
      type: "property",
      name: "Asteroid Belt",
      cost: 220,
      rent: 18,
      colorGroup: "purple"
    },
    24: {
      type: "property",
      name: "Nova Cluster",
      cost: 240,
      rent: 20,
      colorGroup: "purple"
    },
    25: {
      type: "railroad",
      name: "Cosmic Commuter",
      cost: 200
    },
    26: {
      type: "property",
      name: "Black Hole Retreat",
      cost: 260,
      rent: 22,
      colorGroup: "orange"
    },
    27: {
      type: "property",
      name: "Nebula Nexus",
      cost: 260,
      rent: 22,
      colorGroup: "orange"
    },
    28: {
      type: "utility",
      name: "Quantum Generator",
      cost: 150
    },
    29: {
      type: "property",
      name: "Supernova Shelter",
      cost: 280,
      rent: 24,
      colorGroup: "orange"
    },
    30: {
      type: "goToJail",
      name: "Wormhole Exit"
    },
    31: {
      type: "property",
      name: "Star Cluster Estates",
      cost: 300,
      rent: 26,
      colorGroup: "pink"
    },
    32: {
      type: "property",
      name: "Nebula Haven",
      cost: 300,
      rent: 26,
      colorGroup: "pink"
    },
    33: {
      type: "communityChest",
      name: "Alien Encounter"
    },
    34: {
      type: "property",
      name: "Galactic Empire",
      cost: 320,
      rent: 28,
      colorGroup: "pink"
    },
    35: {
      type: "railroad",
      name: "Space Shuttle",
      cost: 200
    },
    36: {
      type: "chance",
      name: "Hyperdrive Activation"
    },
    37: {
      type: "property",
      name: "Cosmic Citadel",
      cost: 350,
      rent: 35,
      colorGroup: "yellow"
    },
    38: {
      type: "luxuryTax",
      name: "Meteor Storm Tax"
    },
    39: {
      type: "property",
      name: "Galactic Dominion",
      cost: 400,
      rent: 50,
      colorGroup: "yellow"
    }
  }
  

export default tabledata;

/*const tableData = [
    { type: 'start', id: 0, name: 'GO' },
    { type: 'property', id: 1, name: 'Mediterranean Avenue', cost: 60, rent: 2, colorGroup: 'brown' },
    { type: 'communityChest', id: 2, name: 'Community Chest' },
    { type: 'property', id: 3, name: 'Baltic Avenue', cost: 60, rent: 4, colorGroup: 'brown' },
    { type: 'tax', id: 4, name: 'Income Tax' },
    { type: 'railroad', id: 5, name: 'Reading Railroad', cost: 200, owner: null },
    { type: 'property', id: 6, name: 'Oriental Avenue', cost: 100, rent: 6, colorGroup: 'lightBlue' },
    { type: 'chance', id: 7, name: 'Chance' },
    { type: 'property', id: 8, name: 'Vermont Avenue', cost: 100, rent: 6, colorGroup: 'lightBlue' },
    { type: 'property', id: 9, name: 'Connecticut Avenue', cost: 120, rent: 8, colorGroup: 'lightBlue' },
    { type: 'jail', id: 10, name: 'Jail' },
    { type: 'property', id: 11, name: 'St. Charles Place', cost: 140, rent: 10, colorGroup: 'pink' },
    { type: 'utility', id: 12, name: 'Electric Company', cost: 150, owner: null },
    { type: 'property', id: 13, name: 'States Avenue', cost: 140, rent: 10, colorGroup: 'pink' },
    { type: 'property', id: 14, name: 'Virginia Avenue', cost: 160, rent: 12, colorGroup: 'pink' },
    { type: 'railroad', id: 15, name: 'Pennsylvania Railroad', cost: 200, owner: null },
    { type: 'property', id: 16, name: 'St. James Place', cost: 180, rent: 14, colorGroup: 'orange' },
    { type: 'communityChest', id: 17, name: 'Community Chest' },
    { type: 'property', id: 18, name: 'Tennessee Avenue', cost: 180, rent: 14, colorGroup: 'orange' },
    { type: 'property', id: 19, name: 'New York Avenue', cost: 200, rent: 16, colorGroup: 'orange' },
    { type: 'freeParking', id: 20, name: 'Free Parking' },
    { type: 'property', id: 21, name: 'Kentucky Avenue', cost: 220, rent: 18, colorGroup: 'red' },
    { type: 'chance', id: 22, name: 'Chance' },
    { type: 'property', id: 23, name: 'Indiana Avenue', cost: 220, rent: 18, colorGroup: 'red' },
    { type: 'property', id: 24, name: 'Illinois Avenue', cost: 240, rent: 20, colorGroup: 'red' },
    { type: 'railroad', id: 25, name: 'B. & O. Railroad', cost: 200, owner: null },
    { type: 'property', id: 26, name: 'Atlantic Avenue', cost: 260, rent: 22, colorGroup: 'yellow' },
    { type: 'property', id: 27, name: 'Ventnor Avenue', cost: 260, rent: 22, colorGroup: 'yellow' },
    { type: 'utility', id: 28, name: 'Water Works', cost: 150, owner: null },
    { type: 'property', id: 29, name: 'Marvin Gardens', cost: 280, rent: 24, colorGroup: 'yellow' },
    { type: 'goToJail', id: 30, name: 'Go To Jail' },
    { type: 'property', id: 31, name: 'Pacific Avenue', cost: 300, rent: 26, colorGroup: 'green' },
    { type: 'property', id: 32, name: 'North Carolina Avenue', cost: 300, rent: 26, colorGroup: 'green' },
    { type: 'communityChest', id: 33, name: 'Community Chest' },
    { type: 'property', id: 34, name: 'Pennsylvania Avenue', cost: 320, rent: 28, colorGroup: 'green' },
    { type: 'railroad', id: 35, name: 'Short Line', cost: 200, owner: null },
    { type: 'chance', id: 36, name: 'Chance' },
    { type: 'property', id: 37, name: 'Park Place', cost: 350, rent: 35, colorGroup: 'blue' },
    { type: 'luxuryTax', id: 38, name: 'Luxury Tax' },
    { type: 'property', id: 39, name: 'Boardwalk', cost: 400, rent: 50, colorGroup: 'blue' }
  ];
  
  
export default tableData;


const tax = [4, 38];
const start = [0];
const property = [1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 37, 39];
const railroad = [5, 15, 25, 35];
const utility = [12, 28];

const communityChest = [2, 17, 33];
const chance = [7, 22, 36];
const jail = [10];
const freeParking = [20];
const goToJail = [30];
const luxuryTax = [38];

// Consolidated object for easy reference
const tileTypes = {
  tax, x
  start, 
  property, x
  communityChest, x
  railroad, x
  chance, x
  jail,
  utility,x 
  freeParking, 
  goToJail, 
  luxuryTax x
};

*/  