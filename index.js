require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const { login, register } = require("./mongo");

app.get("/api/test", (req, res) => {
  res.send("Test");
});

app.post("/api/register", (req, res) => register(req, res));
app.post("/api/login", (req, res) => login(req, res));

app.listen(8080, () => {
  console.log("\x1b[32m✓\x1b[0m Running on port 8080!");
});
