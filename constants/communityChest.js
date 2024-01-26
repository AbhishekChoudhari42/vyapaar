const communityChestCards = [
    { message: "Advance to Go and collect $200", action: "Go" },
    { message: "Bank error in your favor. Collect $75", action: "money", amount: 75 },
    { message: "Doctor's fees. Pay $50", action: "money", amount: -50 },
    { message: "Get out of Jail Free. Keep this card for when needed", action: "getOutOfJailFree" },
    { message: "It's your birthday. Collect $10 from each player", action: "collectFromPlayers", amount: 10 },
    { message: "You inherit $100", action: "money", amount: 100 },
  ];
  
  // Example of accessing a card
//   const randomCard = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
//   console.log(randomCard.message);
//   console.log("Action:", randomCard.action);
//   if (randomCard.amount) {
//     console.log("Amount:", randomCard.amount);
//   }
  