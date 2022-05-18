import React from "react"
import Dashboard from "../Pages/Coach/Dashboard"
import "./mailer.css"
import emailjs from 'emailjs-com'


export default function Mailer() {
 const tailLayout = {
  wrapperCol: {
   offset: 8,
   span: 16,
  },
 }

 function sendEmail(e){
    e.preventDefault()
    
    emailjs.sendForm(
        'service_pomvosl', 
        'template_hw6bk2k', 
        e.target,
        '_0fLqYEzY2JFoZTI6').then((result) => {
                      console.log(result.text);
                  }, (error) => {
                      console.log(error.text);
                  });
                  e.target.reset()
 }

 const onReset = () => {
  document.getElementById("fields").reset()
 }
 return (
  <Dashboard>
      <div className='container-border' 
      > 
    <h1 className="title"> Invitation Form</h1>
      <form className="form" onSubmit={sendEmail}>
          <label>Player's Name</label>
          <input type='text' name="playername" className="form-control"></input>

          <label>Player's Email</label>
          <input type='text' name="playerEmail" className="form-control"></input>

          <label>Message</label>
          <textarea type='text' name="message" rows='4' className="form-control"></textarea>
          <br/>
          <br/>
          <div class="col-md-12 text-center">
          <input type='submit' value='Send' className="form-control btn btn-primary"></input>
          </div>
      </form>
      </div>
  </Dashboard>
 )
}
