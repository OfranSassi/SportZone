import React, { useState } from "react"
import { Form, Button, Input, Row, Col, Layout, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { login } from "../../services/coachservices/auth"
import { Link, useNavigate } from "react-router-dom"
function Login(props) {
 const { Content } = Layout
 const history = useNavigate()
 const [form] = Form.useForm()

 const [data, setData] = useState({
  email: "",
  password: "",
  error: null,
 })

 const { email, password, error } = data

 const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value })
 }

 const handleSubmit = async () => {
  try {
   setData({ ...data, error: null })
   await login(email, password)

   history("/")
  } catch (err) {
   setData({ ...data, error: err.response.data.msg })
   console.log(err.response.data.msg)
  }
 }
 return (
  <Layout className='layout'>
   <div>
    <Layout>
     <Content
      style={{
       padding: 140,
       backgroundSize: "cover",

       margin: 0,
       minHeight: 610,
      }}
     >
      <Row>
       <Col
        justify='center'
        align='middle'
        span={10}
        offset={6}
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
         <h4 style={{ color: "white" }}> Se connecter </h4>
        </Typography>
        <Form
         form={form}
         onFinish={handleSubmit}
         name='control-hooks'
         labelCol={{ span: 6 }}
         wrapperCol={{ span: 14 }}
        >
         <Form.Item
          name='email'
          label='Email'
          style={{
           color: "white !important",
          }}
          rules={[
           {
            required: true,
            message: "Entrez votre email SVP !",
           },
           { type: "email", message: "Entrez un valid Email svp !" },
          ]}
          hasFeedback
         >
          <Input
           className='form-control'
           type='email'
           name='email'
           value={email}
           onChange={handleChange}
           placeholder='Tapez votre email'
          />
         </Form.Item>

         <Form.Item
          name='password'
          label='Password'
          rules={[
           {
            required: true,
            message: "Entrez votre mot de passe svp!",
           },
          ]}
          hasFeedback
         >
          <Input.Password
           className='form-control'
           type='password'
           name='password'
           value={password}
           onChange={handleChange}
           placeholder='Tapez votre mot de passe '
           autoComplete='password'
          />
         </Form.Item>
         {error ? (
          <h4 id='hidethis' style={{ color: "red" }}>
           {error}
          </h4>
         ) : null}

         <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type='primary' htmlType='submit'>
           Se connecter
          </Button>
         </Form.Item>

         <Form.Item
          wrapperCol={{ span: 24 }}
          labelCol={{ span: 15 }}
          label="Vous n'avez pas un compte ?"
         >
          <Button>
           <Link to='/registerCoach'>S'inscrir</Link>
          </Button>
         </Form.Item>
        </Form>
       </Col>
      </Row>
     </Content>
    </Layout>
   </div>
  </Layout>
 )
}

export default Login
