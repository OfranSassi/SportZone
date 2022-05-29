import { Table, Modal, Form, Input, Select , message} from "antd"
import Dashboard from "../Dashboard"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {
 updateEvent,
 deleteEvents,
 getEventsByPlayer,
} from "../../../services/coachservices/events"
import { getLocations } from "../../../services/coachservices/locations"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function Eventform() {
 const [eventplayer, setEventplayer] = useState({})
 const [states, setStates] = useState({})
 const [date1, setDate1] = useState({})
 const [date2, setDate2] = useState({})
 const [location, setLocation] = useState([])
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [players, setPlayers] = useState([])
 const [etatRecord, setEtatRecord] = useState(false)
 const [locationId, setLocationId] = useState([])
 const state = useLocation()

 useEffect(() => {
  const fetchData = async (idplayer) => {
   setLoading(true)
   try {
    const plyrs = await getEventsByPlayer(idplayer)
    setPlayers(
     plyrs.map((row) => ({
      firstname_coach: row.coach["firstname"],
      firstname_player:
       row.player == undefined ? "" : row.player["firstname"],
      label: row.label,
      location: row.location == undefined ? "" : row.location["name"],
      start_date: row.start_date,
      final_date: row.final_date,
      state: row.state,
      details: row.details,
      id: row._id,
     }))
    )

    setLoading(false)
    setEtatRecord(false)
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

  fetchData(state.state)

  if (!players) {
   setLocationId(players.location)
   setStates(players.state)
   setDate1(players.start_date)
   setDate2(players.final_date)
  }
 }, [etatRecord])

 const handleChangeSelect = (e) => {
  setLocationId(e)
 }
 //table of content 
 const columns = [
  { title: "Player's Name", dataIndex: "firstname_player", key: `_id` },
  {
   title: "Coach's Name",
   dataIndex: "firstname_coach",
  },
  { title: "Label", dataIndex: "label" },
  { title: "Location", dataIndex: "location" },
  { title: "State", dataIndex: "state" },
  { title: "Details", dataIndex: "details" },
  { title: "Start Date", dataIndex: "start_date" },
  { title: "Final Date", dataIndex: "final_date" },

  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <EditOutlined
       className='mx-2'
       onClick={(e) => {
        onAssignEvent(record)
       }}
      />
      <DeleteOutlined
       className='mx-2'
       onClick={() => {
        onDeleteEv(record)
       }}
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
 const onAssignEvent = (record) => {
  setIsAssigned(true)
  setEventplayer({ ...eventplayer, player: record })
 }
 const resetAssign = () => {
  setIsAssigned(false)
  setEventplayer(null)
 }

 const edit = async (player) => {
  try {
   player.location = locationId
   player.state = states
   player.start_date = date1
   await updateEvent(player.id, player)
  } catch (e) {
   message.error("Something went wrong!")
   console.log("error")
  }
 }

 const onFinish = (values) => {
  console.log(values)
 }

 const onDeleteEv = (record) => {
  Modal.confirm({
   title: "Are you sure, you want to delete this event record?",
   okText: "Yes",
   okType: "danger",
   onOk: () => {
    deleteEvents(record.id)
    setEtatRecord(true)
   },
  })
 }

 return (
  <Dashboard>
   <div>
    <center>
     {" "}
     <h2> Details Events</h2>
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

    {isAssigned && (
     <Modal
      title='Edit Challenge'
      visible={isAssigned}
      okText='Save'
      onCancel={() => {
       resetAssign()
      }}
      onOk={() => {
       edit(eventplayer.player)
       setEtatRecord(true)
      }}
     >
      <Form
       initialValues={eventplayer.player}
       layout='vertical'
       onFinish={onFinish}
      >
       <Form.Item name='label' label='Label'>
        <Input
         className='input'
         value={eventplayer.label}
         onChange={(e) => {
          eventplayer.player.label = e.target.value
          setEventplayer(eventplayer)
         }}
        />
       </Form.Item>
       <Form.Item name='location' label='Location'>
        <Select
         placeholder='Select location'
         style={{ width: "50%" }}
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
       <Form.Item name='state' label='State'>
        <select
         name='State'
         value={state}
         onChange={(e) => {
          setStates(e.target.value)
         }}
        >
         <option value=''>Choose</option>
         <option value='public'>Public</option>
         <option value='private'>Private </option>
        </select>
       </Form.Item>
       <Form.Item name='details' label='Details'>
        <Input
         className='input'
         value={eventplayer.details}
         onChange={(e) => {
          eventplayer.player.details = e.target.value
          setEventplayer(eventplayer)
         }}
        />
       </Form.Item>
       <Form.Item name='datePicker'>
        <input
         type='date'
         name='Start Date'
         value={eventplayer.start_date}
         onChange={(e) => {
          setDate1(e.target.value)
         }}
         required
        />
        <input
         type='date'
         name='Final Date'
         value={eventplayer.final_date}
         onChange={(e) => {
          setDate2(e.target.value)
         }}
         required
        />
       </Form.Item>
      </Form>
     </Modal>
    )}
   </div>
  </Dashboard>
 )
}
