// routes mtaa lhajet l publiques
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();
const coachControllerLogin = require("../controllers/coachcontrollers/login");
const coachControllerRegister = require("../controllers/coachcontrollers/register");
const ControllerSpeciality = require("../controllers/coachcontrollers/speciality");
const authJwt = require("../middleware/auth");

router.post(
  "/register/coach",
  jsonParser,
  coachControllerRegister.registerCoach
);
router.post("/login/coach", jsonParser, coachControllerLogin.loginCoach);

router.get(
  "/currentUser",
  jsonParser,
  [authJwt.verifyToken],
  coachControllerLogin.currentUser
);
router.post("/speciality", jsonParser, ControllerSpeciality.createSpeciality);

module.exports = router;
