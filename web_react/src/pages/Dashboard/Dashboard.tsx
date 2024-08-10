import React, { useEffect, useState } from "react";
import Nav from "../../features/nav/Nav";
import GradientButton from "../../features/gradientbutton/GradientButton";
import { useNavigate } from "react-router-dom";
import Styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { auth } from "../../utils/firebase";
import Swal from "sweetalert2";
import ProjectTile from "../../features/projecttile/ProjectTile";
import loader from "../../assets/loader.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [projects, setProjects] = useState([]);
  const [uid, setUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUidLoading, setIsUidLoading] = useState(true); // Added state for UID loading
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const fetchProjects = async () => {
    if (uid) {
      try {
        const res = await axios.get(`${endpoint}/fetchprojects/${uid}`);
        setProjects(res.data.projects);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Unexpected error occurred!",
          confirmButtonColor: "#18191A",
          confirmButtonText: "Okay",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNewProject = () => {
    if (projects.length >= 3) {
      Swal.fire({
        title: "Error!",
        text: "With the free tier, you can have 3 projects at max! Please delete an existing project or contact us for a revised quota.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "Okay",
      });
    } else {
      navigate("/selectaudio");
    }
  };

  const checkLoggedIn = async () => {
    const currentUserUid = auth.currentUser?.uid;
    if (currentUserUid) {
      setUid(currentUserUid);
      setIsUidLoading(false); // Finished loading UID
    } else {
      // Handle cases where UID is not available after a delay
      setIsUidLoading(false);
      if(!isLoggedIn){
        navigate("/restricted");
      }
      
      
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (!isUidLoading) {
      fetchProjects();
    }
  }, [uid, isUidLoading]);

  return (
    <>
      <Nav />
      {isUidLoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="Loading..." />
          <p>Loading your information...</p>
        </div>
      ) : isLoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="Loading..." />
          <p>Loading your projects...</p>
        </div>
      ) : (
        <div className={Styles.mainbody}>
          <div className={Styles.header}>
            <div>
              <p className={Styles.title}>DASHBOARD</p>
              <p className={Styles.subtitle}>YOUR PROJECTS</p>
            </div>
            {projects.length > 0 && (
              <GradientButton title="CREATE NEW PROJECT" height="3" width="20" onClick={handleNewProject} />
            )}
          </div>
          {projects.length === 0 ? (
            <div className={Styles.noprojectscontainer}>
              <p className={Styles.noprojectstext}>OOPS, NO PROJECTS YET</p>
              <GradientButton title="CREATE ONE NOW" width="25" height="4" onClick={() => navigate("/selectaudio")} />
            </div>
          ) : (
            <div className={Styles.gridcontainer}>
              {projects.map((item, index) => (
                <ProjectTile key={index} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
