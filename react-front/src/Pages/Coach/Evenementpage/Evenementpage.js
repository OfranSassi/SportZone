import Evenementlist from "./Evenementlist"
import Evenementform from "./Evenementform"
import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import Dashboard from "../Dashboard"
// /coach-events
export default function Evenementpage() {
  const [event, setEvent] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
//  const [evenements, setEvenements] = useState([
//   {
//    id: 1,
//    label: "evenement ",
//    details: "evenement",
//    start_date: "02-05-12",
//    final_date: "02-05-12",
//    location: "tunis",
//    state: "private",
//   },
//  ])
useEffect(() =>{
  const fetchData = async () => {
    setLoading(true)
    try {
     const plyrs = await getPlayers()
     setPlayers(
      plyrs.map((row) => ({
       firstname: row.firstname,
       lastname: row.lastname,
       email: row.email,
       isactive: row.isactive,
       id: row._id,
      }))
     )
     setLoading(false)
     const chall = await getChallenges()
     setChallenges(
      chall.map((row) => ({
       video_link: row.video_link,
       objective: row.objective,
       id: row._id,
      }))
     )
    } catch (e) {
     setLoading(false)
     setError(true)
    }
   }
   fetchData()
},[])
 function addEvenement(label, details, start_date, final_date, location, state) {
  setEvenements([
   ...evenements,
   {
    id: evenements.length + 1,
    label: label,
    details: details,
    start_date: start_date,
    final_date: final_date,
    location: location,
    state: state,
   },
  ])
 }

 const updateEvenement = (id, label, details, start_date,final_date, location, state) => {
  const newEvenements = evenements.map((evenement) =>
   evenement.id === id
    ? {
       id,
       label: label,
       details: details,
       start_date: start_date,
       final_date: final_date,
       location: location,
       state: state,
      }
    : evenement
  )
  setEvenements(newEvenements)
 }
 //delete
 const deleteEvenement = (id) => {
  const newEvenements = evenements.filter(
   (evenement) => evenement.id !== id
  )
  setEvenements(newEvenements)
 }

 return (
   <Dashboard>
  <div className='App'>
   <>
    <Evenementform addEvenement={addEvenement} />
    <Evenementlist
     myEvenements={evenements}
     updateEvenement={updateEvenement}
     deleteEvenement={deleteEvenement}
    ></Evenementlist>
   </>
   {/* hhhhhhh */}
  </div>
  </Dashboard>
 )
}
