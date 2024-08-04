import { useSelector } from "react-redux";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import Styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  handleEmailSignUp,
  updateUserProfileDisplayName,
} from "../../../utils/firebase_functions";
import Swal from "sweetalert2";
import loader from "../../../assets/loader.svg";


const Onboarding = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const email = useSelector((state: any) => state.auth.signupEmail);
  const password = useSelector((state: any) => state.auth.signupPassword);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const completeSignup = async () => {
    try {
      setisLoading(true)
      console.log("logging in with ", email, password);
      const user = await handleEmailSignUp(email, password, endpoint);
      await updateUserProfileDisplayName(user, name);
      setisLoading(false)
      navigate("/dashboard");
    } catch (error) {
      setisLoading(false)
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Please fill correct details and then try again",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  return (
    <>
      <Nav />
      {isLoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="" />
          <p>logging you in</p>
        </div>
      ) : (
        <div className={Styles.mainbody}>
          <h1 className={Styles.title}>ONBOARDING</h1>
          <p className={Styles.subtitlerefp}>JUST THE LAST STEP WE PROMISE</p>
          <p className={Styles.options}>BASIC INFORMATION</p>
          <input
            type="text"
            placeholder="NAME"
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <GradientButton
            title="COMPLETE SIGNUP"
            height="4"
            width="25"
            onClick={() => completeSignup()}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Onboarding;
