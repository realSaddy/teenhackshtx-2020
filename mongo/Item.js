const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: { type: String },
  description: { type: String },
});

module.exports.Item = mongoose.model("Item", itemSchema);
