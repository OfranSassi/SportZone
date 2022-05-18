import { Button, Layout, Modal, Table, Typography } from "antd"
import { Content, Footer } from "antd/lib/layout/layout"
import React, { useEffect, useState } from "react"
import MenuBar from "../../../components/MenuBar"
import Subnav from "../../../components/Subnav"
import {
 doneChallenge,
 getChallengesByUser,
} from "../../../services/playerservices/donechallenge"

function Challenges(props) {
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [loading, setLoading] = useState(false)
 const [isDone, setDone] = useState(false)
 const [error, setError] = useState(false)
 const [challengeplayer, setchallengeplayer] = useState({
  id: "",

  challenge: "",
  coach: "",
  objective: "",
  start_date: "",
  final_date: "",

  done: "",
 })
 const [challengesplayers, setChallengesplayers] = useState([])

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)

   // setChallenge(ch)
   // setError(false)
   try {
    const chpl = await getChallengesByUser()
    setChallengesplayers(
     chpl.map((row) => ({
      id: row._id,

      challenge: row.challenge,
      coach: row.coach,
      objective: row.objective,
      start_date: row.start_date,
      final_date: row.final_date,

      done: row.done,
     }))
    )

    setLoading(false)
   } catch (e) {
    setLoading(false)
    setError(true)
   }
  }

  fetchData()
 }, [])

 const columns = [
  {
   title: "Objective",
   dataIndex: "objective",
  },
  {
   title: "Coach",
   dataIndex: "coach",
  },
  {
   title: "Date début",
   dataIndex: "start_date",
   render: (start_date) => {
    return <p>{new Date(start_date).toISOString().substring(0, 10)}</p>
   },
  },
  {
   title: "Date fin",
   dataIndex: "final_date",
   render: (final_date) => {
    return <p>{new Date(final_date).toISOString().substring(0, 10)}</p>
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
        onDoneChallenge(record)
       }}
       style={{ marginLeft: 12 }}
       disabled={record.done}
      >
       Done
      </Button>
     </>
    )
   },
  },
 ]
 const onDoneChallenge = (record) => {
  setDone(true)

  setchallengeplayer({ ...record, done: true })
 }
 const resetdone = () => {
  setDone(false)
  setchallengeplayer(null)
 }
 const donee = async () => {
  try {
   setLoading(true)
   alert(JSON.stringify(challengeplayer))
   const donechallenge = await doneChallenge(challengeplayer.id)
   //alert(JSON.stringify(donechallenge))
   setChallengesplayers((pre) => {
    return pre.map((challenge) => {
     if (donechallenge._id === challenge.id) {
      return { ...challengeplayer }
     } else {
      return challenge
     }
    })
   })
   resetdone()

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
       <Typography> Mes défis</Typography>
       {loading && <div>Loading ... </div>}
       {error && <div>Error....</div>}
       {!loading && (
        <Table
         columns={columns}
         dataSource={challengesplayers}
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
       {isDone && (
        <Modal
         title='Mettre a done'
         visible={isDone}
         okText='Done'
         onCancel={() => {
          resetdone()
         }}
         onOk={donee}
        >
         mettre a done
        </Modal>
       )}
      </div>
     </Content>
     <Footer style={{ textAlign: "center" }}>©2022</Footer>
    </Layout>
   </Layout>
  </Layout>
 )
}
export default Challenges
