/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
//import { useNavigate } from "react-router-dom"
// import pic_session from "../../../image/maria.png"
import Dashboard from "../Dashboard"
import * as moment from "moment"

import {
 Button,
 Table,
 Modal,
 Input,
 Form,
 Select,
 DatePicker,
 Rate,
 Slider,
 Checkbox,
 Row,
 Col,
} from "antd"

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
//import Sider from "antd/lib/layout/Sider"
//import Sessions from './Sessions';
//import { Checkbox, Row, Col } from "antd"
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
//import Sessions from "./Sessions"
//import { moment } from "moment"

function Sessions() {
 const [disabled, setdisabled] = useState(false)
 const [isEditing, setIsEditing] = useState(false)
 const [isAdding, setIsAdding] = useState(false)
 const [editingSession, setEditingSession] = useState({
  date: moment("2090-10-10"),
 })

 //  const [sessionByDay, setSessionByDay] = useState([])
 //  const { sessionDate } = useParams()
 //  useEffect(
 //   () =>
 //    useEffect(() => {
 //     const fetchData = async () => {
 //      setLoading(true)
 //      const result = await fetchSessionByDate(sessionDate)
 //      setSessionByDay(result)
 //      console.log(result)
 //      setLoading(false)
 //     }
 //     fetchData()
 //    }, [sessionDate]),
 //   console.log(sessionByDay)
 //  )

 const [addingSession, setAddingSession] = useState({
  player: "",
  title: "",
  date: "",
  feedback: "",
  skills: "",
  program: "",
 })

 //setPlayerValue("abc")
 //const navigate = useNavigate()

 //  const State = {
 //     size: String,
 //   };
 /*
 const normFile = (e) => {
  console.log("Upload event:", e)

  if (Array.isArray(e)) {
   return e
  }

  return e && e.fileList
 }
*/
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
  <Form.Item name='prefix' noStyle>
   <Select
    style={{
     width: 70,
    }}
   >
    {" "}
    <Option value='min'>Minutes</Option>
    <Option value='sec'>Secondes</Option>
    <Option value='h'>Heures</Option>
    <Option value=''>Métre</Option>
    <Option value='kg'>KG</Option>
    <Option value='km'>KM</Option>
   </Select>
  </Form.Item>
 )

 const [sessions, setSessions] = useState([
  {
   id: 1,
   title: "seance de préparation",
   date: "02/05/2021",
   player: "ali",
   feedback: "amelioration de vitesse",
   programme: "Extension de bras à la corde  3 x 10 ",
   action: "",
  },
  {
   id: 2,
   title: "seance de cardio",
   date: "02/06/2021",
   player: "zayn",
   feedback: "pas mal",
   programme: "Banc lombaire  : 3 x 10",
   action: "",
  },
  {
   id: 3,
   title: "seance de de stabilisation",
   date: "02/03/2021",
   player: "arij",

   feedback: "objectif atteint",
   programme: "Tapis de course ou elliptique pendant 30 minutes ",
  },
 ])
 const columns = [
  { title: "Title", dataIndex: "title" },
  { title: "Player", dataIndex: "player" },
  {
   title: "Date",
   dataIndex: "date",

   sorter: (record1, record2) => {
    return record1.date > record2.date
   },
  },

  {
   title: "FEEDBACK",
   dataIndex: "feedback",
  },
  { title: "Programme Session", dataIndex: "programme" },
  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <EditOutlined
       className='mx-2'
       onClick={() => {
        onEditSession(record)
        console.log(record)
        //   setEditingSession(record)
        //   setIsEditing(true)
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
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)

 const onDeleteSession = (record) => {
  Modal.confirm({
   title: "Are you sure, you want to CANCEL this session ?",
   okText: "Yes",
   okType: "danger",
   onOk: () => {
    setSessions((pre) => {
     return pre.filter((session) => session.id !== record.id)
    })
   },
  })
 }
 const onEditSession = (record) => {
  setEditingSession({ ...record })
  setIsEditing(true)
 }
 const resetEditing = () => {
  setIsEditing(false)
  setEditingSession(null)
 }
 const onFinish = (values) => {
  console.log(values)
 }

 return (
  <Dashboard>
   {/* <div className='sessions' /> */}
   <center> </center>
   <div></div>
   <div className='all-sessions'>
    <br></br>
    <Form>
     <Form.Item name='location' label=''>
      <Select
       placeholder='select location '
       style={{
        width: "15%",
       }}
      >
       <Option value='loc1'>lac</Option>
       <Option value='loc22'>arianna</Option>
       <Option value='loc3'>tunis centre ville</Option>
      </Select>
      <Button
       type='primary'
       onClick={() => {
        setIsAdding(true)
       }}
      >
       {" "}
       ADD Location{" "}
      </Button>

      {/* <Input
      addonBefore={prefixSelector}
      style={{
       width: "15%",
      }}
     /> */}
     </Form.Item>{" "}
    </Form>
    <Button
     type='primary'
     onClick={() => {
      setIsAdding(true)
     }}
     style={{
      width: "26.5%",
     }}
    >
     {" "}
     Add a new Session
    </Button>
    {isAdding && (
     <Modal
      title='new Session'
      visible={isAdding}
      okText='Save'
      onCancel={() => {
       setAddingSession(null)
       setIsAdding(false)
      }}
      onOk={() => {
       setIsAdding(false)
       setAddingSession({ id: parseInt(Math.random() * 1000) })
       setSessions((pre) => {
        console.log(addingSession)
        return [...pre, addingSession]
       })
      }}
     >
      <Form
       initialValues={addingSession}
       layout='vertical'
       onFinish={onFinish}
      >
       <Form.Item className='title' label='Title'>
        <Input
         className='input'
         onChange={(value) =>
          setAddingSession((session) => {
           session.title = value
           return session
          })
         }
        />
       </Form.Item>
       <Form.Item
        name='player'
        label='Player'
        rules={[
         {
          required: true,
          message: "Please select Player!",
         },
        ]}
       >
        <Select
         placeholder='select your Player'
         onChange={(value) =>
          setAddingSession((session) => {
           session.player = value
           return session
          })
         }
        >
         <Option value='Ali'>Ali</Option>
         <Option value='Rami'>Rami</Option>
         <Option value='mohamed'>mohamed</Option>
         <Option value='monjia'>monjia</Option>
         <Option value='sophia'>sophia</Option>
        </Select>
       </Form.Item>

       <Form.Item label='DatePicker' {...config}>
        <DatePicker
         showTime
         format='YYYY-MM-DD HH:mm:ss'
         style={{
          width: "100%",
         }}
         //     onChange={(value) =>
         //      setAddingSession((session) => {
         //       session.date = value
         //       return session
         //      })
         //     }
        />
       </Form.Item>

       {/* <Input
         className='input'
         onChange={(value) =>
          setAddingSession((session) => {
           session.skills = value
           return session
          })
         }
        /> */}
       <Form.Item name='checkbox-group' label='static'>
        <Checkbox.Group>
         <Row>
          <Col span={8}>
           <Checkbox
            value='A'
            style={{
             lineHeight: "32px",
            }}
           >
            A
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='B'
            style={{
             lineHeight: "32px",
            }}
           >
            B
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='C'
            style={{
             lineHeight: "32px",
            }}
           >
            C
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='D'
            style={{
             lineHeight: "32px",
            }}
           >
            D
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='E'
            style={{
             lineHeight: "32px",
            }}
           >
            E
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='F'
            style={{
             lineHeight: "32px",
            }}
           >
            F
           </Checkbox>
          </Col>
         </Row>
        </Checkbox.Group>
        {/* <Checkbox.Group style={{ width: "100%"
         }} onChange={onChange(checkedValues)}/>

               <Row>
          <Col span={8}>
           <Checkbox value='A'>A</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='B'>B</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='C'>C</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='D'>D</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='E'>E</Checkbox>
          </Col>
         </Row>
        </Checkbox.Group> */}
       </Form.Item>

       <Form.Item name='checkbox-group' label='Skills'>
        <Checkbox.Group>
         <Row>
          <Col span={8}>
           <Checkbox
            value='vitesse'
            style={{
             lineHeight: "32px",
            }}
           >
            vitesse
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='B'
            style={{
             lineHeight: "32px",
            }}
           >
            poids
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='C'
            style={{
             lineHeight: "32px",
            }}
           >
            pui de main
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='D'
            style={{
             lineHeight: "32px",
            }}
           >
            D
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='E'
            style={{
             lineHeight: "32px",
            }}
           >
            E
           </Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox
            value='F'
            style={{
             lineHeight: "32px",
            }}
           >
            F
           </Checkbox>
          </Col>
         </Row>
        </Checkbox.Group>
        {/* <Checkbox.Group style={{ width: "100%"
         }} onChange={onChange(checkedValues)}/>

               <Row>
          <Col span={8}>
           <Checkbox value='A'>A</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='B'>B</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='C'>C</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='D'>D</Checkbox>
          </Col>
          <Col span={8}>
           <Checkbox value='E'>E</Checkbox>
          </Col>
         </Row>
        </Checkbox.Group> */}
       </Form.Item>

       {/* <Form.Item name='statistic' label='Statistic'>
        <Input className='input' />
       </Form.Item> */}
       {/* <Form.Item name='feedback' label='Feedback'>
        <Input
         addonBefore={prefixSelector}
         style={{
          width: "100%",
         }}
        />
       </Form.Item> */}
       <Form.Item name='feedback' label='Feedback'>
        <Input.TextArea
         showCount
         maxLength={100}
         className='input'
         value={addingSession.id}
         onChange={(value) =>
          setAddingSession((session) => {
           session.feedback = value
           return session
          })
         }
        />
       </Form.Item>

       <Form.Item name='program-session' label='Program Session'>
        <Select
         placeholder='select your Program session'
         onChange={(value) =>
          setAddingSession((session) => {
           session.programme = value
           return session
          })
         }
        >
         <Option value='programme1'>programme1</Option>
         <Option value='programme2'>programme2</Option>
         <Option value='programme3'>programme3</Option>
         <Option value='programme4'>programme4</Option>
         <Option value='programme5'>programme5</Option>
        </Select>

        <Button
         type='red'
         icon={<PlusOutlined />}
         size='large'
         style={{
          width: "50%",
         }}
        />
       </Form.Item>
      </Form>
     </Modal>
    )}
    <Table
     columns={columns}
     dataSource={sessions}
     pagination={{
      current: page,
      pageSize: pageSize,
      onChange: (page, pageSize) => {
       setPage(page)
       setPageSize(pageSize)
      },
     }}
     bordered
     a
    ></Table>

    {isEditing && (
     <Modal
      title='Edit Session'
      visible={isEditing}
      okText='Save'
      onCancel={() => {
       resetEditing()

       //  setEditingSession(null)
       //  setIsEditing(false)
      }}
      onOk={() => {
       setSessions((pre) => {
        return pre.map((session) => {
         if (session.id === editingSession.id) {
          return editingSession
         } else {
          return session
         }
        })
       })
       resetEditing()
      }}
     >
      <Form
       initialValues={editingSession}
       layout='vertical'
       onFinish={onFinish}
      >
       <Form.Item name='title' label='Title'>
        <Input
         className='input'
         value={editingSession.title}
         onChange={(e) =>
          setEditingSession((session) => {
           session.title = e.target.value
           return session
          })
         }
        />
       </Form.Item>
       <Form.Item
        name='player'
        label='Player'
        rules={[
         {
          required: true,
          message: "Please select Player!",
         },
        ]}
       >
        <Select
         placeholder='select your Player'
         value={editingSession.player}
         onChange={(value) => {
          setEditingSession((pre) => {
           return { ...pre, player: value }
          })
         }}
        >
         <Option value='Ali'>Ali</Option>
         <Option value='Rami'>Rami</Option>
         <Option value='mohamed'>mohamed</Option>
         <Option value='monjia'>monjia</Option>
         <Option value='sophia'>sophia</Option>
        </Select>
       </Form.Item>

       <Form.Item label='DatePicker' {...config}>
        <DatePicker
         showTime
         format='YYYY-MM-DD HH:mm:ss'
         style={{
          width: "100%",
         }}
         /*value={editingSession.date}*/
         onChange={(value) => {
          setEditingSession((pre) => {
           return { ...pre, id: value }
          })
         }}
        />
       </Form.Item>
       <Form.Item name='rate' label='static1'>
        <Rate />
       </Form.Item>
       <Form.Item name='rate' label='static2'>
        <Rate />
       </Form.Item>
       <Form.Item name='skill' label='Skill1'>
        <Input
         addonBefore={prefixSelector}
         style={{
          width: "100%",
         }}
        />
       </Form.Item>
       <Form.Item name='skill' label='Skill2'>
        <Input
         addonBefore={prefixSelector}
         style={{
          width: "100%",
         }}
        />
       </Form.Item>

       <Form.Item name='slider' label='Skill2'>
        <Slider
         marks={{
          0: "A",
          20: "B",
          40: "C",
          60: "D",
          80: "E",
          100: "F",
         }}
        />
       </Form.Item>
       <Form.Item name='feedback' label='Feedback'>
        <Input
         className='input'
         value={editingSession.feedback}
         onChange={(e) => {
          setEditingSession((pre) => {
           return { ...pre, feedback: e.target.value }
          })
         }}
        />
       </Form.Item>

       <Form.Item name='program-session' label='Program Session'>
        <Select
         placeholder='select your Program session'
         value={editingSession.programme}
         onChange={(value) => {
          setEditingSession((pre) => {
           return { ...pre, programme: value }
          })
         }}
        >
         <Option value='programme1'>programme1</Option>
         <Option value='programme2'>programme2</Option>
         <Option value='programme3'>programme3</Option>
         <Option value='programme4'>programme4</Option>
         <Option value='programme5'>programme5</Option>
        </Select>
        <Button
         type='primary'
         icon={<DownloadOutlined />}
         size='large'
         style={{
          width: "50%",
         }}
        />
        <Button
         href='/programmesession-page'
         type='red'
         icon={<PlusOutlined />}
         size='large'
         style={{
          width: "50%",
         }}
        />
       </Form.Item>
      </Form>{" "}
     </Modal>
    )}
   </div>
  </Dashboard>
 )
}
export default Sessions
