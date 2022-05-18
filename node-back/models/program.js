const mongoose = require("mongoose");
let Schema = mongoose.Schema;



let programSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    description: { 
      type:String,
      required:true 
    },
    link:{
        type:String,
        required:true 
    },
    address:{
        type:String,
        required:true 
    },
    picture: {
        data: Buffer,
        contentType: String,
        required:true
      },

    session: { type: mongoose.Schema.Types.ObjectId, ref: "session" },

})



module.exports = mongoose.model("program", programSchema);
