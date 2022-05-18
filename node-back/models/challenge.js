const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let challengeSchema = new Schema({
  video_link: {
    type: String,
  },

  objective: {
    type: String,
    // required: true,
  },
  start_date: {
    type: String,
    // required: true,
  },
  final_date: {
    type: String,
    // required: true,
  },

  coach: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("challenge", challengeSchema);
