// lhajet l public kima login / sign up / affichage des profils
const jwt = require("jsonwebtoken");
var User = require("../../models/user");
var bcrypt = require("bcrypt");

exports.loginCoach = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Somthing went wrong" });
    } else {
      if (!user) {
        res
          .status(400)
          .json({ msg: "L'email ou le mot de passe est invalide !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)

          .then((match) => {
            if (match) {
              console.log("login sucesssss");
              let payload = {
                id: user._id,
                email: user.email,
                role: user.role,
              };
              let token = jwt.sign(payload, "secretkey");
              res.status(200).json({
                token: token,
                user,
              });
            } else {
              console.log("incoreect passss");
              res.status(400).json({ msg: "Le mot de passe est incorrect" });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ msg: "quelque chose ne va pas " });
          });
      }
    }
  });
};
//get current user
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ user: user });
  } catch (error) {
    // console.log(err);
    return res.json({ error: err.msg });
  }
};
