//deckService.js
export async function newDeck() {
  const res = await fetch("http://localhost:5000/deck/new");
  return res.json();
}

export async function drawCards(deckId, count = 1) {
  const res = await fetch(`http://localhost:5000/deck/${deckId}/draw?count=${count}`);
  return res.json();
}

export async function shuffleDeck(deckId) {
  const res = await fetch(`http://localhost:5000/deck/${deckId}/shuffle`);
  return res.json();
}