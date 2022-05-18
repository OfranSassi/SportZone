import { Form, Input, Radio } from "antd"
import React, { useState } from "react"

function FormFeedback({ form, finish, changeev }) {
 const [value] = useState("no")
 return (
  <div>
   <Form onFinish={finish} form={form} layout='vertical'>
    <Form.Item
     name='Feedback'
     label='Feedback'
     rules={[
      {
       required: true,
       message: "ajouter un feedback svp",
      },
     ]}
     hasFeedback
    >
     <Input className='input ' name='feedback' onChange={changeev} />
    </Form.Item>
    <Form.Item
     name='Objecitf'
     label="Dire si l'objectif global est atteint "
     rules={[
      {
       required: true,
       message: "dire votre objectif svp !",
      },
     ]}
     hasFeedback
    >
     <Radio.Group name='target_reached' onChange={changeev} value={value}>
      <Radio value='no'>non</Radio>
      <Radio value='yes'>oui</Radio>
     </Radio.Group>
    </Form.Item>
   </Form>
  </div>
 )
}

export default FormFeedback
