import { Button, Typography } from "antd"
import React from "react"
import { Form, Input, Select, Row, Col, Layout } from "antd"

import { UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import Buttons from "../../components/Buttons"

function RegisterPlayer(props) {
 const { Content } = Layout
 return (
  <div>
   <Buttons
    link1='/registerCoach'
    name1='Inscrivez en tant que coach'
    link2='/registerPlayer'
    name2='Inscrivez en tant que joueur'
   />
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
         Inscrivez vous en tant que joueur{" "}
        </h4>
       </Typography>
       <Form
        autoComplete='off'
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
         <Input placeholder='Entrez votre prénom' />
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
         <Input placeholder='Entrez votre nom' />
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
         <Input placeholder='Tapez votre email' />
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
          {
           validator: (_, value) =>
            value && value.includes("A")
             ? // eslint-disable-next-line no-undef
               Promise.resolve()
             : // eslint-disable-next-line no-undef
               Promise.reject("Il faut au minimum un caractére Maj"),
          },
         ]}
         hasFeedback
        >
         <Input.Password placeholder='Tapez votre mot de passe' />
        </Form.Item>

        <Form.Item
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
        </Form.Item>
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

export default RegisterPlayer
