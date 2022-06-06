const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventsplayerSchema = new Schema({

  player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
  coach: { type: String },
  details: { type: String },
  events: { type: mongoose.Schema.Types.ObjectId, ref: "events" },

  // start_date: {
  //   type: String,
  //   required: true,
  // },
  // final_date: {
  //   type: String,
  //   required: true,
  // },
  // state: {
  //   type: String,
  //   required: true,
  // },

  participating: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("eventsplayer", eventsplayerSchema);
