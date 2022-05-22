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
   import React, { useEffect, useState, useContext } from "react"
   import { Link , useParams} from "react-router-dom"
   import { useLocation } from "react-router-dom"
   import {
    createEvents,
    getPlayers,
    getEvents,
    updateEvent,
    getEventsByPlayer,
   } from "../../../services/coachservices/events"
   import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
   
   export default function Eventform() {
    const [eventplayer, setEventplayer] = useState({})
    // const [ev, setEv] = useState({})
    const [isAssigned, setIsAssigned] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [players, setPlayers] = useState([])
    const [etatRecord, setEtatRecord] = useState(false)
    const state = useLocation();
   //  console.log("idplayer " , idplayer)
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
         location: row.location,
         start_date: row.start_date,
         final_date: row.final_date,
         state: row.state,
         details: row.details,
         id: row._id,
        }))
       )
       setLoading(false)
       setEtatRecord(false)
      } catch (e) {
       setLoading(false)
       setError(true)
      }
     }
     console.log("this is the id",state.state);
     fetchData(state.state)
    }, [etatRecord])
    //table of content
    const columns = [
     { title: "Player's Name", dataIndex: "firstname_player", key: `_id` },
     {
      title: "Coach's Name",
      dataIndex: "firstname_coach",
     },
     { title: "Label", dataIndex: "label" },
     { title: "Location", dataIndex: "state" },
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
           console.log("it works", record)
           onAssignEvent(record)
          }}
         />
         <DeleteOutlined
          className='mx-2'
          onClick={() => {
        //    onDeleteEv(record)
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
   
    const handle = (e) => {
     setEventplayer({
      ...eventplayer,
      [e.target.name]: e.target.value,
     })
    }
    const edit = async (player) => {
     try {
      await updateEvent(player.id, player)
     } catch (e) {
      message.error("Something went wrong!")
      console.log("error")
     }
    }
   
    const onFinish = (values) => {
     console.log(values)
    }
    // const onDeleteEv = (record) => {
    //  Modal.confirm({
    //   title: "Are you sure, you want to delete this event record?",
    //   okText: "Yes",
    //   okType: "danger",
    //   onOk: () => {
    //    deleteChallenge(record.id)
    //    setEtatRecord(true)
    //   },
    //  })
    // }
   
    return (
     <Dashboard>
      <div>
       <center>
        {" "}
        <h2> Details Challenges</h2>
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
          console.log(eventplayer)
          edit(eventplayer.player)
         }}
        >  
         <Form
          initialValues={eventplayer.player}
          layout='vertical'
          onFinish={onFinish}
          onClick={() => console.log(eventplayer.player.final_date)}
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
           <Input
            className='input'
            value={eventplayer.location}
            onChange={(e) => {
             eventplayer.player.location = e.target.value
             setEventplayer(eventplayer)
            }}
           />
          </Form.Item>
          <Form.Item name='state' label='State'>
           <Input
            className='input'
            value={eventplayer.state}
            onChange={(e) => {
             eventplayer.player.state = e.target.value
             setEventplayer(eventplayer)
            }}
           />
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
          <Form.Item name='start_date' label='Start Date'>
           <Input
            className='input'
            value={eventplayer.start_date}
            onChange={(e) => {
             eventplayer.player.start_date = e.target.value
             setEventplayer(eventplayer)
            }}
           />
          </Form.Item>
          <Form.Item name='final_date' label='Final Date'>
           <Input
            className='input'
            value={eventplayer.final_date}
            onChange={(e) => {
             eventplayer.player.final_date = e.target.value
             setEventplayer(eventplayer)
            }}
           />
          </Form.Item>
         </Form>
        </Modal>
       )}
      </div>
     </Dashboard>
    )
   }
   