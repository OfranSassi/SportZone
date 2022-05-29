import { message } from "antd"
import axios from "axios"
const API_URL = "http://localhost:5001/coach/challenge"
const API_URL2 = "http://localhost:5001/coach/players/all"
// const API_URL3 = "http://localhost:5001/coach/challenge/update/:id"

export const assignChallenge = async (
 player,
 video_link,
 objective,
 start_date,
 final_date
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

export const assign = async (playerId,video_link,objective,start_date,final_date ) => {
  try {

   await axios.post(
     API_URL + `/create`,
    {
     player: playerId,
     video_link: video_link,
     objective: objective,
     start_date: start_date,
     final_date: final_date,
    },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    }
   ).then((res) => {
    //message.success("Challenge Saved!")
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

//challenges by player
export const getChallengesByPlayer = async (id) => {
  const result = await axios.get(API_URL + `/player/${id}`, {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  })
  return result.data.challenges
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

 return res.data.challenges
}
export const deleteChallenge = async (id) => {
 const res = await axios.delete(API_URL + `/delete/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.challenges
}
