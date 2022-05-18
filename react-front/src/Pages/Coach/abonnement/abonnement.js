import { useState } from "react"

import { Form, Radio, Button } from "antd"
export default function Abonnement({ id, abonnement, updateAbonnement }) {
 const [updateMode, setTUpdateMode] = useState(false)
 const [abonnementToUpdateMode, setAbonnementToUpdateMode] =
  useState(abonnement)

 function renderActions() {
  return (
   <div className='actions'>
    <center>
     <button onClick={() => setTUpdateMode(true)}>EDIT</button>
    </center>
   </div>
  )
 }

 return (
  <div className='abonnement'>
   {!updateMode ? (
    <>
     <div>{abonnement}</div>
     {renderActions()}
    </>
   ) : (
    <div>
     <Form.Item label='abonnement'>
      <Radio.Group
       value={abonnementToUpdateMode}
       onChange={(e) => setAbonnementToUpdateMode(e.target.value)}
      >
       <Radio value={"Free"}>Free</Radio>
       <Radio value={"Basic"}>Basic</Radio>
       <Radio value={"Premium"}>Premium</Radio>
      </Radio.Group>
     </Form.Item>
     <Form.Item>
      <Button
       type='button'
       onClick={() => {
        updateAbonnement(id, abonnementToUpdateMode)
        setTUpdateMode(false)
       }}
      >
       {" "}
       VALIDER
      </Button>
     </Form.Item>
    </div>
   )}
  </div>
 )
}
