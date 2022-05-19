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
    const [updateChall, setUpdateChall] = useState([])
    const [editingChall, setEditingChall] = useState(null)


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
         onDeletePlayer(record)
         // deleteChallenge(record.id);setEtatRecord(true)
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
       const edit = async (challenge) => {
         try {
      
          console.log("player iddddd",playerId)
          await Axios.put("http://localhost:5001/coach/challenge/update/:id", 
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
                message.success('Challenge Edited!')
                console.log('------',res)
                
             }) 
          } 
          catch (e) {
             message.error('Something went wrong!')
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


       const onDeletePlayer = (record) => {
         Modal.confirm({
          title: "Are you sure, you want to delete this challenge record?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            deleteChallenge(record.id);
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
         {/* {isAssigned && (
     <Modal
      title='Edit Challenge'
      visible={isAssigned}
      okText='Save'
      onCancel={() => {
       resetAssign()
      }}
      onOk={edit}
      // onOk={() => {
      //  setUpdateChall((pre) => {
      //   return pre.map((updateChall) => {
      //    if (updateChall.id === editingPlayer.id) {
      //     return editingChall
      //    } else {
      //     return updateChall
      //    }
      //   })
      //  })
      //  resetAssign()
      // }}
     >
      <Form
       initialValues={editingChall}
       layout='vertical'
       onFinish={onFinish}
      >
       <Form.Item name='video_link' label='Link Video'>
        <Input
         className='input'
         value={editingChall.video_link}
         onChange={(e) => {
          setEditingChall((pre) => {
           return { ...pre, video_link: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='objective' label='Objective'>
        <Input
         className='input'
         value={editingChall.objective}
         onChange={(e) => {
          setEditingChall((pre) => {
           return { ...pre, objective: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='start_date' label='Start Date'>
        <Input
         className='input'
         value={editingChall.start_date}
         onChange={(e) => {
          setEditingChall((pre) => {
           return { ...pre, start_date: e.target.value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='final_date' label='Final Date'>
        <Input
         className='input'
         value={editingChall.final_date}
         onChange={(e) => {
          setEditingChall((pre) => {
           return { ...pre, final_date: e.target.value }
          })
         }}
        />
       </Form.Item>
       
      </Form>
     </Modal>
    )} */}
         </div>
        </Dashboard>
       )
      }
      