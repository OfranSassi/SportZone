import React from "react"
import "antd/dist/antd.css"
import { useState } from "react"

import { Form, Input, Button } from "antd"
export default function Programme_sessionform(props) {
 const addProgramme_session = "ADD A PROGRAM SESSION  "

 const [title, setTitle] = useState("")
 const [description, setDescription] = useState("")
 const [picture, setPicture] = useState("")
 const [linkvideo, setLinkVideo] = useState("")
 function handleAddProgramme_session() {
  props.addProgramme_session(title, description, picture, linkvideo)
 }

 return (
  <>
   <Form
    labelCol={{
     span: 4,
    }}
    wrapperCol={{
     span: 14,
    }}
    layout='horizontal'
   >
    <Form.Item label='Title'>
     <Input
      type='text'
      name='title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
     />
    </Form.Item>
    <Form.Item label='Description'>
     <Input
      type='text'
      name='description'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
     />
    </Form.Item>
    <Form.Item label='Picture'>
     <Input
      type='file'
      name='picture'
      onChange={(event) => {
       const [file] = event.target.files
       setPicture(URL.createObjectURL(file))
      }}
     />
     <img src={picture} alt='img' width={50} height={50} />
    </Form.Item>
    <Form.Item label='Link video'>
     <Input.TextArea
      type='text'
      name='link video'
      value={linkvideo}
      onChange={(e) => setLinkVideo(e.target.value)}
     />
    </Form.Item>

    <Form.Item>
     <center>
      <Button type='button' onClick={handleAddProgramme_session}>
       {addProgramme_session}
      </Button>
     </center>
    </Form.Item>
   </Form>
  </>
 )
}
