import axios from "axios"
const API_URL = "http://localhost:5001/player/challenge"

//done challenges
export const doneChallenge = async (id) => {
 const res = await axios.put(
  API_URL + `/done/${id}`,
  {},

  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.challengeplayer
}

//challenges
export const getChallengesByUser = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.challengeplayer
}
