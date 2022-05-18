import React from "react"
import { Layout } from "antd"
import Subnav from "../../components/Subnav"
import MenuBar from "../../components/MenuBar"
import { Content } from "antd/lib/layout/layout"
const { Footer } = Layout
export default function Pprofile() {
 return (
    <Layout>
    
     
    <MenuBar/>
    
        <Layout style={{ minHeight: "100vh" }}>
         <Subnav name1="/player-profile" name2="/cplayers" name3="/manage-players" name4="/coach-events"/>
         <Layout className='site-layout'>
    
          <Content style={{ margin: "0 16px" }}>
           <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
           >
           <div>profile</div>

           </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
           Ant Design ©2022 Created by Ant UED
          </Footer>
         </Layout>
        </Layout>
       </Layout>
   

 )
}
