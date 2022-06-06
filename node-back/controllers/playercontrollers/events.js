const events = require("../../models/events");
const Eventsplayer = require("../../models/eventsplayer");
const User = require("../../models/user");
const Location = require("../../models/training_location");

// voir mes events
exports.allEventsByUser = async (req, res) => {
  const player = await User.findOne({ _id: req.userId });
  Eventsplayer.find({ player: player._id }, function (err, eventsplayer) {
    res.json({ eventsplayer });
  });
};

// choisir participating ou pas à un de mes events
exports.participatingEvents = (req, res) => {
    Eventsplayer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        participating: true,
      },
    },
    function (err, eventsplayer) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ eventsplayer });
        console.log(eventsplayer);
      }
    }
  );
};
