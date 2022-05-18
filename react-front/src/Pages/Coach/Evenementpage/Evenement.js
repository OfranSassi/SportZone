import "./Evenement.css"
import { useState } from "react"

import { Form, Input, Button } from "antd"

export default function Evenement({
 id,
 label,
 details,
 start_date,
 final_date,
 location,
 state,
 updateEvenement,
 deleteEvenement,
}) {
 const [updateMode, setTUpdateMode] = useState(false)
 const [labelToUpdateMode, setLabelToUpdateMode] = useState(label)
 const [detailsToUpdateMode, setDetailsToUpdateMode] = useState(details)
 const [selectedDate1, setSelectedDate1] = useState(start_date)
 const [selectedDate2, setSelectedDate2] = useState(final_date)
 const [placeToUpdateMode, setPlaceToUpdateMode] = useState(location)
 const [stateToUpdateMode, setStateToUpdateMode] = useState(state)
 function renderActions() {
  return (
   <div className='actions'>
	 
    <button onClick={() => deleteEvenement(id)}>delete</button>

    <button onClick={() => setTUpdateMode(true)}>update</button>
   </div>
  )
 }

 return (
  <div className='evenement'>
   {!updateMode ? (
    <>
     <div>{label}</div>
     <div>{details}</div>
     <div>{start_date}</div>
     <div>{final_date}</div>
     <div>{location}</div>
     <div>{state}</div>
     {renderActions()}
    </>
   ) : (
    <div>
     <Form.Item label='Nom'>
      <Input
       type='text'
       name='Nom'
       value={labelToUpdateMode}
       onChange={(e) => setLabelToUpdateMode(e.target.value)}
      />
     </Form.Item>
     <Form.Item label='Details'>
      <Input
       type='text'
       name='Details'
       value={detailsToUpdateMode}
       onChange={(e) => setDetailsToUpdateMode(e.target.value)}
      />
     </Form.Item>
     <Form.Item name='datePicker'>
      <input
							type="date"
							name="Start Date"
							value={selectedDate1}
							onChange={(e) => setSelectedDate1(e.target.value)}
						/>
      <input
							type="date"
							name="Final Date"
							value={selectedDate2}
							onChange={(e) => setSelectedDate2(e.target.value)}
						/>
   
     </Form.Item>

     <Form.Item label='Place'>
      <Input
       type='text'
       name='place'
       value={placeToUpdateMode}
       onChange={(e) => setPlaceToUpdateMode(e.target.value)}
      />
     </Form.Item>

     <Form.Item label='State'>
      <select
       name='State'
       value={stateToUpdateMode}
       onChange={(e) => setStateToUpdateMode(e.target.value)}
      >
       <option value='public'>Public</option>
       <option value='private'>Private </option>
      </select>
     </Form.Item>

     <Form.Item>
      <Button
       type='button'
       onClick={() => {
        updateEvenement(
         id,
         labelToUpdateMode,
         detailsToUpdateMode,
         selectedDate1,
         selectedDate2,
         placeToUpdateMode,
         stateToUpdateMode
        )
        setTUpdateMode(false)
       }}
      >
       {" "}
       update
      </Button>
     </Form.Item>
    </div>
   )}
  </div>
 )
}
