import Abonnementlist from "./abonnementlist"
import { useState } from "react"
import Dashboard from "../Dashboard"

export default function Abonnementpage() {
 const [abonnements, setAbonnements] = useState([
  {
   id: 1,
   abonnement: "Free",
  },
 ])
 //update
 const updateAbonnement = (id, abonnement) => {
  const newAbonnements = abonnements.map((abon) =>
   abon.id === id
    ? {
       id,
       abonnement: abonnement,
      }
    : abon
  )
  setAbonnements(newAbonnements)
 }

 return (
   <Dashboard>
  <div className='App'>
   <>
    {" "}
    <center>
     <h1>Select Abonnement</h1>
     <Abonnementlist
      myAbonnements={abonnements}
      updateAbonnement={updateAbonnement}
     />
    </center>
   </>
  </div>
  </Dashboard>
 )
}
