"use strict";
const pool = require('../models/db');

async function getAllWins(user_id) {
    const queryText = "SELECT total_wins FROM blackjack_users WHERE user_id = $1";
    const values = [user_id];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getAllLosses(user_id) {
    const queryText = "SELECT total_losses FROM blackjack_users WHERE user_id = $1";
    const values = [user_id];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function createAccount(username, password, email) {
    const queryText =
        "INSERT INTO blackjack_users (username, password, email, total_wins, total_losses) VALUES ($1, $2, $3, 0, 0) RETURNING *";

    const values = [username, password, email];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllWins,
    getAllLosses,
    createAccount
}