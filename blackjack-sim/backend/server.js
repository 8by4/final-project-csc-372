//server.js

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors());

const deckRoutes = require("./routes/deckRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use("/deck", deckRoutes);
app.use("/account", accountRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));