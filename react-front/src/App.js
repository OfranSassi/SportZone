import React, { useEffect, useState } from "react"
// import { Button } from 'antd';
import { Route, Routes, useNavigate } from "react-router-dom"
// import { useState } from 'react'

// pages
import "./App.css"

import Evenement from "./Pages/Coach/Evenementpage/Coachevent"
import Challengedetails from "./Pages/Coach/challenge/Challengedetails"

import Programme_session from "./Pages/Coach/programme_sessionpage/Programme_sessionpage"
import Cprofile from "./Pages/Coach/Cprofile"
import Pprofile from "./Pages/Player/Pprofile"
import Dashboard from "./Pages/Coach/Dashboard"
import Players from "./Pages/Coach/Players/Players"
import Login from "./Pages/Visitor/Login"
import Mailer from "./components/Mailer"
import RegisterCoach from "./Pages/Visitor/RegisterCoach"
import RegisterPlayer from "./Pages/Visitor/RegisterPlayer"
import LocationPage from "./Pages/Coach/location/LocationPage"
import Profileplayer from "./Pages/Coach/Players/Profileplayer"
import RejectFeedback from "./Pages/Coach/Sessions/reject&feedbak/RejectFeedback"
import { getCurrentUser } from "./services/coachservices/auth"
import LocationDetails from "./Pages/Coach/location/LocationDetails"
import EventDetails from "./Pages/Coach/Evenementpage/Eventdetails"
import Sessions from "./Pages/Coach/Sessions/Sessions"

import Abonnementpage from "./Pages/Coach/abonnement/abonnementpage"
import ChallengeForm from "./Pages/Coach/challenge/Challengeform"

// import Axios from 'axios'

function App() {
 const [currentUser, setCurrentUser] = useState(null)
 const token = localStorage.getItem("token")
 const history = useNavigate()

 //  console.log("http://localhost:5001/coach/players/all")
 //  async function test(){
 //   const result = await Axios.get(
 //     "http://localhost:5001/coach/players/all",
 //     {headers: {
 //       'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzY2ODFmMGI0MjY2YjEwODA2NWM2MCIsImVtYWlsIjoib2ZyYW5zYXNzeUBnbWFpbC5jb20iLCJyb2xlIjoiY29hY2giLCJpYXQiOjE2NTIzMzM5NzB9.thTr6UN07c9xyJtOvmuXbsPNdMd22oZjG6HTw5He5js"
 //     }}
 //   )
 //   return result.data
 //  }
 //  console.log('******************************')
 //  let users= test()
 //  console.log(users);

 useEffect(() => {
  getCurrentUser().then((response) => {
   setCurrentUser(response)

   // eslint-disable-next-line no-console
   console.log(currentUser)
   if (!token) {
    history("/login")
   }
  })
 }, [])

 return (
  <Routes>
   <Route path='/login' element={<Login />} />
   <Route path='/registerCoach' element={<RegisterCoach />} />
   <Route path='/registerPlayer' element={<RegisterPlayer />} />

   <Route exact path='/' element={<Dashboard />} />

   <Route path='/coach-invitation' element={<Mailer />} />

   <Route
    path='/coach/sessions/rejectfeedback'
    element={<RejectFeedback />}
   />
   <Route path='/coach/players/details/:id' element={<Profileplayer />} />
   <Route path='/coach/locations' element={<LocationPage />} />
   <Route
    path='/coach/locations/location/:id'
    element={<LocationDetails />}
   />

   <Route path='/manage-players' element={<Players />} />

   <Route path='/coach/profile' element={<Cprofile />} />

   <Route path='/player-profile' element={<Pprofile />} />

   <Route path='*' element={<div>not found</div>} />

   <Route path='/coach-session' element={<Sessions />} />
   <Route path='/programmesession-page' element={<Programme_session />} />

   <Route path='/coach-abonnement' element={<Abonnementpage />} />

   <Route path='/coach-challenge' element={<ChallengeForm />} />
   <Route path='/coach-challenge-details' element={<Challengedetails />} />

   <Route path='/coach-events' element={<Evenement />} />
   <Route path='/coach/events/details' element={<EventDetails />} />
  </Routes>
 )
}

export default App
