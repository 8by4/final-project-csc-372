//accountController.js
"use strict";

const model = require("../models/accountModel");

async function fetchUserById(req, res) {
  try {
    console.log("Received userId:", req.params.id);

    const userId = req.params.id;
    const user = await model.getUserById(userId);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

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

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await model.loginUser(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}


async function addWin(req, res) {
    try {
        const userId = req.params.id;
        const updatedUser = await model.addWin(userId);

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating wins");
    }
}

async function addLoss(req, res) {
    try {
        const userId = req.params.id;
        const updatedUser = await model.addLoss(userId);

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating losses");
    }
}

module.exports = {
    fetchUserById,
    fetchWins,
    fetchLosses,
    createUser,
    loginUser,
    addWin,
    addLoss
};