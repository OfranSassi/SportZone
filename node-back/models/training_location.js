const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let training_locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  coach: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("location", training_locationSchema);
