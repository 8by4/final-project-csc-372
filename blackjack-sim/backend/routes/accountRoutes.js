"use strict";
const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/:id/wins", accountController.fetchWins);

router.get("/:id/losses", accountController.fetchLosses);

router.post("/", accountController.createUser);

module.exports = router;