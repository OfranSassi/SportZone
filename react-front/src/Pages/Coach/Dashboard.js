import React from "react"

//ant design imports
import "./Dashboard.css"
import { Layout } from "antd"

import Subnav from "../../components/Subnav"
import MenuBar from "../../components/MenuBar"
const { Content, Footer } = Layout

export default function Dashboard(props) {
 return (
  <div className='Dashboard'>
   <Layout>
    <MenuBar 
    name3='/coach-abonnement'
    > </MenuBar>

    <Layout style={{ minHeight: "100vh" }}>
     <Subnav
      name1='/coach-session'
      name2='/coach-session'
      name3='/manage-players'
      name4='/coach-events'
      name5='/coach/programmePage'
     />
     <Layout className='site-layout'>
      <Content style={{ margin: "0 16px" }}>
       <div
        className='site-layout-background'
        style={{ padding: 24, minHeight: 360 }}
       >
        {props.children}
       </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
       Ant Design ©2022 Created by Ant UED
      </Footer>
     </Layout>
    </Layout>
   </Layout>
  </div>
 )
}
