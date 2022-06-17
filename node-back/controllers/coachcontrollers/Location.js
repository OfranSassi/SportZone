// crud lieu d'entrainement
var User = require("../../models/user");
var Training_location = require("../../models/training_location");

// creation d'un lieu d'entrainement
exports.createLocation = async (req, res) => {
  const coach = await User.findOne({ _id: req.userId });
  let location = new Training_location({
    name: req.body.name,
    city: req.body.city,
    coach: coach._id,
    country: req.body.country,
    address: req.body.address,
  });
  location = await location.save();
  coach.locationtraining.push(location);
  await coach.save();
  return res.json({ location: location });
};

//liste de toutes les lieux (locations)
exports.allLocations = async (req, res) => {
  Training_location.find({}, function (err, locations) {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      res.json(locations);
    }
  });
};
//liste des locations par coach
exports.allLocationsbyCoach = async (req, res) => {
  const coach = await User.findOne({ _id: req.userId });
  Training_location.find({ coach: coach._id }, function (err, locations) {
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      res.json(locations);
    }
  });
};

//update location
exports.updateLocation = (req, res) => {
  //const location = await Training_location.findById(req.params.id);

  Training_location.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address,
      },
    },
    function (err, location) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ location });
        console.log(location);
      }
    }
  );
};

// delete location
exports.deleteLocation = (req, res) => {
  Training_location.findOneAndDelete(
    { _id: req.params.id },
    function (err, location) {
      if (err) {
        res.status(400).json({
          error: err,
        });
      } else {
        res.status(200).json({
          location,
        });
      }
    }
  );
};

//
exports.getLocationById = async (req, res) => {
  try {
    const location = await Training_location.findById(req.params.id);
    res.json({ location: location });
  } catch (error) {
    // console.log(err);
    return res.status(400).json({ msg: error.message });
  }
};
