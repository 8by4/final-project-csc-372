//deckService.js
export async function newDeck() {
  const res = await fetch("https://final-project-csc-372.onrender.com/deck/new");
  return res.json();
}

export async function drawCards(deckId, count = 1) {
  console.log("Fetching cards:", deckId, count);
  const res = await fetch(`https://final-project-csc-372.onrender.com/deck/${deckId}/draw?count=${count}`);
  return res.json();
}

export async function shuffleDeck(deckId) {
  const res = await fetch(`https://final-project-csc-372.onrender.com/deck/${deckId}/shuffle`);
  return res.json();
}