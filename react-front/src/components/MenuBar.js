import React from "react"
import { useNavigate } from "react-router-dom"
import { Menu, Layout } from "antd"
import myLogo from "../image/logo.png"

const { Header } = Layout

function MenuBar(props) {
const navigate = useNavigate()
 return (
  <Header className='header'>
   <div className='logo'>
    <img src={myLogo} alt='Sport Zone' width='100' height='80'></img>
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["3"]}>
     <Menu.Item key='1'>Profile</Menu.Item>
     <Menu.Item key='2'>Alertes </Menu.Item>
     <Menu.Item 
     key='3' 
     onClick={() => navigate(props.name3)}> 
     Abonnement</Menu.Item>
    </Menu>
    {/* <h3>Sport Zone</h3> */}
   </div>
  </Header>
 )
}

export default MenuBar
