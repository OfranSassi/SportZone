import axios from "axios"
import { message } from "antd"
const API_URL = "http://localhost:5001/coach/session"
const API_URL2 = "http://localhost:5001/coach/players/all"

export const createSession = async (
 player,
 location,
 title,
 date,
 objective,
 target,
 program
) => {
 const res = await axios.post(
  API_URL + `/assign`,
  {
   player,
   location,
   title,
   date,
   objective,
   target,
   program
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )
 return res.data.session
}

export const assign = async (
  playerId,
   locationId,
   title,
   date,
   objective,
   target,
   programId
 ) => {
  try {
   await axios
    .post(
     API_URL + `/create`,
     {
      player: playerId,
      location: locationId,
      title: title,
      date: date,
      objective: objective,
      target: target,
      program:programId
      
     },
     {
      headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
     }
    )
    .then((res) => {
     message.success("Session Saved!")
     console.log("------", res)
    })
  } catch (e) {
   message.error("Something went wrong!")
   console.log("error")
  }
 }
//players
export const getPlayers = async () => {
 const result = await axios.get(API_URL2, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.players
}



//update session
export const updateSession = async (id, session) => {
 const res = await axios.put(
  API_URL + `/update/${id}`,
  {
   player: session.player,
   title: session.title,
   location: session.location,
   date: session.date,
   objective: session.objective,
   target: session.target,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.session
}
//delete Session

export const deleteSession = async (id) => {
 const res = await axios.delete(API_URL + `/delete/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.session
}

export const addFeedback = async (id, feedback, target_reached) => {
 const res = await axios.put(
  API_URL + `/feedback/${id}`,
  {
   feedback,
   target_reached,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.session
}
export const rejectSession = async (id, reason, other) => {
 const res = await axios.put(
  API_URL + `/reject/${id}`,
  {
   reason,
   other,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.session
}
export const getSessionsByPlayer = async (id) => {
 const result = await axios.get(API_URL + `/player/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 console.log(" result.data.session   :", result.data.session)
 return result.data.session
}

export const getSessions = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.session
}
export const getProgram = async () => {
  const result = await axios.get(API_URL + `/all`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  })
  return result.data.session
 }
export const getReasons = async () => {
 const result = await axios.get(API_URL + `/reasons`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.reasons
}
