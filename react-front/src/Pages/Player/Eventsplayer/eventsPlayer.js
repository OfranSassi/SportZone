import { Button, Table, Modal, Form, Input, Select , Typography} from "antd"
import Dashboard from "../../Coach/Dashboard"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
 getEvents,
 getPlayers,
 assign2,
 getALLEventsPlayer,
} from "../../../services/coachservices/events"
import { getLocations } from "../../../services/coachservices/locations"
import moment from "moment"
import { CheckOutlined, CloseOutlined  } from "@ant-design/icons"


export default function Coachevent() {
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [events, setEvents] = useState([])
 const [participating, setParticipating] = useState("")
 const [status, setStatus] = useState("")
 const [etatRecord, setEtatRecord] = useState(false)
 const [locationId, setLocationId] = useState([])
 const [location, setLocation] = useState([])
 const [players, setPlayers] = useState([])
 const navigate = useNavigate()
 useEffect(() => {
  const fetchData = async (idplayer) => {
   setLoading(true)
   try {
    const plyrs = await getALLEventsPlayer()
    setPlayers(
     plyrs.map((row) => ({
      firstname_coach: row.coach["firstname"],
      email_coach: row.coach["email"],
      label: row.label,
      start_date: row.start_date,
      final_date: row.final_date,
      location: row.location["name"],
      state: row.state,
      details: row.details,
      participating: row.participating,
      id: row._id,
     }))
    )
    //callilng for LOCATION fields
    setLoading(false)
    setEtatRecord(false)
   
   } catch (e) {
    setLoading(false)
    setError(true)
   }
  }
  fetchData(location.state)
 }, [etatRecord])

const AssignParticipation = async (id , status) => {

await assign2(id ,status)
setEtatRecord(true)
}

 //table of content
 const columns = [
  { title: "Participation", dataIndex:"participating", 

 
},

  { title: "Coach's Name", dataIndex: "firstname_coach", key: `_id` },
  {
   title: "Coach's Email",
   dataIndex: "email_coach",
  },
  { title: "Label", dataIndex: "label" },
  { title: "Location", dataIndex: "location" },
  { title: "State", dataIndex: "state" },
  { title: "Details", dataIndex: "details" },
  { title: "Start Date", dataIndex: "start_date" },
  { title: "Final Date", dataIndex: "final_date" },
  { title: "Action", 
  render: (record) => {
    return (
     <>
     
      <Button
      icon={(<CheckOutlined />)}
      id="checkIcon"
       className='mx-2'
      //  disabled ={record.participating=="ACCEPTED" ?false:true}
      disabled ={record.participating=="REFUSED" || record.participating=="PENDING" ?false:true} 
      style={{ color: "green", marginLeft: 12 }}
       onClick={(e ) => {
       
       AssignParticipation(record.id ,"ACCEPTED") 
       }}
    

     />
      <Button 
       icon={(<CloseOutlined />)}
      id="refuseIcon"
       className='mx-2'
       onClick={(e) => {
        AssignParticipation(record.id ,"REFUSED")
       }}
       disabled ={record.participating=="ACCEPTED" || record.participating=="PENDING" ?false:true   }       
       style={{ color: "red", marginLeft: 12 }}
      />
     </>
    )
   },





},

 ]
 function onChange(filters, dataIndex) {
  console.log("params", filters, dataIndex)
 }
 const onAssignEvents = (record) => {
  setIsAssigned(true)
  setEvents({ ...events, player: record._id })
 }
 const resetAssign = () => {
  setIsAssigned(false)
  setEvents(null)
 }



 const onFinish = () => {
  setIsAssigned(false)
   }

 return (
  <Dashboard>
   <div>
    <center>
     {" "}
     <h2> My Events</h2>
    </center>
    {loading && <div>Loading ... </div>}
    {error && <div>Error....</div>}
    {!loading && (
     <Table
      onChange={onChange}
      columns={columns}
      dataSource={players}
      rowKey={Math.random()}
      pagination={{
       current: page,
       pageSize: pageSize,
       onChange: (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
       },
      }}
     ></Table>
    )}

    
   </div>
  </Dashboard>
 )
}
