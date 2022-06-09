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
 const [session, setSession] = useState([])
 const [players, setPlayers] = useState([])
 const [title, setTitle] = useState("")
 const [objective, setObjective] = useState("")
 const [date, setDate] = useState([""])
 const [target, setTarget] = useState("")
 const [prefix1, setPrefix1] = useState("")
 const [prefix2, setPrefix2] = useState("")

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
    console.log("1")
    //this is session
    setLoading(false)
    const sess = await getSessions()
    console.log("Session : ", sess)
    setSession(
     sess.map((row) => ({
      firstname_player:
      row.player == undefined ? "" : row.player["firstname"],
       title: row.title,
       date : row.date,
       location: row.location == undefined ? "" : row.location["name"],
       objective: row.objective,
       target:row.target,
       id: row._id,
    //   title: row.title== undefined ? "" :row.title,
    //   date: row.date== undefined ? "" :row.date,
    //   target: row.target== undefined ? "" :row.target,
    //   location: row.location["name"]== undefined ? "" : row.location["name"],
    //  // program: row.program,
    //   objective: row.objective == undefined ? "" : row.objective,
    //  // id: row._id,
     }))
    )
    console.log("2")
    //callilng for LOCATION fields
    setLoading(false)
    const loc = await getLocations()
    setLocation(
     loc.map((row) => ({
      name: row.name,
      city: row.city,
      country: row.country,
      address: row.address,
      id: row._id,
     }))
    )
    console.log("3")
   } catch (e) {
    // console.log("e : ", e)
    setLoading(false)
    setError(true)
   }
  }

  fetchData()
 }, [etatRecord])

 //table of content
 const columns = [
  { title: "Title", dataIndex: "title"  },
  { title: "Player", dataIndex: "firstname", key: `_id`  },
  { title: "Date", dataIndex: "date" },
  {title: "Location", dataIndex: "name" ,key: `_id` },
  { title: "Objective", dataIndex: "objective" },
  { title: "Target", dataIndex: "target" },

  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      {/* <EditOutlined
       className='mx-2'
       onClick={(e) => {
        onAssignSession(record)
       }}
      /> */}
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

  // const handleChange = (e) => {
  //  // ({ value });
  //  setPrefix1(e)
  // }
  const handleChangeSelect2 = (e) => {
    setPlayerId(e)
   }
 const handleChangeSelect = (e) => {
  setLocationId(e)
 }

 const onFinish = () => {
  setIsAssigned(false)
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
 const assign = async (sess) => {
  try {
   await createSession(    
    title,
    playerId,
    // date,
    date || moment(new Date()).format("YYYY-MM-DD HH:mm:ss'"),
    locationId,
    objective,
    target
   )
  } catch (e) {
   console.log("error")
  }
 }



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
      // id={record.id.slice(4)}
     type='primary'
     id="makeSession"
     onClick={(record) => {
      setPlayerId(record.id), 
      onAssignSession(record),
      setEtatRecord(true)
      setIsAssigned(true)
     }}
     style={{ marginLeft: 12 }}
    >
     Create a Session
    </Button>

    {!loading && (
     <Table
      
      onChange={onChange}
      columns={columns}
      dataSource={session}
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
      // onOk={() => {
      //  assign(title, playerId, date, locationId, objective, target)
      //  message.success("Event Saved!")
      // }}
       onOk={assign}
     >
      <Form layout='vertical' >
       <Form.Item name='title' label='Name of the Title'>
        <Input
         value={title}
         id="title"
         onChange={(e) => setTitle(e.target.value)}
         name='title'
         placeholder='Workout Session'
         type='text'
        />
       </Form.Item>

       <Form.Item label='Player'>
        <Select
         placeholder='Select Player'
         style={{ width: "50%" }}
         id="player"
         //  onClick={() => {
         //   onAssignSession(item)
         //  }}
        //  onChange={(key) =>
        //   setLocationId(players.find((c) => c.firstname == key).id)
        //  }
        onChange={(key) =>
          handleChangeSelect2(players.find((c) => c.firstname == key).id)
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
       <Form.Item name='DatePicker' {...config} label='Session Date'>
       <DatePicker 
  
       id="DatePicker"
       showTime={{ format: 'HH:mm' }}
       format="YYYY-MM-DD HH:mm"    
       value={date}    
       onChange={(e) => setDate(e)}
       name='DatePicker'
       required='true'

      //  onChange={onChange} onOk={onOk}
        />
    
        {/* <DatePicker
        id='date'
         showTime
         format='YYYY-MM-DD HH:mm:ss'
         style={{
          width: "100%",
         }}
         value={date}
         onChange={(e) => setDate(e.target.value)}
        //  onOk={(e) => setDate(e)}
         required='true'
        /> */}
       </Form.Item>
       <Form.Item label='Location'>
        <Select
         placeholder='Select location'
         style={{ width: "50%" }}
         id="selectLocation"
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
         id="objective"
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
         type='text'
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
         type='text'
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
