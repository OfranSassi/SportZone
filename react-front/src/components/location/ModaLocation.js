import { Form, Input } from "antd"
import React from "react"

function ModaLocation({ form, finish, initial, locationObj, changeev }) {
 return (
  <Form
   onFinish={finish}
   form={form}
   name='control-hooks'
   initialValues={initial}
   layout='vertical'
  >
   <Form.Item
    name='name'
    rules={[
     {
      required: true,
      message: "nom manquant",
     },
    ]}
    label='Name'
   >
    <Input
     name='name'
     className='input form-control'
     value={locationObj.name}
     onChange={changeev}
    />
   </Form.Item>
   <Form.Item
    rules={[
     {
      required: true,
      message: "adresse manquante!",
     },
    ]}
    name='address'
    label='adresse'
   >
    <Input
     name='address'
     className='input form-control'
     value={locationObj.address}
     onChange={changeev}
    />
   </Form.Item>
   <Form.Item
    rules={[
     {
      required: true,
      message: "cité manquante !",
     },
    ]}
    name='city'
    label='cité'
   >
    <Input
     name='city'
     className='input form-control'
     value={locationObj.city}
     onChange={changeev}
    />
   </Form.Item>
   <Form.Item
    rules={[
     {
      required: true,
      message: "pays manquante!",
     },
    ]}
    name='country'
    label='pays'
   >
    <Input
     name='country'
     className='input form-control'
     value={locationObj.country}
     onChange={changeev}
    />
   </Form.Item>
  </Form>
 )
}

export default ModaLocation
