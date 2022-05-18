import { Button, Form, Layout, Modal, Table, Typography } from "antd"
import { Content, Footer } from "antd/lib/layout/layout"
import React, { useState, useEffect } from "react"
import MenuBar from "../../../../components/MenuBar"
import Subnav from "../../../../components/Subnav"
import FormReject from "../../../../components/rejectfeedback/FormReject"
import FormFeedback from "../../../../components/rejectfeedback/FormFeedback"
import {
 addFeedback,
 getReasons,
 getSessions,
 rejectSession,
} from "../../../../services/coachservices/sessionRF"

function RejectFeedback(props) {
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [form] = Form.useForm()

 const [editingSession, setEditingSession] = useState(null)
 const [isReject, setIsReject] = useState(false)
 const [isFeed, setIsFeed] = useState(false)
 const [InputBox, setInputBox] = useState(false)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [sessions, setSessions] = useState([])
 const [reasons, setReasons] = useState([])

 useEffect(() => {
  form.setFieldsValue({ ["name"]: "" })
 }, [form])

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   // setError(false)
   try {
    const sess = await getSessions()
    setSessions(
     sess.map((row) => ({
      title: row.title,
      isRejected: row.isRejected,
      id: row._id,
      nbr_weeks: row.nbr_weeks,
      other: row.other,
      day: row.day,
      reason: row.reason,

      feedback: row.feedback,
      target_reached: row.target_reached,
     }))
    )

    setLoading(false)
    const rais = await getReasons()
    setReasons(
     rais.map((row) => ({
      name: row.name,

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
 const columns = [
  { title: "Titre", dataIndex: "title" },

  {
   title: "Date",
   dataIndex: "day",
   render: (day) => {
    return <p>{new Date(day).toISOString().substring(0, 10)}</p>
   },
  },
  {
   title: "Nombre de séance",
   dataIndex: "nbr_weeks",
   render: (nbr_weeks) => {
    return <p>{nbr_weeks + "/semaine"}</p>
   },
  },
  {
   title: "Objectif",
   dataIndex: "target_reached",
   render: (target_reached) => {
    return <p>{target_reached ? "atteint" : "n'est pas atteint"}</p>
   },
  },

  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <Button
       type='primary'
       onClick={() => {
        onRejectSession(record)
       }}
       style={{ marginLeft: 12 }}
       disabled={record.isRejected}
      >
       Annuler séance
      </Button>
      <Button
       type='primary'
       onClick={() => {
        onFeedbackSession(record)
       }}
       style={{ marginLeft: 12 }}
       disabled={record.isRejected}
      >
       Feedback{" "}
      </Button>
     </>
    )
   },
  },
 ]
 const onRejectSession = (record) => {
  setIsReject(true)

  setEditingSession({ ...record, isRejected: true })
 }
 const onFeedbackSession = (record) => {
  setIsFeed(true)

  setEditingSession({ ...record })
 }
 const resetRejecting = () => {
  setIsReject(false)
  setEditingSession(null)
 }

 const resetFeed = () => {
  setIsFeed(false)
  setEditingSession(null)
 }
 const handleChange = (e) => {
  if (e.target.value === "626c61c2a7b92a7aec4e6be5") {
   setInputBox(true)
   setEditingSession({
    ...editingSession,
    [e.target.name]: e.target.value,
   })
  } else {
   setEditingSession({
    ...editingSession,
    [e.target.name]: e.target.value,
   })
  }
 }
 const handleChangeFeed = (e) => {
  setEditingSession({
   ...editingSession,
   [e.target.name]: e.target.value,
  })
 }
 const reject = async () => {
  try {
   setLoading(true)
   const rejectedSession = await rejectSession(
    editingSession.id,
    editingSession.reason,
    editingSession.other
   )
   //alert(JSON.stringify(editingLocation))
   setSessions((pre) => {
    return pre.map((session) => {
     if (session.id === rejectedSession._id) {
      return editingSession
     } else {
      return session
     }
    })
   })
   alert(JSON.stringify(editingSession))
   resetRejecting()
   setLoading(false)
  } catch (e) {
   console.log("error")
  }
 }
 const feedback = async () => {
  try {
   setLoading(true)
   const feedbackSession = await addFeedback(
    editingSession.id,
    editingSession.feedback,
    editingSession.target_reached
   )
   //alert(JSON.stringify(editingLocation))
   setSessions((pre) => {
    return pre.map((session) => {
     if (session.id === feedbackSession._id) {
      return editingSession
     } else {
      return session
     }
    })
   })
   alert(JSON.stringify(editingSession))
   resetFeed()

   setLoading(false)
  } catch (e) {
   console.log("error")
  }
 }
 return (
  <Layout>
   <MenuBar />

   <Layout style={{ minHeight: "100vh" }}>
    <Subnav />
    <Layout className='site-layout'>
     <Content style={{ margin: "0 16px" }}>
      <div
       className='site-layout-background'
       style={{ padding: 24, minHeight: 360 }}
      >
       <Typography> Mes Séances</Typography>
       {loading && <div>Loading ... </div>}
       {error && <div>Error....</div>}
       {!loading && (
        <Table
         columns={columns}
         dataSource={sessions}
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
       {isReject && (
        <Modal
         title='Annuler séance'
         visible={isReject}
         okText='Annuler'
         onCancel={() => {
          resetRejecting()
         }}
         onOk={form.submit}
        >
         <FormReject
          reasons={reasons}
          changeev={handleChange}
          Inputbox={InputBox}
          finish={reject}
          form={form}
         ></FormReject>
        </Modal>
       )}

       {isFeed && (
        <Modal
         title='Ajouter un feedback'
         visible={isFeed}
         okText='Enregistrer'
         onCancel={() => {
          resetFeed()
         }}
         onOk={form.submit}
        >
         <FormFeedback
          finish={feedback}
          form={form}
          changeev={handleChangeFeed}
         ></FormFeedback>
        </Modal>
       )}
      </div>
     </Content>
     <Footer style={{ textAlign: "center" }}>
      Ant Design ©2022 Created by Ant UED
     </Footer>
    </Layout>
   </Layout>
  </Layout>
 )
}

export default RejectFeedback
