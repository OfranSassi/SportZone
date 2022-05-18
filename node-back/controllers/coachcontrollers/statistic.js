var Statistics = require("../../models/type_statistic");
var User = require("../../models/user");
var Speciality = require("../../models/speciality");


//ajouter statistic
exports.createStatistic = async (req, res) => {
  const coach = await User.findById(req.userId);
  const speciality = await Speciality.findById( {_id:req.body.speciality});
  let statistic = new Statistics({
    title: req.body.title,
    description: req.body.description,
    speciality: speciality._id,
    coach:coach._id,
    link: req.body.link,
    isVisible: req.body.isVisible,
    types: req.body.types,
    units: req.body.units,
    maxmin: req.body.maxmin,
  });
  await statistic.save();
  coach.statistics.push(statistic),
  await coach.save();

  return res.json({ statistic });
};

//modifier statistique
exports.update_statistic = async (req, res) => {
  const speciality = await Speciality.findById( {_id:req.body.speciality});

  Statistics.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        isVisible: req.body.isVisible,
        types: req.body.types,
        units: req.body.units,
        maxmin: req.body.maxmin,
        speciality:speciality._id,
      },
    }
  )
    .then(() => {
      res.status(201).json({
        message: "updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//supprimer une statistique

exports.deleteStatistic = (req, res) => {
  Statistics.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};



//ajouter statistic d'un joueur
exports.createStatisticP = async (req, res) => {
  const player= await User.findById(req.userId);
  const speciality = await Speciality.findById( {_id:req.body.speciality});
  let statistic = new Statistics({
    title: req.body.title,
    description: req.body.description,
    speciality: speciality._id,
    player:player._id,
    link: req.body.link,
    isVisible: req.body.isVisible,
    types: req.body.types,
    units: req.body.units,
    maxmin: req.body.maxmin,
  });
  await statistic.save();
  player.statistics.push(statistic),
  await player.save();

  return res.json({ statistic });
};

//modifier statistique
exports.update_statisticP = async (req, res) => {
  const speciality = await Speciality.findById( {_id:req.body.speciality});
  const player = await User.findById({_id:req.body.player});
  Statistics.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        isVisible: req.body.isVisible,
        types: req.body.types,
        units: req.body.units,
        maxmin: req.body.maxmin,
        speciality:speciality._id,
        player:player._id,
      },
    }
  )
    .then(() => {
      res.status(201).json({
        message: "updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
