import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectDanceform.module.css"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCheckpoint } from "../../../store/store";

const SelectDanceform = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [danceform, setDanceform] = useState("freestyle")
  const projectID = useSelector((state: any) => state.project.projectID);
  const endpoint  = useSelector((state:any) => state.backend.endpoint);

  useEffect(()=>{
    if(!isLoggedIn){
      navigate('/ca')
    }
  }, [isLoggedIn])

  const handleSubmit = async() =>{
    try {
      // set danceform to realtime db, change state,
      const data = {
        "projectID": projectID,
        "danceform": danceform
      }
      console.log(projectID)
      const response = await axios.post(`${endpoint}/updatedanceform`, data);

      dispatch(updateCheckpoint(2));
      // navigate to customizedanceavatar
      navigate('/customiseavatar')
    } catch (error) {
      alert(error)
    }
      

  }
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p> 
          <p className={Styles.subtitle}>Untitled Project</p>
          <br />
          <p className={Styles.step}>STEP 3: SELECT THE DANCE STYLE</p>
          <p>NOTE: YOU CAN SELECT MULTIPLE IF YOU WANT A FUN FUSION!</p>

          
          <br /><br />
          <div className={Styles.navbuttons}>
          <ButtonCustom title="BACK" color="red" width="25" height="3" onClick={()=>navigate('/trimaudio')} />
          <GradientButton title="NEXT" width="25" height="3" onClick={()=>handleSubmit()} />
          </div>
        </div>
        </>
    )
}

export default SelectDanceform;