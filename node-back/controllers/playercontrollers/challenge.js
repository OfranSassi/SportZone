const challenge = require("../../models/challenge");
const Challengeplayer = require("../../models/challengeplayer");
const User = require("../../models/user");
// voir mes défis
exports.allChallengesByUser = async (req, res) => {
  const player = await User.findOne({ _id: req.userId });
  Challengeplayer.find({ player: player._id }, function (err, challengeplayer) {
    res.json({ challengeplayer });
  });
};

// mettre à done un de mes défis
exports.doneChallenge = (req, res) => {
  Challengeplayer.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        done: true,
      },
    },
    function (err, challengeplayer) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ challengeplayer });
        console.log(challengeplayer);
      }
    }
  );
};
