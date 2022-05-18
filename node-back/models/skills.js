const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let skillsSchema = new Schema(
  {
    label: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isvisible: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Number,
      required:true,
      min:1,
      max:5
      
    },
    links:[ { 
      type: String,
      required:true
     }],

     player:{ type: mongoose.Schema.Types.ObjectId, ref: "user" },
     coach:{ type: mongoose.Schema.Types.ObjectId, ref: "user" },
     speciality:{type: mongoose.Schema.Types.ObjectId, ref: "speciality" },

    
  },

 

  { timestamp: true }
);



module.exports = mongoose.model("skills", skillsSchema);
