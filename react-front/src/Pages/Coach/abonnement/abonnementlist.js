import Abonnement from "./abonnement"

function Abonnementlist(props) {
 return (
  <div>
   {props.myAbonnements.map(function (x) {
    return (
     <Abonnement
      key='1'
      id={x.id}
      abonnement={x.abonnement}
      updateAbonnement={props.updateAbonnement}
     />
    )
   })}
  </div>
 )
}

export default Abonnementlist
