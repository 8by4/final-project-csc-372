"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

async function createNewDeck() {
    try{
        const res = await fetch(`${BASE_URL}/new/shuffle/?deck_count=8`);
        return res.json();
    }
    catch(err){
        print("Failed to create deck!");
    }
}

async function drawCard(deckId, count){
    count = 1;

    try{
        const res = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`);
        return res.json();
    }
    catch(err){
        print("Failed to draw card!");
    }
}

async function shuffleDeck(deckId) {
    try{
        const res = await fetch(`${BASE_URL}/${deckId}/shuffle`);
        return res.json();
    }
    catch(err){
        print("Failed to shuffle!");
    }
}

module.exports = {
    createNewDeck,
    drawCard,
    shuffleDeck
}