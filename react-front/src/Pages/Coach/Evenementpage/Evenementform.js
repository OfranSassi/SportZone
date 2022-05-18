import React from "react"
import "antd/dist/antd.css"
import { useState } from "react"

import { Form, Input, Button } from "antd"
export default function Evenementform(props) {
 const [label, setLabel] = useState("")
 const [details, setDetails] = useState("")
 const [start_date, setStart_date] = useState("")
 const [final_date, setFinal_date] = useState("")
 const [location, setLocation] = useState("")
 const [state, setState] = useState("")
 function handleAddEvenement() {
  props.addEvenement(label, details, start_date,final_date, location, state)
 }

 return (
  <>
   helooooooooooo
   <Form
    labelCol={{
     span: 4,
    }}
    wrapperCol={{
     span: 14,
    }}
    layout='horizontal'
   >
    <Form.Item label='Name'>
     <Input
      type='text'
      name='Name'
      value={label}
      onChange={(e) => setLabel(e.target.value)}
     />
    </Form.Item>
    <Form.Item label='Details'>
     <Input.TextArea
      type='text'
      name='Details'
      value={details}
      onChange={(e) => setDetails(e.target.value)}
     />
    </Form.Item>
    <Form.Item label='Date'>
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
     {/* <input
						type="date"
						name="Date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/> */}
    </Form.Item>

    <Form.Item label='Place'>
     <Input
      type='text'
      name='Place'
      value={location}
      onChange={(e) => setLocation(e.target.value)}
     />
    </Form.Item>

    <Form.Item label='State'>
     <select
      name='State'
      value={state}
      onChange={(e) => setState(e.target.value)}
     >
      <option value='public'>Public</option>
      <option value='private'>Private </option>
     </select>
    </Form.Item>

    <Form.Item>
     <Button type='button' onClick={handleAddEvenement}>
      add
     </Button>
    </Form.Item>
   </Form>
  </>
 )
}
