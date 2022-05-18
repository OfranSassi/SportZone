var User = require("../../models/user");

exports.profile = async (req, res) => {
  const player = await User.findById({ _id: req.params.id, role: "player" });
  if (player) {
    res.json({
      player,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "player not found",
    });
  }
};
//toutes les joueurs
exports.showPlayers = async (req, res) => {
  User.find({ role: "player" }, function (err, players) {
    res.json({ players: players });
  });
};
