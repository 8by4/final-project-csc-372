//accountRoutes.js
"use strict";
const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");


router.get("/:id", accountController.fetchUserById);

router.get("/:id/wins", accountController.fetchWins);

router.get("/:id/losses", accountController.fetchLosses);

router.post("/", accountController.createUser);

router.post("/login", accountController.loginUser);

router.post("/:id/win", accountController.addWin);

router.post("/:id/lose", accountController.addLoss);


module.exports = router;