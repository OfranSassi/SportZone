const jwt = require("jsonwebtoken");
var User = require("../../models/user");
var bcrypt = require("bcrypt");
// inscrir en tq coach
exports.registerCoach = async (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const userr = new User({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: hash,
      role: "coach",
    });

    User.find({ email: req.body.email }, (err, users) => {
      if (err) {
        console.log("err in finding email ");
        res.status(400).json({ msg: "qlq erreur!" });
      }
      if (users.length != 0) {
        console.log("already user with this email");
        res.status(400).json({ msg: "coach exist avec cet email !" });
      } else {
        userr.save((error, registeredUser) => {
          if (error) {
            console.log(error);
            res.status(400).json({ msg: "some error!" });
          } else {
            let payload = {
              id: registeredUser._id,
              role: registeredUser.role,
            };
            let token = jwt.sign(payload, "secretkey");
            console.log(userr);
            res.status(200).json({ coach: userr });
          }
        });
      }
    });
  });
};
