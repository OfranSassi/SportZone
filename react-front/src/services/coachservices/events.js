import axios from "axios"
const API_URL = "http://localhost:5001/coach/events"
const API_URL2 = "http://localhost:5001/coach/players/all"



export const createEvents = async (
    player,
    label,
    start_date,
    final_date,
    location,
    state,
    details
) => {
 const res = await axios.post(

    
  API_URL + `/assign`,
  //those are attributes found in the model changellenge
  {
   player,
   label,
   start_date,
   final_date,
   location,
   state,
   details
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )
//name of the modal bellow
 return res.data.events
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
    return result.data.events
   }
   
   export const updateEvent = async (id, event) => {
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