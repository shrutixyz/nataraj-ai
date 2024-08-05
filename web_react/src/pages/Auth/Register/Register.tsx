import { useEffect, useState } from "react";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  login,
  updateSignupEmail,
  updateSignupPassword,
} from "../../../store/store";
import {
  handleGithubSignIn,
  handleGoogleSignIn,
} from "../../../utils/firebase_functions";
import Swal from "sweetalert2";
import loader from "../../../assets/loader.svg";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setconfirmPass] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const googleSignin = async () => {
    setisLoading(true)
    const res = await handleGoogleSignIn(endpoint);
    setisLoading(false)
    if (res !== null) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      console.log("error");
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred! Please try again.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const githubSignin = async () => {
    setisLoading(true)
    const res = await handleGithubSignIn(endpoint);
    setisLoading(false)
    if (res !== null) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      console.log("error");

      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred! Please try again.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const proceedLogin = () => {
    if (confirmPass != password) {
      Swal.fire({
        title: "Passwords don't match",
        confirmButtonColor: "#FFBA09",
        confirmButtonText: "okay",
      });
    } else {
      dispatch(updateSignupEmail(email));
      dispatch(updateSignupPassword(password));
      navigate("/onboarding");
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
          <h1 className={Styles.title}>SIGN UP</h1>
          <a href="/login" className={Styles.subtitleref}>
            ALREADY A USER? LOGIN
          </a>
          <p className={Styles.options}>SIGNUP OPTIONS</p>
          <div className={Styles.sociallogins}>
            <SocialButton
              title="Signup with Google"
              width="25"
              height="4"
              service="google"
              onClick={googleSignin}
            />
            <SocialButton
              title="Signup with GitHub"
              width="25"
              height="4"
              service="github"
              onClick={githubSignin}
            />
          </div>
          <p className={Styles.options}>EMAIL SIGNUP</p>
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            onChange={(evt) => {
              setconfirmPass(evt.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <GradientButton
            title="SIGNUP"
            height="4"
            width="25"
            onClick={() => proceedLogin()}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Register;
