import Styles from "./ProjectTile.module.css";
import model from "../../assets/modeldummy.png";
import trash from "../../assets/trash.svg";
import eye from "../../assets/eye.svg";
import eyeoff from "../../assets/eye-off.svg";
import share from "../../assets/share.svg";
import Swal from "sweetalert2";

const ProjectTile = (props: any) => {
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
            text: "Here's the link for your project: https://nataraj.web.app/project?id="+props.data.id,
            confirmButtonColor: "#18191A",
            confirmButtonText: "okay",
          });
    }
    
  };

  const changeVisibility =async()=>{
    // implement further code
  }

  const deleteProject =async()=>{
    // implement further code
  }
  return (
    <>
      <div className={Styles.parentdiv}>
        <img src={model} alt="" />
        <div className={Styles.bottomrow}>
          <div className={Styles.text}>
            <p>
              <b>{props.data.title}</b>
            </p>
            <p>{props.data.duration} seconds</p>
          </div>
          <div className={Styles.icons}>
            {props.data.private ? (
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
