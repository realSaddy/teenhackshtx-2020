const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/api/test", (req, res) => {
  res.send("Test");
});

app.listen(8080, () => {
  console.log("\x1b[32m✓\x1b[0m Running on port 8080!");
});
