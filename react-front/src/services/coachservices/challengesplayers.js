import axios from "axios"
const API_URL = "http://localhost:5001/coach/challenge"
const API_URL2 = "http://localhost:5001/coach/players/all"


export const assignChallenge = async (
 player,
 video_link,
 objective,
 start_date,
 final_date,
) => {
 const res = await axios.post(

    
  API_URL + `/assign`,
  //those are attributes found in the model changellenge
  {
   player,
   video_link,
   objective,
   start_date,
   final_date,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.challengeplayer
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
export const getChallenges = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data.challenges
}

export const updateChallenge = async (id, challenge) => {
    const res = await axios.put(
     API_URL + `/update/${id}`,
     {
        player: challenge.player,
        video_link: challenge.video_link,
        objective: challenge.objective,
        start_date: challenge.start_date,
        final_date: challenge.final_date,
     },
     {
      headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
     }
    )
   
    return res.data.challenge
   }
   export const deleteChallenge = async (id) => {
    const res = await axios.delete(API_URL + `/delete/${id}`, {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    })
    return res.data.location
   }