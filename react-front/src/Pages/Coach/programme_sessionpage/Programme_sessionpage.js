import Programme_sessionform from "./Programme_sessionform"
import Programme_sessionslist from "./Programme_sessionslist"

import { useState } from "react"
import Sessions from "./../Sessions/Sessions"

export default function Programme_sessionpage() {
 const [Programme_sessions, setProgramme_sessions] = useState([
  {
   id: 1,
   title: "prog1",
   description: "10*5 cardio",
   picture: "photo1",
   linkvideo: "http://programme1",
  },
  {
   id: 2,
   title: "prog2",
   description: "Extension de bras à la corde  3 x 10",
   picture: "photo2",
   linkvideo: "http://programme2",
  },
 ])
 //ajout
 function addProgramme_session(title, description, picture, linkvideo) {
  if (title !== "" || description !== "" || linkvideo !== "") {
   setProgramme_sessions([
    ...Programme_sessions,
    {
     id: Programme_sessions.length + 1,
     title: title,
     description: description,
     picture: picture,
     linkvideo: linkvideo,
    },
   ])
  }
 }
 //update
 const updateProgramme_session = (
  id,
  title,
  description,
  picture,
  linkvideo
 ) => {
  const newProgramme_sessions = Programme_sessions.map(
   (Programme_session) =>
    Programme_session.id === id
     ? {
        id,
        title: title,
        description: description,
        picture: picture,
        linkvideo: linkvideo,
       }
     : Programme_session
  )
  setProgramme_sessions(newProgramme_sessions)
 }
 //delete
 const deleteProgramme_session = (id) => {
  const newProgramme_sessions = Programme_sessions.filter(
   (Programme_session) => Programme_session.id !== id
  )
  setProgramme_sessions(newProgramme_sessions)
 }

 return (
  <div className='App'>
   <>
    {" "}
    <center>
     <h1>Add new Programme session</h1>
     <Programme_sessionform addProgramme_session={addProgramme_session} />
     <h1>List of programme Sessions</h1>
     <Programme_sessionslist
      myProgramme_sessions={Programme_sessions}
      updateProgramme_session={updateProgramme_session}
      deleteProgramme_session={deleteProgramme_session}
     />
    </center>
   </>
  </div>
 )
}
