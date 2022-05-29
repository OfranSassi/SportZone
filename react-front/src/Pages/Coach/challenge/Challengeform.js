import { Button, Table, Modal, Form, Input , message } from "antd"
import Dashboard from "../Dashboard"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
 getChallenges,
 getPlayers,
 assign
} from "../../../services/coachservices/challengesplayers.js"
import { useNavigate } from "react-router-dom"


export default function Challengeform() {
 const [challengeplayer, setChallengeplayer] = useState({})
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [challenges, setChallenges] = useState([])
 const [players, setPlayers] = useState([])
 const [playerId, setPlayerId] = useState([])
 const [start_date, setStart_date] = useState("")
 const [final_date, setFinal_date] = useState("")
 const [video_link, setVideo_link] = useState("")
 const [objective, setObjective] = useState("")
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
    setLoading(false)
    const chall = await getChallenges()
    setChallenges(
     chall.map((row) => ({
      video_link: row.video_link,
      objective: row.objective,
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
       onClick={(e) => {
        setPlayerId(record.id), onAssignChallenge(record)
       }}
       style={{ marginLeft: 12 }}
      >
       Reserve a challenge
      </Button>
      <Button
       onClick={() => {
        navigate("/coach-challenge-details/", { state: record.id })
       }}
       type='primary'
      >
       {" "}
       {
        <Link
         to={{ path: "/coach-challenge-details/", idplayer: record.id }}
        ></Link>
       }
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
 const onAssignChallenge = (record) => {
  setIsAssigned(true)
  setChallengeplayer({ ...challengeplayer, player: record._id })
 }
 const resetAssign = () => {
  setIsAssigned(false)
  setChallengeplayer(null)
 }

 return (
  <Dashboard>
   <div>
    <center>
     {" "}
     <h2> Assign Challenges</h2>
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
      title='Please choose dates and time of challenge reservation'
      visible={isAssigned}
      okText='Reserve'
      onCancel={() => {
       resetAssign()
      }}
      onOk={()=>{assign (playerId,video_link,objective,start_date,final_date);message.success("Challenge Saved!")}}
     >
      <Form layout='vertical'>
       <Form.Item name='link_video' label='Link Video' title='video_link'>
        <Input
         value={video_link}
         onChange={(e) => setVideo_link(e.target.value)}
         name='video_link'
         placeholder='Insert video link'
         type='text'
        />
       </Form.Item>
       <Form.Item name='objective' label='Objective'>
        <Input
         value={objective}
         onChange={(e) => setObjective(e.target.value)}
         name='objective'
         placeholder='Write your objective for this challenge'
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
       </Form.Item>
      </Form>
     </Modal>
    )}
   </div>
  </Dashboard>
 )
}
