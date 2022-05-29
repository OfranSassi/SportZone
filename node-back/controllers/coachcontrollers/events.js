var Events = require("../../models/events");
var User = require("../../models/user");
var Location = require ("../../models/training_location")

//ajouter un evenement  
exports.createEvents = async(req,res)=>{
    const coach = await User.findById(req.userId);
    const player = await User.findById(req.body.player);
    const location = await Location.findById(req.body.location);
    console.log("req           ",req.body.location);
    console.log("location    ",location);
    let events = new Events({
     player: player._id, 
    label: req.body.label,
    start_date:req.body.start_date == undefined ?"":req.body.start_date,
    final_date:req.body.final_date == undefined ?"":req.body.final_date,
    location:location,
    coach: coach._id,
    state:req.body.state,
    details:req.body.details,
    });
    await events.save();
    coach.events.push(events);
    await coach.save();
    return res.json({ events });
};

//affichers les evennement

exports.showEvents = async (req, res) => {
    Events.find({ coach: req.userId }, function (err, events) {
        res.json({ events: events });
      });
  };

//supprimer event
exports.deleteEvents = (req, res) => {
    Events.findOneAndDelete(
        { _id: req.params.id },
        function (err, events) {
          if (err) {
            res.status(400).json({
              error: err,
            });
          } else {
            res.status(200).json({
                events,
            });
          }
        }
      );
    };
    

  //modifier events
  exports.update_events = async (req, res) => {
    const location = await Location.findById(req.body.location);
  
    Events.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          label: req.body.label,
          start_date: req.body.start_date,
          final_date: req.body.final_date,
          location: location._id,
          coach: req.userId,
          state: req.body.state,
          details: req.body.details,
        },
      },
      function (err, events) {
        if (err) {
          
          res.status(400).json({ msg: "Something wrong when updating data!" });
        } else {
          res.json({ events });
          console.log(events);
          console.log(req.body.location);
        }
      }
    );
  };
  

      exports.getEventsById = async (req, res) => {
        try {
          const events = await Events.findById(req.params.id);
          res.json({ events });
        } catch (error) {
          // console.log(err);
          return res.status(400).json({ msg: error.message });
        }
      };
  
// 
      exports.showEventsByPlayer = async (req, res) => {
   
        
         Events.find({ coach: req.userId , player:req.params.id  })
         .populate('player').populate('coach').populate('location').exec((err, events) => {
          res.json({ events: events });
         })
            
        };
      