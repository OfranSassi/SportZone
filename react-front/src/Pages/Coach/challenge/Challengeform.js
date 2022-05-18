import { Button, Table, Modal, DatePicker, message, Form, Input } from "antd"
import Dashboard from "../Dashboard"
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
 assignChallenge,
 getChallenges,
 getPlayers,
} from "../../../services/coachservices/challengesplayers.js"


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
  {title: "Status",
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
         setPlayerId(record.id),onAssignChallenge(record)
       }}
       style={{ marginLeft: 12 }}
      >
       Reserve a challenge
      </Button>
      <Button type='primary'>
       <Link to='/coach/players/details/:id'>Details</Link>
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
//   const handleChangeSelect = (e) => {
//    setChallengeplayer({
//     ...challengeplayer,
//     startdate: e[0].format(),
//     finaldate: e[1].format(),
//    })
//   }
  const handleChangeDate = (e) => {
     setChallengeplayer({
      ...challengeplayer,
      startdate: e[0].format(),
      finaldate: e[1].format(),
     })
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
   // setLoading(true)
   // const assigned = await assignChallenge(
   //  challengeplayer.player,
   //  challengeplayer.video_link,
   //  challengeplayer.objective,
   //  challengeplayer.start_date,
   //  challengeplayer.final_date,
   //     )
   // setPlayers((pre) => {
   //  return pre.map((player) => {
   //   return player
   //  })
   // })
   // resetAssign()

   // setChallengeplayer(assigned)
   // alert(JSON.stringify(challengeplayer))
   // setLoading(false)
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

 // const onDateSelection = ((value, dateString)=>{
 //     console.log("Value:", value,"DateString:",dateString);
 //    ({reservationDateAndTime:value,formattedReservationDateAndTime:dateString})
 //  })
 //  //this function enables us to not see any past dates available for selection
//  const disablePastDates = (current) => {
//   return current && current < moment().endOf("day")
//  }
// const twoCalls =e =>{
//    (date) => setSelectedDate(date),
//    handleChangeDate 
// }
//  function handleConfirmReservation() {
//   if (setSelectedDate()) {
//    assign
//   } else {
//    message.error("Please choose dates and time for your reservation")
//   }
//  }
// const twoCallsAgain =e =>{
//    handle,
//    handleConfirmReservation()
// }
console.log(video_link);
console.log(start_date);
console.log(final_date);
console.log(objective);


// Axios.post("http://localhost:5001/coach/challenge/assign",{  
//    {
//    headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//    },
//    {
//       player,
//       video_link,
//       objective,
//       start_date,
//       final_date,
//      },
// })


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

    {isAssigned &&
     <Modal
      title='Please choose dates and time of challenge reservation'
      visible={isAssigned}
      okText='Reserve'
     
      onCancel={() => {
      resetAssign()
     
      }}
      // onOk={twoCallsAgain}
      onOk={assign}
     >   
       <Form layout='vertical'>
{/*       
       {challenges.map((chall) => (
           <div> */}
        <Form.Item name='link_video' label='Link Video'>
        
        <Input
         value={video_link}
         //  onChange={(e) => handle(e)}
          onChange={(e)=>setVideo_link(e.target.value)}
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
        {/* ))} */}
  
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
         {/* <RangePicker
         value={selectedDate}
          selected={selectedDate}
          onChange={setSelectedDate}
         //  onChange={twoCalls}
         //  onChange={(date) => setSelectedDate(date)}
          showTime={{ format: "hh:mma" }}
          format='MMM Do HH:MM'
          minDate={new Date()}
          disabledDate={(current) => disablePastDates(current)}
         /> */}
        </Form.Item>
       </Form>
  
     </Modal>
    }
   </div>
  </Dashboard>
 )
}
