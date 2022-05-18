const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let specialitySchema = new Schema(
  {
    label: {
      type: String,
      unique: true,
      required: true,
    },
    
    links: { 
      type: String,
      required:true
     },

    
  },
  { timestamp: true }
);



module.exports = mongoose.model("speciality", specialitySchema);
