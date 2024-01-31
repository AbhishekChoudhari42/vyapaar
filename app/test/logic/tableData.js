const tableData = [
  { type: 'start', id: 0, name: 'GO' },
  { type: 'property', id: 1, name: 'Mediterranean Avenue', cost: 60, rent: 2, colorGroup: 'brown' },
  { type: 'communityChest', id: 2, name: 'Community Chest' },
  { type: 'property', id: 3, name: 'Baltic Avenue', cost: 60, rent: 4, colorGroup: 'brown' },
  { type: 'tax', id: 4, name: 'Income Tax' },
  { type: 'railroad', id: 5, name: 'Reading Railroad', cost: 200, owner: null, buyable: true },
  { type: 'property', id: 6, name: 'Oriental Avenue', cost: 100, rent: 6, colorGroup: 'lightBlue' },
  { type: 'chance', id: 7, name: 'Chance' },
  { type: 'property', id: 8, name: 'Vermont Avenue', cost: 100, rent: 6, colorGroup: 'lightBlue' },
  { type: 'property', id: 9, name: 'Connecticut Avenue', cost: 120, rent: 8, colorGroup: 'lightBlue' },
  { type: 'jail', id: 10, name: 'Jail' },
  { type: 'property', id: 11, name: 'St. Charles Place', cost: 140, rent: 10, colorGroup: 'pink' },
  { type: 'utility', id: 12, name: 'Electric Company', cost: 150, owner: null, buyable: true },
  { type: 'property', id: 13, name: 'States Avenue', cost: 140, rent: 10, colorGroup: 'pink' },
  { type: 'property', id: 14, name: 'Virginia Avenue', cost: 160, rent: 12, colorGroup: 'pink' },
  { type: 'railroad', id: 15, name: 'Pennsylvania Railroad', cost: 200, owner: null, buyable: true },
  { type: 'property', id: 16, name: 'St. James Place', cost: 180, rent: 14, colorGroup: 'orange' },
  { type: 'communityChest', id: 17, name: 'Community Chest' },
  { type: 'property', id: 18, name: 'Tennessee Avenue', cost: 180, rent: 14, colorGroup: 'orange' },
  { type: 'property', id: 19, name: 'New York Avenue', cost: 200, rent: 16, colorGroup: 'orange' },
  { type: 'freeParking', id: 20, name: 'Free Parking' },
  { type: 'property', id: 21, name: 'Kentucky Avenue', cost: 220, rent: 18, colorGroup: 'red' },
  { type: 'chance', id: 22, name: 'Chance' },
  { type: 'property', id: 23, name: 'Indiana Avenue', cost: 220, rent: 18, colorGroup: 'red' },
  { type: 'property', id: 24, name: 'Illinois Avenue', cost: 240, rent: 20, colorGroup: 'red' },
  { type: 'railroad', id: 25, name: 'B. & O. Railroad', cost: 200, owner: null, buyable: true },
  { type: 'property', id: 26, name: 'Atlantic Avenue', cost: 260, rent: 22, colorGroup: 'yellow' },
  { type: 'property', id: 27, name: 'Ventnor Avenue', cost: 260, rent: 22, colorGroup: 'yellow' },
  { type: 'utility', id: 28, name: 'Water Works', cost: 150, owner: null, buyable: true },
  { type: 'property', id: 29, name: 'Marvin Gardens', cost: 280, rent: 24, colorGroup: 'yellow' },
  { type: 'goToJail', id: 30, name: 'Go To Jail' },
  { type: 'property', id: 31, name: 'Pacific Avenue', cost: 300, rent: 26, colorGroup: 'green' },
  { type: 'property', id: 32, name: 'North Carolina Avenue', cost: 300, rent: 26, colorGroup: 'green' },
  { type: 'communityChest', id: 33, name: 'Community Chest' },
  { type: 'property', id: 34, name: 'Pennsylvania Avenue', cost: 320, rent: 28, colorGroup: 'green' },
  { type: 'railroad', id: 35, name: 'Short Line', cost: 200, owner: null, buyable: true },
  { type: 'chance', id: 36, name: 'Chance' },
  { type: 'property', id: 37, name: 'Park Place', cost: 350, rent: 35, colorGroup: 'blue' },
  { type: 'luxuryTax', id: 38, name: 'Luxury Tax' },
  { type: 'property', id: 39, name: 'Boardwalk', cost: 400, rent: 50, colorGroup: 'blue' }
];


export default tableData;

/*
GO/Start: 0 
Space-Time Anomaly(Jail equivalent): 10
Interstellar Rest Stop(Free parking equivalent): 20
Go to Black Hole(Go-to-jail equivalent): 30 

communityChest/Treasure: 2,17,33

chance/surprise: 7,22,36

tax: 4

luxury tax: 38


Buyables: 
Spaceport(railroad/airport equivalent): 5,15,25,35
Power Stations(working name for utility equivalent): 12,28

group/Planet 1: 1,3
group/Planet 2: 6,8,9
group/Planet 3: 11,13,14
group/Planet 4: 16,18,19
group/Planet 5: 21,23,24
group/Planet 6: 26,27,29
group/Planet 7: 31,32,34
group/Planet 8: 37,39


*/