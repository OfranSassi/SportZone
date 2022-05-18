// routes mtaa lhajet l publiques
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var authJwt = require("../middleware/auth");
// create application/json parser
var jsonParser = bodyParser.json();
const playerControllerPofil = require("../controllers/playercontrollers/profile");
const playerControllerChallenge = require("../controllers/playercontrollers/challenge");
const playerControllerSession = require("../controllers/playercontrollers/session");

router.get(
  "/profile",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerPofil.profile
);
router.get(
  "/session/show/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerSession.showSession
);

router.put(
  "/profile/update",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerPofil.update_profile
);
router.get(
  "/profile",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerPofil.profile
);
// voir mes défis
router.get(
  "/challenge/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerChallenge.allChallengesByUser
);

// mettre à done un de mes défis
router.put(
  "/challenge/done/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isPlayer],
  playerControllerChallenge.doneChallenge
);
module.exports = router;
