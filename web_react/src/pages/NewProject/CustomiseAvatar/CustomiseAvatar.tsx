import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../features/buttoncustom/ButtonCustom";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./CustomiseAvatar.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import later from "../../../assets/later.png";
import loader from "../../../assets/loader.svg";

const CustomiseAvatar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const projectID = useSelector((state: any) => state.project.projectID);
  // const projectID = "nataraj-w5wp9t3";
  const projectName = useSelector((state: any) => state.project.projectName);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [isLoading, setisLoading] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/restricted");
    }
  }, [isLoggedIn]);

  const handleSubmit = async () => {
    try {
      setisLoading(true);

      const data = {
        projectID: projectID
      };
      console.log(projectID);
      const response = await axios.post(`${endpoint}/generatedance`, data);
      setisLoading(false);

      // get timestamp based lyrics on backend, save that in project,
      // generate prompt, and add a loading state in backend with a listener on react
      // if response is returned, then show project to user
      navigate(`/project/${projectID}`);
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

  return (
    <>
      <Nav />
      {isLoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="" />
          <p style={{ maxWidth: "40rem", textAlign: "center" }}>
            Generating your choreography... You can stay here or go back to
            dashboard to see your completed project once done
          </p>
        </div>
      ) : (
        <div className={Styles.mainbody}>
          <p className={Styles.title}>DASHBOARD</p>
          <p className={Styles.subtitle}>Project: {projectName}</p>
          <br />
          <p className={Styles.step}>STEP 4: CUSTOMIZE YOUR DANCING AVATAR</p>
          <br />
          <br />
          <img src={later} alt="" width={"400rem"} />
          <div className={Styles.navbuttons}>
            <ButtonCustom
              title="BACK"
              color="red"
              width="25"
              height="3"
              onClick={() => navigate("/selectdanceform")}
            />
            <ButtonCustom
              title="SAVE AVATAR IN PREFERENCES"
              color="green"
              width="25"
              height="3"
              onClick={() => Swal.fire("Feature would be made available soon!")}
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
      )}
    </>
  );
};

export default CustomiseAvatar;
