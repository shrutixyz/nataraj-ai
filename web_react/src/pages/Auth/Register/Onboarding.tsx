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

const Onboarding = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const email = useSelector((state: any) => state.auth.signupEmail);
  const password = useSelector((state: any) => state.auth.signupPassword);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  // const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const completeSignup = async () => {
    try {
      console.log("logging in with ", email, password)
      const user = await handleEmailSignUp(email, password, endpoint);
      await updateUserProfileDisplayName(user, name);
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
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
      <Footer />
    </>
  );
};

export default Onboarding;
