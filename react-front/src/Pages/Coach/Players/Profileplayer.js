import { Avatar, Image, Layout, Typography } from "antd"

import { Content, Footer } from "antd/lib/layout/layout"
import React, { useState } from "react"
import MenuBar from "../../../components/MenuBar"
import Subnav from "../../../components/Subnav"

function Profileplayer(props) {
 const [pLayer, setPlayer] = useState({
  firstname: "Eya",
  lastname: "Berriche",
  email: "eyaberriche@gmail.com",
  function: "étudiante",
  isActive: true,
  etablissement: "étatique",
  ville: "Fouchana Ben arous",
  tel: 93256411,
  taille: 1.6,
  poids: 62,
  dg: "gauchiere",
  nbrsession: "2",
  skills: [
   { id: 1, name: "vitesse sur les jambes" },
   { id: 2, name: "reflexe" },
  ],
  statistics: [{ id: 1, type: "sc", nombre: "20" }],
  objectifs: [
   "force dans les jambes",
   "grande reflexe lors d'une partie",
   "force dans le mains ",
  ],

  id: 1,
 })
 return (
  <Layout>
   <MenuBar />

   <Layout style={{ minHeight: "100vh" }}>
    <Subnav
     name1='/player-profile'
     name2='/cplayers'
     name3='/manage-players'
     name4='/coach-events'
    />
    <Layout className='site-layout'>
     <Content style={{ margin: "100 6px" }}>
      <div className='centered'>
       <Typography.Title style={{ margin: 20 }}>
        Profile joueur {pLayer.firstname} {pLayer.lastname}
       </Typography.Title>
       <center>
        <Avatar
         width={5000}
         height={500}
         src={<Image src='https://joeschmoe.io/api/v1/random' />}
        />
        <table>
         <tr>
          <td>
           <h4>Nom et prénom : </h4>
          </td>
          <td>
           <h4>
            {pLayer.firstname} {pLayer.lastname}
           </h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Email :</h4>
          </td>
          <td>
           <h4>{pLayer.email}</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Fonction :</h4>
          </td>
          <td>
           <h4>{pLayer.function}</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>statut : </h4>
          </td>
          <td>
           <h4> {pLayer.isActive ? "Actif" : "N'est pas actif"}</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Etablissement : </h4>
          </td>
          <td>
           <h4> {pLayer.etablissement}</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Taille : </h4>
          </td>
          <td>
           <h4> {pLayer.taille} métres</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Poids : </h4>
          </td>
          <td>
           <h4> {pLayer.poids} KG</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Nombre de session : </h4>
          </td>
          <td>
           <h4> {pLayer.nbrsession} / semaine</h4>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Compétences: </h4>
          </td>
          <td>
           <p></p>
           <h5>
            {pLayer.skills.map((sk) => {
             return (
              <ul>
               <li>{sk.name}</li>
              </ul>
             )
            })}
           </h5>
          </td>
         </tr>

         <tr>
          <td>
           <h4>statistiques : </h4>
          </td>
          <td>
           <h5>
            {pLayer.statistics.map((st) => {
             return (
              <ul>
               {st.nombre} {st.type}
              </ul>
             )
            })}
           </h5>
          </td>
         </tr>
         <tr>
          <td>
           <h4>Objectifs : </h4>
          </td>
          <td>
           <p></p>
           <h5>
            {pLayer.objectifs.map((ob) => {
             return (
              <ul>
               <li>{ob}</li>
              </ul>
             )
            })}
           </h5>
          </td>
         </tr>
        </table>
       </center>
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

export default Profileplayer
