const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const Types = Object.freeze({
  compteur: "compteur",
  timer: "timer",
  vitesse:"vitesse"
});

const Measures = Object.freeze({
  Second: "S",
  kilometre: "Km",
  Heure:"H",
  Minute:"min"
});

const Max_Min = Object.freeze({
  Maximise: "Maximise",
  Minimise: "Minimise",
 
});

let typeStatisticSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    value: { 
      type:Number,
       required:true 
    },
    description:{
        type:String,
        required:true 

    },
    isvisible:{
        type:Boolean,
        default:true
    },

    link:{
        type:String,
        required:true

    },
    
    types: {
      type: String,
      enum: Object.values(Types),
    },

    units:{
      type: String,
      enum: Object.values(Measures),
    },
   
    maxmin:{
      type: String,
      enum: Object.values(Max_Min),
    },
    
   

    
    speciality:{type: mongoose.Schema.Types.ObjectId, ref: "speciality" },
    coach:{type: mongoose.Schema.Types.ObjectId, ref: "user"}

    
  },
  { timestamp: true }
);

Object.assign(typeStatisticSchema.statics, {
  Types,
  Measures,
  Max_Min
 
});


module.exports = mongoose.model("typeStatistic", typeStatisticSchema);
