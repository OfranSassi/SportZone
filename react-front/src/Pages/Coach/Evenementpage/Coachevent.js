import {
 Button,
 Table,
 Modal,
 DatePicker,
 message,
 Form,
 Input,
} from "antd"
import Dashboard from "../Dashboard"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
 getEvents,
 getPlayers,
} from "../../../services/coachservices/events"

export default function Coachevent() {
 const [challengeplayer, setChallengeplayer] = useState({})
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 //  const [challenges, setChallenges] = useState([])
 const [events, setEvents] = useState([])
 const [players, setPlayers] = useState([])
 const [label, setLabel] = useState("")
 const [start_date, setStart_date] = useState("")
 const [final_date, setFinal_date] = useState("")
 const [location, setLocation] = useState("")
 const [state, setState] = useState("")
 const [details, setDetails] = useState("")

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
   } catch (e) {
    setLoading(false)
    setError(true)
   }
  }
  fetchData()
 }, [])
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
       onClick={() => {
        onAssignEvents(record)
       }}
       style={{ marginLeft: 12 }}
      >
       Create an Event
      </Button>
      <Button type='primary'>
        <Link to='/coach/events/all'>Details</Link>
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
 const handle = (e) => {
  setEvents({
   ...events,
   [e.target.label]: e.target.value,
   // [e.target.objective]: e.target.value,
   // video_link: e.target.value,
   // objective: e.target.value,
  })
 }
 const assign = async (event) => {
  try {
    
   await Axios.post(
    "http://localhost:5001/coach/events/create",
    {
     body: {
      player: "622e27b7c1fc0d158b722c38",
      label,
      start_date,
      final_date,
      location,
      state,
      details,
     },
    },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
    }
   ).then((res) => {
    console.log("------", res)
   })
  } catch (e) {
   console.log("error")
  }
 }

 console.log(label)
 console.log(start_date)
 console.log(final_date)
 console.log(location)
 console.log(state)
 console.log(details)

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
      bordered
     ></Table>
    )}

    {isAssigned && players.map((item) =>(
     <Modal
     value={item._id}
      title='Make an Event'
      visible={isAssigned}
      okText='Save'
      onClick={item._id}
      onCancel={() => {
       resetAssign()
      }}
      // onOk={twoCallsAgain}
      onOk={assign}
     >
      <Form layout='vertical'>
       {/*       
       {challenges.map((chall) => (
           <div> */}
       <Form.Item name='label' label='Name of the Event'>
        <Input
         value={label}
         //  onChange={(e) => handle(e)}
         onChange={(e) => setLabel(e.target.value)}
         name='label'
         placeholder='friendly match'
         type='text'
        />
       </Form.Item>
       <Form.Item name='datePicker'>
        <input
         type='date'
         name='Start Date'
         value={start_date}
         onChange={(e) => setStart_date(e.target.value)}
        />
        <input
         type='date'
         name='Final Date'
         value={final_date}
         onChange={(e) => setFinal_date(e.target.value)}
        />
      <Form.Item name='location' label='Location'>
        <Input
         value={location}
         onChange={(e) => setLocation(e.target.value)}
         name='location'
         placeholder='where will the event take place?'
         type='text'
        />
       </Form.Item>
       <Form.Item label='State'>
     <select
      name='State'
      value={state}
      onChange={(e) => setState(e.target.value)}
     >
      <option value='public'>Public</option>
      <option value='private'>Private </option>
     </select>
    </Form.Item>
    <Form.Item name='details' label='Details'>
        <Input
         value={details}
         //  onChange={(e) => handle(e)}
         onChange={(e) => setDetails(e.target.value)}
         name='details'
         type='text'
        />
       </Form.Item>
       </Form.Item>
      </Form>
     </Modal>
    ))}
   </div>
  </Dashboard>
 )
}
