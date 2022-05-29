/* eslint-disable no-console */
import React, { useState } from "react"
import "./Players.css"
import { useNavigate } from "react-router-dom"
// import pic_player from "../../../image/maria.png"
import Dashboard from "../Dashboard"
import { Button, Table, Modal, Input, Form, Select } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"


export default function Players() {
 const [isEditing, setIsEditing] = useState(false)
 const [editingPlayer, setEditingPlayer] = useState(null)
 const navigate = useNavigate()
 const [players, setPlayers] = useState([
  {
   name: "Maria Sharpova",
   desc: "A tennis player",
   age: 25,
   status: true,
   id: 1,
  },
  {
   name: "Lionel Messi",
   desc: "A soccer player",
   age: 30,
   status: false,
   id: 2,
  },
  {
   name: "Usman Kamaru",
   desc: "A wrestler",
   age: 31,
   status: true,
   id: 3,
  },
 ])

 const columns = [
  { title: "Full Name", dataIndex: "name" },
  {
   title: "Player ID",
   dataIndex: "id",
   sorter: (record1, record2) => {
    return record1.id > record2.id
   },
  },
  { title: "Description", dataIndex: "desc" },
  {
   title: "Age",
   dataIndex: "age",
   sorter: (a, b) => a.age - b.age,
  },
  {
   title: "Status",
   dataIndex: "status",
   render: (status) => {
    return <p>{status ? "Active" : "Inactive"}</p>
   },
   filters: [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
   ],
   onFilter:(value, record)=>{
      return record.status === value
   }
  },
  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <EditOutlined
       className='mx-2'
       onClick={() => {
        onEditPlayer(record)
       }}
      />
      <DeleteOutlined
       className='mx-2'
       onClick={() => {
        onDeletePlayer(record) 
       }}
       style={{ color: "red", marginLeft: 12 }}
      />
     </>
    )
   },
  },
 ]
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)

 const onAddPlayer = () => {
  const randomNumber = parseInt(Math.random() * 1000)
  const newPlayer = {
   id: randomNumber,
   name: "Oussama Mellouli",
   desc: "A swimmer",
   age: 27,
   status: true,
  }
  setPlayers((pre) => {
   return [...pre, newPlayer]
  })
 }
 const onDeletePlayer = (record) => {
  Modal.confirm({
   title: "Are you sure, you want to delete this player record?",
   okText: "Yes",
   okType: "danger",
   onOk: () => {
    setPlayers((pre) => {
     return pre.filter((players) => players.id !== record.id)
    })
   },
  })
 }
 const onEditPlayer = (record) => {
  setIsEditing(true)
  setEditingPlayer({ ...record })
 }
 const resetEditing = () => {
  setIsEditing(false)
  setEditingPlayer(null)
 }
 const onFinish = (values) => {
  console.log(values)
 }

 return (
  <Dashboard>
   {/* <div className='players' /> */} 
   <center>
    {" "}
    <h2> Players</h2>
   </center>
   <div>
      
    <Button
     className='btn'
     style={{
      paddingBottom: 50,
      minHeight: 25,
      //  //  width: 600,
      color: "white",
      backgroundColor: "#f1356d",
      borderRadius: "8px",
     }}
     onClick={() => navigate("/coach-invitation")}
     type='dashed'
     block
    >
     Invite Player
    </Button>

    <Button
     className='btn'
     style={{
      paddingBottom: 50,
      minHeight: 25,
      //  width: 600,
      color: "white",
      backgroundColor: "#f1356d",
      borderRadius: "8px",
     }}
     onClick={() => navigate("/coach-challenge")}
     type='dashed'
     block
    >
     Challenge
    </Button>
   </div>
   <div className='all-players'>
    <br></br>
    <center>
     <h2>All Players</h2>
    </center>
    <center>
     <Button type='primary' onClick={onAddPlayer}>
      Add a new Player
     </Button>
    </center>
    <Table
     columns={columns}
     dataSource={players}
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
    {isEditing && (
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
    )}
   </div>
  </Dashboard>
 )
}
