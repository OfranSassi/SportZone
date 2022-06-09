import { Button, Table, Modal, Form, Input, Select,message } from "antd"
import Dashboard from "../Dashboard"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
 getEvents,
 getPlayers,
 createEvents,
 assign
} from "../../../services/coachservices/events"
import {
 getLocationsByCoach,
 getLocations,
 getLocationById,
} from "../../../services/coachservices/locations"
import moment from "moment"

export default function Coachevent() {
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [events, setEvents] = useState([])
 const [players, setPlayers] = useState([])
 const [label, setLabel] = useState("")
 const [start_date, setStart_date] = useState("")
 const [final_date, setFinal_date] = useState("")
 const [state, setState] = useState("")
 const [details, setDetails] = useState("")
 const [playerId, setPlayerId] = useState([])
 const [locationId, setLocationId] = useState([])
 const [location, setLocation] = useState([]) 
 const [etatRecord, setEtatRecord] = useState(false)
 const navigate = useNavigate()
 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   try {
    const plyrs = await getPlayers()
    setPlayers(
     plyrs.map((row) => ({
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      isactive: row.isactive,
      id: row._id,
     }))
    )
    //instead of chall is event
    setLoading(false)
    const event = await getEvents()
    setEvents(
     event.map((row) => ({
      label: row.label,
      start_date: row.start_date,
      final_date: row.final_date,
      location: row.location,
      state: row.state,
      details: row.details,
      id: row._id,
     }))
    )
    //callilng for LOCATION fields
    setLoading(false)
    const location = await getLocations()
    setLocation(
     location.map((row) => ({
      name: row.name,
      city: row.city,
      country: row.country,
      address: row.address,
      id: row._id,
     }))
    )
   } catch (e) {
    setLoading(false)
    setError(true)
   }
  }
  fetchData()
 }, [etatRecord])
 //table of content
 const columns = [
  { title: "Player's Name", dataIndex: "firstname", key: `_id` },
  {
   title: "Player's Surname",
   dataIndex: "lastname",
  },
  { title: "Email", dataIndex: "email" },

  {
   title: "Status",
   dataIndex: "isactive",
   render: (isactive) => {
    return <p>{isactive ? "Active" : "Inactive"}</p>
   },
   filters: [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
   ],
   onFilter: (value, record) => {
    return record.isactive === value
   },
  },

  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <Button
       type='primary'
       id={record.id.slice(4)}
       onClick={() => {
        setPlayerId(record.id), onAssignEvents(record), setEtatRecord(true)
       }}
       style={{ marginLeft: 12 }}

      >
       Create an Event
      </Button>
      <Button
       onClick={() => {
        navigate(
         "/coach/events/details",
         { state: record.id },
         { stateloc: record.location }
        )
       }}
       type='primary'
      >
       {" "}
       Details
      </Button>
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
 const handleChangeDate = (e) => {
  setEvents({
   ...setEvents,
   start_date: e[0].format(),
   final_date: e[1].format(),
  })
 }

 const handleChangeSelect = (e) => {
  setLocationId(e)
 }
 const onFinish = () => {
setIsAssigned(false)
 }
//  const assign = async (event) => {
//   try {
//    await createEvents(
//     playerId,
//     label,
//     start_date || moment(new Date()).format("YYYY-MM-DD"),
//     final_date || moment(new Date()).format("YYYY-MM-DD"),
//     locationId,
//     state,
//     details
//    )
//   } catch (e) {
//    console.log("error")
//   }
//  }

 return (
  <Dashboard>
   <div>
    <center>
     {" "}
     <h2> Create and Event</h2>
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

    {isAssigned &&
      (
      <Modal
      //  value={item._id}
       title='Make an Event'
       visible={isAssigned}
       okText='Save'
      //  onClick={item._id}
       onCancel={() => {
        resetAssign()
       }}
       onOk={()=>{assign (
        playerId,
        label,
        locationId,
        state,
        details,
        start_date,
        final_date
         );message.success("Event Saved!");onFinish()}}     
      >
       <Form layout='vertical' >
        <Form.Item name='label' label='Name of the Event'>
         <Input
          value={label}
          id="label1"
          onChange={(e) => setLabel(e.target.value)}
          // name='label'
          placeholder='friendly match'
          type='text'
         />
        </Form.Item>
        <Form.Item name='datePicker'>
         <Input
          type='date'
          id='StartDate'
          value={start_date}
          onChange={(e) => setStart_date(e.target.value)}
          required='true'
         />
         <Input
          type='date'
          id='FinalDate'
          value={final_date}
          onChange={(e) => setFinal_date(e.target.value)}
          required='true'
         />
         <Form.Item label='Location'>
          <Select
           placeholder='Select location'
           style={{ width: "50%" }}
           id="selectLocation"
          //  onClick={() => {
          //   onAssignEvents(item)
          //  }}
           onChange={(key) =>
            handleChangeSelect(location.find((c) => c.name == key).id)
           }
          >
           {location.map((item) => {
            return (
             <Select.Option key={item._id} value={item.name}>
              {item.name}
             </Select.Option>
            )
           })}
          </Select>
         </Form.Item>
         <Form.Item name='State' label='State'>
          <Select
          placeholder='Select State Event'        
           style={{ width: "50%" }}
           id='selectState'
           value={state}
           onChange={(value) => {setState(value)}}
          >
           <Select.Option value=''>Choose</Select.Option>
           <Select.Option value='Public'>Public</Select.Option>
           <Select.Option value='Private'>Private</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item name='details' label='Details'>
          <Input
           value={details}
           onChange={(e) => setDetails(e.target.value)}
           name='details'
           type='text'
          />
         </Form.Item>
        </Form.Item>
       </Form>
      </Modal>
     )}
   </div>
  </Dashboard>
 )
}
