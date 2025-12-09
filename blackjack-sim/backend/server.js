//server.js

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const deckRoutes = require("./routes/deckRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use("/deck", deckRoutes);
app.use("/account", accountRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));