// // crud lieu d'entrainement
// import Programme_session from './../../../react-front/src/Pages/Coach/programme_sessionpage/Programme_session';
// var User = require("../../models/user");
// var Programme_session= require("../../models/training_location");
var Program = require("../../models/program");

//affichers les programmes

// exports.showProgram = async (req, res) => {
//     Program.find({ coach: req.userId }, function (err, program) {
//         res.json({ program: program });
//       });
//   };

  exports.GetProgram = async (req, res) => {
   
        
    Program.find()
    .exec((err, program) => {
     res.json({ program: program });
    })
       
   };



// // creation d'un lieu d'entrainement
// exports.createLocation = async (req, res) => {
//   const coach = await User.findOne({ _id: req.userId });
//   let program = new Programme_session({
//     title: req.body.name,
//     description: req.body.city,
//     coach: coach._id,
//     country: req.body.country,
//     address: req.body.address,
//   });
//   await location.save();
//   coach.locationtraining.push(location);
//   await coach.save();
//   return res.json({ location });
// };

// //liste de toutes les lieux (locations)
// exports.allLocations = async (req, res) => {
//   Training_location.find({}, function (err, locations) {
//     res.send(locations);
//   });
// };
// //liste des locations par coach
// exports.allLocationsbyCoach = async (req, res) => {
//   const coach = await User.findOne({ _id: req.userId });
//   Training_location.find({ coach: coach._id }, function (err, locations) {
//     res.send(locations);
//   });
// };

// //update location
// exports.updateLocation = (req, res) => {
//   Training_location.updateOne(
//     { _id: req.params.id },
//     { $set: { name: req.body.name } }
//   )
//     .then(() => {
//       res.status(201).json({
//         message: "location updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };
// // delete location
// exports.deleteLocation = (req, res) => {
//   Training_location.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "Deleted!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };
