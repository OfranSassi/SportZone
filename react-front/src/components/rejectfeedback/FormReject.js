import { Form, Input } from "antd"
import React from "react"

function FormReject({ form, finish, reasons, changeev, Inputbox }) {
 ///const [form] = Form.useForm()
 return (
  <div>
   <Form onFinish={finish} form={form} layout='vertical'>
    <Form.Item
     name='reason'
     rules={[
      {
       required: true,
       message: "selectionnez !",
      },
     ]}
     label="Raisons de l'annulation"
    >
     <select name='reason' onChange={changeev}>
      <option value={""} selected disabled hidden>
       Indiquez le raison
      </option>
      {reasons.map((rais) => (
       <option key={rais.id} value={rais.id}>
        {rais.name}
       </option>
      ))}
     </select>
    </Form.Item>
    {Inputbox && (
     <Form.Item
      name='other'
      label='Autres raisons'
      rules={[
       {
        required: true,
       },
      ]}
      hasFeedback
     >
      <Input className='input ' name='other' onChange={changeev} />
     </Form.Item>
    )}
   </Form>
  </div>
 )
}

export default FormReject
