import Styles from "./ProjectTile.module.css";
import model from "../../assets/modeldummy.png";
import trash from "../../assets/trash.svg";
import eye from "../../assets/eye.svg";
import eyeoff from "../../assets/eye-off.svg";
import share from "../../assets/share.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectTile = (props: any) => {
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const navigate = useNavigate();

  const shareFunc = () => {
    if(props.data.private){
        Swal.fire({
            title: "Project not public",
            text: "Please change the visibility to public and then try again!",
            confirmButtonColor: "#18191A",
            confirmButtonText: "okay",
          });
    }
    else{

        Swal.fire({
            title: "Success!",
            text: "Here's the link for your project: https://nataraj.web.app/project?id="+props.data.projectID,
            confirmButtonColor: "#18191A",
            confirmButtonText: "okay",
          });
    }
    
  };

  const changeVisibility =async()=>{
    try {
      const visibility = props.data.visibility;
     const res = await axios.get(`${endpoint}/changeprojectvisibility/${props.data.projectID}/${visibility=="private"?"public":"private"}`)
      console.log(res);
      Swal.fire({
        title: "Success!",
        text: `The visibility of your project is toggled from ${visibility}! You may reload the page to see the latest property!`,
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "error",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
    // implement further code
  }

  const handleNavigation = () => {
    navigate(`/project/nataraj-${props.data.projectID}`)
  }

  const deleteProject =async()=>{
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure that you want to delete the project? It'll no longer be avaiable for use.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
        showCancelButton: true,
        cancelButtonText: "cancel"
      });
     const res = await axios.get(`${endpoint}/deleteproject/${props.data.projectID}`)
      console.log(res);
      Swal.fire({
        title: "Success!",
        text: "The project is successfully deleted! You may reload the page to see the latest property!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unable to delete project",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
    // implement further code
  }
  return (
    <>
      <div onClick={handleNavigation} className={Styles.parentdiv}>
        <img src={model} alt="" className={Styles.model}/>
        <div className={Styles.bottomrow}>
          <div className={Styles.text}>
            <p>
              <b>{props.data.projectName}</b>
            </p>
            <p>{props.data.duration.toString().substring(0, 5)} seconds</p>
          </div>
          <div className={Styles.icons}>
            {props.data.visibility=="private" ? (
              <img src={eye} alt="" onClick={changeVisibility} />
            ) : (
              <img src={eyeoff} alt="" onClick={changeVisibility}/>
            )}
            <img src={share} alt="" onClick={shareFunc}/>
            <img src={trash} alt="" onClick={deleteProject} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTile;
