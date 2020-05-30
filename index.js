require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
const {
  login,
  register,
  createItem,
  getItem,
  getPage,
  search,
  claim,
  getUser,
} = require("./mongo");

app.post("/api/register", (req, res) => register(req, res));
app.post("/api/login", (req, res) => login(req, res));
app.post("/api/item", (req, res) => createItem(req, res));
app.get("/api/item/:id", (req, res) => getItem(req, res));
app.get("/api/page/:id", (req, res) => getPage(req, res));
app.get("/api/user/:id", (req, res) => getUser(req, res));
app.post("/api/search", (req, res) => search(req, res));
app.post("/api/claim", (req, res) => claim(req, res));

if (process.env.DEPLOY === "true") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
  app.listen(80, () => {
    console.log("\x1b[32m✓\x1b[0m Running on port 80!");
  });
} else {
  app.listen(8080, () => {
    console.log("\x1b[32m✓\x1b[0m Running on port 8080!");
  });
}
