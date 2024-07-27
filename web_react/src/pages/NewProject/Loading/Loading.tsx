import { useEffect } from "react";
import Nav from "../../../features/nav/Nav"
import Styles from "./Loading.module.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Loading = () => {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    // const dispatch = useDispatch();
  
    useEffect(()=>{
      if(!isLoggedIn){
        navigate('/ca')
      }
    }, [isLoggedIn])
    return (
        <>
            <Nav/>
            <div className={Styles.loadingbody}>
                <p className={Styles.percent}>14%</p>
                <p className={Styles.heading}>CHOREOGRAPHING THE BEST DANCE FOR YOU...</p>
                <p className={Styles.subheading}>STAY HERE OR FIND YOUR PROJECT IN DASHBOARD</p>
            </div>
        </>
    )
}

export default Loading;