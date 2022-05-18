var Skills = require("../../models/skills");
var User = require("../../models/user");
var Speciality = require("../../models/speciality");

//ajouter ses competences
exports.createSkills = async (req, res) => {
  const coach = await User.findById(req.userId);
  const speciality = await Speciality.findById( {_id:req.body.speciality});
  let skills = new Skills({
    label: req.body.label,
    description: req.body.description,
    speciality: speciality._id,
    coach: coach._id,
    stars: req.body.stars,
    links: req.body.links,
    isVisible: req.body.isVisible,
  });
  await skills.save();
  coach.skills.push(skills);
  await coach.save();
  return res.json({ skills });
};

//afficher ses competences

exports.skills = async (req, res) => {
  const coach = await User.findOne({ _id: req.userId });
  Skills.find({ coach: coach._id }, function (err, skill) {
    res.send(skill);
  });
};

//supprimer ses competence

exports.deleteSkills = (req, res) => {
  Skills.deleteOne({ _id: req.params.id })
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

//ajouter des competence d'un joueur
exports.skillsPlayer = async (req, res, next) => {
  
  const player = await User.findById({_id:req.body.player});
  const speciality = await Speciality.findById( {_id:req.body.speciality});


  let skill = new Skills({
    label: req.body.label,
    description: req.body.description,
    speciality:speciality._id,
    player: player._id,
    stars: req.body.stars,
    links: req.body.links,
    isVisible: req.body.isVisible,
  });
  console.log(skill);
  await skill.save();
  player.skills.push(skill);
  await player.save();

  return res.json({ skill });
};

//modifier ses compétences 

exports.update_skills = async (req, res) => {
  const speciality = await Speciality.findById( {_id:req.body.speciality});

  Skills.updateOne(
    { _id: req.params.id },
    {
      $set: {
        label: req.body.label,
        description: req.body.description,
        stars: req.body.stars,
        links: req.body.links,
        isVisible: req.body.isVisible,
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


//modifier compétences joueur

exports.update_skillsP = async (req, res) => {
  const speciality = await Speciality.findById( {_id:req.body.speciality});
  const player = await User.findById({_id:req.body.player});


  Skills.updateOne(
    { _id: req.params.id },
    {
      $set: {
        label: req.body.label,
        description: req.body.description,
        stars: req.body.stars,
        links: req.body.links,
        isVisible: req.body.isVisible,
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
