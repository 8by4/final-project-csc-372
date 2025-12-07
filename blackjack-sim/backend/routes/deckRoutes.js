"use strict";

const express = require("express");
const router = express.Router();

const deckController = require("../controllers/deckController");

router.get("/new", deckController.newDeck);
router.get("/:deckId/draw", deckController.draw);
router.get("/:deckId/shuffle", deckController.shuffle);

module.exports = router;