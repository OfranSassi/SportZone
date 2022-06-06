import {
 Button,
 Table,
 Modal,
 Form,
 Input,
 Select,
 DatePicker,
 message,
} from "antd"
import Dashboard from "../Dashboard"
import React, { useEffect, useState } from "react"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

import { useNavigate } from "react-router-dom"
import {
 getPlayers,
 assign,
 createSession,
 getSessions,
 updateSession,
 deleteSession,
} from "../../../services/coachservices/sessionRF"
import {
 getLocationsByCoach,
 getLocations,
 getLocationById,
} from "../../../services/coachservices/locations"
import moment from "moment"
const { Option } = Select

export default function Sessions() {
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [players, setPlayers] = useState([])
 const [session, setSession] = useState([])
 const [title, setTitle] = useState("")
 const [objective, setObjective] = useState("")
 const [date, setDate] = useState("")
 const [target, setTarget] = useState("")
 const [prefix1, setPrefix1] = useState("")
 const [prefix2, setPrefix2] = useState()

 const [program, setProgram] = useState("")
 const [playerId, setPlayerId] = useState([])
 const [locationId, setLocationId] = useState([])
 const [location, setLocation] = useState([])

 //  const [prefix2, setPrefix2] = useState()
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
    //this is session
    setLoading(false)
    const sess = await getSessions()
    console.log("Session : ", sess)
    setSession(
     sess.map((row) => ({
      title: row.title,
      date: row.date,
      target: row.target,
      location: row.location["name"],
      program: row.program,
      objective: row.objective,
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
    // console.log("e : ", e)
    setLoading(false)
    setError(true)
   }
  }

  fetchData()
 }, [])

 //table of content
 const columns = [
  { title: "Title", dataIndex: "title" },
  { title: "Player", dataIndex: "firstname_player", key: `_id` },
  { title: "Date", dataIndex: "date" },
  { title: "Location", dataIndex: "name", key: `_id` },
  { title: "Objective", dataIndex: "objective" },
  { title: "Target", dataIndex: "target" },

  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <EditOutlined
       className='mx-2'
       onClick={(e) => {
        onAssignSession(record)
       }}
      />
      <DeleteOutlined
       className='mx-2'
       onClick={() => {
        onDeleteSession(record)
       }}
       style={{ color: "red", marginLeft: 12 }}
      />
     </>
    )
   },
  },
 ]

 const onDeleteSession = (record) => {
  Modal.confirm({
   title: "Are you sure, you want to delete this challenge record?",
   okText: "Yes",
   okType: "danger",
   onOk: () => {
    deleteSession(record.id)
    setEtatRecord(true)
   },
  })
 }
 function onChange(filters, dataIndex) {
  console.log("params", filters, dataIndex)
 }
 const onAssignSession = (record) => {
  setIsAssigned(true)
  setSession({ ...session, player: record._id })
 }
 const resetAssign = () => {
  setIsAssigned(false)
  setSession(null)
 }
 //  const handleChangeDate = (e) => {
 //   setSession({
 //    ...setSession,
 //    start_date: e[0].format(),
 //    final_date: e[1].format(),
 //   })
 //  }

 //  const handleChange = (e) => {
 //   // ({ value });
 //   setPrefix1(e)
 //  }

 const handleChangeSelect = (e) => {
  setLocationId(e)
 }
 const onFinish = (values) => {
  console.log(values)
 }
 //  const assign = async (session) => {
 //   try {
 //    await createSession(
 //     playerId,
 //     title,
 //     date,
 //     locationId,
 //     objective,
 //     target
 //    )
 //   } catch (e) {
 //    console.log("error")
 //   }
 //  }
 //congif and prefixSelector above
 const config = {
  rules: [
   {
    type: "object",
    required: true,
    message: "Please select time!",
   },
  ],
 }

 const prefixSelector = (
  <Form.Item name='prefix1' noStyle>
   <Select
    defaultValue='Km'
    name='prefix1'
    id='prefix1'
  
    style={{
     width: 70,
    }}
      value={prefix1}
    onChange={(e) => setPrefix1(e.target.value)}
   >
    {" "}
    <Option value='Km'>Km</Option>
    <Option value='m'>m</Option>
   </Select>
  </Form.Item>
 )

 const prefixTimer = (
  <Form.Item name='prefix2' noStyle>
   <Select
    value={prefix2}
    style={{
     width: 70,
    }}
    onChange={(e) => setPrefix2(e.target.value)}
    name='prefix2'
   >
    {" "}
    <Select.Option value='hr'>hr</Select.Option>
    <Select.Option value='min'>min</Select.Option>
    <Select.Option value='sec'>sec</Select.Option>
   </Select>
  </Form.Item>
 )
 return (
  <Dashboard>
   <div>
    <center>
     {" "}
     <h2> Create a Session</h2>
    </center>
    {loading && <div>Loading ... </div>}
    {error && <div>Error....</div>}
    <Button
     type='primary'
     onClick={() => {
      setIsAssigned(true)
     }}
     style={{ marginLeft: 12 }}
    >
     Create a Session
    </Button>

    {!loading && (
     <Table
      rowKey={Math.random()}
      onChange={onChange}
      columns={columns}
      dataSource={session}
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

    {isAssigned && (
     <Modal
      //  value={item._id}
      title='Make a Session'
      visible={isAssigned}
      okText='Save'
      //  onClick={item._id}
      onCancel={() => {
       resetAssign()
      }}
      onOk={() => {
       assign(title, playerId, date, locationId, objective, target)
       message.success("Event Saved!")
      }}
      //  onOk={assign}
     >
      <Form layout='vertical' onFinish={onFinish}>
       <Form.Item name='title' label='Name of the Title'>
        <Input
         value={title}
         onChange={(e) => setTitle(e.target.value)}
         name='title'
         placeholder='friendly match'
         type='text'
        />
       </Form.Item>

       <Form.Item label='Player'>
        <Select
         placeholder='Select Player'
         style={{ width: "50%" }}
         //  onClick={() => {
         //   onAssignSession(item)
         //  }}
         onChange={(key) =>
          setLocationId(players.find((c) => c.firstname == key).id)
         }
        >
         {players.map((item) => {
          return (
           <Select.Option key={item._id} value={item.firstname}>
            {item.firstname}
           </Select.Option>
          )
         })}
        </Select>
       </Form.Item>
       <Form.Item title='DatePicker' {...config} label='Session Date'>
        <DatePicker
         showTime
         format='YYYY-MM-DD HH:mm:ss'
         style={{
          width: "100%",
         }}
         value={date}
         onOk={(e) => setDate(e)}
         required='true'
        />
       </Form.Item>
       <Form.Item label='Location'>
        <Select
         placeholder='Select location'
         style={{ width: "50%" }}
         //  onClick={() => {
         //   onAssignSession(item)
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

       <Form.Item name='objective' label='Objective'>
        <Input
         value={objective}
         onChange={(e) => setObjective(e.target.value)}
         name='details'
         type='text'
        />
       </Form.Item>
       <Form.Item name='target' label='Goal to Reach: Make'>
        <Input
         addonAfter={prefixSelector}
         value={target}
         onChange={(e) => {
          setTarget(e.target.value + " " + prefix1)
         }}
         style={{
          width: "100%",
         }}
        />
       </Form.Item>



       <Form.Item name='time' label='in '>
        <Input
         addonAfter={prefixTimer}
         value={target}
         onChange={(e) => {
          setTarget(e.target.value + " " + prefix2)
         }}
     
         style={{
          width: "100%",
         }}
        />
       </Form.Item>
       <Form.Item
        name='program'
        title='Program '
        label='Program of the Session'
       >
        <Select placeholder='select program for session'>
         <Option value='programme1'>programme1</Option>
         <Option value='programme2'>programme2</Option>
         <Option value='programme3'>programme3</Option>
         <Option value='programme4'>programme4</Option>
         <Option value='programme5'>programme5</Option>
        </Select>
       </Form.Item>
      </Form>
     </Modal>
    )}
   </div>
  </Dashboard>
 )
}
