// login & register & logout & get currentUser
import axios from "axios"
const API_URL = "http://localhost:5001/"
export const register = async (email, password, firstname, lastname) => {
 const res = await axios.post(
  API_URL + "register/coach",
  {
   email,
   password,
   firstname,
   lastname,
   role:"coach"
  },
  {
   headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
   },
  }
 )
 return res.data.coach
}

export const login = async (email, password) => {
 const res = await axios.post(
  API_URL + "login/coach",
  { email, password },
  {
   headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
   },
  }
 )
 localStorage.setItem("token", res.data.token)
 //localStorage.setItem("user", res.data.user);
 console.log(res.data.token)
 console.log(res.data.user)
 return res.data.token
}
export const logout = () => {
 localStorage.removeItem("token")
}
export const getCurrentUser = async () => {
 try {
  const res = await axios.get(API_URL + "currentUser", {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  })
  return res.data.user
 } catch (error) {
  return null
 }
}
