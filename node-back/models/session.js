const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let sessionSchema = new Schema(
  {
    title: {
      type: String,
    },
    // nbr_weeks: {
    //   type: Number,
    // },

    date: {
      type: String,
    },
    // isRejected: {
    //   type: Boolean,
    //   default: false,
    // },

    objective: {
      type: String,
    },
    target: {
      type: String,
    },
    // target_reached: {
    //   type: Boolean,
    //   default: false,
    // },

    // target_measure: {type: mongoose.Schema.Types.ObjectId, ref: "typeStatistic"},
    location: { type: mongoose.Schema.Types.ObjectId, ref: "training_location" },
    // objectifs: [{ type: String }],
    // reason: { type: mongoose.Schema.Types.ObjectId, ref: "reason" },
    program: { type: mongoose.Schema.Types.ObjectId, ref: "program" },
    // speciality: { type: mongoose.Schema.Types.ObjectId, ref: "speciality" },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },

  { timestamp: true }
);

module.exports = mongoose.model("session", sessionSchema);
