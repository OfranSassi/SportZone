import { Button, Radio, Typography } from "antd"
import React, { useState } from "react"
import { Form, Input, Row, Col, Layout } from "antd"

import { UserOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../../services/coachservices/auth"

function RegisterCoach(props) {
 const { Content } = Layout
 const history = useNavigate()
 const [form] = Form.useForm()

 const [data, setData] = useState({
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  error: null,
 })

 const { email, password, firstname, lastname, error } = data

 const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value })
 }

 const handleSubmit = async () => {
  try {
   setData({ ...data, error: null })
   console.log(data)
   await register(email, password, firstname, lastname)
   alert(`inscription reussie ! du coach ${firstname}`)
   history("/login")
  } catch (err) {
   setData({ ...data, error: err.response.data.msg })
   console.log(err.response.data.msg)
  }
 }
 return (
  <div>
   <Layout>
    <Content
     style={{
      padding: 80,

      margin: 0,
      minHeight: 560,
     }}
    >
     <Row>
      <Col
       justify='center'
       align='middle'
       span={9}
       offset={7}
       style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",

        borderRadius: "14px",
       }}
      >
       <p>
        <UserOutlined
         style={{
          color: "#ff2d9b",
          backgroundColor: "white",
          fontSize: "350%",
          background: "rounded",
         }}
        />
       </p>

       <Typography
        style={{
         minHeight: "20px",
        }}
       >
        <h4 style={{ color: "white" }}>
         {" "}
         Inscrivez vous en tant que coach
        </h4>
       </Typography>
       <Form
        form={form}
        onFinish={handleSubmit}
        name='control-hooks'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
       >
        <Form.Item
         name='firstname'
         label='Prénom'
         rules={[
          {
           required: true,
           message: "Tapez votre nom SVP !",
          },
          { whitespace: true },
          { min: 3 },
         ]}
         hasFeedback
        >
         <Input
          className='form-control'
          name='firstname'
          value={firstname}
          onChange={handleChange}
          placeholder='Entrez votre prénom'
         />
        </Form.Item>
        <Form.Item
         name='lastname'
         label='nom'
         rules={[
          {
           required: true,
           message: "Tapez votre nom SVP !",
          },
          { whitespace: true },
          { min: 3 },
         ]}
         hasFeedback
        >
         <Input
          className='form-control'
          name='lastname'
          value={lastname}
          onChange={handleChange}
          placeholder='Entrez votre nom'
         />
        </Form.Item>

        <Form.Item
         name='email'
         label='Email'
         rules={[
          {
           required: true,
           message: "Entrez votre email SVP !",
          },
          { type: "email", message: "Entrez un valid email SVP !" },
         ]}
         hasFeedback
        >
         <Input
          className='form-control'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='Tapez votre email'
         />
        </Form.Item>

        <Form.Item
         name='password'
         label='Mot de passe'
         rules={[
          {
           required: true,
           message: "Entrez votr mot de passe SVP",
          },
          {
           min: 6,
           message: "Entrez un mot de passe du longueure 6 au min",
          },
          /*    {
           validator: (_, value) =>
            value && value.includes("A")
             ? // eslint-disable-next-line no-undef
               Promise.resolve()
             : // eslint-disable-next-line no-undef
               Promise.reject("Il faut au minimum un caractére Maj"),
          }, */
         ]}
         hasFeedback
        >
         <Input.Password
          className='form-control'
          name='password'
          value={password}
          onChange={handleChange}
          placeholder='Tapez votre mot de passe'
         />
        </Form.Item>

        {/*  <Form.Item
         name='confirmPassword'
         label='Confirmez '
         dependencies={["password"]}
         rules={[
          {
           required: true,
          },
          ({ getFieldValue }) => ({
           validator(_, value) {
            if (!value || getFieldValue("password") === value) {
             // eslint-disable-next-line no-undef
             return Promise.resolve()
            }
            // eslint-disable-next-line no-undef
            return Promise.reject(
             "Pas d'équivalence entre les deux mots de passe !."
            )
           },
          }),
         ]}
         hasFeedback
        >
         <Input.Password placeholder='Confirmez votre mot de passe' />
        </Form.Item> */}
        {error ? (
         <h4 id='hidethis' style={{ color: "red" }}>
          {error}
         </h4>
        ) : null}
        {/*        <Form.Item name='gender' label='Genre' requiredMark='optional'>
         <Select placeholder='Selectionnez votre sexe'>
          <Select.Option value='male'>Homme</Select.Option>
          <Select.Option value='female'>Femme</Select.Option>
         </Select>
        </Form.Item> */}

        {/*  <Form.Item
                    name='dob'
                    label='Date of Birth'
                    rules={[
                      {
                        required: true,
                        message: "Please provide your date of birth",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      picker='date'
                      placeholder='Chose date of birth'
                    />
                  </Form.Item> */}

        <Form.Item wrapperCol={{ span: 24 }}>
         <Button block type='primary' htmlType='submit'>
          Inscrir
         </Button>
        </Form.Item>
        <Form.Item
         wrapperCol={{ span: 24 }}
         labelCol={{ span: 15 }}
         label='Vous avez déja un compte ?'
        >
         <Button>
          <Link to='/login'>Se connecter</Link>
         </Button>
        </Form.Item>
       </Form>
      </Col>
     </Row>
    </Content>
   </Layout>
  </div>
 )
}

export default RegisterCoach
