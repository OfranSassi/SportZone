const jwt = require("jsonwebtoken");
const User = require("../models/user");

verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized req");
  }
  let token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (token == "null") {
    return res.status(401).send("unauthorized reqqqq");
  }
  // let payload = jwt.verify(token, "secretkey");
  jwt.verify(token, "secretkey", function (err, decodedToken) {
    if (err) {
      return res.status(401).send("unauthorized req");
    } else {
      // id de user connecté
      req.userId = decodedToken.id;
      next();
    }
  });
};

isCoach = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(user);
    if (user.role === "coach") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require Coach Role!" });
      return;
    }
  });
};
isPlayer = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("test USER",user);
    if (user.role === "player") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require Player Role!" });
      return;
    }
  });
};
const authJwt = {
  verifyToken,
  isPlayer,
  isCoach,
};
module.exports = authJwt;
