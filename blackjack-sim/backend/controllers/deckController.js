"use strict";
const model = require("../models/deckModel");

async function newDeck(req, res) {
    try{
        const deck = await model.createNewDeck();
        res.json(deck);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Error creating deck");
    }
}

async function draw(req, res){
    try{
        const { deckId } = req.params;
        const count = parseInt(req.query.count) || 2;

        const result = await model.drawCard(deckId, count);
        res.json(result);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Error drawing cards");
    }
}

async function shuffle(req, res) {
    try {
        const { deckId } = req.params;
        const result = await model.shuffleDeck(deckId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error shuffling deck");
    }
}

module.exports = {
    newDeck,
    draw,
    shuffle
};