import Programme_session from "./Programme_session"

function Programme_sessionslist(props) {
 return (
  <div>
   {props.myProgramme_sessions.map(function (x) {
    return (
     <Programme_session
      id={x.id}
      title={x.title}
      description={x.description}
      picture={x.picture}
      linkvideo={x.linkvideo}
      updateProgramme_session={props.updateProgramme_session}
      deleteProgramme_session={props.deleteProgramme_session}
     />
    )
   })}
  </div>
 )
}

export default Programme_sessionslist
