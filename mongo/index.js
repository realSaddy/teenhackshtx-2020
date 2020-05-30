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
const Item = require("./Item").Item;

module.exports.register = (req, res) => {
  if (req.body.username === undefined)
    return res.status(409).json({ error: "No username provided!" });
  else if (req.body.password === undefined)
    return res.status(409).json({ error: "No password provided!" });
  else if (req.body.phoneNumber === undefined)
    return res.status(409).json({ error: "No phone number provided! " });
  User.create({
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  })
    .then(() => {
      let jwtToken = jwt.sign(
        { username: req.body.username },
        process.env.SECRET,
        {
          expiresIn: "6h",
        }
      );
      res.status(202).send({ token: jwtToken, success: true });
    })
    .catch(() => res.status(500).json({ error: "Unable to create user!" }));
};

module.exports.login = (req, res) => {
  if (req.body.username === undefined)
    return res.status(409).json({ error: "No username provided!" });
  else if (req.body.password === undefined)
    return res.status(409).json({ error: "No password provided!" });
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

module.exports.createItem = (req, res) => {
  if (req.body.name === undefined)
    return res.status(409).json({ error: "No name provided!" });
  jwt.verify(
    req.header("Authorization"),
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.status(401).json({ error: "JWT not verified" });
      User.findOne({ username: decoded.username })
        .then((doc) => doc)
        .then((doc) => {
          Item.create({
            name: req.body.name,
            owner: doc._id,
            description: req.body.description || null,
          })
            .then((item) => {
              doc.owner.push(item._id);
              doc.save();
              res.status(201).json({ success: true, id: item._id });
            })
            .catch(() =>
              res.status(500).json({ error: "Error creating item!" })
            );
        });
    }
  );
};

module.exports.getItem = (req, res) => {
  if (req.params.id === undefined)
    return res.status(409).json({ error: "No id provided!" });
  Item.findById(req.params.id)
    .populate("owner")
    .populate("taker")
    .then((doc) => doc)
    .then((doc) => {
      if (!doc) return res.status(404).json({ error: "No item found!" });
      else if (doc.taker !== undefined)
        return res.status(200).json({
          name: doc.name,
          owner: doc.owner.username,
          taker: doc.taker.username,
        });
      else
        return res.status(200).json({
          name: doc.name,
          owner: doc.owner.username,
        });
    })
    .catch(() => res.status(404).json({ error: "Not found!" }));
};

module.exports.getPage = (req, res) => {
  Item.find()
    .sort({ _id: req.params.id > 0 ? req.params.id * -10 : -1 })
    .limit(10)
    .then((doc) => doc)
    .then((doc) => res.json({ res: doc, success: true }));
};

module.exports.myItems = (req, res) => {
  jwt.verify(
    req.header("Authorization"),
    process.env.SECRET,
    (err, decoded) => {
      if (err) return res.status(401).json({ error: "JWT not verified" });
      User.findOne({ username: decoded.username })
        .populate("listedItems")
        .populate("claimedItems")
        .then((doc) => doc)
        .then((doc) => {
          return res.status(200).json({
            listed: doc.listedItems | null,
            claimed: doc.claimedItems | null,
          });
        });
    }
  );
};

module.exports.search = (req, res) => {
  Item.find({ name: { $regex: req.body.search, $options: "i" } })
    .then((docs) => docs)
    .then((docs) => res.status(200).json({ docs }));
};
