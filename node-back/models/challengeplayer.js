const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let challengeplayerSchema = new Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  coach: { type: String },
  objective: { type: String },

  challenge: { type: mongoose.Schema.Types.ObjectId, ref: "challenge" },
  start_date: {
    type: String,
    required: true,
  },
  final_date: {
    type: String,
    required: true,
  },

  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("challengeplayer", challengeplayerSchema);
