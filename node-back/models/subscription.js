const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const type_sub= Object.freeze({
  premium: 'premium',
  free: 'free',
  basic:'basic'
  
});

let subscriptionSchema = new Schema(
  {
  sub: {
    type: String,
    enum: Object.values(type_sub),
    required:true
  },

    
    coach:{type: mongoose.Schema.Types.ObjectId, ref: "user" },
})

Object.assign(subscriptionSchema.statics, {
  type_sub,
  
});

module.exports = mongoose.model("subscription", subscriptionSchema);
