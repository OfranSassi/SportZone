import axios from "axios"
import { message } from "antd"
const API_URL = "http://localhost:5001/coach/events"
const API_URL2 = "http://localhost:5001/coach/players/all"

export const createEvents = async (
 playerId,
 label,
 locationId,
 state,
 details,
 start_date,
 final_date
) => {
 const res = await axios.post(
  //    API_URL + `/create`,
  API_URL + `/assign`,
  {
   //here continue....
   //comment
   //    player: playerId,
   //    coach: "",
   //    label: label,
   //    location: locationId,
   //    state: state,
   //    details: details,
   //    start_date: start_date,
   //    final_date: final_date,
   playerId,
   label,
   locationId,
   state,
   details,
   start_date,
   final_date,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )
 //   .then((res) => {
 //    message.success("Event Saved!")
 //    console.log("------", res)
 //   })
 //  //name of the modal bellow
 return res.data.events
}

export const assign = async (
 playerId,
 label,
 locationId,
 state,
 details,
 start_date,
 final_date
) => {
 try {
  await axios
   .post(
    API_URL + `/create`,
    {
     player: playerId,
     label: label,
     location: locationId,
     state: state,
     details: details,
     start_date: start_date,
     final_date: final_date,
    },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    }
   )
   .then((res) => {
    message.success("Event Saved!")
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
//challenges
export const getEvents = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.events
}

export const getEventsByPlayer = async (id) => {
 const result = await axios.get(API_URL + `/player/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 console.log(" result.data.events   :", result.data.events)
 return result.data.events
}

export const updateEvent = async (id, event) => {
 console.log("plauer location :", event)
 const res = await axios.put(
  API_URL + `/update/${id}`,
  {
   player: event.player,
   label: event.label,
   location: event.location,
   state: event.state,
   details: event.details,
   start_date: event.start_date,
   final_date: event.final_date,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.events
}

export const deleteEvents = async (id) => {
 const res = await axios.delete(API_URL + `/delete/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.events
}

export const playerParticipating = async (participating) => {
 const res = await axios
  .post(
   API_URL + `/create`,
   {
    //here continue....
    participating: participating,
   },
   {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
   }
  )
  .then((res) => {
   message.success("Participation Saved!")
   console.log("------", res)
  })
 //name of the modal bellow
 return res.data.events
}
