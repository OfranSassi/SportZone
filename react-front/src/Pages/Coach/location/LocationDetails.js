import { Layout } from "antd"
import { Content, Footer } from "antd/lib/layout/layout"
import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MenuBar from "../../../components/MenuBar"
import Subnav from "../../../components/Subnav"
import { getLocationById } from "../../../services/coachservices/locations"

function LocationDetails(props) {
 const { id } = useParams()
 const [location, setLocation] = useState({})
 const [loading, setLoading] = useState(false)
 console.log("location: ", location)
 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   const result = await getLocationById(id)
   console.log("result: ", result)
   setLocation(result)
   setLoading(false)
  }
  fetchData()
 }, [id])

 return (
  <Layout>
   <MenuBar />

   <Layout style={{ minHeight: "100vh" }}>
    <Subnav />
    <Layout className='site-layout'>
     <Content style={{ margin: "0 16px" }}>
      <div
       className='site-layout-background'
       style={{ padding: 24, minHeight: 360 }}
      >
       <h1>Détails du lieu {location.name}</h1>
       <center>
        {loading && <div>Loading ... </div>}
        {!loading && (
         <table>
          <tr>
           <td>
            <h4>Nom du lieu : </h4>
           </td>
           <td>
            <h4>{location.name}</h4>
           </td>
          </tr>
          <tr>
           <td>
            <h4>cité:</h4>
           </td>
           <td>
            <h4>{location.city}</h4>
           </td>
          </tr>
          <tr>
           <td>
            <h4>Addresse :</h4>
           </td>
           <td>
            <h4>{location.address}</h4>
           </td>
          </tr>
          <tr>
           <td>
            <h4>Pays :</h4>
           </td>
           <td>
            <h4>{location.country}</h4>
           </td>
          </tr>
         </table>
        )}
       </center>
      </div>
     </Content>
     <Footer style={{ textAlign: "center" }}>©2022</Footer>
    </Layout>
   </Layout>
  </Layout>
 )
}

export default LocationDetails
