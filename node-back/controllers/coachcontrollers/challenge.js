var User = require("../../models/user");
var Challenge = require("../../models/challenge");
var Challengeplayer = require("../../models/challengeplayer");
// create challenge 
exports.createChallenge = async (req, res) => {
  // const coach = await User.findById(req.userId);
  const coach = await User.findOne({ _id: req.userId });
  const player = await User.findOne({ _id: req.body.player });
  let challenge = new Challenge({
    video_link: req.body.video_link,
    objective: req.body.objective,
    start_date: req.body.start_date,
    final_date: req.body.final_date,
    coach: coach._id,
    player: player._id,
  });
  // req.body.coach= coach._id
  // let challenges = new Challenge(req.body);

  await challenge.save();
  coach.challenges.push(challenge);
  await coach.save();

  player.challenges.push(challenge);
  await player.save();
  return res.json({ challenge });
};
// assign challenge to user
exports.assignChallenge = async (req, res) => {
  const player = await User.findOne({ _id: req.body.player });
  const coach = await User.findOne({ _id: req.userId });
  const chall = await Challenge.findOne({ _id: req.body.challenge });
  let challengeplayer = new Challengeplayer({
    video_link: req.body.video_link,
    start_date: req.body.startdate,
    final_date: req.body.finaldate,
    objective: chall.objective,
    // objective: 'test',
    done: false,
    player: player._id,
    challenge: chall._id,
    coach: coach.firstname + "" + coach.lastname,
  });
  await challengeplayer.save();

  return res.json({ challengeplayer });
};

exports.showChallengesByPlayer = async (req, res) => {

 try {
  const challenge = await Challenge.find({ coach: req.userId, player: req.params.id })
  .populate("player")
  .populate("coach")
  if (challenge){
    res.json({ challenges: challenge });

  }else { res.status(400).send("Something went wrong")
   
  }
 } catch (error) {
  res.status(400).send("Something went wrong")
 }
};

exports.showChallenges = async (req, res) => {
  Challenge.find({ coach: req.userId })
    .populate("player")
    .populate("coach")
    .exec((err, challenges) => {
      res.json({ challenges: challenges });
    });
};
//supprimer event
exports.deleteChallenge = (req, res) => {
  Challenge.findOneAndDelete({ _id: req.params.id }, function (err, challenge) {
    if (err) {
      res.status(400).json({
        error: err,
      });
    } else {
      res.status(200).json({
        challenge,
      });
    }
  });
};
exports.updateChallenge = (req, res) => {
  Challenge.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        video_link: req.body.video_link,
        objective: req.body.objective,
        start_date: req.body.start_date,
        final_date: req.body.final_date,
      },
    },
    function (err, challenge) {
      if (err) {
        res.status(400).json({ msg: "Something wrong when updating data!" });
      } else {
        res.json({ challenge });
        console.log(challenge);
      }
    }
  );
};
