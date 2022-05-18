import axios from "axios"
const API_URL = "http://localhost:5001/coach/session"

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

export const getSessions = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.sessions
}
export const getReasons = async () => {
 const result = await axios.get(API_URL + `/reasons`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.reasons
}
