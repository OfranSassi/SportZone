import React, { useEffect, useState } from "react"
import { Menu, Layout } from "antd"
import { Link, useNavigate } from "react-router-dom"

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons"
import { getCurrentUser, logout } from "../services/coachservices/auth"

export function Subnav(props) {
 const { Sider } = Layout
 const [collapsed, setCollapsed] = useState(false)
 const navigate = useNavigate()
 const [currentUser, setCurrentUser] = useState(null)

 useEffect(() => {
  getCurrentUser().then((response) => {
   setCurrentUser(response)
  })
 }, [])

 const logOut = () => {
  logout()
 }

 return (
  <Sider
   collapsible
   collapsed={collapsed}
   onCollapse={() => setCollapsed(!collapsed)}
  >
   <div className='logo' />

   <Menu theme='dark' mode='inline'>
    <Menu.Item
     key='1'
     icon={<HomeOutlined />}
     onClick={() => navigate(props.name1)}
    >
     Acceuil
    </Menu.Item>
    {currentUser && currentUser.role === "coach" ? (
     <>
      <Menu.Item key='2' onClick={() => navigate(props.name2)}>
       Séances
      </Menu.Item>
      <Menu.Item key='3' onClick={() => navigate(props.name3)}>
       Joueurs
      </Menu.Item>   
      <Menu.Item key='4' onClick={() => navigate(props.name4)}>
       Mes évenements
      </Menu.Item>
      <Menu.Item key='5' onClick={() => navigate("/coach/locations")}>
       Mes lieux
      </Menu.Item>

     </>
    ) : (
     <>
      {/* <Menu.Item key='6' onClick={() => navigate(props.name2)}>
       Mes séances
      </Menu.Item>
      <Menu.Item key='8' onClick={() => navigate("/player/challenges")}>
       Mes défis
      </Menu.Item> */}
      <Menu.Item key='7' onClick={() => navigate("/player/events")}>
       Mes events
      </Menu.Item>

     </>
    )}
    <Menu.Item key='9' icon={<LogoutOutlined />}>
     <Link to='/login' onClick={logOut}>
      Se déconnecter
     </Link>
    </Menu.Item>
   </Menu>
  </Sider>
 )
}

export default Subnav
