import axios from "axios"
const API_URL = "http://localhost:5001/coach/location"
export const createLocation = async (location) => {
 const res = await axios.post(API_URL + "/create", location, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.location
}

export const updateLocation = async (id, location) => {
 const res = await axios.put(
  API_URL + `/update/${id}`,
  {
   name: location.name,
   city: location.city,
   country: location.country,
   address: location.address,
  },
  {
   headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
  }
 )

 return res.data.location
}
export const deleteLocation = async (id) => {
 const res = await axios.delete(API_URL + `/delete/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.location
}

export const getLocationById = async (id) => {
 const res = await axios.get(API_URL + `/${id}`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return res.data.location
}

export const getLocationsByCoach = async () => {
 const result = await axios.get(API_URL + `/allbycoach`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data
}
export const getLocations = async () => {
 const result = await axios.get(API_URL + `/all`, {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 return result.data
}
