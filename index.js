require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const {
  login,
  register,
  createItem,
  getItem,
  getPage,
  myItems,
  search,
} = require("./mongo");

app.post("/api/register", (req, res) => register(req, res));
app.post("/api/login", (req, res) => login(req, res));
app.post("/api/item", (req, res) => createItem(req, res));
app.post("/api/item/:id", (req, res) => getItem(req, res));
app.post("/api/page/:id", (req, res) => getPage(req, res));
app.post("/api/my_items", (req, res) => myItems(req, res));
app.post("/api/search", (req, res) => search(req, res));

app.listen(8080, () => {
  console.log("\x1b[32m✓\x1b[0m Running on port 8080!");
});
