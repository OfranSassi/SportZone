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
 assignChallenge,
 getChallenges,
 getChallengesByPlayer,
 updateChallenge,
 deleteChallenge,
 getPlayers,
} from "../../../services/coachservices/challengesplayers.js"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

export default function Challengeform() {
 const [challengeplayer, setChallengeplayer] = useState({})
 const [isAssigned, setIsAssigned] = useState(false)
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [players, setPlayers] = useState([])
 const [etatRecord, setEtatRecord] = useState(false)
 const location = useLocation();
//  console.log("idplayer " , idplayer)
 useEffect(() => {

  const fetchData = async (idplayer) => {
   setLoading(true)
   try {
    const plyrs = await getChallengesByPlayer(idplayer)
    setPlayers(
     plyrs.map((row) => ({
      firstname_coach: row.coach["firstname"],
      firstname_player:
      row.player == undefined ? "" : row.player["firstname"],
      video_link: row.video_link,
      objective: row.objective,
      start_date: row.start_date,
      final_date: row.final_date,
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

  fetchData(location.state)
 }, [etatRecord])
 //table of content
 const columns = [
  { title: "Player's Name", dataIndex: "firstname_player", key: `_id` },
  {
   title: "Coach's Name",
   dataIndex: "firstname_coach",
  },
  { title: "Link Video", dataIndex: "video_link" },
  { title: "Objective", dataIndex: "objective" },
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
        onAssignChallenge(record)
       }}
      />
      <DeleteOutlined
       className='mx-2'
       onClick={() => {
        onDeleteChall(record)
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
 const onAssignChallenge = (record) => {
  setIsAssigned(true)
  setChallengeplayer({ ...challengeplayer, player: record })
 }
 const resetAssign = () => {
  setIsAssigned(false)
  setChallengeplayer(null)
 }

 const handle = (e) => {
  setChallengeplayer({
   ...challengeplayer,
   [e.target.name]: e.target.value,
  })
 }
 const edit = async (player) => {
  try {
   await updateChallenge(player.id, player)
  } catch (e) {
   message.error("Something went wrong!")
   console.log("error")
  }
 }

 const onFinish = (values) => {
  console.log(values)
 }
 const onDeleteChall = (record) => {
  Modal.confirm({
   title: "Are you sure, you want to delete this challenge record?",
   okText: "Yes",
   okType: "danger",
   onOk: () => {
    deleteChallenge(record.id)
    setEtatRecord(true)
   },
  })
 }

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
       console.log(challengeplayer)
       edit(challengeplayer.player)
      }}
     >  
      <Form
       initialValues={challengeplayer.player}
       layout='vertical'
       onFinish={onFinish}
       onClick={() => console.log(challengeplayer.player.final_date)}
      >
       <Form.Item name='video_link' label='Link Video'>
        <Input
         className='input'
         value={challengeplayer.video_link}
         onChange={(e) => {
          challengeplayer.player.video_link = e.target.value
          setChallengeplayer(challengeplayer)
         }}
        />
       </Form.Item>
       <Form.Item name='objective' label='Objective'>
        <Input
         className='input'
         value={challengeplayer.objective}
         onChange={(e) => {
          challengeplayer.player.objective = e.target.value
          setChallengeplayer(challengeplayer)
         }}
        />
       </Form.Item>
       <Form.Item name='start_date' label='Start Date'>
        <Input
         className='input'
         value={challengeplayer.start_date}
         onChange={(e) => {
          challengeplayer.player.start_date = e.target.value
          setChallengeplayer(challengeplayer)
         }}
        />
       </Form.Item>
       <Form.Item name='final_date' label='Final Date'>
        <Input
         className='input'
         value={challengeplayer.final_date}
         onChange={(e) => {
          challengeplayer.player.final_date = e.target.value
          setChallengeplayer(challengeplayer)
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
