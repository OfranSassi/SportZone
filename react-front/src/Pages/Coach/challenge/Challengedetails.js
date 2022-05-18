import { Button, Table, Modal, DatePicker, message, Form, Input } from "antd"
import Dashboard from "../Dashboard"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
 assignChallenge,
 getChallenges,
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
    const [challenges, setChallenges] = useState([])
    const [players, setPlayers] = useState([])
    const [playerId, setPlayerId] = useState([])
    const [start_date, setStart_date] = useState("")
    const [final_date, setFinal_date] = useState("")
    const [video_link, setVideo_link] = useState("")
    const [objective, setObjective] = useState("")
    const [etatRecord, setEtatRecord] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
         setLoading(true)
         try {
          const plyrs = await getChallenges()
          setPlayers(
           plyrs.map((row) => ({
            firstname_coach: row.coach["firstname"],
            firstname_player: row.player == undefined  ? "" : row.player["firstname"],
            video_link: row.video_link,
            objective: row.objective,
            start_date: row.start_date,
            final_date: row.final_date,
            id:row._id,
           }))
          )
          setLoading(false)
          setEtatRecord(false)
          
         } catch (e) {
          setLoading(false)
          setError(true)
         }
        }
        fetchData()
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
        // {title: "Status",
        //  dataIndex: "isactive",
        //  render: (isactive) => {
        //   return <p>{isactive ? "Active" : "Inactive"}</p>
        //  },
        //  filters: [
        //   { text: "Active", value: true },
        //   { text: "Inactive", value: false },
        //  ],
        //  onFilter: (value, record) => {
        //   return record.isactive === value
        //  },
        // },
      
        {
         title: "Actions",
         render: (record) => {
          return (
           <>
    <EditOutlined
       className='mx-2'
       onClick={() => {
        onEditPlayer(record)
        // setEditingPlayer(record)
        // setIsEditing(true)
       }}
      />
            <DeleteOutlined
       className='mx-2'
       onClick={() => {
          
         deleteChallenge(record.id);setEtatRecord(true)
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
        setChallengeplayer({ ...challengeplayer, player: record._id })
       }
       const resetAssign = () => {
        setIsAssigned(false)
        setChallengeplayer(null)
       }

    
       const handle = (e) => {
        setChallengeplayer({
         ...challengeplayer,
         [e.target.name]: e.target.value
         // [e.target.objective]: e.target.value,
         // video_link: e.target.value,
         // objective: e.target.value,
        })
       }
       const assign = async (challenge) => {
        try {
         console.log("player iddddd",playerId)
         await Axios.post("http://localhost:5001/coach/challenge/create", 
            {
               "player":playerId,
                  "video_link":video_link,
                  "objective":objective,
                  "start_date":start_date,
                  "final_date":final_date,         
            },
            {
               headers: 
               {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               }
            }).then(res=>{
               console.log('------',res)
            })
         }
         catch (e) {
         console.log("error")
        }
      }
      
      
      console.log(video_link);
      console.log(start_date);
      console.log(final_date);
      console.log(objective);
      
      const onEditPlayer = (record) => {
        // setIsEditing(true)
        // setEditingPlayer({ ...record })
       }
       const resetEditing = () => {
        // setIsEditing(false)
        // setEditingPlayer(null)
       }
       const onFinish = (values) => {
        console.log(values)
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
         {/* {isEditing && (
     <Modal
      title='Edit Player'
      visible={isEditing}
      okText='Save'
      onCancel={() => {
       resetEditing()
      }}
      onOk={() => {
       setPlayers((pre) => {
        return pre.map((player) => {
         if (player.id === editingPlayer.id) {
          return editingPlayer
         } else {
          return player
         }
        })
       })
       resetEditing()
      }}
     >
      <Form
       initialValues={editingPlayer}
       layout='vertical'
       onFinish={onFinish}
      >
       <Form.Item name='id' label='ID'>
        <Input
         className='input'
         value={editingPlayer.id}
         onChange={(e) => {
          setEditingPlayer((pre) => {
           return { ...pre, id: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='name' label='Name'>
        <Input
         className='input'
         value={editingPlayer.name}
         onChange={(e) => {
          setEditingPlayer((pre) => {
           return { ...pre, name: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='desc' label='Description'>
        <Input
         className='input'
         value={editingPlayer.desc}
         onChange={(e) => {
          setEditingPlayer((pre) => {
           return { ...pre, desc: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='age' label='Age'>
        <Input
         className='input'
         value={editingPlayer.age}
         onChange={(e) => {
          setEditingPlayer((pre) => {
           return { ...pre, age: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='status' label='Status'>
        <Select
         className='input'
         value={editingPlayer?.status}
         onChange={(e) => {
          setEditingPlayer((pre) => {
           return { ...pre, status: e.target.value }
          })
         }}
        >
         <Select.Option value='true'>True</Select.Option>
         <Select.Option value='false'>False</Select.Option>
        </Select>
       </Form.Item>
      </Form>
     </Modal>
    )} */}
         </div>
        </Dashboard>
       )
      }
      