"use strict";

const model = require("../models/accountModel");

async function fetchWins(req, res) {
    try {
        const userId = req.params.id;
        const wins = await model.getAllWins(userId);

        if (!wins) {
            return res.status(404).send("User not found");
        }

        res.json(wins);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving wins");
    }
}


async function fetchLosses(req, res) {
    try {
        const userId = req.params.id;
        const losses = await model.getAllLosses(userId);

        if (!losses) {
            return res.status(404).send("User not found");
        }

        res.json(losses);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving losses");
    }
}

async function createUser(req, res) {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).send("Missing required fields");
        }

        const newUser = await model.createAccount(username, password, email);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating account");
    }
}


module.exports = {
    fetchWins,
    fetchLosses,
    createUser,
};