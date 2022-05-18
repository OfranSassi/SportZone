const { default: mongoose } = require("mongoose");
const Reason = require("../../models/reason");
var Session = require("../../models/session");

//detail d'une seance
exports.showSession = async (req, res) => {
  Session.find({ _id: req.params.id }, function (err, sess) {
    res.json({ session: sess });
  });
};
//toutes les seances by coach
exports.showAllSession = async (req, res) => {
  Session.find({ coach: req.userId }, function (err, sess) {
    console.log(sess);
    res.json({ sessions: sess });
  });
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