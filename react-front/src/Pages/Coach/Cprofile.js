import React from "react"
import Dashboard from "./Dashboard"
import { Outlet } from "react-router"
import { Layout } from "antd"
const { Footer } = Layout
export default function Cprofile() {
 return (
  <Dashboard>
   <div>
    <div>Top Bar</div>
    <div>Side Bar</div>

    <Outlet />
    <Footer style={{ textAlign: "center" }}>Footer</Footer>
   </div>
  </Dashboard>
 )
}
