const communityChestCards = [
  { message: "Advance to Go and collect $200", action: "position" },
  { message: "Bank error in your favor. Collect $75", action: "money", amount: 75 },
  { message: "Doctor's fees. Pay $50", action: "money", amount: -50 },
  { message: "It's your birthday. Collect $10 from each player", action: "collectFromPlayers", amount: 10 },
  { message: "You inherit $100", action: "money", amount: 100 },
];

export default communityChestCards;