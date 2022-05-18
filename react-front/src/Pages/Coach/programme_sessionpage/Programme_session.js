import "./Programme_session.css"
import { useState } from "react"

import { Form, Input, Button } from "antd"
export default function Programme_session({
 id,
 title,
 description,
 picture,
 linkvideo,
 updateProgramme_session,
 deleteProgramme_session,
}) {
 const [updateMode, setTUpdateMode] = useState(false)
 const [titleToUpdateMode, setTitreToUpdateMode] = useState(title)
 const [descriptionToUpdateMode, setDescriptionToUpdateMode] =
  useState(description)
 const [pictureToUpdateMode, setPictureToUpdateMode] = useState(picture)
 const [linkVideoToUpdateMode, setLinkVideoToUpdateMode] =
  useState(linkvideo)

 function renderActions() {
  return (
   <div className='actions'>
    <button onClick={() => deleteProgramme_session(id)}>Delete</button>

    <button onClick={() => setTUpdateMode(true)}>Edit</button>
   </div>
  )
 }

 return (
  <div className='Programme_session'>
   {!updateMode ? (
    <>
     <div>{title}</div>
     <div>{description}</div>
     <div>{picture}</div>
     <div>{linkvideo}</div>

     {renderActions()}
    </>
   ) : (
    <div>
     <Form.Item label='Title'>
      <Input
       type='text'
       name='Title'
       value={titleToUpdateMode}
       onChange={(e) => setTitreToUpdateMode(e.target.value)}
      />
     </Form.Item>
     <Form.Item label='Description'>
      <Input
       type='text'
       name='Description'
       value={descriptionToUpdateMode}
       onChange={(e) => setDescriptionToUpdateMode(e.target.value)}
      />
     </Form.Item>

     <Input
      type='file'
      name='picture'
      onChange={(event) => {
       const [file] = event.target.files
       setPictureToUpdateMode(URL.createObjectURL(file))
      }}
     />
     <img src={pictureToUpdateMode} alt='img' width={50} height={50} />
     <Form.Item label='Link video'>
      <Input
       type='text'
       name='linkvideo'
       value={linkVideoToUpdateMode}
       onChange={(e) => setLinkVideoToUpdateMode(e.target.value)}
      />
     </Form.Item>

     <Form.Item>
      <Button
       type='button'
       onClick={() => {
        updateProgramme_session(
         id,
         titleToUpdateMode,
         descriptionToUpdateMode,
         pictureToUpdateMode,
         linkVideoToUpdateMode
        )
        setTUpdateMode(false)
       }}
      >
       {" "}
       update Programme_session
      </Button>
     </Form.Item>
    </div>
   )}
  </div>
 )
}
