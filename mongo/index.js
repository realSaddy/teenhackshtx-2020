const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:27017/${process.env.DB_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("\x1b[32m✓\x1b[0m Mongoose"))
  .catch(() => console.log("Error loading mongo!"));

const User = require("./User").User;

module.exports.register = (req, res) => {
  if (req.body.username === undefined)
    return res.status(409).json({ error: "No username provided!" });
  else if (req.body.password === undefined)
    return res.status(409).json({ error: "No username provided!" });
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then(() => res.status(201).json({ success: true }))
    .catch(() => res.status(500).json({ error: "Unable to create user!" }));
};

module.exports.login = (req, res) => {
  if (req.body.username === undefined)
    return res.status(409).json({ error: "No username provided!" });
  else if (req.body.password === undefined)
    return res.status(409).json({ error: "No username provided!" });
  User.findOne({ username: req.body.username })
    .then((doc) => doc)
    .then((doc) => {
      if (!doc) return res.status(400).json({ error: "User not found!" });
      doc.comparePassword(req.body.password, (err, success) => {
        if (err || !success)
          return res.status(400).json({ error: "Invalid password!" });
        let jwtToken = jwt.sign(
          { username: doc.username },
          process.env.SECRET,
          {
            expiresIn: "6h",
          }
        );
        res.status(202).send({ token: jwtToken, success: true });
      });
    })
    .catch(() => res.status(500).json({ error: "Unable to find user!" }));
};