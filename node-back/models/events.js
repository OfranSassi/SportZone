const mongoose = require("mongoose");
let Schema = mongoose.Schema;



let eventsSchema = new Schema(
  {
    label: {
      type: String,
     required: true,
    },
    
    start_date: { 
        type:String,
        required:false 
    },
    final_date: {
         type:String,
         required:false 
    },

    state: { 
        type:String,
        required:true 
    },
    details: { 
        type:String,
        required:true 
    },
    participating: {
      type: String,
      enum : ['PENDING','REFUSED','ACCEPTED'],
      default: 'PENDING'
      },

    //   see_coach: { 
    //     type:Boolean,
    //     default: false
    // },
    
    coach:{type: mongoose.Schema.Types.ObjectId, ref: "user" },
    location:{type: mongoose.Schema.Types.ObjectId, ref: "location" },
    player: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    users_participated:[{ type: mongoose.Schema.Types.ObjectId, ref: "user"  }],
    users_interested:[{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
})



module.exports = mongoose.model("events", eventsSchema);
