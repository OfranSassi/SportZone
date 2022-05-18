 import moment from "moment"
 import Sessions from "./Pages/Coach/Sessions/Sessions"
import Sessions from './../Sessions/Sessions';

 const sessions = [  {
   id: 1,
    title: "seance de préparation",
  date: "02/05/2021",
  player: "ali",
   feedback: "amelioration de vitesse",
   programme: "Extension de bras à la corde  3 x 10 ",
   action: ""
   },
   {
   id: 2,
    title: "seance de cardio",
    date: "02/06/2021",
   player: "zayn",
    feedback: "pas mal",
    programme: "Banc lombaire  : 3 x 10", 
      action: "",
   }, 
     {    id: 3,
   title: "seance de de stabilisation",
   date: "02/03/2021",
    player: "arij",
    feedback: "objectif atteint",
    programme: "Tapis de course ou elliptique pendant 30 minutes ",
   },
 ]
 const sessionsplayer = [
 {
 id: 1,
  coach: "coach1",
   skills: "skill 1",
   valeurskill: "5",
 static: "stat 1",
  valeurstat: "5",
   date: "11/04/2022",
  location: "gymcalifornia",
 programme: "prog 1",
},
{
   id: 2,
  coach: "coach2",
   skills: "skill 1",
  valeurskill: "25",
     static: "stat 1",
   valeurstat: "8",
   date: "11/04/2022",
     location: "tunis",
  programme: "prog 1",
 },
  {
   id: 3,
   coach: "coach 3",
   skills: "skill 1",
   valeurcskill: "15",
  static: "stat 3",
  valeurstat: "5",
   date: "10/04/2022",
   location: "djerba",
  programme: "prog 1",
 },
 ]
 function delay(ms) {
return new Promise((resolve) => setTimeout(resolve, ms))
}

export const fetchsessionsbydate = async (searchvaluedate) => {
 await delay(2000)
 return sessions.filter(
  (session) => session.jour.includes(searchvaluedate)
//   Sessions.location.includes(searchValue) ||
//   session.player.includes(searchValue)
//  
);
 };
  export const fetchsessionsbylocation = async (searchValue) => {
  await delay(2000)
  return sessions.filter(
 (session) => session.location.includes(searchValue)
// sessions.player.includes(searchValue)
 );
 };
 export const fetchsessionsbyplayer = async (searchValue) => {
 await delay(2000)
 return sessions.filter((session) => session.player.includes(searchValue))
 }
 export const fetchsessionByDateNow = async (sessionDate) => {
  sessionDate = moment(new Date()).format("DD-MM-YYYY")
 console.log(sessionDate)
 await delay(2000)
 return sessions.filter((session) => session.jour == session}
 export const fetchsessionplayerByDateNow = async (sessionDate) => {
       sessionDate = moment(new Date()).format("DD-MM-YYYY")
  console.log(sessionDate)
 await delay(2000)
 return sessionsplayer.filter((session) => session.day == sessionDate }
