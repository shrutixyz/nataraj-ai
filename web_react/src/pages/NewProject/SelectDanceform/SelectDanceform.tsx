import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./SelectDanceform.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCheckpoint } from "../../../store/store";
import Swal from "sweetalert2";

const SelectDanceform = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [danceform, setDanceform] = useState("freestyle");
  const projectID = useSelector((state: any) => state.project.projectID);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const projectName = useSelector((state: any) => state.project.projectName);
  const danceForms = [

    "Hip Hop",
    "Freestyle",
    "Indian Classical",
    "Ballet",
    "Contemporary",
    "Salsa",
    "Breakdancing",
    "Jazz Dance",
  ];
  const [select0, set0] = useState(true);
  const [select1, set1] = useState(false);
  const [select2, set2] = useState(false);
  const [select3, set3] = useState(false);
  const [select4, set4] = useState(false);
  const [select5, set5] = useState(false);
  const [select6, set6] = useState(false);
  const [select7, set7] = useState(false);
  const all = [select0, select1, select2, select3, select4, select5, select6, select7]
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/restricted");
    }
  }, [isLoggedIn]);

  const handleSubmit = async () => {
    let forms = "";
    for (let i=0;i<all.length;i++) {
      if(all[i]){
        forms += danceForms[i] + ", "
      }    
    }
    console.log(forms)
    try {
      // set danceform to realtime db, change state,
      const data = {
        projectID: projectID,
        danceform: forms,
      };
      console.log(projectID);
      const response = await axios.post(`${endpoint}/updatedanceform`, data);

      dispatch(updateCheckpoint(2));
      // navigate to customizedanceavatar
      navigate("/customiseavatar");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: error.toString(),
          confirmButtonColor: "#FFBA09",
          confirmButtonText: "okay",
        });
      } else {
        Swal.fire({
          title: "Unexpected Exception",
          confirmButtonColor: "#FFBA09",
          confirmButtonText: "okay",
        });
      }
    }
  };

  const handleSelected = (index: number)=>{
    switch (index) {
      case 0:
        set0(!select0)
        break;
      case 1:
        set1(!select1)
        break;
      case 2:
        set2(!select2)
        break;
      case 3:
        set3(!select3)
        break;
      case 4:
        set4(!select4)
        break;
      case 5:
        set5(!select5)
        break;
      case 6:
        set6(!select6)
        break;
      case 7:
        set7(!select7)
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Nav />
      <div className={Styles.mainbody}>
        <p className={Styles.title}>DASHBOARD</p>
        <p className={Styles.subtitle}>{projectName}</p>
        <br />
        <p className={Styles.step}>STEP 3: SELECT THE DANCE STYLE</p>
        <p>NOTE: YOU CAN SELECT MULTIPLE IF YOU WANT A FUN FUSION!</p>

        <br />
        <br />
        <div className={Styles.danceoptions}>
        <div onClick={() => { handleSelected(0); }}  className={ select0 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[0]}</p>
         </div>
         <div onClick={() => { handleSelected(1); }}  className={ select1 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[1]}</p>
         </div>
         <div onClick={() => { handleSelected(2); }}  className={ select2 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[2]}</p>
         </div>
         <div onClick={() => { handleSelected(3); }}  className={ select3 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[3]}</p>
         </div>
         <div onClick={() => { handleSelected(4); }}  className={ select4 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[4]}</p>
         </div>
         <div onClick={() => { handleSelected(5); }}  className={ select5 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[5]}</p>
         </div>
         <div onClick={() => { handleSelected(6); }}  className={ select6 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[6]}</p>
         </div>
         <div onClick={() => { handleSelected(7); }}  className={ select7 ? Styles.selected : Styles.unselected  }  >
          <p>{danceForms[7]}</p>
         </div>
        </div>
        <div className={Styles.navbuttons}>
          <ButtonCustom
            title="BACK"
            color="red"
            width="25"
            height="3"
            onClick={() => navigate("/trimaudio")}
          />
          <GradientButton
            title="NEXT"
            width="25"
            height="3"
            fontsize="1"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </>
  );
};

export default SelectDanceform;
