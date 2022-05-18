const mongoose = require("mongoose");
let Schema = mongoose.Schema;

/*const description = Object.freeze({
  absence_joueur: "absence of player",
  imptemperie: "imptempérie",
  others: "autre ..", 3 objets de type raison
});*/

let reasonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("reason", reasonSchema);
