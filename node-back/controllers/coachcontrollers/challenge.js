var User = require("../../models/user");
var Challenge = require("../../models/challenge");
var Challengeplayer = require("../../models/challengeplayer");
// create challenge
exports.createChallenge = async (req, res) => {
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
  Challenge.find({ coach: req.userId, player: req.params.id })
    .populate("player")
    .populate("coach")
    .exec((err, challenges) => {
      res.json({ challenges: challenges });
    });
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

//modifier events
// exports.updateChallenge = async (req, res) => {
//   // const events = await Events.findById( {_id:req.body.events});

//   //   const challenge = await Challenge.findById( req.params.id)
//   // console.log("challenge1 : " , challenge)
//        // update the user object found using findOne
//       //  challenge.video_link = req.body.video_link
//       //  challenge.objective = req.body.objective
//       //  challenge.start_date = req.body.start_date
//       //  challenge.final_date = req.body.final_date
//       try {
//         await Challenge.findByIdAndUpdate(req.params.id, {
//           video_link: req.body.video_link,
//           objective: req.body.objective,
//           start_date: req.body.start_date,
//           final_date: req.body.final_date,
//         });
//         // Send response in here
//         res.send('Item Updated!');

//       } catch(err) {
//           console.error(err.message);
//           res.send(400).send('Server Error');
//       }
//       //  Challenge.findByIdAndUpdate({_id:req.params.id} , req.body)
//       //  Challenge.sa
//        // now update it in MongoDB
//       //  Challenge.updateMany(function (err, challenge) {
//       //     if (err) {
//       //       res.status(400).json({
//       //         error: err,
//       //       });
//       //     } else {
//       //       res.status(200).json({
//       //           challenge,
//       //       });
//       //     }
//       //   })

//       }

// Challenge.findOneAndUpdate(
//   { _id: req.params.id },
//   {
//     $set: {

//       video_link: req.body.video_link,
//       objective: req.body.objective,
//       start_date: req.body.start_date,
//       final_date: req.body.final_date,
//       // coach: coach._id,
//       // player:player._id,
//     },
//   },
// function (err, challenge) {
//   if (err) {
//     res.status(400).json({ msg: "Something wrong when updating data!" });
//   } else {
//     res.json({ challenge });
//     console.log(challenge);
//   }
// }
// )
// };
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
