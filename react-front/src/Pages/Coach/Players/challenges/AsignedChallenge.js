import { Button, Form, Layout, Modal, Table, Typography } from "antd"
import { Content, Footer } from "antd/lib/layout/layout"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MenuBar from "../../../../components/MenuBar"
import Subnav from "../../../../components/Subnav"
import {
 assignChallenge,
 getChallenges,
 getPlayers,
} from "../../../../services/coachservices/challengesplayers"
import FormAssign from "../../../../components/challengesAssigned/FormAssign"

function AsignedChallenge(props) {
 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)

 const [challengeplayer, setchallengeplayer] = useState({})
 const [isAssigned, setIsAssigned] = useState(false)
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [form] = Form.useForm()
 const [challenges, setChallenges] = useState([])
 const [PLayers, setPlayers] = useState([])
 
 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   // setError(false)
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
      objective: row.objective,
      video_link: row.video_link,
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
  { title: "Prénom", dataIndex: "firstname" },
  {
   title: "Nom",
   dataIndex: "lastname",
  },
  { title: "Email", dataIndex: "email" },

  {
   title: "Active",
   dataIndex: "isactive",
   render: (isactive) => {
    return <p>{isactive ? "oui" : "non"}</p>
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
        onAssignChallenge(record)
       }}
       style={{ marginLeft: 12 }}
      >
       assigner défi
      </Button>
      <Button type='primary'>
       <Link to='/coach/players/details/:id'>Details</Link>
      </Button>
     </>
    )
   },
  },
 ]
 const onAssignChallenge = (record) => {
  setIsAssigned(true)
  setchallengeplayer({ ...challengeplayer, player: record.id })
 }
 const resetAssigner = () => {
  setIsAssigned(false)
  setchallengeplayer(null)
 }
 const handleChangeSelect = (e) => {
  setchallengeplayer({
   ...challengeplayer,
   [e.target.name]: e.target.value,
  })
 }
 const handleChangeDate = (e) => {
  setchallengeplayer({
   ...challengeplayer,
   startdate: e[0].format(),
   finaldate: e[1].format(),
  })
 }
 const assignn = async () => {
  try {
   setLoading(true)
   const assigned = await assignChallenge(
    challengeplayer.player,
    challengeplayer.challenge,
    challengeplayer.startdate,
    challengeplayer.finaldate
   )
   //alert(JSON.stringify(editingLocation))
   setPlayers((pre) => {
    return pre.map((player) => {
     return player
    })
   })

   resetAssigner()

   setchallengeplayer(assigned)
   alert(JSON.stringify(challengeplayer))
   setLoading(false)
  } catch (e) {
   console.log("error")
  }
 }
 return (
  <Layout>
   <MenuBar />

   <Layout style={{ minHeight: "100vh" }}>
    <Subnav
     name1='/player-profile'
     name2='/cplayers'
     name3='/manage-players'
     name4='/coach/events'
    />
    <Layout className='site-layout'>
     <Content style={{ margin: "0 16px" }}>
      <div
       className='site-layout-background'
       style={{ padding: 24, minHeight: 360 }}
      >
       <Typography> Assigner des défis au Joueurs ! </Typography>
       {loading && <div>Loading ... </div>}
       {error && <div>Error....</div>}
       {!loading && (
        <Table
         columns={columns}
         dataSource={PLayers}
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
         title='Assigner un défi au joueur '
         visible={isAssigned}
         okText='Assigner'
         onCancel={() => {
          resetAssigner()
         }}
         onOk={assignn}
        >
         <FormAssign
          challenges={challenges}
          changeev1={handleChangeSelect}
          changeev2={handleChangeDate}
         ></FormAssign>
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
export default AsignedChallenge
