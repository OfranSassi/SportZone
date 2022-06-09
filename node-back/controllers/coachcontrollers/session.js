const { default: mongoose } = require("mongoose");
const Reason = require("../../models/reason");
var Session = require("../../models/session");
var User = require("../../models/user");
var Location = require ("../../models/training_location")
// var Program = require ("../../models/program")



//ajouter une session  
exports.createSession = async(req,res)=>{
  const coach = await User.findById(req.userId);
  // const player = await User.findById(req.body.player);
  const player = await User.findOne({ _id: req.body.player });
  const location = await Location.findById(req.body.location);
  // const program = await Program.findById(req.body.location);
  console.log("req           ",req.body.location);
  console.log("location    ",location);
  let session = new Session({
   player: player== undefined ?  undefined: player._id, 
   title: req.body.title,
   date:req.body.date,
   target: req.body.target,
   location:location,
  // program:program,
  coach: coach._id,
  objective:req.body.objective,
  });
  await session.save();
  coach.sessions.push(session);
  await coach.save();
  return res.json({ session });
};

// _id: req.params.id

//affichers session
// exports.showSession = async (req, res) => {
//   Session.find({ coach: req.userId })
//   .populate({ path: 'training_location' }).exec((err, session) => {
//     res.json({ session: session });
//    })
//   Session.find({ coach: req.userId }).populate("coach" ).exec((err, session)=> {
//     res.json({ session: session });
//   });
  
// };

exports.showSession = async (req, res) => {
  Session.find({ coach: req.userId, player: req.params.id, location: req.params.id})
    .populate("player")
    .populate("coach")
    .populate("location")
    .exec((err, session) => {
      res.json({ session: session });
    });
};




//supprimer session
exports.deleteSession = (req, res) => {
  Session.findOneAndDelete(
      { _id: req.params.id },
      function (err, session) {
        if (err) {
          res.status(400).json({
            error: err,
          });
        } else {
          res.status(200).json({
            session,
          });
        }
      }
    );
  };
  
 //modifier session
 exports.update_session = async (req, res) => {
  const location = await Location.findById(req.body.location);
  // const program = await Program.findById(req.body.program); 

  Session.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        objective:req.body.objective,
        day: req.body.day,
        // final_date: req.body.final_date,
        location: location._id,
        // program: program._id,
        coach: req.userId,    
      },
    },
    function (err, session) {
      if (err) {
        
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ session });
        console.log(session);
        console.log(req.body.location);
        // console.log(req.body.program);
      }
    }
  );
};
// get session by id
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    res.json({ session });
  } catch (error) {
    // console.log(err);
    return res.status(400).json({ msg: error.message });
  }
};


//populate select what data to show
exports.showSessionByPlayer = async (req, res) => {
   
        
  Session.find({ coach: req.userId , player:req.params.id  })
  .populate('location').populate('player').populate('coach').exec((err, session) => {
   res.json({ session: session });
  })
     
 };
















//toutes les seances by coach
exports.showAllSession = async (req, res) => {
  Session.find({ coach: req.userId }).exec((err, session) => {
    res.json({ session: session });
   })
};

//toutes les raisons
exports.showAllReasons = async (req, res) => {
  Reason.find({}, function (err, rais) {
    res.json({ reasons: rais });
  });
};
//toutes les seances non annulés
exports.showSessionNotRejected = async (req, res) => {
  Session.find({ coach: req.userId, isRejected: false }, function (err, sess) {
    res.json({ session: sess });
  });
};
// ajouter feedback et dire si l objectif est atteint ou nn
exports.feedBack = (req, res) => {
  Session.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        feedback: req.body.feedback,
        target_reached: req.body.target_reached,
      },
    },
    function (err, session) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ session });
        console.log(session);
      }
    }
  );
};

//annuler seance
exports.rejectSession = async (req, res) => {
  const reason = await Reason.findOne({
    _id: req.body.reason,
  });
  Session.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        isRejected: true,
        reason: reason._id,
        other: req.body.other,
      },
    },
    function (err, session) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ session });
        console.log(session);
      }
    }
  );
};