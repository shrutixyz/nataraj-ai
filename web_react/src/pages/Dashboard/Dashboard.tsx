import React, { useEffect, useState } from "react";
import Nav from "../../features/nav/Nav";
import GradientButton from "../../features/gradientbutton/GradientButton";
import { useNavigate } from "react-router-dom";
import Styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { auth } from "../../utils/firebase";
import Swal from "sweetalert2";
import ProjectTile from "../../features/projecttile/ProjectTile";
import loader from "../../assets/loader.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  // const dispatch = useDispatch();
  const [projects, setProjects] = useState([
    // { name: "Untitled Project1", private: false, duration: 30, id: "12345" },
    // { name: "Untitled Project1", private: true, duration: 30 },
    // { name: "Untitled Project1", private: true, duration: 30 },
    // { name: "Untitled Project1", private: true, duration: 30 },
  ]);
  const [isLoading, setisLoading] = useState(true);
  const uid = auth.currentUser?.uid;
  const fetchprojects = async () => {
    try {
      const res = await axios.get(`${endpoint}/fetchprojects/${uid}`);
      setProjects(res.data["projects"])
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unespected error occurred!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const handleNewProject = () =>{
    if(projects.length>10){
      Swal.fire({
        title: "Error!",
        text: "With free tier, you can have 3 projects at max! Please delete an existing project or contact us for revised quota",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
    else{
      navigate('/selectaudio')
    }
  }
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/restricted");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchprojects();
    setisLoading(false)
  }, []);

  return (
    <>
      <Nav />
      {
        isLoading? <div className={Styles.loading}>
        <img src={loader} className={Styles.loader} alt="" />
        <p>loading your projects</p>
      </div> :
        <div className={Styles.mainbody}>
        <div className={Styles.header}>
          <div>
            <p className={Styles.title}>DASHBOARD</p>
            <p className={Styles.subtitle}>YOUR PROJECTS</p>
          </div>
          {
            projects.length!=0 && <GradientButton title="CREATE NEW PROJECT" height="3" width="20" onClick={handleNewProject} />
          }
        </div>
        {projects.length == 0 ? (
          <div className={Styles.noprojectscontainer}>
            <p className={Styles.noprojectstext}>OOPS, NO PROJECTS YET</p>
            <GradientButton
              title="CREATE ONE NOW"
              width="25"
              height="4"
              onClick={() => navigate("/selectaudio")}
            />
          </div>
        ) : (
          <div className={Styles.gridcontainer}>
            {projects.map((item, index) => (
              <ProjectTile data={item} />
            ))}
          </div>
        )}
      </div>
      }
    </>
  );
};

export default Dashboard;
