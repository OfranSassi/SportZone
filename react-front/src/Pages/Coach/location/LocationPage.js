import { Button, Form, Input, Layout, Modal, Table } from "antd"
import { Content, Footer } from "antd/lib/layout/layout"
import React, { useState, useEffect } from "react"
import MenuBar from "../../../components/MenuBar"
import Subnav from "../../../components/Subnav"

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import ModaLocation from "../../../components/location/ModaLocation"
import { useNavigate } from "react-router-dom"
import {
 createLocation,
 deleteLocation,
 getLocationsByCoach,
 updateLocation,
} from "../../../services/coachservices/locations"

export default function LocationPage() {
 const [isEditing, setIsEditing] = useState(false)
 const [editingLocation, setEditingLocation] = useState({
  name: "",
  city: "",
  address: "",
  country: "",
 })
 const [initial, setInitial] = useState(null)
 const [isAdding, setIsAdding] = useState(false)
 const [form] = Form.useForm()

 const [addedLocation, setaddedLocation] = useState({
  name: "",
  city: "",
  address: "",
  country: "",
 })

 const [page, setPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const navigate = useNavigate()
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [locations, setLocations] = useState([])
 useEffect(() => {
  const fetchData = async () => {
   setLoading(true)
   // setError(false)
   try {
    const res = await getLocationsByCoach()
    setLocations(
     res.map((row) => ({
      name: row.name,
      city: row.city,
      id: row._id,
      address: row.address,
      country: row.country,
     }))
    )
    setLoading(false)
   } catch (e) {
    setLoading(false)
    setError(true)
   }
  }

  fetchData()
 }, [])
 useEffect(() => {
  form.setFieldsValue(initial)
 }, [form, initial])

 const columns = [
  { title: "Nom", dataIndex: "name" },
  {
   title: "Adresse",
   dataIndex: "address",
  },
  { title: "Cité", dataIndex: "city" },
  {
   title: "pays",
   dataIndex: "country",
  },
  {
   title: "Actions",
   render: (record) => {
    return (
     <>
      <EditOutlined
       onClick={() => {
        onEditLocation(record)
       }}
      />
      <DeleteOutlined
       onClick={() => {
        onDeleteLocation(record)
       }}
       style={{ marginLeft: 12 }}
      />

      <Button
       onClick={() => navigate(`/coach/locations/location/${record.id}`)}
       style={{ marginLeft: 12 }}
       type='primary'
      >
       Details
      </Button>
     </>
    )
   },
  },
 ]

 const onEditLocation = (record) => {
  setIsEditing(true)
  setInitial({ ...record })
  setEditingLocation({ ...record })
 }
 const resetEditing = () => {
  setInitial(null)
  setIsEditing(false)
  setEditingLocation(null)
 }

 const onAddLocation = () => {
  setInitial({ name: "", city: "", address: "", country: "" })
  setIsAdding(true)
 }

 const resetAdding = () => {
  setIsAdding(false)
 }

 const onDeleteLocation = (record) => {
  Modal.confirm({
   title: `Confirmer la suppression du lieu ${record.name}?`,
   okText: "oui",
   okType: "primary",
   onOk: async () => {
    try {
     setLoading(true)
     await deleteLocation(record.id)
     setLocations((pre) => {
      return pre.filter((location) => location.id !== record.id)
     })
     setLoading(false)
    } catch (e) {
     console.log("error")
    }
   },
  })
 }

 const handleChangeEdit = (e) => {
  setEditingLocation({
   ...editingLocation,
   [e.target.name]: e.target.value,
  })
 }

 const handleChangeAdd = (e) => {
  setaddedLocation({
   ...addedLocation,
   [e.target.name]: e.target.value,
  })
 }
 const edit = async () => {
  try {
   setLoading(true)
   const nwlocation = await updateLocation(
    editingLocation.id,
    editingLocation
   )
   //alert(JSON.stringify(editingLocation))
   setLocations((pre) => {
    return pre.map((location) => {
     if (location.id === nwlocation._id) {
      return editingLocation
     } else {
      return location
     }
    })
   })
   resetEditing()
   setLoading(false)
  } catch (e) {
   console.log("error")
  }
 }

 const add = async () => {
  try {
   setLoading(true)
   const location = await createLocation(addedLocation)

   setLocations((pre) => {
    return [...pre, { ...location }]
   })
   resetAdding()
   setLoading(false)
  } catch (e) {
   console.log(e)
  }
 }

 return (
  <Layout>
   <MenuBar />

   <Layout style={{ minHeight: "100vh" }}>
    <Subnav />
    <Layout className='site-layout'>
     <Content style={{ margin: "0 16px" }}>
      <div
       className='site-layout-background'
       style={{ padding: 24, minHeight: 360 }}
      >
       <h1>Location page!</h1>
       <Button type='primary' onClick={onAddLocation}>
        Ajouter un lieu d'entrainemet
       </Button>
       {loading && <div>Loading ... </div>}
       {error && <div>Error....</div>}
       {!loading && (
        <>
         <Table
          columns={columns}
          dataSource={locations}
          rowKey={Math.random()}
          pagination={{
           current: page,
           pageSize: pageSize,
           onChange: (page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
           },
          }}
          bordered
         ></Table>
        </>
       )}
       {isEditing && (
        <Modal
         title='Modifier lieu'
         visible={isEditing}
         okText='Enregistrer'
         onCancel={() => {
          resetEditing()
         }}
         onOk={form.submit}
        >
         <ModaLocation
          initial={initial}
          locationObj={editingLocation}
          changeev={handleChangeEdit}
          finish={edit}
          form={form}
         ></ModaLocation>
        </Modal>
       )}

       {isAdding && (
        <Modal
         title='Ajouter un lieu'
         visible={isAdding}
         okText='Enregistrer'
         onCancel={() => {
          resetAdding()
         }}
         onOk={form.submit}
        >
         <ModaLocation
          initial={initial}
          locationObj={addedLocation}
          changeev={handleChangeAdd}
          finish={add}
          form={form}
         ></ModaLocation>
        </Modal>
       )}
      </div>
     </Content>
     <Footer style={{ textAlign: "center" }}>Sport zone ©2022</Footer>
    </Layout>
   </Layout>
  </Layout>
 )
}
