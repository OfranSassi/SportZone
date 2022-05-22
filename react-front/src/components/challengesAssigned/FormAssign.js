import { DatePicker, Form } from "antd"
import React from "react"

function FormAssign({ challenges, changeev1, changeev2 }) {
 const { RangePicker } = DatePicker
 return (
  <div>
   <Form layout='vertical'>
    <Form.Item name='challenge' label='Défis'>
     <select name='challenge' onChange={changeev1}>
      <option>
       Choisir un défi
      </option>
      {challenges.map((chall) => (
       <option key={chall.id} value={chall.id}>
        {chall.objective}
       </option>
      ))}
     </select>
    </Form.Item>

    <Form.Item>
     <RangePicker onChange={changeev2} />
    </Form.Item>
   </Form>
  </div>
 )
}

export default FormAssign