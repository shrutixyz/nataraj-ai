import React from 'react'
import Nav from '../../features/nav/Nav'
import GradientButton from '../../features/gradientbutton/GradientButton'
import { useNavigate } from 'react-router-dom'
import Styles from "./Dashboard.module.css"

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <>
    <Nav/>
    <div className={Styles.mainbody}>
      <p className={Styles.title}>DASHBOARD</p> 
      <p className={Styles.subtitle}>YOUR PROJECTS</p>
      <div className={Styles.noprojectscontainer}>
        <p className={Styles.noprojectstext}>OOPS, NO PROJECTS YET</p>
        <GradientButton title="CREATE ONE NOW" width="25" height="4" onClick={()=>navigate('/selectaudio')} />
      </div>
    </div>
    </>
  )
}

export default Dashboard