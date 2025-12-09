//accountModel.js
"use strict";
const pool = require('../models/db');

async function getUserById(user_id) {
  const queryText = "SELECT * FROM blackjack_users WHERE user_id = $1";
  const result = await pool.query(queryText, [user_id]);
  return result.rows[0];
}

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


async function loginUser(username, password) {
    const queryText = "SELECT * FROM blackjack_users WHERE username=$1 AND password=$2";
    const values = [username, password];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function addWin(user_id){
    const queryText = "UPDATE blackjack_users SET total_wins = total_wins + 1 WHERE user_id = $1 RETURNING *;";
    const values = [user_id];
    
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


async function addLoss(user_id){
    const queryText = "UPDATE blackjack_users SET total_losses = total_losses + 1 WHERE user_id = $1 RETURNING *;";
    const values = [user_id];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getUserById,
    getAllWins,
    getAllLosses,
    createAccount,
    loginUser,
    addWin,
    addLoss
}