const mongoose = require("mongoose");
let Schema = mongoose.Schema;



let eventsSchema = new Schema(
  {
    label: {
      type: String,
     // required: true,
    },
    
    start_date: { 
        type:String,
        // required:true 
    },
    final_date: {
         type:String,
        //  required:true 
    },
    location: { 
        type:String,
        // required:true 
    },
    state: { 
        type:String,
        // required:true 
    },
    details: { 
        type:String,
        // required:true 
    },

    
    coach:{type: mongoose.Schema.Types.ObjectId, ref: "user" },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // users_participated:[{ type: mongoose.Schema.Types.ObjectId, ref: "user"  }],
    // users_interested:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
})



module.exports = mongoose.model("events", eventsSchema);
