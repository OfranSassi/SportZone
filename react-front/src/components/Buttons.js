import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"

function Buttons(props) {
 return (
  <div>
   <div>
    <Link to={props.link1}>
     <Button
      className='btn'
      style={{
       paddingBottom: 50,
       minHeight: 25,
       //  //  width: 600,
       color: "white",
       backgroundColor: "#f1356d",
       borderRadius: "8px",
      }}
      type='dashed'
      block
     >
      {props.name1}
     </Button>
    </Link>
    <Link to={props.link2}>
     <Button
      className='btn'
      style={{
       paddingBottom: 50,
       minHeight: 25,
       //  width: 600,
       color: "white",
       backgroundColor: "#f1356d",
       borderRadius: "8px",
      }}
      type='dashed'
      block
     >
      {props.name2}
     </Button>
    </Link>
   </div>
  </div>
 )
}

export default Buttons
