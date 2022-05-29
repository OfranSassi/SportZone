var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var authJwt = require("../middleware/auth");
var jsonParser = bodyParser.json();
const coachControllerLocation = require("../controllers/coachcontrollers/Location");
const coachControllerChallenge = require("../controllers/coachcontrollers/challenge");
const coachControllerSession = require("../controllers/coachcontrollers/session");
const coachControllerSkills = require("../controllers/coachcontrollers/skills");
const coachControllerPlayers = require("../controllers/coachcontrollers/players");
const coachControllerPlayer = require("../controllers/coachcontrollers/playerProfile");
const coachControllerStatistic = require("../controllers/coachcontrollers/statistic");
const coachControllerEvents = require("../controllers/coachcontrollers/events");

//creation d'un lieu (location)
router.post(
  "/location/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerLocation.createLocation
);

//afficher tt les lieux
router.get(
  "/location/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerLocation.allLocations
);

//afficher tt les lieux by coach
router.get(
  "/location/allbycoach",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerLocation.allLocationsbyCoach
);
//update location
router.put(
  "/location/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerLocation.updateLocation
);

//delete location
router.delete(
  "/location/delete/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerLocation.deleteLocation
);
//get location by id
router.get(
  "/location/:id",
  jsonParser,

  coachControllerLocation.getLocationById
);
//create challenge
router.post(
  "/challenge/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.createChallenge
);

//assign challenge
router.post(
  "/challenge/assign",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.assignChallenge
);

// /update Challenge
router.put(
  "/challenge/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.updateChallenge
);

//delete Challenge
router.delete(
  "/challenge/delete/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.deleteChallenge
);
//get players
router.get(
  "/players/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerPlayers.showPlayers
);
//get challenges
router.get(
  "/challenge/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.showChallenges
);
// get challenge by player
router.get(
  "/challenge/player/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerChallenge.showChallengesByPlayer
);
//feedback session
router.put(
  "/session/feedback/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.feedBack
);
//reject session
router.put(
  "/session/reject/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.rejectSession
);

//create skills
router.post(
  "/skills/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.createSkills
);
//show skills of even coach
router.get(
  "/skills/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.skills
);

//delete skills
router.delete(
  "/skills/delete/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.deleteSkills
);

//add skills to player
router.post(
  "/skills_Player/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.skillsPlayer
);
//get player
router.get(
  "/player/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerPlayers.profile
);

//modifier  competences coach
router.put(
  "/skills/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.update_skills
);
//modifier  competences joueur
router.put(
  "/skills_player/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSkills.update_skillsP
);

//modifier joueur
router.put(
  "/player/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerPlayer.update_player
);

//afficher le detail d'une seance
router.get(
  "/session/show/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.showSession
);
//afficher tt les seances
router.get(
  "/session/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.showAllSession
);
router.get(
  "/session/reasons",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.showAllReasons
);
//afficher les seances non rejetés
router.get(
  "/session/show/actives",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerSession.showSessionNotRejected
);

//ajouter statistique
router.post(
  "/statistic/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerStatistic.createStatistic
);

//supprimer une statistique
router.delete(
  "/statistic/delete/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerStatistic.deleteStatistic
);

//modifier statistique
router.put(
  "/statistic/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerStatistic.update_statistic
);

//ajouter statistique joueur
router.post(
  "/statistic_player/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerStatistic.createStatisticP
);

//modifier statistique
router.put(
  "/statistic_player/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerStatistic.update_statisticP
);

//creation d'un evennement (Events)
router.post(
  "/events/create",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.createEvents
);

//afficher tt les evennement
router.get(
  "/events/all",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.showEvents
);


//update Events 
router.put(
  "/events/update/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.update_events
);

//delete Events
router.delete(
  "/events/delete/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.deleteEvents
);
//get events by id
router.get(
  "/events/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.getEventsById
);

//get events by id
router.get(
  "/events/player/:id",
  jsonParser,
  [authJwt.verifyToken, authJwt.isCoach],
  coachControllerEvents.showEventsByPlayer
);


module.exports = router;
